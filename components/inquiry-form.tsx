"use client";
import { FormEvent, useState } from "react";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = ["New J. K. Oliver Woodworks project inquiry", "", `Name: ${values.get("name")}`, `Email: ${values.get("email")}`, `Phone: ${values.get("phone") || "Not provided"}`, `Location: ${values.get("location") || "Not provided"}`, `Project: ${values.get("project")}`, `Timing: ${values.get("timing")}`, "", `Project notes: ${values.get("notes") || "Not provided"}`].join("\n");
    window.location.href = `mailto:jeremyoliver@att.net?subject=${encodeURIComponent("Custom Furniture Project Inquiry")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }
  if (submitted) return <div className="form-success"><p className="eyebrow">Thank you</p><h2>Your story is a great place to begin.</h2><p>We’ll be in touch soon to learn more about your space and what you have in mind.</p></div>;
  return <form className="inquiry-form" onSubmit={submit}><div className="form-two"><label>Your name<input required name="name" autoComplete="name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" /></label></div><div className="form-two"><label>Phone number<input type="tel" name="phone" autoComplete="tel" /></label><label>Where is your home?<input name="location" placeholder="City or neighborhood" /></label></div><div className="form-two"><label>What are you considering?<select name="project"><option>Dining table</option><option>Custom furniture</option><option>Built-in or cabinetry</option><option>Not sure yet</option></select></label><label>Ideal timing<select name="timing"><option>Just exploring</option><option>Within 3 months</option><option>3–6 months</option><option>More than 6 months</option></select></label></div><label>Tell us about your project<textarea name="notes" rows={5} placeholder="Dimensions, inspiration, your family, your room—anything that will help us begin." /></label><button className="button button-dark" type="submit">Compose your inquiry <span>→</span></button><p className="form-note">Submitting opens a pre-filled email to Jeremy with your project details.</p></form>;
}
