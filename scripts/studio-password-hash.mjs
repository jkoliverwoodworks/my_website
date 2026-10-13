// Reads a password from stdin, not command arguments or environment variables.
// This helper never writes a file or connects to a service.
import { randomBytes } from "node:crypto";
import { passwordDigest } from "../lib/studio-security.ts";
let input = "";
for await (const chunk of process.stdin) input += chunk;
const password = input.replace(/\r?\n$/, "");
if (password.length < 16 || password.length > 256) {
  console.error("Use a unique password with 16–256 characters."); process.exit(1);
}
const salt = randomBytes(16).toString("hex");
console.log(`pbkdf2-sha256:600000:${salt}:${await passwordDigest(password, salt)}`);
