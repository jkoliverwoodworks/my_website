"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
export function AdminLogin({ configured }: { configured: boolean }) {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const values = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: values.get("password") }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error);
      window.location.assign("/studio");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to sign in."); setBusy(false); }
  }
  return <main className="cms-login"><Link className="cms-brand" href="/">J. K. Oliver <span>Woodworks</span></Link><p className="eyebrow">The website studio</p><h1>A little care.<br /><em>A lasting impression.</em></h1><p>Manage the collection, images, and the stories behind your work.</p>{!configured ? <aside role="status" className="cms-notice"><strong>Your studio is ready to connect.</strong><p>Connect the private GitHub repository and set the owner’s password to enable editing. No database subscription is needed. Setup instructions are in docs/cms-setup.md.</p><Link href="/studio/preview">Preview the studio design ↗</Link></aside> : <form onSubmit={submit}><label>Password<div className="cms-password"><input name="password" type={visible ? "text" : "password"} autoComplete="current-password" required /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Hide password" : "Show password"}>{visible ? "Hide" : "Show"}</button></div></label>{error && <p role="alert">{error}</p>}<button className="cms-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in to the studio ↗"}</button></form>}<Link href="/">← Back to the website</Link></main>;
}
