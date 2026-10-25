const encoder = new TextEncoder();
const ITERATIONS = 120000;

function toBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

async function passwordDigest(password, salt) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, key, 256);
  return new Uint8Array(bits);
}

function equalBytes(first, second) {
  if (first.length !== second.length) return false;
  let difference = 0;
  for (let index = 0; index < first.length; index += 1) difference |= first[index] ^ second[index];
  return difference === 0;
}

export async function makeAccountPassword(password) {
  if (!globalThis.crypto?.subtle) throw new Error("Secure browser crypto is unavailable. Open CineMood on localhost or HTTPS.");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await passwordDigest(password, salt);
  return { salt: toBase64(salt), passwordHash: toBase64(hash) };
}

export async function checkAccountPassword(password, saltText, hashText) {
  if (!globalThis.crypto?.subtle) throw new Error("Secure browser crypto is unavailable. Open CineMood on localhost or HTTPS.");
  const salt = Uint8Array.from(atob(saltText), (character) => character.charCodeAt(0));
  const expected = Uint8Array.from(atob(hashText), (character) => character.charCodeAt(0));
  return equalBytes(await passwordDigest(password, salt), expected);
}
