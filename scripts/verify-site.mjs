import assert from "node:assert/strict";

const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://jk-oliver-woodworks.andres-urreg-3756.chatgpt.site";
const routes = ["/", "/work", "/craftsmanship", "/process", "/maker", "/investment", "/contact", ...["elm", "lineage", "foundry", "cypress", "hearth", "gathering"].map(slug => `/work/${slug}`)];
const titles = new Set();
const assets = new Set(["/og.png", "/favicon.svg", "/cormorant-regular.ttf", "/cormorant-italic.ttf", "/dm-sans.ttf", "/inter.ttf", "/woodworks-hero.mp4"]);

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}
function meta(html, name) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]));
  return tags.find((tag) => tag.name === name || tag.property === name)?.content;
}

for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, route + " title");
  assert.ok(!titles.has(title), route + " unique title");
  titles.add(title);
  assert.ok(meta(html, "description")?.length > 50, route + " description");
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0])).find((tag) => tag.rel === "canonical")?.href;
  assert.equal(canonical, expectedOrigin + (route === "/" ? "" : route), route + " canonical");
  assert.equal(meta(html, "og:url"), canonical, route + " OG URL");
  assert.equal(meta(html, "og:title"), title, route + " OG title");
  assert.equal(meta(html, "twitter:card"), "summary_large_image", route + " Twitter card");
  assert.equal(meta(html, "og:image"), expectedOrigin + "/og.png", route + " OG image");
  assert.equal(meta(html, "twitter:image"), expectedOrigin + "/og.png", route + " Twitter image");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, route + " single H1");
  assert.match(html, /<main id="main-content"/, route + " main landmark");
  const json = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(json.some((schema) => schema["@type"] === "FurnitureStore" && schema.url === expectedOrigin), route + " business schema");
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const attr = attributes(match[0]);
    assert.ok(Object.hasOwn(attr, "alt"), route + " image alt");
    assert.ok(attr.width && attr.height, route + " image dimensions");
    if (attr.src?.startsWith("/")) assets.add(attr.src);
  }
  console.log("PASS", route, "— metadata, social cards, headings, schema and image attributes");
}

const sitemapResponse = await fetch(base + "/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(urls.sort(), routes.map((route) => expectedOrigin + (route === "/" ? "" : route)).sort());
const robotsResponse = await fetch(base + "/robots.txt");
assert.equal(robotsResponse.status, 200);
assert.match(await robotsResponse.text(), new RegExp("Sitemap: " + expectedOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/sitemap.xml"));
console.log("PASS sitemap.xml and robots.txt — all 13 canonical URLs");

for (const asset of assets) {
  const response = await fetch(base + asset);
  assert.equal(response.status, 200, asset);
  assert.ok(!response.headers.get("content-type")?.includes("text/html"), asset + " content type");
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.ok(bytes.length > 50, asset + " nonempty");
  if (asset === "/og.png") assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
}
console.log("PASS", assets.size, "image and font assets, including a valid PNG social card");

const missing = await fetch(base + "/this-page-does-not-exist");
assert.equal(missing.status, 404, "missing page status");
assert.match(await missing.text(), /Let’s find your way home/);
console.log("PASS custom 404");
