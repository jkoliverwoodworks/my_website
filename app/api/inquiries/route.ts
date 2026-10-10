import { EmailGatewayError, readGatewayConfig, sendViaGateway } from "@/lib/email-gateway";

const limits = { name: 100, email: 254, phone: 40, piece: 100, notes: 1800 } as const;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function singleLine(value: unknown, maxLength: number) {
  return clean(value, maxLength).replace(/[\r\n\t]+/g, " ");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character);
}

const json = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid request." }, 400);
    input = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // A filled honeypot is answered as a success so bots get no useful signal.
  if (clean(input.website, 200)) return json({ ok: true });

  const name = singleLine(input.name, limits.name);
  const email = singleLine(input.email, limits.email);
  const phone = singleLine(input.phone, limits.phone);
  const piece = singleLine(input.piece, limits.piece);
  const notes = clean(input.notes, limits.notes);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please provide a valid name and email address." }, 400);
  }

  const gateway = readGatewayConfig();
  if ("missing" in gateway) {
    console.error(`Inquiry email is not configured. Missing: ${gateway.missing.join(", ")}`);
    return json({ error: "Direct inquiry delivery is not configured." }, 503);
  }

  const project = piece || "Completely custom commission";
  const sentAt = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" });
  const subject = piece ? `${piece} inquiry from ${name}` : `Custom furniture inquiry from ${name}`;
  const text = [
    "New website inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Project: ${project}`,
    "",
    "Notes:",
    notes || "No additional notes provided.",
    "",
    `Submitted: ${sentAt} CT`,
  ].join("\n");

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Project", project],
    ["Submitted", `${sentAt} CT`],
  ]
    .map(([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#76614f;font-size:12px;text-transform:uppercase;letter-spacing:.12em;vertical-align:top;white-space:nowrap">${label}</td>
          <td style="padding:8px 0;color:#33271f;font-size:15px;line-height:1.5">${escapeHtml(value)}</td>
        </tr>`)
    .join("");

  // The gateway sends from the shop's own mailbox, so the visitor's address is
  // surfaced as a one-click reply link rather than a Reply-To header.
  const html = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:32px 16px;background:#f6f3ed;font-family:Arial,sans-serif;color:#33271f">
        <div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border-top:5px solid #92593d">
          <p style="margin:0 0 8px;color:#92593d;font-size:11px;text-transform:uppercase;letter-spacing:.18em">JK Oliver Woodworks</p>
          <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:30px;font-weight:400">New website inquiry</h1>
          <table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table>
          <div style="margin-top:24px;padding:20px;background:#ece6dc">
            <p style="margin:0 0 10px;color:#76614f;font-size:12px;text-transform:uppercase;letter-spacing:.12em">Notes</p>
            <p style="margin:0;color:#33271f;font-size:15px;line-height:1.65;white-space:pre-wrap">${escapeHtml(notes || "No additional notes provided.")}</p>
          </div>
          <p style="margin:24px 0 0"><a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;padding:12px 20px;background:#33271f;color:#fff;text-decoration:none;font-size:14px">Reply to ${escapeHtml(name)}</a></p>
        </div>
      </body>
    </html>`;

  try {
    await sendViaGateway(gateway.config, { subject, html, text });
    return json({ ok: true });
  } catch (error) {
    if (error instanceof EmailGatewayError) console.error("Inquiry email gateway rejected the request:", error.message);
    else console.error("Inquiry email could not be sent:", error);
    return json({ error: "Inquiry delivery failed." }, 502);
  }
}
