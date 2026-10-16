"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { DesignEditor, PageContentEditor, PricingFaqEditor, PromotionEditor } from "./studio-editors";
import { defaultContent, initialDesigns, type Design, type SiteContent } from "@/lib/cms-model";

type Row = { id: string; slug: string; status: Design["status"]; position: number; data: Design; updated_at: string };
type ContentRow = { data: SiteContent; updated_at: string };
type Media = { id: string; path: string; alt: string; mime: string; bytes: number };
type Snapshot = { designs: Row[]; content: ContentRow; media: Media[]; commit?: string };
export type StudioDialog = { title: string; body: ReactNode; confirmLabel: string; danger?: boolean; action: () => void | Promise<void> };
type Toast = { kind: "success" | "error"; text: string };
const tabs = ["Overview", "Designs", "Sales", "Pages", "Pricing & FAQs"] as const;
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
  const [dirty, setDirty] = useState(false);
  const [dialog, setDialog] = useState<StudioDialog | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
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
    }).catch(error => setToast({ kind: "error", text: error.message })).finally(() => setBusy(false));
  }, [previewSnapshot]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 5500);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    if (!dialog) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setDialog(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [dialog]);

  function ask(value: StudioDialog) { setDialog(value); }
  function discardChanges() {
    setContent(savedContent);
    if (selected) setDraft({ ...selected.data, slug: selected.slug, status: selected.status, position: selected.position });
    else setDraft(null);
    setDirty(false);
  }
  function withDiscard(action: () => void, body = "Your unsaved changes will be lost.") {
    if (!dirty) { action(); return; }
    ask({ title: "Discard unsaved changes?", body, confirmLabel: "Discard changes", danger: true, action: () => { discardChanges(); action(); } });
  }
  function navigate(next: Tab) {
    withDiscard(() => {
      setDirty(false); setDraft(null); setSelected(null); setTab(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, `You have unsaved changes in ${tab}. Moving to ${next} will discard them.`);
  }
  function edit(row: Row | null) {
    withDiscard(() => {
      setSelected(row);
      setDraft(row ? { ...row.data, slug: row.slug, status: row.status, position: row.position } : { ...initialDesigns[0], name: "", slug: "", description: "", seoTitle: "", seoDescription: "", featured: false, status: "draft", position: rows.length });
      setDirty(false);
    }, "Choose another design and discard the changes in this editor?");
  }
  async function persistDesign(candidate: Design) {
    if (preview) return;
    setBusy(true);
    try {
      const result = await api<Row[]>("designs", { method: selected ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selected ? { id: selected.id, updated_at: selected.updated_at, data: candidate } : { data: candidate }) });
      setRows(previous => [...previous.filter(row => row.id !== result[0].id), result[0]].sort((a, b) => a.position - b.position));
      setSelected(result[0]); setDraft(result[0].data); setDirty(false);
      setToast({ kind: "success", text: candidate.status === "archived" ? "Design removed from the website and kept in the archive." : "Design saved. The live website will update after deployment." });
    } catch (error) { setToast({ kind: "error", text: (error as Error).message }); }
    finally { setBusy(false); }
  }
  function saveDesign(event: FormEvent) {
    event.preventDefault(); if (!draft || preview) return;
    ask({ title: selected ? "Publish these design changes?" : "Add this design?", body: <><strong>{draft.name || "New design"}</strong> will be saved to the collection. {draft.status === "published" ? "Visitors will see it after deployment." : "It will remain hidden until published."}</>, confirmLabel: selected ? "Save changes" : "Add design", action: () => persistDesign(draft) });
  }
  function archiveDesign() {
    if (!draft || !selected) return;
    const archived = { ...draft, status: "archived" as const, featured: false };
    ask({ title: `Remove ${draft.name} from the website?`, body: "The design will disappear from the collection and its public page after deployment. It stays safely archived and can be restored later.", confirmLabel: "Remove design", danger: true, action: () => persistDesign(archived) });
  }
  function restoreDesign() {
    if (!draft || !selected) return;
    const restored = { ...draft, status: "draft" as const };
    ask({ title: `Restore ${draft.name}?`, body: "The design will return as a draft. Review it and change its status to Published when it is ready for the website.", confirmLabel: "Restore as draft", action: () => persistDesign(restored) });
  }
  async function saveContent(event: FormEvent) {
    event.preventDefault(); if (preview) return;
    setBusy(true);
    try {
      const result = await api<ContentRow[]>("content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: content.data, updated_at: content.updated_at }) });
      setContent(result[0]); setSavedContent(result[0]); setDirty(false);
      setToast({ kind: "success", text: tab === "Sales" ? "Sale settings saved. The website will update after deployment." : "Changes saved. The website will update after deployment." });
    } catch (error) { setToast({ kind: "error", text: (error as Error).message }); }
    finally { setBusy(false); }
  }
  function requestContentSwitch(action: () => void) {
    if (!dirty) { action(); return; }
    ask({ title: "Discard changes in this section?", body: "Switching sections will restore the last saved content.", confirmLabel: "Discard changes", danger: true, action: () => { setContent(savedContent); setDirty(false); action(); } });
  }
  function updateContent(patch: Partial<SiteContent>) { setContent(current => ({ ...current, data: { ...current.data, ...patch } })); setDirty(true); }
  async function uploadImage(file: File, alt: string) {
    if (preview) throw new Error("Uploads are disabled in preview mode.");
    if (!file.size || file.size > 20000000) throw new Error("Choose a JPEG, PNG or WebP image under 20 MB.");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPEG, PNG or WebP photo.");
    setBusy(true);
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d"); if (!context) throw new Error("Your browser could not prepare the image.");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
      const optimized = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/webp", .82));
      if (!optimized || optimized.size > 1500000) throw new Error("This photo is still too large. Try a smaller image.");
      const result = await api<{ image: string }>("media", { method: "POST", headers: { "Content-Type": optimized.type, "X-Image-Alt": encodeURIComponent(alt) }, body: optimized });
      setMedia(await api<Media[]>("media"));
      setToast({ kind: "success", text: "Photo uploaded and selected. Save the design when you are ready." });
      return result.image;
    } finally { setBusy(false); }
  }
  function logout() {
    const action = async () => {
      if (preview) { window.location.assign("/studio/login"); return; }
      try { await api("auth", { method: "DELETE" }); window.location.assign("/studio/login"); }
      catch (error) { setToast({ kind: "error", text: (error as Error).message }); }
    };
    withDiscard(action, "Signing out now will discard your unsaved changes.");
  }
  function imagePicker(value: string, change: (path: string) => void) {
    const choices = new Map<string, string>();
    for (const row of rows) { choices.set(row.data.image, `${row.data.name} — collection`); choices.set(row.data.heroImage, `${row.data.name} — product`); }
    choices.set(content.data.makerImage, "Current maker image");
    for (const id of ["craftsmanship", "process", "investment"] as const) choices.set(content.data.pages[id].image, `${id} banner`);
    for (const image of media) choices.set(image.path, image.alt);
    return <select aria-label="Choose a library image" value={choices.has(value) ? value : ""} onChange={event => { if (event.target.value) change(event.target.value); }}><option value="">Choose from image library…</option>{Array.from(choices).map(([path, label]) => <option key={path} value={path}>{label}</option>)}</select>;
  }
  function imageSource(path: string) { const item = media.find(image => image.path === path); return item && !preview ? `/api/admin/media/${item.id}` : path; }

  const filtered = rows.filter(row => `${row.data.name} ${row.slug} ${row.status}`.toLowerCase().includes(query.toLowerCase()));
  const published = rows.filter(row => row.status === "published").length;
  const archived = rows.filter(row => row.status === "archived").length;
  const prices = rows.filter(row => row.status === "published").map(row => row.data.priceCents / 100);
  return <div className="cms-shell">
    <aside className="cms-sidebar"><Link className="cms-brand" href="/">J. K. Oliver <span>Website studio</span></Link><nav aria-label="Studio navigation">{tabs.map((item, index) => <button key={item} className={tab === item ? "active" : ""} onClick={() => navigate(item)}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}</nav><div className="cms-sidebar-footer"><span>{email}</span><Link href="/" target="_blank" rel="noreferrer">View website ↗</Link><button onClick={logout}>{preview ? "Back to sign in" : "Sign out"}</button></div></aside>
    <main className="cms-main"><header className="cms-main-header"><div><p className="eyebrow">Website studio</p><h1>{tab}</h1><p>{tab === "Designs" ? "Manage the collection, prices, photos, and publishing." : tab === "Sales" ? "Schedule one offer across the entire collection." : "Keep the website clear, current, and ready for customers."}</p></div><div className="cms-deploy-state"><span className={busy ? "is-busy" : ""} />{busy ? "Working…" : "All changes saved"}{commit && <small>Version {commit.slice(0, 7)}</small>}</div></header>
      {preview && <div className="cms-notice" role="status">Read-only preview. Saving and uploads are disabled until the studio is connected.</div>}
      {tab === "Overview" && <><div className="cms-stats"><article><span>Published</span><strong>{published}</strong><small>live designs</small></article><article><span>Drafts</span><strong>{rows.length - published - archived}</strong><small>in progress</small></article><article><span>Sale</span><strong className="cms-stat-word">{content.data.promotion.enabled ? `${content.data.promotion.percentOff}%` : "Off"}</strong><small>{content.data.promotion.enabled ? "scheduled offer" : "no active campaign"}</small></article></div><section className="cms-overview-grid"><article className="cms-panel cms-overview-primary"><p className="eyebrow">Collection</p><h2>Everything customers can choose.</h2><p>Add a table, adjust a price, update its photography, or remove it from the public collection.</p><button className="cms-primary" onClick={() => navigate("Designs")}>Manage designs <span aria-hidden="true">→</span></button></article><article className="cms-panel cms-overview-secondary"><p className="eyebrow">Next campaign</p><h3>{content.data.promotion.name}</h3><p>{content.data.promotion.enabled ? `${content.data.promotion.percentOff}% off · ${content.data.promotion.startsOn} to ${content.data.promotion.endsOn}` : "No sale is currently scheduled."}</p><button className="cms-secondary" onClick={() => navigate("Sales")}>Plan a sale</button></article></section></>}
      {tab === "Designs" && <div className="cms-editor"><section className="cms-panel cms-design-list"><div className="cms-list-heading"><div><h2>Collection</h2><span>{rows.length} designs · {archived} archived</span></div><button className="cms-primary cms-compact" onClick={() => edit(null)}>+ Add design</button></div><input className="cms-search" aria-label="Search designs" placeholder="Search by name or status…" value={query} onChange={event => setQuery(event.target.value)} />{filtered.map(row => <button className="cms-design-row" aria-pressed={selected?.id === row.id && Boolean(draft)} key={row.id} onClick={() => edit(row)}><img src={imageSource(row.data.image)} alt="" /><span><strong>{row.data.name}</strong><small><i className={`cms-dot ${row.status}`} />{row.status} · ${(row.data.priceCents / 100).toLocaleString()}</small></span><span>→</span></button>)}{!filtered.length && <p>No matching designs.</p>}</section>{draft ? <DesignEditor key={selected?.id || "new"} editorRef={editorRef} draft={draft} existing={Boolean(selected)} change={value => { setDraft(value); setDirty(true); }} save={saveDesign} disabled={busy || preview} imagePicker={imagePicker} imageSource={imageSource} uploadImage={uploadImage} archive={archiveDesign} restore={restoreDesign} /> : <section className="cms-panel cms-empty-state"><span>↗</span><h2>Choose a design</h2><p>Select an existing table to edit it, or add a new design to the collection.</p></section>}</div>}
      {tab === "Sales" && <PromotionEditor content={content.data} update={updateContent} save={saveContent} disabled={busy || preview || !content.updated_at} prices={prices} />}
      {tab === "Pages" && <PageContentEditor content={content.data} update={updateContent} save={saveContent} disabled={busy || preview || !content.updated_at} requestSwitch={requestContentSwitch} imagePicker={imagePicker} imageSource={imageSource} />}
      {tab === "Pricing & FAQs" && <PricingFaqEditor content={content.data} update={updateContent} save={saveContent} disabled={busy || preview || !content.updated_at} requestSwitch={requestContentSwitch} prices={prices} ask={ask} />}
    </main>
    {toast && <div className={`cms-toast ${toast.kind}`} role={toast.kind === "error" ? "alert" : "status"}><span>{toast.kind === "success" ? "✓" : "!"}</span><p>{toast.text}</p><button aria-label="Dismiss message" onClick={() => setToast(null)}>×</button></div>}
    {dialog && <div className="cms-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setDialog(null); }}><section className="cms-modal" role="alertdialog" aria-modal="true" aria-labelledby="cms-dialog-title"><p className="eyebrow">Please confirm</p><h2 id="cms-dialog-title">{dialog.title}</h2><div className="cms-modal-copy">{dialog.body}</div><div className="cms-modal-actions"><button autoFocus className="cms-secondary" onClick={() => setDialog(null)}>Cancel</button><button className={dialog.danger ? "cms-danger" : "cms-primary"} onClick={() => { const action = dialog.action; setDialog(null); void action(); }}>{dialog.confirmLabel}</button></div></section></div>}
  </div>;
}
