export const SESSION_SECONDS = 8 * 60 * 60;
const encoder = new TextEncoder();
function hex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}
export function passwordHashValid(hash: string) {
  return /^pbkdf2-sha256:600000:[a-f0-9]{32}:[a-f0-9]{64}$/.test(hash);
}
export async function passwordDigest(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(salt), iterations: 600000 }, key, 256));
}
export async function checkPassword(password: string, hash: string) {
  if (!passwordHashValid(hash)) return false;
  const [, , salt, expected] = hash.split(":");
  const actual = await passwordDigest(password, salt);
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
  return mismatch === 0;
}
async function signingKey(secret: string, hash: string) {
  return crypto.subtle.importKey("raw", encoder.encode(`${secret}:${hash}`), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function createSession(secret: string, hash: string, now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + SESSION_SECONDS}.${crypto.randomUUID()}`;
  const signature = await crypto.subtle.sign("HMAC", await signingKey(secret, hash), encoder.encode(payload));
  return `${payload}.${hex(signature)}`;
}
export async function validSession(token: string, secret: string, hash: string, now = Date.now()) {
  const match = /^(\d{10})\.([a-f0-9-]{36})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const expiry = Number(match[1]);
  const seconds = Math.floor(now / 1000);
  if (expiry <= seconds || expiry > seconds + SESSION_SECONDS) return false;
  const bytes = Uint8Array.from(match[3].match(/../g)!, pair => parseInt(pair, 16));
  return crypto.subtle.verify("HMAC", await signingKey(secret, hash), bytes, encoder.encode(`${match[1]}.${match[2]}`));
}
