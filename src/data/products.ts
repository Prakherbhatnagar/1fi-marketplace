import type { Product, EMIPlan } from "@/types";

function buildEmiPlans(price: number): EMIPlan[] {
  const tenures = [12, 24, 36];
  const annualRate = 0.05;
  return tenures.map((duration, i) => {
    const totalInterest = price * annualRate * (duration / 12);
    const totalPayable = Math.round(price + totalInterest);
    const monthlyAmount = Math.round(totalPayable / duration);
    return {
      id: i + 1,
      duration,
      monthlyAmount,
      totalPayable,
      interestRate: annualRate * 100,
    };
  });
}

interface ProductSeed {
  id: number;
  name: string;
  brand: string;
  category: Product["category"];
  image: string;
  price: number;
  mrp?: number;
  rating: number;
  reviewCount: number;
  variants: Product["variants"];
  description: string;
  highlights: string[];
}

const seeds: ProductSeed[] = [
  {
    id: 1,
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    price: 74999,
    mrp: 79999,
    rating: 4.8,
    reviewCount: 1420,
    variants: [
      { type: "Storage", options: ["128 GB", "256 GB", "512 GB"] },
      { type: "Color", options: ["Black", "Blue", "Silver"] },
    ],
    description: "Premium smartphone with a high-resolution display and powerful performance.",
    highlights: ["Dynamic AMOLED 2X display", "50MP Triple Camera", "Snapdragon 8 Gen 4", "All-day battery life"],
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    price: 119900,
    mrp: 129900,
    rating: 4.8,
    reviewCount: 5190,
    variants: [
      { type: "Storage", options: ["128 GB", "256 GB", "512 GB"] },
      { type: "Color", options: ["Black Titanium", "Natural Titanium", "Desert Titanium"] },
    ],
    description:
      "The A18 Pro chip and a redesigned camera control make this the most capable iPhone yet, wrapped in a lighter titanium body.",
    highlights: ["A18 Pro chip", "48MP Fusion camera", "Action + Camera Control buttons", "Up to 27h video playback"],
  },
  {
    id: 3,
    name: "MacBook Air M4",
    brand: "Apple",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    price: 114900,
    mrp: 119900,
    rating: 4.7,
    reviewCount: 1720,
    variants: [
      { type: "Memory", options: ["16 GB", "24 GB"] },
      { type: "Storage", options: ["256 GB", "512 GB", "1 TB"] },
      { type: "Color", options: ["Midnight", "Starlight", "Sky Blue"] },
    ],
    description:
      "Fanless, silent, and fast enough for day-to-day development and creative work, with a display that stays crisp in direct sunlight.",
    highlights: ["Apple M4 chip", "18-hour battery life", "13.6\" Liquid Retina display", "1080p FaceTime camera"],
  },
  {
    id: 4,
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    price: 149999,
    mrp: 168999,
    rating: 4.4,
    reviewCount: 640,
    variants: [
      { type: "Memory", options: ["16 GB", "32 GB"] },
      { type: "Storage", options: ["512 GB", "1 TB"] },
    ],
    description:
      "A business-grade carbon-fibre chassis with a matte 2.8K display and a keyboard that's still the benchmark for typing feel.",
    highlights: ["Intel Core Ultra 7", "MIL-SPEC tested durability", "Rapid Charge (80% in 60 min)", "Dolby Atmos speakers"],
  },
  {
    id: 5,
    name: "WH-1000XM6",
    brand: "Sony",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    price: 34990,
    mrp: 39990,
    rating: 4.7,
    reviewCount: 3980,
    variants: [{ type: "Color", options: ["Black", "Platinum Silver", "Midnight Blue"] }],
    description:
      "Industry-leading noise cancellation tuned by dual processors, with a fold-flat hinge and 30-hour battery life for long commutes.",
    highlights: ["Adaptive noise cancellation", "30-hour battery, quick charge", "Multipoint Bluetooth", "Speak-to-chat auto pause"],
  },
  {
    id: 6,
    name: "AirPods Pro 3",
    brand: "Apple",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    price: 24900,
    rating: 4.6,
    reviewCount: 4310,
    variants: [],
    description:
      "Rebuilt drivers and a deeper seal push noise cancellation further, with heart-rate sensing built into the stem for workouts.",
    highlights: ["Active noise cancellation", "Heart-rate sensing", "Up to 8h listening per charge", "IP57 water resistance"],
  },
  {
    id: 7,
    name: "Watch Ultra 3",
    brand: "Apple",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    price: 89900,
    rating: 4.5,
    reviewCount: 1102,
    variants: [
      { type: "Band", options: ["Ocean Band", "Trail Loop", "Alpine Loop"] },
      { type: "Case", options: ["Natural Titanium", "Black Titanium"] },
    ],
    description:
      "Satellite connectivity and a brighter always-on display make this the version built for people who train and travel far from signal.",
    highlights: ["Satellite messaging", "3000-nit display", "Up to 42h battery life", "Dual-frequency GPS"],
  },
  {
    id: 8,
    name: "Galaxy Watch 8",
    brand: "Samsung",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    price: 32999,
    mrp: 35999,
    rating: 4.3,
    reviewCount: 860,
    variants: [{ type: "Size", options: ["40mm", "44mm"] }],
    description:
      "Continuous health tracking with antioxidant and vascular sensors, wrapped in a slimmer aluminium case.",
    highlights: ["Bioactive sensor suite", "Sleep apnoea detection", "40-hour battery life", "5ATM + IP68 rating"],
  },
  {
    id: 9,
    name: "iPad Air M3",
    brand: "Apple",
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    price: 71900,
    rating: 4.6,
    reviewCount: 970,
    variants: [
      { type: "Storage", options: ["128 GB", "256 GB", "512 GB"] },
      { type: "Connectivity", options: ["Wi-Fi", "Wi-Fi + Cellular"] },
    ],
    description:
      "A larger 13-inch option joins the lineup this year, powerful enough for Final Cut Pro on the move.",
    highlights: ["Apple M3 chip", "Landscape 12MP camera", "Apple Pencil Pro support", "Up to 10h battery life"],
  },
  {
    id: 10,
    name: "Pixel Tablet 2",
    brand: "Google",
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80",
    price: 54999,
    mrp: 59999,
    rating: 4.2,
    reviewCount: 410,
    variants: [{ type: "Storage", options: ["128 GB", "256 GB"] }],
    description:
      "Doubles as a smart display when docked on its speaker base, with Gemini built in for on-device help.",
    highlights: ["Tensor G4 chip", "Charging speaker dock included", "11\" LCD display", "Gemini AI built in"],
  },
];

export const PRODUCTS: Product[] = seeds.map((seed) => ({
  ...seed,
  emiPlans: buildEmiPlans(seed.price),
}));

export function findProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
