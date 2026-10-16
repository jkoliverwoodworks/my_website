import test from "node:test";
import assert from "node:assert/strict";
import { initialDesigns, defaultContent, designSchema, contentSchema, publicPiece, imageType, promotionIsActive, promotionalPrice } from "../lib/cms-model.ts";
import { pageTabs, biographyLabels } from "../lib/studio-editor-model.ts";
test("page tabs cover each editable website page with recognizable biography labels", () => {
  assert.deepEqual(pageTabs.map(page => page.path), ["/", "/work", "/maker", "/craftsmanship", "/process", "/investment", "/contact"]);
  assert.equal(new Set(pageTabs.map(page => page.id)).size, 7);
  assert.equal(biographyLabels.length, 3);
  assert.ok(biographyLabels.every(label => !/paragraph/i.test(label)));
});
test("older content snapshots gain page defaults without losing existing edits", () => {
  const { pages, promotion, ...legacy } = defaultContent;
  const parsed = contentSchema.parse({ ...legacy, collectionGuidance: "Client's saved collection guidance" });
  assert.deepEqual(parsed.pages, pages);
  assert.deepEqual(parsed.promotion, promotion);
  assert.equal(parsed.collectionGuidance, "Client's saved collection guidance");
});
test("new page image fields reject unsafe references", () => {
  const invalid = { ...defaultContent, pages: { ...defaultContent.pages, process: { ...defaultContent.pages.process, image: "https://evil.test/image.png" } } };
  assert.equal(contentSchema.safeParse(invalid).success, false);
});
test("all eight original designs and site content pass validation", () => {
  assert.equal(initialDesigns.length, 8);
  initialDesigns.forEach(design => assert.equal(designSchema.safeParse(design).success, true));
  assert.equal(contentSchema.safeParse(defaultContent).success, true);
});
test("invalid prices, shapes, slugs, and mass assignment are rejected", () => {
  for (const patch of [{ priceCents: -1 }, { priceCents: 1.5 }, { shape: "Other" }, { slug: "../admin" }, { is_admin: true }]) {
    assert.equal(designSchema.safeParse({ ...initialDesigns[0], ...patch }).success, false);
  }
});
test("image references cannot point to scripts, external sites or traversals", () => {
  for (const image of ["javascript:alert(1)", "//evil.test/a.png", "/../private", "https://evil.test/a.png"]) {
    assert.equal(designSchema.safeParse({ ...initialDesigns[0], image }).success, false);
  }
});
test("prices are stored in cents and mapped to existing public dollar amounts", () => {
  const piece = publicPiece({ ...initialDesigns[0], id: "test", updated_at: "2026-10-11" });
  assert.equal(piece.price, 2895);
  assert.equal("priceCents" in piece, false);
});
test("draft and archive states are supported without deleting source content", () => {
  for (const status of ["draft", "published", "archived"]) assert.ok(designSchema.safeParse({ ...initialDesigns[0], status }).success);
});
test("scheduled promotions apply the discount only inside the configured Central Texas dates", () => {
  const promotion = { enabled: true, name: "October sale", message: "Save on every table.", percentOff: 20, startsOn: "2026-10-01", endsOn: "2026-10-31" };
  assert.equal(promotionIsActive(promotion, new Date("2026-10-14T12:00:00Z")), true);
  assert.equal(promotionIsActive(promotion, new Date("2026-11-01T12:00:00Z")), false);
  assert.equal(promotionalPrice(2895, promotion, new Date("2026-10-14T12:00:00Z")), 2316);
  assert.equal(contentSchema.safeParse({ ...defaultContent, promotion: { ...promotion, endsOn: "2026-09-30" } }).success, false);
});
test("SVG, HTML, fake files and truncated signatures are rejected", () => {
  for (const input of ["<svg></svg>", "<html>malicious</html>", "not a real jpeg", "\xff\xd8"]) assert.equal(imageType(new TextEncoder().encode(input)), null);
  assert.equal(imageType(new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,0])), "image/png");
});
