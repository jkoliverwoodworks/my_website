import { z } from "zod";
import { pieces, collectionIntroduction, standardPricing } from "./pieces.ts";
import { defaultPageCopy } from "./studio-editor-model.ts";

export const imageReference = z.string().max(500).refine(value =>
  /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value) && !value.includes(".."), "Choose a site image or upload one to Media.");
export const designSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(2).max(80),
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(4000),
  priceCents: z.number().int().min(100).max(100000000),
  shape: z.enum(["Round", "Rectangular"]),
  standardSize: z.string().trim().min(2).max(200),
  base: z.string().trim().min(2).max(200),
  image: imageReference, heroImage: imageReference,
  imageAlt: z.string().trim().min(2).max(250),
  heroWidth: z.number().int().min(1).max(12000), heroHeight: z.number().int().min(1).max(12000),
  position: z.number().int().min(0).max(10000), featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
  seoTitle: z.string().max(160), seoDescription: z.string().max(400),
}).strict();
export type Design = z.infer<typeof designSchema>;
export type DesignRecord = Design & { id: string; updated_at: string };
export type PublicPiece = Omit<DesignRecord, "priceCents"> & { price: number };
const copy = z.string().trim().min(1).max(4000);
export const promotionSchema = z.object({
  enabled: z.boolean(),
  name: z.string().trim().min(2).max(80),
  message: z.string().trim().min(2).max(180),
  percentOff: z.number().int().min(1).max(90),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}).strict().refine(value => value.endsOn >= value.startsOn, { message: "The sale end date must be on or after its start date.", path: ["endsOn"] });
export type Promotion = z.infer<typeof promotionSchema>;
export const defaultPromotion: Promotion = {
  enabled: false,
  name: "Workshop sale",
  message: "Save on every design in the Hill Country Collection for a limited time.",
  percentOff: 20,
  startsOn: "2026-01-01",
  endsOn: "2026-01-31",
};
export const contentSchema = z.object({
  collectionIntroduction: copy,
  homeIntroduction: copy,
  homeOffering: copy,
  collectionGuidance: copy,
  makerIntroduction: copy,
  makerImage: imageReference,
  makerBiography: z.array(copy).min(1).max(8),
  pages: z.object({
    craftsmanship: z.object({ introduction: copy, image: imageReference, materials: copy, choosingWood: copy }).strict(),
    process: z.object({ introduction: copy, image: imageReference, approach: copy, offering: copy }).strict(),
    investment: z.object({ introduction: copy, image: imageReference }).strict(),
    contact: z.object({ introduction: copy, inquiryGuidance: copy }).strict(),
  }).strict().default(defaultPageCopy),
  pricing: z.object({
    range: copy.default(standardPricing.range),
    qualification: copy.default(standardPricing.qualification),
    madeToOrder: copy.default(standardPricing.madeToOrder),
    rectangular: copy, round: copy, woods: copy, construction: copy, base: copy, upgrade: copy, custom: copy,
  }).strict(),
  faqs: z.array(z.object({ question: copy, answer: copy }).strict()).max(30),
  promotion: promotionSchema.default(defaultPromotion),
}).strict();
export type SiteContent = z.infer<typeof contentSchema>;
export const initialDesigns: Design[] = pieces.map(({ price, ...piece }, position) => ({
  ...piece, priceCents: price * 100,
  imageAlt: `${piece.name} semi-custom dining table`, position, featured: position < 3,
  status: "published", seoTitle: "", seoDescription: "",
}));
export const defaultContent: SiteContent = {
  pages: defaultPageCopy,
  collectionIntroduction,
  homeIntroduction: "The slow Sunday mornings. The extra chair at Thanksgiving. The conversations that carry on long after dinner.",
  homeOffering: "Begin with a semi-custom design from the Hill Country Collection, or bring Jeremy an idea for a completely custom piece. Every table is made in Buda from solid hardwood and shaped around your home.",
  collectionGuidance: "Choose a design, then tailor the dimensions, hardwood, base finish, and details to your home.",
  makerIntroduction: "A local craftsman, a love of solid hardwood, and furniture built around the moments that make a house a home.",
  makerImage: "/jeremy-oliver.jpeg",
  makerBiography: [
    "Woodworking began as a hobby years ago. After nearly twenty years in banking, an unexpected career change gave me the opportunity to turn something I loved into something much bigger.",
    "A table is where homework happens, extra chairs get squeezed in for the holidays, and family stories collect. That is why I build each piece one at a time in Buda, with solid hardwood and the care to make it part of your home for years to come.",
    "From the first conversation to the final finish, you work directly with me. Your questions, ideas, and the details of your home all have a place in the process.",
  ],
  pricing: { ...standardPricing },
  promotion: defaultPromotion,
  faqs: [
    { question: "What materials and sizes can I choose?", answer: `Collection designs begin with solid-hardwood construction in red oak or pecan. Standard rectangular tables are ${standardPricing.rectangular}; round tables are ${standardPricing.round}. Other dimensions, hardwoods, and finishes can be discussed with Jeremy as part of your personalized quote.` },
    { question: "Can I choose a natural-wood base?", answer: "Yes. A matching natural-wood base is available as an upgrade on applicable designs. Jeremy will confirm the wood, finish, and final price with you." },
    { question: "Can Jeremy build something outside the collection?", answer: "Yes. The Hill Country Collection offers semi-custom starting points, while a completely custom commission can begin with a room, a sketch, a saved photograph, or an original idea." },
    { question: "How long does a custom piece take?", answer: "Every piece is made to order. Lead times vary with the design and Jeremy’s current workshop schedule; you will receive a current estimate during your consultation." },
    { question: "Is my piece covered by a warranty?", answer: "Yes. J. K. Oliver Woodworks stands behind its craftsmanship with a one-year warranty. Full coverage, care requirements, and claim details are provided in the written warranty and Terms and Conditions before your project begins." },
    { question: "Do you deliver?", answer: "Delivery details are coordinated as part of your project. J. K. Oliver Woodworks is based in Buda and serves Central Texas." },
  ],
};
export function publicPiece(record: DesignRecord): PublicPiece {
  const { priceCents, ...piece } = record;
  return { ...piece, price: priceCents / 100 };
}

export function promotionIsActive(promotion: Promotion, now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: "year" | "month" | "day") => parts.find(item => item.type === type)?.value || "";
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  return promotion.enabled && today >= promotion.startsOn && today <= promotion.endsOn;
}

export function promotionalPrice(price: number, promotion: Promotion, now = new Date()) {
  return promotionIsActive(promotion, now) ? Math.round(price * (100 - promotion.percentOff) / 100) : price;
}

export function imageType(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)) return "image/png";
  const text = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (text(0, 4) === "RIFF" && text(8, 12) === "WEBP") return "image/webp";
  return null;
}
