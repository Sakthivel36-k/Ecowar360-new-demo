/**
 * EcoWar360 Product Catalogue
 * Each product renders as a card with an inline SVG illustration (zero image
 * weight, crisp on every screen) and a WhatsApp deep link pre-filled with
 * the product name for instant ordering.
 */

const WHATSAPP_NUMBER = "918122008685";

function buildWhatsAppLink(productName, unit) {
  const msg = `Hi EcoWar360! I'd like to order: *${productName}* (${unit}). Please share price & availability.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ---- SVG illustration templates (by visual family) ----
const SVG = {
  jarAmber: (labelTop, labelBottom, accent = "#D4961F", liquid = "#E8B04A") => `
    <svg viewBox="0 0 200 200" class="w-full h-44 sm:h-48" role="img" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="55" ry="7" fill="#2D4A1E" opacity="0.08"/>
      <path d="M55 80 Q55 65 70 65 L130 65 Q145 65 145 80 L148 165 Q148 180 133 180 L67 180 Q52 180 52 165 Z" fill="${accent}"/>
      <path d="M55 80 Q55 65 70 65 L130 65 Q145 65 145 80 L147 100 L53 100 Z" fill="${liquid}"/>
      <rect x="75" y="40" width="50" height="28" rx="6" fill="#5A8C3E"/>
      <rect x="68" y="28" width="64" height="16" rx="7" fill="#3D6128"/>
      <rect x="65" y="115" width="70" height="42" rx="5" fill="#FBF6EC"/>
      <text x="100" y="135" font-family="Inter,sans-serif" font-size="9" font-weight="800" fill="#2D4A1E" text-anchor="middle" letter-spacing="0.5">${labelTop}</text>
      <text x="100" y="147" font-family="Inter,sans-serif" font-size="7" fill="#5A8C3E" text-anchor="middle" letter-spacing="1">${labelBottom}</text>
    </svg>`,

  pouch: (labelTop, labelBottom, accent = "#5A8C3E", body = "#FBF6EC") => `
    <svg viewBox="0 0 200 200" class="w-full h-44 sm:h-48" role="img" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="58" ry="7" fill="#2D4A1E" opacity="0.08"/>
      <path d="M62 70 Q58 70 58 80 L52 160 Q50 178 70 178 L130 178 Q150 178 148 160 L142 80 Q142 70 138 70 Z" fill="${body}" stroke="${accent}" stroke-width="2"/>
      <path d="M70 70 L68 50 Q68 38 80 38 L120 38 Q132 38 132 50 L130 70" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <rect x="62" y="95" width="76" height="48" rx="6" fill="${accent}" opacity="0.12"/>
      <text x="100" y="117" font-family="Inter,sans-serif" font-size="9" font-weight="800" fill="#2D4A1E" text-anchor="middle" letter-spacing="0.5">${labelTop}</text>
      <text x="100" y="130" font-family="Inter,sans-serif" font-size="7" fill="#456B2E" text-anchor="middle" letter-spacing="1">${labelBottom}</text>
      <circle cx="75" cy="155" r="3" fill="${accent}" opacity="0.4"/>
      <circle cx="95" cy="160" r="2.5" fill="${accent}" opacity="0.4"/>
      <circle cx="118" cy="156" r="3" fill="${accent}" opacity="0.4"/>
    </svg>`,

  bottle: (labelTop, labelBottom, accent = "#FBF6EC", liquid = "#FFFFFF") => `
    <svg viewBox="0 0 200 200" class="w-full h-44 sm:h-48" role="img" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="42" ry="7" fill="#2D4A1E" opacity="0.08"/>
      <path d="M78 55 Q78 45 85 45 L115 45 Q122 45 122 55 L124 75 L76 75 Z" fill="#5A8C3E"/>
      <path d="M76 75 Q70 75 70 90 L66 165 Q66 180 82 180 L118 180 Q134 180 134 165 L130 90 Q130 75 124 75 Z" fill="${liquid}" stroke="#5A8C3E" stroke-width="2"/>
      <rect x="84" y="32" width="32" height="16" rx="5" fill="#3D6128"/>
      <rect x="70" y="110" width="60" height="40" rx="4" fill="${accent}"/>
      <text x="100" y="130" font-family="Inter,sans-serif" font-size="8.5" font-weight="800" fill="#2D4A1E" text-anchor="middle" letter-spacing="0.3">${labelTop}</text>
      <text x="100" y="142" font-family="Inter,sans-serif" font-size="6.5" fill="#5A8C3E" text-anchor="middle" letter-spacing="1">${labelBottom}</text>
    </svg>`,

  block: (labelTop, labelBottom, accent = "#B57A12", body = "#D4961F") => `
    <svg viewBox="0 0 200 200" class="w-full h-44 sm:h-48" role="img" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="56" ry="7" fill="#2D4A1E" opacity="0.08"/>
      <path d="M58 95 L142 85 L150 150 L66 162 Z" fill="${body}"/>
      <path d="M58 95 L142 85 L142 100 L58 110 Z" fill="${accent}" opacity="0.5"/>
      <path d="M70 120 L130 112" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M72 135 L128 127" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <rect x="62" y="50" width="76" height="36" rx="6" fill="#FBF6EC" transform="rotate(-4 100 68)"/>
      <text x="100" y="65" font-family="Inter,sans-serif" font-size="9" font-weight="800" fill="#2D4A1E" text-anchor="middle" letter-spacing="0.3" transform="rotate(-4 100 68)">${labelTop}</text>
      <text x="100" y="77" font-family="Inter,sans-serif" font-size="6.5" fill="#B57A12" text-anchor="middle" letter-spacing="1" transform="rotate(-4 100 68)">${labelBottom}</text>
    </svg>`,

  nutsBowl: (labelTop, labelBottom, seedColor = "#8B5A2B") => `
    <svg viewBox="0 0 200 200" class="w-full h-44 sm:h-48" role="img" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="58" ry="7" fill="#2D4A1E" opacity="0.08"/>
      <path d="M50 110 Q50 160 100 160 Q150 160 150 110 Z" fill="#FBF6EC" stroke="#5A8C3E" stroke-width="2.5"/>
      <ellipse cx="100" cy="108" rx="50" ry="10" fill="#FBF6EC" stroke="#5A8C3E" stroke-width="2.5"/>
      <ellipse cx="78" cy="95" rx="11" ry="8" fill="${seedColor}"/>
      <ellipse cx="100" cy="88" rx="13" ry="9" fill="${seedColor}" opacity="0.85"/>
      <ellipse cx="124" cy="96" rx="11" ry="8" fill="${seedColor}" opacity="0.9"/>
      <ellipse cx="90" cy="100" rx="10" ry="7" fill="${seedColor}" opacity="0.7"/>
      <ellipse cx="112" cy="102" rx="10" ry="7" fill="${seedColor}" opacity="0.75"/>
      <rect x="55" y="130" width="90" height="26" rx="5" fill="#2D4A1E" opacity="0.06"/>
      <text x="100" y="142" font-family="Inter,sans-serif" font-size="9" font-weight="800" fill="#2D4A1E" text-anchor="middle" letter-spacing="0.3">${labelTop}</text>
      <text x="100" y="153" font-family="Inter,sans-serif" font-size="6.5" fill="#5A8C3E" text-anchor="middle" letter-spacing="1">${labelBottom}</text>
    </svg>`,
};

const PRODUCTS = [
  {
    id: "honey-forest",
    name: "Raw Forest Honey",
    category: "honey",
    tag: "Best Seller",
    desc: "Unprocessed wild forest honey, hand-harvested by tribal beekeepers in the Western Ghats foothills. Naturally crystallizes — that's proof of purity.",
    unit: "500g jar",
    price: "₹399",
    compareAt: "₹499",
    svg: SVG.jarAmber("ECOWAR360", "FOREST HONEY"),
  },
  {
    id: "honey-multiflora",
    name: "Multiflora Raw Honey",
    category: "honey",
    tag: null,
    desc: "Collected from mixed wildflower blooms across our partner villages. Light, floral, and completely unheated to preserve natural enzymes.",
    unit: "500g jar",
    price: "₹349",
    compareAt: null,
    svg: SVG.jarAmber("ECOWAR360", "MULTIFLORA", "#E8B04A", "#F0C46A"),
  },
  {
    id: "ghee-a2",
    name: "A2 Bilona Ghee",
    category: "ghee",
    tag: "Premium",
    desc: "Hand-churned using the traditional bilona method from A2 desi cow milk curd. Rich aroma, golden grain texture, zero additives.",
    unit: "500ml jar",
    price: "₹899",
    compareAt: "₹1099",
    svg: SVG.jarAmber("A2 BILONA", "PURE GHEE", "#D4961F", "#F2C879"),
  },
  {
    id: "milk-a2",
    name: "A2 Desi Cow Milk",
    category: "ghee",
    tag: "Fresh Daily",
    desc: "Sourced fresh daily from indigenous A2 cow breeds raised on natural fodder in our partner villages near Chennai.",
    unit: "1 litre",
    price: "₹120",
    compareAt: null,
    svg: SVG.bottle("A2 DESI", "COW MILK"),
  },
  {
    id: "ghee-buffalo",
    name: "Traditional Buffalo Ghee",
    category: "ghee",
    tag: null,
    desc: "Slow-cooked buffalo milk ghee with a deep, nutty richness — a household favourite for festive cooking.",
    unit: "500ml jar",
    price: "₹699",
    compareAt: null,
    svg: SVG.jarAmber("BUFFALO", "GHEE", "#C9881A", "#E8B04A"),
  },
  {
    id: "karuppati",
    name: "Karuppati (Palm Jaggery)",
    category: "sweetener",
    tag: "Village Made",
    desc: "Traditional black palm jaggery, slow-boiled in open pans by village artisans. Rich in iron, a healthy sugar alternative.",
    unit: "1 kg pack",
    price: "₹220",
    compareAt: "₹260",
    svg: SVG.block("KARUPPATI", "PALM JAGGERY"),
  },
  {
    id: "country-sugar",
    name: "Country Sugar (Nattu Sakkarai)",
    category: "sweetener",
    tag: null,
    desc: "Unrefined country sugar made from sugarcane juice, retaining natural minerals lost in chemically processed white sugar.",
    unit: "1 kg pack",
    price: "₹180",
    compareAt: null,
    svg: SVG.pouch("NATTU SAKKARAI", "COUNTRY SUGAR", "#D4961F", "#FBF1DD"),
  },
  {
    id: "dryfruit-mix",
    name: "Premium Dry Fruit Mix",
    category: "dryfruits",
    tag: "Festive Pick",
    desc: "A hand-picked mix of almonds, cashews, raisins, and dried figs sourced from trusted organic orchards.",
    unit: "500g pack",
    price: "₹649",
    compareAt: "₹799",
    svg: SVG.nutsBowl("DRY FRUIT MIX", "PREMIUM"),
  },
  {
    id: "almonds",
    name: "California Almonds",
    category: "dryfruits",
    tag: null,
    desc: "Crunchy, protein-rich almonds — carefully cleaned and sorted, with no polishing agents or preservatives.",
    unit: "500g pack",
    price: "₹520",
    compareAt: null,
    svg: SVG.nutsBowl("ALMONDS", "100% NATURAL", "#A87A4A"),
  },
  {
    id: "cashews",
    name: "Whole Cashew Nuts",
    category: "dryfruits",
    tag: null,
    desc: "Premium whole cashews, naturally creamy and crunchy — perfect for snacking or traditional sweets.",
    unit: "500g pack",
    price: "₹560",
    compareAt: null,
    svg: SVG.nutsBowl("CASHEWS", "WHOLE GRADE", "#E8D29A"),
  },
  {
    id: "mixed-seeds",
    name: "Mixed Seeds (Chia, Flax, Pumpkin)",
    category: "dryfruits",
    tag: "Superfood",
    desc: "A nutrient-dense blend of chia, flax, sunflower, and pumpkin seeds — great for smoothies, salads, and daily wellness.",
    unit: "250g pack",
    price: "₹299",
    compareAt: null,
    svg: SVG.nutsBowl("MIXED SEEDS", "SUPERFOOD BLEND", "#5C4530"),
  },
  {
    id: "dates",
    name: "Organic Dates",
    category: "dryfruits",
    tag: null,
    desc: "Soft, naturally sweet dates with no added sugar syrup or preservatives — sourced from organic date farms.",
    unit: "500g pack",
    price: "₹280",
    compareAt: null,
    svg: SVG.pouch("ORGANIC DATES", "NO ADDED SUGAR", "#8B5A2B", "#FBF1DD"),
  },
];

const CATEGORY_LABELS = {
  honey: "Honey",
  ghee: "Ghee & Milk",
  sweetener: "Sweetener",
  dryfruits: "Dry Fruits",
};
