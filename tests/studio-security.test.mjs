import test from "node:test";
import assert from "node:assert/strict";
import { passwordDigest, passwordHashValid, checkPassword, createSession, validSession, SESSION_SECONDS } from "../lib/studio-security.ts";
const salt = "1234567890abcdef1234567890abcdef";
const password = "test-only strong password";
const hash = `pbkdf2-sha256:600000:${salt}:${await passwordDigest(password, salt)}`;
const secret = "test-only-session-key-32-characters-long";
test("password hashes validate and reject incorrect passwords", async () => {
  assert.equal(passwordHashValid(hash), true);
  assert.equal(passwordHashValid("plaintext"), false);
  assert.equal(await checkPassword(password, hash), true);
  assert.equal(await checkPassword("incorrect", hash), false);
});
test("sessions reject tampering, expiry, and rotated credentials", async () => {
  const now = 1800000000000; const token = await createSession(secret, hash, now);
  assert.equal(await validSession(token, secret, hash, now), true);
  assert.equal(await validSession(token + "a", secret, hash, now), false);
  assert.equal(await validSession(token, secret, hash, now + SESSION_SECONDS * 1000), false);
  assert.equal(await validSession(token, secret + "changed", hash, now), false);
  assert.equal(await validSession(token, secret, hash + "changed", now), false);
  assert.equal(await validSession(token.replace(/^\d+/, "9999999999"), secret, hash, now), false);
});
