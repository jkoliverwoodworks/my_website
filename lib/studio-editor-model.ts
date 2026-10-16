export const pageTabs = [
  { id: "home", label: "Home", path: "/", section: "A place to gather" },
  { id: "work", label: "Work", path: "/work", section: "The Hill Country Collection" },
  { id: "maker", label: "Meet the Maker", path: "/maker", section: "Family is the reason why" },
  { id: "craftsmanship", label: "Craftsmanship", path: "/craftsmanship", section: "Built with purpose" },
  { id: "process", label: "Process", path: "/process", section: "Your idea, shaped with confidence" },
  { id: "investment", label: "Investment", path: "/investment", section: "An investment in lasting craftsmanship" },
  { id: "contact", label: "Contact", path: "/contact", section: "Let’s make room for your story" },
] as const;
export type PageTab = typeof pageTabs[number]["id"];
export const biographyLabels = [
  "A different path — how woodworking began",
  "The same pair of hands — why Jeremy builds",
  "Working directly with Jeremy",
];
export const pricingLabels = {
  range: "Dining table investment — typical price range",
  qualification: "Larger tables & specialized designs — range guidance",
  madeToOrder: "Made to order — investment page message",
  rectangular: "Rectangular table dimensions",
  round: "Round table dimensions",
  woods: "Standard hardwood choices",
  construction: "Construction",
  base: "Standard base finish",
  upgrade: "Natural-wood base upgrade",
  custom: "Custom sizes, woods & other changes",
} as const;
export const defaultPageCopy = {
  craftsmanship: {
    introduction: "The materials, proven methods, and careful decisions behind furniture made for everyday life.",
    image: "/heritage-detail.jpg",
    materials: "The grain, color, and natural variation of real hardwood are part of the design. Each board brings something individual to the finished piece.",
    choosingWood: "Choosing a wood is about more than a color. It is about the atmosphere you want to create, and the materials you want to live with.",
  },
  process: {
    introduction: "A clear, collaborative path from the first conversation to a finished piece made for your home.",
    image: "/client-assets/hill-country-collection/hero/colorado-hero.png",
    approach: "You work directly with Jeremy from the first conversation through the final details, with clear decisions around design, budget, timing, and delivery.",
    offering: "Start with a Hill Country Collection design for a semi-custom table, or bring your own idea for a completely custom piece. You and Jeremy shape the dimensions, wood, and details around your home.",
  },
  investment: {
    introduction: "Our handcrafted dining tables are built from solid hardwood, thoughtfully designed, and made to be enjoyed for generations.",
    image: "/client-assets/hill-country-collection/hero/pedernales-hero.png",
  },
  contact: {
    introduction: "A finished idea or a first thought. Wherever you are, a direct conversation with Jeremy is the next step.",
    inquiryGuidance: "No need to know your wood species or exact dimensions yet. Share your home, how you gather, and what you would love to create.",
  },
};
