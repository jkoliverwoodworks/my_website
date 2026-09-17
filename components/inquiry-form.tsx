"use client";
import { FormEvent, useState } from "react";

export function InquiryForm({ piece = "" }: { piece?: string }) {
  const [draftUrl, setDraftUrl] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = [
      "Hello Jeremy, I’d love to talk about a custom piece.", "",
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone") || "Not provided"}`,
      ...(piece ? [`Inspired by: ${piece}`] : []),
      "", `Project notes: ${values.get("notes") || "Let’s talk through the possibilities."}`,
    ].join("\n");
    setDraftBody(body);
    setCopied(false);
    setCopyError(false);
    setDraftUrl(`mailto:jeremyoliver@att.net?subject=${encodeURIComponent("Custom Furniture Project Inquiry")}&body=${encodeURIComponent(body)}`);
  }

  async function copyDetails() {
    try { await navigator.clipboard.writeText(draftBody); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  return <form className="inquiry-form" onSubmit={submit} onChange={() => { if (draftUrl) { setDraftUrl(""); setDraftBody(""); } }}>
    {piece && <p className="form-status">A piece that caught your eye: <strong>{piece}</strong></p>}
    <div className="form-two"><label>Your name<input required name="name" autoComplete="name" maxLength={100} /></label><label>Email address<input required type="email" name="email" autoComplete="email" maxLength={254} /></label></div>
    <label>Phone number (optional)<input type="tel" name="phone" autoComplete="tel" maxLength={40} /></label>
    <label>What do you have in mind? (optional)<textarea name="notes" rows={5} maxLength={1800} placeholder="A table you love, the room it’s for, or simply an idea. We’ll work out the details together." /></label>
    <button className="button button-dark" type="submit">Prepare your inquiry <span aria-hidden="true">↗</span></button>
    <p className="form-note">We’ll prepare an email for you to review and send to Jeremy. Your details are not sent or stored by this website.</p>
    {draftUrl && <div className="form-status" role="status"><p><strong>Your email draft is ready.</strong> Open it in your email app, then press Send there. Your inquiry has not been sent yet.</p><p><a href={draftUrl}>Open email draft ↗</a> · <button className="copy-button" type="button" onClick={copyDetails}>{copied ? "Details copied" : "Copy inquiry details"}</button></p><p>If an email app doesn’t open, email <a href="mailto:jeremyoliver@att.net">jeremyoliver@att.net</a> directly.</p>{copyError && <p>Copying isn’t available in this browser. You can select and copy the draft below.</p>}<details><summary>Review your message</summary><pre className="draft-preview">{draftBody}</pre></details></div>}
  </form>;
}
