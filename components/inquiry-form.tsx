"use client";

import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "sending" | "sent" | "fallback";

export function InquiryForm({ piece = "" }: { piece?: string }) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [draftUrl, setDraftUrl] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      phone: String(values.get("phone") || ""),
      notes: String(values.get("notes") || ""),
      website: String(values.get("website") || ""),
      piece,
    };
    const body = [
      "Hello Jeremy, I’d love to talk about a custom piece.",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "Not provided"}`,
      ...(piece ? [`Inspired by: ${piece}`] : ["Project type: Completely custom commission"]),
      "",
      `Project notes: ${payload.notes || "Let’s talk through the possibilities."}`,
    ].join("\n");

    setState("sending");
    setCopied(false);
    setDraftBody(body);
    setDraftUrl(`mailto:jeremyoliver@att.net?subject=${encodeURIComponent(piece ? `${piece} Inquiry` : "Custom Furniture Project Inquiry")}&body=${encodeURIComponent(body)}`);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Inquiry delivery unavailable");
      setState("sent");
      form.reset();
    } catch {
      setState("fallback");
    }
  }

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(draftBody);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (state === "sent") {
    return <div className="form-success" role="status"><p className="eyebrow">Inquiry sent</p><h3>Thank you. Jeremy has your details.</h3><p>He’ll reply using the email address you provided.</p><button className="text-link" type="button" onClick={() => setState("idle")}>Send another inquiry</button></div>;
  }

  return <form className="inquiry-form" onSubmit={submit} onChange={() => { if (state === "fallback") setState("idle"); }}>
    {piece && <p className="form-piece">Your selected design: <strong>{piece}</strong></p>}
    <div className="form-two"><label>Your name<input required name="name" autoComplete="name" maxLength={100} /></label><label>Email address<input required type="email" name="email" autoComplete="email" maxLength={254} /></label></div>
    <label>Phone number (optional)<input type="tel" name="phone" autoComplete="tel" maxLength={40} /></label>
    <label>What do you have in mind? (optional)<textarea name="notes" rows={5} maxLength={1800} placeholder="Your room, preferred size, wood, timing, or simply the beginning of an idea." /></label>
    <label className="website-field" aria-hidden="true">Website<input name="website" autoComplete="off" tabIndex={-1} /></label>
    <button className="button button-dark" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : piece ? "Request a quote for this design" : "Send inquiry"} <span aria-hidden="true">↗</span></button>
    <p className="form-note">Your details are used only to respond to this project inquiry.</p>
    {state === "fallback" && <div className="form-status" role="alert"><p><strong>The direct send is temporarily unavailable.</strong> Your details are ready to send through your email app instead.</p><p><a href={draftUrl}>Open email draft ↗</a> · <button className="copy-button" type="button" onClick={copyDetails}>{copied ? "Details copied" : "Copy inquiry details"}</button></p></div>}
  </form>;
}
