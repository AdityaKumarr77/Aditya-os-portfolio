// Injects a server-rendered snapshot of the app into the built index.html.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { renderHeadersFile, SECURITY_HEADERS } from "./security.mjs";

const root = process.cwd();
const indexPath = path.join(root, "dist", "index.html");
const headersPath = path.join(root, "dist", "_headers");
const serverEntryPath = path.join(root, "dist-ssr", "entry-server.js");

const template = await readFile(indexPath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();

const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Could not find "${marker}" in ${indexPath}`);
}

const html = template.replace(marker, `<div id="root">${appHtml}</div>`);

// --- Head validation -------------------------------------------------------
// Fail the build instead of silently shipping a page missing core metadata.
const REQUIRED_HEAD = [
  ['<meta charset="UTF-8" />', "charset"],
  ['name="viewport"', "viewport"],
  ["<title>", "title"],
  ['name="description"', "description"],
  ['rel="canonical"', "canonical"],
  ['property="og:title"', "og:title"],
  ['name="twitter:card"', "twitter:card"],
  ['rel="manifest"', "manifest"],
  ['rel="apple-touch-icon"', "apple-touch-icon"],
  ['http-equiv="Content-Security-Policy"', "content-security-policy"],
  ['type="application/ld+json"', "json-ld"],
];

for (const [needle, label] of REQUIRED_HEAD) {
  if (!html.includes(needle)) {
    throw new Error(`Head validation failed: missing ${label} (${needle})`);
  }
}

// Every JSON-LD block must be valid JSON and declare a @context.
const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (jsonLdBlocks.length === 0) {
  throw new Error("Head validation failed: no JSON-LD block found");
}
for (const [, body] of jsonLdBlocks) {
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch (error) {
    throw new Error(`Head validation failed: JSON-LD does not parse (${error.message})`);
  }
  if (!parsed["@context"]) {
    throw new Error('Head validation failed: JSON-LD is missing "@context"');
  }
}

// --- Vercel header parity --------------------------------------------------
// Vercel reads `vercel.json` before the build runs, so it cannot be generated
// here. Fail the build if its headers drift from `scripts/security.mjs`.
const vercelPath = path.join(root, "vercel.json");
try {
  const vercel = JSON.parse(await readFile(vercelPath, "utf8"));
  const entry = (vercel.headers ?? []).find((header) => header.source === "/(.*)");
  const configured = new Map((entry?.headers ?? []).map(({ key, value }) => [key, value]));
  for (const [key, value] of SECURITY_HEADERS) {
    if (configured.get(key) !== value) {
      throw new Error(`vercel.json drift: "${key}" does not match scripts/security.mjs`);
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

await writeFile(indexPath, html);
await writeFile(headersPath, renderHeadersFile());

console.log(`Prerendered ${appHtml.length.toLocaleString()} characters into dist/index.html`);
console.log(`Wrote security headers to dist/_headers`);
