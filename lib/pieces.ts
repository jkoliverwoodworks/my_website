export const collectionIntroduction =
  "Named for the rivers that run through Central Texas, each table in the Hill Country Collection is designed to bring families back to the table and built to become part of the home for years to come.";

export const standardPricing = {
  rectangular: '36" × 72" × 1.25" thick top',
  round: '42" diameter × 1.25" thick top',
  woods: "Red oak or pecan",
  construction: "Solid hardwood",
  base: "Painted wood bases are standard",
  upgrade: "Matching natural-wood bases are available as an upgrade",
  custom: "Larger sizes, premium hardwood species, and other customizations are priced separately.",
} as const;

export const pieces = [
  {
    slug: "blanco",
    name: "The Blanco",
    image: "/client-assets/hill-country-collection/blanco.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/blanco-hero.png",
    heroWidth: 1254,
    heroHeight: 1254,
    price: 2895,
    shape: "Round",
    standardSize: standardPricing.round,
    base: "Curved metal pedestal",
    description:
      "A round dining table featuring a clean hardwood top paired with a sculptural curved metal pedestal base. The open pedestal design provides generous legroom while giving the Blanco a modern Hill Country feel.",
  },
  {
    slug: "pedernales",
    name: "The Pedernales",
    image: "/client-assets/hill-country-collection/pedernales.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/pedernales-hero.png",
    heroWidth: 1312,
    heroHeight: 1199,
    price: 4195,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "Curved wood trestle",
    description:
      "A statement trestle table featuring substantial curved wood supports, a center stretcher, and traditional architectural detailing. The Pedernales blends old-world craftsmanship with the warmth and character of a Texas Hill Country home.",
  },
  {
    slug: "san-marcos",
    name: "The San Marcos",
    image: "/client-assets/hill-country-collection/san-marcos.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/san-marcos-hero.png",
    heroWidth: 1311,
    heroHeight: 1200,
    price: 3895,
    shape: "Round",
    standardSize: standardPricing.round,
    base: "Sculptural wood pedestal",
    description:
      "A round dining table built around a sculptural wood pedestal with graceful curved supports. The San Marcos offers the intimacy of a round table with a refined base that gives the design presence from every angle.",
  },
  {
    slug: "guadalupe",
    name: "The Guadalupe",
    image: "/client-assets/hill-country-collection/guadalupe.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/guadalupe-hero.png",
    heroWidth: 1311,
    heroHeight: 1200,
    price: 4195,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "Curved wood pedestal",
    description:
      "A refined trestle table featuring sweeping curved supports and a substantial center pedestal design. The Guadalupe combines traditional craftsmanship with softer architectural lines for a table that feels equally at home in classic or transitional spaces.",
  },
  {
    slug: "frio",
    name: "The Frio",
    image: "/client-assets/hill-country-collection/frio.png",
    heroImage: "/client-assets/hill-country-collection/hero/frio-hero.png",
    heroWidth: 1254,
    heroHeight: 1254,
    price: 2895,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "Four-leg wood base",
    description:
      "A straightforward four-leg dining table inspired by the simplicity of traditional farmhouse furniture. Clean lines, solid wood construction, and an understated design make the Frio an approachable table built for everyday family life.",
  },
  {
    slug: "llano",
    name: "The Llano",
    image: "/client-assets/hill-country-collection/llano.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/llano-hero.png",
    heroWidth: 1402,
    heroHeight: 1122,
    price: 2895,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "Black powder-coated steel",
    description:
      "A clean, contemporary dining table pairing a solid hardwood top with black powder-coated trapezoid steel legs. The Llano brings together natural wood and metal for a versatile design with a distinctly modern Texas character.",
  },
  {
    slug: "brazos",
    name: "The Brazos",
    image: "/client-assets/hill-country-collection/brazos.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/brazos-hero.png",
    heroWidth: 1373,
    heroHeight: 1145,
    price: 4195,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "X-trestle wood base",
    description:
      "A substantial trestle table defined by bold X-shaped supports and a connecting center stretcher. The Brazos has a strong architectural presence while maintaining the warmth and character of a handcrafted hardwood dining table.",
  },
  {
    slug: "colorado",
    name: "The Colorado",
    image: "/client-assets/hill-country-collection/colorado.jpeg",
    heroImage: "/client-assets/hill-country-collection/hero/colorado-hero.png",
    heroWidth: 1311,
    heroHeight: 1200,
    price: 2995,
    shape: "Rectangular",
    standardSize: standardPricing.rectangular,
    base: "Square-leg wood base",
    description:
      "A clean four-leg dining table with square legs and a traditional apron construction. Simple proportions and restrained detailing allow the hardwood to take center stage, making the Colorado one of the most versatile designs in the collection.",
  },
] as const;

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
