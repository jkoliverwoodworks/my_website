"use client";
import { useState, type FormEvent, type ReactNode, type Ref } from "react";
import Link from "next/link";
import { designSchema, promotionIsActive, type Design, type SiteContent } from "@/lib/cms-model";
import { formatPrice } from "@/lib/pieces";
import { biographyLabels, pageTabs, pricingLabels, type PageTab } from "@/lib/studio-editor-model";

export function EditorTabs({ id, label, items, value, change }: {
  id: string; label: string; items: readonly { id: string; label: string }[]; value: string; change: (value: string) => void;
}) {
  return <div className="cms-tabs" role="tablist" aria-label={label}>
    {items.map((item, index) => <button key={item.id} id={`${id}-tab-${item.id}`} type="button" role="tab"
      aria-selected={value === item.id} aria-controls={`${id}-panel-${item.id}`}
      tabIndex={value === item.id ? 0 : -1} onClick={() => change(item.id)}
      onKeyDown={event => {
        const next = event.key === "ArrowRight" ? (index + 1) % items.length : event.key === "ArrowLeft" ? (index + items.length - 1) % items.length : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
        if (next < 0) return;
        event.preventDefault(); change(items[next].id);
        document.getElementById(`${id}-tab-${items[next].id}`)?.focus();
      }}
    >{item.label}</button>)}
  </div>;
}
function Panel({ group, value, children }: { group: string; value: string; children: ReactNode }) {
  return <section role="tabpanel" id={`${group}-panel-${value}`} aria-labelledby={`${group}-tab-${value}`} className="cms-tab-panel">{children}</section>;
}
function CopyField({ label, value, change, rows = 3 }: { label: string; value: string; change: (value: string) => void; rows?: number }) {
  return <label>{label}<textarea aria-label={label} rows={rows} value={value} onChange={event => change(event.target.value)} /></label>;
}
type ImagePicker = (value: string, change: (path: string) => void) => ReactNode;
export function PageContentEditor({ content, update, save, disabled, requestSwitch, imagePicker, imageSource }: {
  content: SiteContent; update: (value: Partial<SiteContent>) => void; save: (event: FormEvent) => void; disabled: boolean;
  requestSwitch: (action: () => void) => void; imagePicker: ImagePicker; imageSource: (path: string) => string;
}) {
  const [page, setPage] = useState<PageTab>("home");
  const config = pageTabs.find(item => item.id === page)!;
  const paragraph = (key: "homeIntroduction" | "homeOffering" | "collectionIntroduction" | "collectionGuidance" | "makerIntroduction", label: string) =>
    <CopyField label={label} value={content[key]} change={value => update({ [key]: value })} />;
  function pageField<T extends keyof SiteContent["pages"]>(id: T, key: keyof SiteContent["pages"][T], label: string) {
    return <CopyField label={label} value={String(content.pages[id][key])} change={value => update({ pages: { ...content.pages, [id]: { ...content.pages[id], [key]: value } } })} />;
  }
  function pageImage(id: "craftsmanship" | "process" | "investment") {
    return <div className="cms-image-field"><h4>Banner photo</h4>{imagePicker(content.pages[id].image, image => update({ pages: { ...content.pages, [id]: { ...content.pages[id], image } } }))}</div>;
  }
  const intro = page === "home" ? content.homeIntroduction : page === "work" ? content.collectionIntroduction : page === "maker" ? content.makerIntroduction : content.pages[page].introduction;
  const image = page === "maker" ? content.makerImage : page === "craftsmanship" || page === "process" || page === "investment" ? content.pages[page].image : undefined;
  return <div>
    <EditorTabs id="page" label="Website pages" items={pageTabs} value={page} change={value => { if (value !== page) requestSwitch(() => setPage(value as PageTab)); }} />
    <Panel group="page" value={page}>
      <div className="cms-page-heading"><div><p className="eyebrow">{config.path}</p><h2>{config.label} page</h2></div><Link href={config.path} target="_blank" rel="noreferrer">View live page ↗</Link></div>
      <div className="cms-page-editor">
        <aside className="cms-panel cms-content-demo"><p className="eyebrow">Content preview · not the full page</p>{image && <img src={imageSource(image)} alt={`${config.label} banner preview`} />}<h3>{config.section}</h3><p>{intro}</p>{page === "work" && <p>{content.collectionGuidance}</p>}{page === "home" && <p>{content.homeOffering}</p>}{page === "maker" && <p>{content.makerBiography[0]}</p>}</aside>
        <form className="cms-panel cms-form" onSubmit={save}>
          <h3>Important page content</h3><p>Only this page’s key copy and images. The layout stays protected.</p>
          {page === "home" && <>{paragraph("homeIntroduction", "A place to gather — introduction")}{paragraph("homeOffering", "Semi-custom & completely custom tables")}</>}
          {page === "work" && <>{paragraph("collectionIntroduction", "The Hill Country Collection — introduction")}{paragraph("collectionGuidance", "Choose a design — customer guidance")}<p>Customer guidance also appears beneath the homepage collection.</p><p>Table names, prices, and photos are edited under Designs. Standard pricing is edited under Pricing & FAQs.</p></>}
          {page === "maker" && <>{paragraph("makerIntroduction", "Family is the reason why — introduction")}<h4>Maker & family photo</h4>{imagePicker(content.makerImage, makerImage => update({ makerImage }))}<h4>A different path. The same pair of hands.</h4>{content.makerBiography.map((value, index) => <CopyField key={index} label={biographyLabels[index] || "More of Jeremy’s story"} value={value} change={value => update({ makerBiography: content.makerBiography.map((text, i) => i === index ? value : text) })} />)}</>}
          {page === "craftsmanship" && <>{pageField("craftsmanship", "introduction", "Built with purpose — banner introduction")}{pageImage("craftsmanship")}{pageField("craftsmanship", "materials", "It begins with the wood — natural character")}{pageField("craftsmanship", "choosingWood", "Choosing the wood for your home")}</>}
          {page === "process" && <>{pageField("process", "introduction", "Your idea, shaped with confidence — introduction")}{pageImage("process")}{pageField("process", "approach", "A personal process — working with Jeremy")}{pageField("process", "offering", "Semi-custom or completely custom — getting started")}</>}
          {page === "investment" && <>{pageField("investment", "introduction", "A clear starting point — introduction")}{pageImage("investment")}<p>Standard pricing details and questions have their own Pricing & FAQs editor. Starting prices are edited per table in Designs.</p></>}
          {page === "contact" && <>{pageField("contact", "introduction", "Let’s make room for your story — introduction")}{pageField("contact", "inquiryGuidance", "Tell Jeremy a little — inquiry guidance")}<p>Inquiry fields and email delivery settings stay protected.</p></>}
          <div className="cms-save-bar"><button className="cms-primary" disabled={disabled}>Save & publish {config.label} content</button></div>
        </form>
      </div>
    </Panel>
  </div>;
}

export function PricingFaqEditor({ content, update, save, disabled, requestSwitch, prices, ask }: {
  content: SiteContent; update: (value: Partial<SiteContent>) => void; save: (event: FormEvent) => void;
  disabled: boolean; requestSwitch: (action: () => void) => void; prices: number[];
  ask: (value: { title: string; body: ReactNode; confirmLabel: string; danger?: boolean; action: () => void }) => void;
}) {
  const [section, setSection] = useState("pricing");
  const [question, setQuestion] = useState(0);
  const faq = content.faqs[question];
  function changeFaq(key: "question" | "answer", value: string) {
    update({ faqs: content.faqs.map((item, index) => index === question ? { ...item, [key]: value } : item) });
  }
  return <div>
    <EditorTabs id="planning" label="Pricing and FAQ editing sections" items={[{ id: "pricing", label: "Pricing" }, { id: "faqs", label: "FAQs" }]} value={section} change={value => { if (value !== section) requestSwitch(() => { setSection(value); setQuestion(0); }); }} />
    <Panel group="planning" value={section}>
      <div className="cms-page-editor">
        <aside className="cms-panel cms-content-demo">
          <p className="eyebrow">{section === "pricing" ? "Pricing preview" : "FAQ preview"}</p>
          {section === "pricing" ? <><h3>Standard pricing includes</h3><p>{prices.length ? `Collection prices: $${Math.min(...prices).toLocaleString()}–$${Math.max(...prices).toLocaleString()}` : "No published designs yet."}</p><ul><li>Rectangular: {content.pricing.rectangular}</li><li>Round: {content.pricing.round}</li><li>{content.pricing.woods}</li><li>{content.pricing.construction} construction</li><li>{content.pricing.base}</li><li>{content.pricing.upgrade}</li></ul><p>{content.pricing.custom}</p></> : <><h3>Good questions.<br />Straight answers.</h3>{faq ? <details open><summary>{faq.question || "Your question"}</summary><p>{faq.answer || "Your answer will appear here."}</p></details> : <p>Add a question to see its preview.</p>}</>}
        </aside>
        <form className="cms-panel cms-form" onSubmit={save}>
          {section === "pricing" ? <><h3>Standard configurations</h3><p>Individual table prices belong in Designs. These details explain what those starting prices include.</p>{(Object.keys(pricingLabels) as (keyof typeof pricingLabels)[]).map(key => <CopyField key={key} rows={2} label={pricingLabels[key]} value={content.pricing[key]} change={value => update({ pricing: { ...content.pricing, [key]: value } })} />)}</> : <><h3>Frequently asked questions</h3><p>Choose a question to edit its answer. The collection price-range question is generated automatically.</p><label>Choose a question<select value={question} onChange={event => setQuestion(Number(event.target.value))}>{content.faqs.map((item, index) => <option key={index} value={index}>{item.question || "New question"}</option>)}</select></label>{faq && <><label>Question<input value={faq.question} onChange={event => changeFaq("question", event.target.value)} /></label><CopyField label="Answer" rows={5} value={faq.answer} change={value => changeFaq("answer", value)} /><button type="button" className="cms-danger-link" onClick={() => ask({ title: "Remove this question?", body: "The question will be removed from the website when you save the FAQ section.", confirmLabel: "Remove question", danger: true, action: () => { update({ faqs: content.faqs.filter((_, index) => index !== question) }); setQuestion(Math.max(0, question - 1)); } })}>Remove selected question</button></>}<button type="button" disabled={content.faqs.length >= 30} onClick={() => { setQuestion(content.faqs.length); update({ faqs: [...content.faqs, { question: "", answer: "" }] }); }}>+ Add question</button></>}
          <div className="cms-save-bar"><button className="cms-primary" disabled={disabled}>Save & publish {section === "pricing" ? "pricing" : "FAQs"}</button></div>
        </form>
      </div>
    </Panel>
  </div>;
}

export function PromotionEditor({ content, update, save, disabled, prices }: {
  content: SiteContent; update: (value: Partial<SiteContent>) => void; save: (event: FormEvent) => void;
  disabled: boolean; prices: number[];
}) {
  const promotion = content.promotion;
  const active = promotionIsActive(promotion);
  const sample = prices[0] || 2895;
  const setPromotion = (patch: Partial<typeof promotion>) => update({ promotion: { ...promotion, ...patch } });
  return <div className="cms-promotion-layout">
    <section className="cms-panel cms-promotion-preview">
      <div className="cms-preview-browser"><span /><span /><span /></div>
      <div className="cms-sale-preview-bar"><strong>{promotion.percentOff}% off</strong><span>{promotion.name}</span></div>
      <div className="cms-sale-preview-card"><p className="eyebrow">Live website preview</p><h2>{promotion.name}</h2><p>{promotion.message}</p><div className="cms-sale-price"><del>{formatPrice(sample)}</del><ins>{formatPrice(Math.round(sample * (100 - promotion.percentOff) / 100))}</ins></div></div>
      <p className="cms-preview-note">{promotion.enabled ? active ? "This promotion is live now." : `Scheduled for ${promotion.startsOn} through ${promotion.endsOn}.` : "This promotion is turned off."}</p>
    </section>
    <form className="cms-panel cms-form" onSubmit={save}>
      <div className="cms-editor-heading"><div><p className="eyebrow">Monthly campaign</p><h2>Sale settings</h2></div><span className={`cms-status${active ? " is-live" : ""}`}>{active ? "Live" : promotion.enabled ? "Scheduled" : "Off"}</span></div>
      <p>Set one promotion here and the site updates every collection price automatically. Original prices remain visible beside sale prices.</p>
      <label className="cms-switch"><input type="checkbox" checked={promotion.enabled} onChange={event => setPromotion({ enabled: event.target.checked })} /><span>Promotion enabled</span></label>
      <div className="cms-field-grid"><label>Campaign name<input value={promotion.name} maxLength={80} onChange={event => setPromotion({ name: event.target.value })} /></label><label>Percentage off<input type="number" min="1" max="90" step="1" value={promotion.percentOff} onChange={event => setPromotion({ percentOff: Number(event.target.value) })} /></label></div>
      <label>Short website message<input value={promotion.message} maxLength={180} onChange={event => setPromotion({ message: event.target.value })} /></label>
      <div className="cms-field-grid"><label>Starts on<input type="date" value={promotion.startsOn} onChange={event => setPromotion({ startsOn: event.target.value })} /></label><label>Ends on<input type="date" value={promotion.endsOn} onChange={event => setPromotion({ endsOn: event.target.value })} /></label></div>
      <div className="cms-callout"><strong>One update, every design.</strong><span>The promotion applies to all published table designs, including homepage, collection, product, and pricing pages.</span></div>
      <div className="cms-save-bar"><button className="cms-primary" disabled={disabled}>Save promotion</button><small>The dates automatically control when visitors see the offer.</small></div>
    </form>
  </div>;
}
const designTabs = [
  { id: "essentials", label: "Essentials" }, { id: "images", label: "Images" },
  { id: "details", label: "Details & SEO" }, { id: "publishing", label: "Publishing" },
];
export function DesignEditor({ draft, existing, change, save, disabled, imagePicker, imageSource, editorRef, uploadImage, archive, restore }: {
  draft: Design; existing: boolean; change: (value: Design) => void; save: (event: FormEvent) => void;
  disabled: boolean; imagePicker: ImagePicker; imageSource: (path: string) => string; editorRef: Ref<HTMLFormElement>;
  uploadImage: (file: File, alt: string) => Promise<string>; archive: () => void; restore: () => void;
}) {
  const [section, setSection] = useState("essentials");
  const [validation, setValidation] = useState("");
  const [uploadTarget, setUploadTarget] = useState<"image" | "heroImage">("image");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState(draft.imageAlt);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const text = (key: "name" | "slug" | "standardSize" | "base" | "imageAlt" | "seoTitle" | "seoDescription", label: string, readOnly = false) =>
    <label>{label}<input aria-label={label} value={draft[key]} readOnly={readOnly} onChange={event => change({ ...draft, [key]: event.target.value })} /></label>;
  const number = (key: "heroWidth" | "heroHeight" | "position", label: string) =>
    <label>{label}<input aria-label={label} type="number" min={key === "position" ? 0 : 1} step="1" value={draft[key]} onChange={event => change({ ...draft, [key]: Number(event.target.value) })} /></label>;
  function submit(event: FormEvent) {
    const parsed = designSchema.safeParse(draft);
    if (!parsed.success) {
      event.preventDefault(); const issue = parsed.error.issues[0]; const key = String(issue.path[0]);
      setSection(["name", "slug", "description", "priceCents"].includes(key) ? "essentials" : ["image", "heroImage", "imageAlt", "heroWidth", "heroHeight"].includes(key) ? "images" : ["position", "featured", "status"].includes(key) ? "publishing" : "details");
      setValidation(issue.message); return;
    }
    setValidation(""); save(event);
  }
  async function upload() {
    if (!uploadFile || !uploadAlt.trim()) { setUploadError("Choose a photo and add a short image description."); return; }
    setUploading(true); setUploadError("");
    try {
      const path = await uploadImage(uploadFile, uploadAlt.trim());
      change({ ...draft, [uploadTarget]: path, imageAlt: uploadAlt.trim() });
      setUploadFile(null);
    } catch (error) { setUploadError(error instanceof Error ? error.message : "Image upload failed."); }
    finally { setUploading(false); }
  }
  return <form ref={editorRef} className="cms-panel cms-form" onSubmit={submit} noValidate>
    <div className="cms-editor-heading"><div><p className="eyebrow">{existing ? "Edit your collection" : "Create a design"}</p><h2>{draft.name || "New design"}</h2></div><span className="cms-status">{draft.status}</span></div>
    <div className="cms-design-preview cms-design-preview-compact"><img src={imageSource(draft.image)} alt={draft.imageAlt} /><div><span>{draft.shape} table</span><strong>From ${(draft.priceCents / 100).toLocaleString()}</strong><small>Changes stay in this editor until you save.</small></div></div>
    <EditorTabs id="design" label="Design editing sections" items={designTabs} value={section} change={setSection} />
    {validation && <p className="cms-error cms-notice" role="alert">{validation}</p>}
    <Panel group="design" value={section}>
      {section === "essentials" && <><h3>The essentials</h3><p>The name, starting price, and story customers see first.</p><div className="cms-field-grid">{text("name", "Design name")}<label>Starting price (USD)<input aria-label="Starting price (USD)" type="number" step=".01" min="1" value={draft.priceCents / 100} onChange={event => change({ ...draft, priceCents: Math.round(Number(event.target.value) * 100) })} /></label></div><CopyField label="Design description" value={draft.description} change={description => change({ ...draft, description })} rows={5} />{!existing && <>{text("slug", "Design URL slug")}<p>Use lowercase words separated by hyphens. The URL is locked after creation.</p></>}</>}
      {section === "images" && <><h3>Photos of the piece</h3><p>Upload a new photo here or choose one already in the library.</p><div className="cms-image-upload"><div><strong>Add a new image</strong><span>JPEG, PNG or WebP · optimized automatically</span></div><label>Use as<select value={uploadTarget} onChange={event => setUploadTarget(event.target.value as "image" | "heroImage")}><option value="image">Collection card photo</option><option value="heroImage">Product page photo</option></select></label><label>Photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setUploadFile(event.target.files?.[0] || null)} /></label><label>Image description<input value={uploadAlt} maxLength={250} onChange={event => setUploadAlt(event.target.value)} /></label>{uploadError && <p className="cms-field-error" role="alert">{uploadError}</p>}<button type="button" className="cms-secondary" disabled={disabled || uploading} onClick={upload}>{uploading ? "Preparing photo…" : "Upload and use photo"}</button></div>{(["image", "heroImage"] as const).map(key => <div className="cms-image-field" key={key}><h4>{key === "image" ? "Collection card photo" : "Product page photo"}</h4><img src={imageSource(draft[key])} alt={draft.imageAlt} />{imagePicker(draft[key], path => change({ ...draft, [key]: path }))}<details><summary>Advanced: image path</summary><input aria-label={key === "image" ? "Collection image path" : "Product image path"} value={draft[key]} onChange={event => change({ ...draft, [key]: event.target.value })} /></details></div>)}{text("imageAlt", "Image description for accessibility")}<details className="cms-advanced"><summary>Advanced: product image dimensions</summary><div className="cms-field-grid">{number("heroWidth", "Image width (pixels)")}{number("heroHeight", "Image height (pixels)")}</div></details></>}
      {section === "details" && <><h3>Dimensions & materials</h3><label>Table shape<select value={draft.shape} onChange={event => change({ ...draft, shape: event.target.value as Design["shape"] })}><option>Round</option><option>Rectangular</option></select></label>{text("standardSize", "Standard dimensions")}{text("base", "Base description")}<details className="cms-advanced"><summary>Search engine details & protected URL</summary>{text("seoTitle", "SEO title (optional)")}{text("seoDescription", "SEO description (optional)")}{existing && text("slug", "Design URL slug (locked)", true)}</details></>}
      {section === "publishing" && <><h3>Where this design appears</h3><label>Publication status<select value={draft.status} onChange={event => change({ ...draft, status: event.target.value as Design["status"] })}><option value="draft">Draft — hidden from the website</option><option value="published">Published — visible after deployment</option><option value="archived">Archived — hidden and recoverable</option></select></label><label className="cms-checkbox"><input type="checkbox" checked={draft.featured} onChange={event => change({ ...draft, featured: event.target.checked })} />Feature in the homepage collection</label>{number("position", "Collection order (lowest first)")}<p>The first three featured designs by collection order appear on the homepage. Archiving keeps the design recoverable.</p></>}
    </Panel>
    <div className="cms-save-bar"><button className="cms-primary" disabled={disabled}>Review & save</button>{existing && draft.status !== "archived" && <button type="button" className="cms-danger-link" disabled={disabled} onClick={archive}>Remove from website</button>}{existing && draft.status === "archived" && <button type="button" className="cms-secondary" disabled={disabled} onClick={restore}>Restore as draft</button>}<small>Saves all four design tabs together.</small></div>
  </form>;
}
