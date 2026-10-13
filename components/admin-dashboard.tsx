"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { DesignEditor, PageContentEditor, PricingFaqEditor } from "./studio-editors";
import { defaultContent, initialDesigns, type Design, type SiteContent } from "@/lib/cms-model";

type Row = { id: string; slug: string; status: Design["status"]; position: number; data: Design; updated_at: string };
type ContentRow = { data: SiteContent; updated_at: string };
type Media = { id: string; path: string; alt: string; mime: string; bytes: number };
type Snapshot = { designs: Row[]; content: ContentRow; media: Media[]; commit?: string };
const tabs = ["Overview", "Designs", "Page content", "Pricing & FAQs", "Media"] as const;
type Tab = typeof tabs[number];
async function api<T = { ok: boolean }>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/admin/${path}`, init);
  const result = await response.json() as T & { error?: string };
  if (response.status === 401) { window.location.assign("/studio/login"); throw new Error("Please sign in again."); }
  if (!response.ok) throw new Error(result.error || "Request failed.");
  return result;
}
export function AdminDashboard({ email, previewSnapshot }: { email: string; previewSnapshot?: Snapshot }) {
  const preview = Boolean(previewSnapshot);
  const [commit, setCommit] = useState("");
  const [tab, setTab] = useState<Tab>("Overview");
  const [rows, setRows] = useState<Row[]>([]);
  const [content, setContent] = useState<ContentRow>({ data: defaultContent, updated_at: "" });
  const [savedContent, setSavedContent] = useState<ContentRow>({ data: defaultContent, updated_at: "" });
  const [media, setMedia] = useState<Media[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Design | null>(null);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const editorRef = useRef<HTMLFormElement>(null);
  const hasDraft = Boolean(draft);
  useEffect(() => {
    if (hasDraft && window.matchMedia("(max-width: 1050px)").matches) editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected?.id, hasDraft]);
  useEffect(() => {
    const load = previewSnapshot ? Promise.resolve(previewSnapshot) : api<Snapshot>("snapshot");
    load.then(snapshot => {
      setRows(snapshot.designs); setMedia(snapshot.media); setContent(snapshot.content);
      setSavedContent(snapshot.content); setCommit(snapshot.commit || "");
    }).catch(err => setError(err.message)).finally(() => setBusy(false));
  }, [previewSnapshot]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function navigate(next: Tab) {
    if (dirty && !window.confirm("Leave these unsaved changes?")) return;
    if (dirty) setContent(savedContent);
    setDirty(false); setDraft(null); setTab(next); setMessage(""); setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function edit(row: Row | null) {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setSelected(row);
    setDraft(row ? { ...row.data, slug: row.slug, status: row.status, position: row.position } : { ...initialDesigns[0], name: "", slug: "", description: "", seoTitle: "", seoDescription: "", featured: false, status: "draft", position: rows.length });
    setDirty(false); setMessage(""); setError("");
  }
  async function saveDesign(event: FormEvent) {
    event.preventDefault(); if (!draft || preview) return;
    if (selected?.status === "published" && draft.status !== "published" && !window.confirm("Remove this design from the public website? Its URL will no longer be available.")) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const result = await api<Row[]>("designs", { method: selected ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selected ? { id: selected.id, updated_at: selected.updated_at, data: draft } : { data: draft }) });
      setRows(previous => [...previous.filter(row => row.id !== result[0].id), result[0]].sort((a, b) => a.position - b.position));
      setSelected(result[0]); setDraft(result[0].data); setDirty(false); setMessage("Saved to the repository. Changes appear after the connected deployment succeeds; drafts stay hidden from website listings.");
    } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  }
  async function saveContent(event: FormEvent) {
    event.preventDefault(); if (preview) return; setBusy(true); setError(""); setMessage("");
    try {
      const result = await api<ContentRow[]>("content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: content.data, updated_at: content.updated_at }) });
      setContent(result[0]); setSavedContent(result[0]); setDirty(false); setMessage("Saved to the repository. Changes appear after the connected deployment succeeds.");
    } catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  }
  function beforeSwitchContent() {
    if (dirty && !window.confirm("Switch sections and discard these unsaved changes?")) return false;
    if (dirty) setContent(savedContent);
    setDirty(false); setMessage(""); setError(""); return true;
  }
  function updateContent(patch: Partial<SiteContent>) { setContent(current => ({ ...current, data: { ...current.data, ...patch } })); setDirty(true); }
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (preview) return; const form = event.currentTarget; const data = new FormData(form);
    setBusy(true); setError(""); setMessage("");
    try {
      const file = data.get("file") as File;
      if (!file.size || file.size > 20000000) throw new Error("Choose a JPEG, PNG or WebP image under 20 MB.");
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPEG, PNG or WebP photo.");
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d"); if (!context) throw new Error("Your browser could not prepare the image.");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
      const optimized = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/webp", .82));
      if (!optimized || optimized.size > 1500000) throw new Error("This photo is still too large. Try a smaller image.");
      const result = await api<{ image: string }>("media", { method: "POST", headers: { "Content-Type": optimized.type, "X-Image-Alt": encodeURIComponent(String(data.get("alt") || "")) }, body: optimized });
      setMedia(await api<Media[]>("media")); setMessage(`Image saved to Git. Select it in a design or page image field. It becomes available on the website after deployment.`); form.reset();
    } catch (err) { setError(err instanceof Error ? err.message : "Image upload failed."); } finally { setBusy(false); }
  }
  async function logout() {
    if (preview) { window.location.assign("/studio/login"); return; }
    if (dirty && !window.confirm("Sign out and discard unsaved changes?")) return;
    try { await api("auth", { method: "DELETE" }); window.location.assign("/studio/login"); } catch (err) { setError((err as Error).message); }
  }
  function imagePicker(value: string, change: (path: string) => void) {
    const choices = new Map<string, string>();
    for (const row of rows) {
      choices.set(row.data.image, `${row.data.name} — collection`);
      choices.set(row.data.heroImage, `${row.data.name} — banner`);
    }
    choices.set(content.data.makerImage, "Current maker image");
    for (const id of ["craftsmanship", "process", "investment"] as const) choices.set(content.data.pages[id].image, `${id} banner`);
    for (const image of media) choices.set(image.path, image.alt);
    return <select aria-label="Choose a library image" value={choices.has(value) ? value : ""} onChange={event => { if (event.target.value) change(event.target.value); }}>
      <option value="">Choose a library image…</option>{Array.from(choices).map(([path, label]) => <option key={path} value={path}>{label}</option>)}
    </select>;
  }
  function imageSource(path: string) {
    const item = media.find(image => image.path === path);
    return item && !preview ? `/api/admin/media/${item.id}` : path;
  }
  const filtered = rows.filter(row => `${row.data.name} ${row.slug}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="cms-shell"><aside className="cms-sidebar"><Link className="cms-brand" href="/">J. K. Oliver <span>Website studio</span></Link><nav aria-label="Admin navigation">{tabs.map(item => <button key={item} className={tab === item ? "active" : ""} onClick={() => navigate(item)}>{item}</button>)}</nav><p>{email}</p><Link href="/" target="_blank" rel="noreferrer">View website ↗</Link><button onClick={logout}>{preview ? "Back to sign in" : "Sign out"}</button></aside><main className="cms-main"><header><p className="eyebrow">Made to be kept. Kept up to date.</p><h1>{tab}</h1></header>{preview && <div className="cms-notice" role="status">Design preview only. Explore the editor; saving and uploads are disabled until the studio is connected.</div>}<p className="cms-publish-note">Save & publish records your changes in Git. The live website updates after its deployment succeeds.{commit && ` Loaded repository version: ${commit.slice(0, 7)}.`}</p>{message && <div className="cms-notice" role="status">{message}</div>}{error && <div className="cms-notice cms-error" role="alert">{error}</div>}{busy && <p role="status">Working…</p>}
    {tab === "Overview" && <><div className="cms-stats"><article><strong>{rows.length}</strong><span>Table designs</span></article><article><strong>{rows.filter(row => row.status === "published").length}</strong><span>Published designs</span></article><article><strong>{media.length}</strong><span>Uploaded images</span></article></div><section className="cms-panel"><h2>Your work, in your words.</h2><p>Update prices, refine the collection, and share the story behind each piece. Your edits are stored safely in Git, then published through the connected website deployment.</p><button className="cms-primary" onClick={() => navigate("Designs")}>Manage the collection ↗</button><p>The Colorado description is still awaiting client-approved copy. Existing wording has been preserved.</p></section></>}
    {tab === "Designs" && <div className="cms-editor">
      <section className="cms-panel cms-design-list"><div className="cms-toolbar"><input aria-label="Search designs" placeholder="Search designs" value={query} onChange={event => setQuery(event.target.value)} /><button onClick={() => edit(null)}>+ New design</button></div>
        {filtered.map(row => <button className="cms-design-row" aria-pressed={selected?.id === row.id && Boolean(draft)} key={row.id} onClick={() => edit(row)}><img src={imageSource(row.data.image)} alt="" /><span><strong>{row.data.name}</strong><small>{row.status} · ${(row.data.priceCents / 100).toLocaleString()}</small></span><span>↗</span></button>)}
        {!filtered.length && <p>No designs found.</p>}
      </section>
      {draft ? <DesignEditor key={selected?.id || "new"} editorRef={editorRef} draft={draft} existing={Boolean(selected)} change={value => { setDraft(value); setDirty(true); }} save={saveDesign} disabled={busy || preview} imagePicker={imagePicker} imageSource={imageSource} /> : <section className="cms-panel"><h2>Choose a design.</h2><p>Select a table to edit its essentials first, or create a new design.</p></section>}
    </div>}
    {tab === "Page content" && <PageContentEditor content={content.data} update={updateContent} save={saveContent} disabled={busy || preview || !content.updated_at} beforeSwitch={beforeSwitchContent} imagePicker={imagePicker} imageSource={imageSource} />}
    {tab === "Pricing & FAQs" && <PricingFaqEditor content={content.data} update={updateContent} save={saveContent} disabled={busy || preview || !content.updated_at} beforeSwitch={beforeSwitchContent} prices={rows.filter(row => row.status === "published").map(row => row.data.priceCents / 100)} />}
    {tab === "Media" && <><form className="cms-panel cms-form" onSubmit={upload}><h2>Add an image</h2><p>Choose a JPEG, PNG or WebP photo under 20 MB. The studio resizes and compresses it before saving (maximum 1.5 MB). Uploaded images become public website assets after deployment—do not upload private photos.</p><label>Image file<input name="file" type="file" accept="image/jpeg,image/png,image/webp" required /></label><label>Image description<input name="alt" maxLength={250} required /></label><button className="cms-primary" disabled={busy || preview}>Optimize & upload image</button></form><section className="cms-media-grid">{media.map(item => <article className="cms-panel" key={item.id}><img src={preview ? item.path : `/api/admin/media/${item.id}`} alt={item.alt} /><p>{item.alt}</p><label>Image path<input readOnly value={item.path} onFocus={e => e.target.select()} /></label><small>{Math.ceil(item.bytes / 1024)} KB</small></article>)}</section>{!media.length && <p>No uploaded images yet. Existing website photos remain available through their original paths.</p>}</>}
  </main></div>;
}
