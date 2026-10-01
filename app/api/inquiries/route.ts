const limits = { name: 100, email: 254, phone: 40, piece: 100, notes: 1800 } as const;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character);
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(input.website, 200)) return Response.json({ ok: true });

  const name = clean(input.name, limits.name);
  const email = clean(input.email, limits.email);
  const phone = clean(input.phone, limits.phone);
  const piece = clean(input.piece, limits.piece);
  const notes = clean(input.notes, limits.notes);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please provide a valid name and email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || "jeremyoliver@att.net";
  if (!apiKey || !from) {
    return Response.json({ error: "Direct inquiry delivery is not configured." }, { status: 503 });
  }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone || "Not provided"), piece: escapeHtml(piece || "Completely custom commission"), notes: escapeHtml(notes || "No additional notes provided.") };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: piece ? `${piece} inquiry from ${name}` : `Custom furniture inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nProject: ${piece || "Completely custom commission"}\n\n${notes || "No additional notes provided."}`,
      html: `<h2>New website inquiry</h2><p><strong>Name:</strong> ${safe.name}<br><strong>Email:</strong> ${safe.email}<br><strong>Phone:</strong> ${safe.phone}<br><strong>Project:</strong> ${safe.piece}</p><p><strong>Notes</strong><br>${safe.notes.replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Inquiry delivery failed." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
