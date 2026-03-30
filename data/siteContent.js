import { templateConfig } from "./templateConfig";

export const navLinks = [
  { href: "#about", label: "Story" },
  { href: "#webgl-stage", label: "WebGL" },
  { href: "#services", label: "Details" },
  { href: "#case-studies", label: "Wear" },
  { href: "#features", label: "Specifications" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" }
];

export const headerContent = {
  ctaLabel: "Specifications",
  ctaHref: "#features"
};

export const heroSection = {
  eyebrow: templateConfig.brand.fullName,
  title: "Light-powered. Slim on the wrist. Quiet in the room.",
  body:
    "A clean white-dial watch with a slim black case and woven mesh bracelet, designed for everyday wear without losing the feel of a dress piece.",
  primaryAction: {
    label: "View the stage",
    href: "#webgl-stage"
  },
  secondaryAction: {
    label: "See specifications",
    href: "#features"
  },
  stageLabel: "Hero film",
  stageNote:
    "A looping product study introduces the dial, case, and bracelet before a lighter procedural WebGL stage takes over below."
};

export const heroFacts = [
  {
    label: "Power",
    value: "Eco-Drive light-powered movement"
  },
  {
    label: "Dial",
    value: "White face with applied markers and clear numeral anchors"
  },
  {
    label: "Wear",
    value: "Slim black case paired with a woven mesh bracelet"
  }
];

export const aboutSection = {
  label: "Story",
  title: "Clean enough for evening, easy enough for every day.",
  copy:
    "This watch is built around proportion, legibility, and restraint rather than complications or noise.",
  statement:
    "The point is not excess. The point is a watch that looks settled on the wrist: slim case, open dial, light-powered movement, and a mesh bracelet that adds texture without making the piece feel heavy."
};

export const aboutNotes = [
  {
    title: "White dial",
    text: "The face stays open and readable, using clean spacing and applied markers instead of unnecessary clutter."
  },
  {
    title: "Slim profile",
    text: "The case is kept lean so the watch sits neatly on the wrist and disappears easily under a cuff."
  },
  {
    title: "Light-powered",
    text: "Eco-Drive keeps the watch running from light, reducing the friction of everyday ownership."
  }
];

export const detailsSection = {
  label: "Details",
  title: "The design is restrained, but nothing is accidental.",
  copy:
    "Dial, case, power system, and bracelet all work toward the same result: a watch that feels quieter and more resolved in daily wear."
};

export const services = [
  {
    number: "01",
    title: "Dial Layout",
    summary:
      "Large numeral anchors and applied markers keep the face legible at a glance while preserving plenty of open space.",
    outcome: "Clear timekeeping without visual noise."
  },
  {
    number: "02",
    title: "Case Profile",
    summary:
      "The case stays slim and compact, giving the watch a dressier feel without becoming fragile or formal.",
    outcome: "A calmer profile that wears easily through the day."
  },
  {
    number: "03",
    title: "Eco-Drive Power",
    summary:
      "Citizen's light-powered system removes the need for routine battery changes and keeps the watch easy to live with.",
    outcome: "Low-maintenance ownership with a cleaner daily rhythm."
  },
  {
    number: "04",
    title: "Mesh Bracelet",
    summary:
      "The woven bracelet adds texture and flexibility, giving the watch a tailored finish instead of a heavier sports-watch feel.",
    outcome: "More character on the wrist without extra bulk."
  }
];

export const webglFeatureSection = {
  label: "WebGL Stage",
  title: "Depth, motion, and atmosphere without shipping a product model.",
  copy:
    "This section keeps the page tactile with procedural geometry, responsive motion, and shader-driven surfaces. It avoids the heavier model-loading path that can make hosting and deployment less predictable.",
  stageLabel: "Procedural WebGL",
  stageNote:
    "The composition is generated directly in the browser from code-driven geometry and lighting. No GLB or texture pack is required for this stage.",
  notes: [
    {
      title: "Lighter payload",
      text: "The scene is built from procedural forms instead of external model files, which trims deployment weight and removes asset-loading failure points."
    },
    {
      title: "Ambient interaction",
      text: "Pointer movement still influences the stage, so the page keeps a live, tactile feel without requiring drag controls or model decoding."
    },
    {
      title: "Theme aware",
      text: "The abstract composition inherits the site's light and dark palettes so the section still feels integrated with the rest of the template."
    }
  ]
};

export const wearSection = {
  label: "Wear Notes",
  title: "One watch, different settings.",
  copy:
    "It shifts easily between office, evening, and travel because the proportions stay calm and the dial stays clear.",
  primaryDetailLabel: "Best with",
  secondaryDetailLabel: "Why it works"
};

export const caseStudies = [
  {
    name: "Workday",
    category: "Soft tailoring",
    year: "Morning",
    summary:
      "The light dial stays crisp against navy jackets, charcoal knits, and white shirting without asking for attention.",
    deliverables: "Tailoring, overshirts, lightweight knitwear",
    result: "Dressy without feeling formal",
    tone: "stone"
  },
  {
    name: "Evening",
    category: "Black layers",
    year: "After hours",
    summary:
      "Against darker clothing, the silver dial becomes the focal point while the mesh bracelet picks up just enough light.",
    deliverables: "Open collars, black jackets, fine merino",
    result: "Cleaner than a sports watch, easier than a leather strap",
    tone: "graphite"
  },
  {
    name: "Travel",
    category: "Everyday carry",
    year: "Weekend",
    summary:
      "The slim case and light-powered movement make it an easy one-watch option when the rest of the bag stays minimal.",
    deliverables: "Relaxed tailoring, tees, overshirts, carry-on travel",
    result: "Less to think about, more to wear",
    tone: "paper"
  }
];

export const specificationsSection = {
  label: "Specifications",
  title: "The essentials, kept clean.",
  copy:
    "What matters here is clarity: light-powered movement, measured proportions, and a watch that remains easy to wear."
};

export const features = [
  {
    label: "Movement",
    text: "Eco-Drive light-powered movement"
  },
  {
    label: "Dial",
    text: "White dial with applied markers and three numeral anchors"
  },
  {
    label: "Case",
    text: "Slim black case with a polished bezel and clean lugs"
  },
  {
    label: "Bracelet",
    text: "Woven mesh bracelet with a softer, more tailored finish"
  },
  {
    label: "Profile",
    text: "Built to sit close to the wrist instead of wearing tall"
  },
  {
    label: "Readability",
    text: "High-contrast hands and restrained spacing keep the face easy to scan"
  },
  {
    label: "Character",
    text: "Quiet enough for daily wear, polished enough for evening"
  }
];

export const gallerySection = {
  label: "Closer Look",
  title: "Material, proportion, and restraint.",
  copy:
    "The details are quiet, but they are what make the watch read as premium once it is on the wrist."
};

export const galleryItems = [
  {
    title: "Silver Dial",
    note: "White face / applied markers",
    size: "tall",
    tone: "paper"
  },
  {
    title: "Bezel Edge",
    note: "Polished ring / slim profile",
    size: "wide",
    tone: "graphite"
  },
  {
    title: "Mesh Texture",
    note: "Woven bracelet / tailored finish",
    size: "square",
    tone: "stone"
  },
  {
    title: "Case Curve",
    note: "Dark case / softened lugs",
    size: "square",
    tone: "graphite"
  },
  {
    title: "Dial Balance",
    note: "Numeral anchors / open spacing",
    size: "wide",
    tone: "paper"
  },
  {
    title: "Low Light",
    note: "Evening wear / restrained contrast",
    size: "tall",
    tone: "stone"
  }
];

export const reviewsSection = {
  label: "Reviews",
  title: "People tend to notice the same things first.",
  copy:
    "The dial, the low profile, and the way the mesh bracelet changes the character of the watch."
};

export const testimonials = [
  {
    quote:
      "It wears dressy without feeling delicate, which is a difficult balance to get right.",
    name: "Oliver Kent",
    role: "Retail Buyer"
  },
  {
    quote:
      "The dial is clean, readable, and much quieter than most white-face watches in this category.",
    name: "Mina Sato",
    role: "Product Stylist"
  },
  {
    quote:
      "The mesh bracelet gives it enough texture to stand apart without making it feel sporty.",
    name: "Daniel Reeves",
    role: "Long-term Wearer"
  }
];

export const footerContent = {
  kicker: templateConfig.brand.fullName,
  statement:
    "A light-powered dress watch built around a clean dial, slim case, and woven mesh bracelet.",
  meta:
    "Hero film, procedural WebGL stage, and product details tuned for desktop and mobile."
};

export const footerLinks = [
  { href: "#webgl-stage", label: "WebGL stage" },
  { href: "#features", label: "Specifications" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" }
];
