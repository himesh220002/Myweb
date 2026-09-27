// ── Single source of truth for pricing across Home + /pricing ──
// Keep these in sync with the approved tiers:
//   Starter (Essential)   — INR ₹49,999 / USD $525 — Flat Fee · One-Time Deploy
//   Growth (Popular)      — INR ₹1,49,999 / USD $1565 — Flat Fee · One-Time Deploy
//   Enterprise (Scalable) — Custom Pricing · Tailored Scope

export type PlanId = "starter" | "growth" | "enterprise";
export type Currency = "INR" | "USD";
export type BillingPeriod = "project" | "retainer";

export interface PlanPrice {
  project: number | "Custom";
  retainer: number | "Custom";
}

export interface PlanDef {
  id: PlanId;
  name: string;
  tag: string;
  code: string;
  blurb: string;
  bestFor: string;
  cta: string;
  ctaHref: string;
  trust: string;
  popular: boolean;
  billingNoteProject: string;
  billingNoteRetainer: string;
  inr: PlanPrice;
  usd: PlanPrice;
  /** short highlights for the Home cards (Hostinger-style top picks) */
  highlights: string[];
}

export const PLANS: PlanDef[] = [
  {
    id: "starter",
    name: "Starter",
    tag: "ESSENTIAL",
    code: "TIER-01",
    blurb: "Perfect for landing pages, portfolios, and small business sites.",
    bestFor: "Landing pages, portfolios & small business sites",
    cta: "GET STARTED",
    ctaHref: "/contact?plan=starter",
    trust: "○ NDA-FIRST // 48H PROPOSAL",
    popular: false,
    billingNoteProject: "Progressive Fee · One-Time Deploy",
    billingNoteRetainer: "Retainer · Per Month",
    inr: { project: 49999, retainer: 39999 },
    usd: { project: 525, retainer: 455 },
    highlights: [
      "Up to 5 pages / routes",
      "Responsive design & mobile-first",
      "Basic SEO & domain setup",
      "Serverless Cloud deployment",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "POPULAR",
    code: "TIER-02",
    blurb: "Full-stack web apps with auth, database, and production deployment.",
    bestFor: "Web apps with auth, database & production deploy",
    cta: "START PROJECT",
    ctaHref: "/contact?plan=growth",
    trust: "● POPULAR // NDA-FIRST",
    popular: true,
    billingNoteProject: "Progressive Fee · One-Time Deploy",
    billingNoteRetainer: "Retainer · Per Month",
    inr: { project: 149999, retainer: 119999 },
    usd: { project: 1565, retainer: 1299 },
    highlights: [
      "Up to 20 pages / routes",
      "Database + Auth & user roles",
      "Advanced SEO + CMS included",
      "90-day post-launch support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "SCALABLE",
    code: "TIER-03",
    blurb: "Complex platforms, SaaS products, and multi-tenant systems.",
    bestFor: "SaaS platforms & multi-tenant systems",
    cta: "REQUEST A QUOTE",
    ctaHref: "/contact?plan=enterprise",
    trust: "○ NDA-FIRST // 48H PROPOSAL",
    popular: false,
    billingNoteProject: "Custom Pricing · Tailored Scope",
    billingNoteRetainer: "Custom Retainer · Tailored Scope",
    inr: { project: "Custom", retainer: "Custom" },
    usd: { project: "Custom", retainer: "Custom" },
    highlights: [
      "Unlimited pages / routes",
      "E-commerce + CMS + WebGL",
      "SSO, audits & dedicated architecture",
      "6-month post-launch support",
    ],
  },
];

export function getPlanPrice(plan: PlanDef, currency: Currency, billing: BillingPeriod): number | "Custom" {
  return currency === "INR" ? plan.inr[billing] : plan.usd[billing];
}

export function formatINR(val: number | string): string {
  if (typeof val === "string") return val;
  return `₹${val.toLocaleString("en-IN")}`;
}

export function formatUSD(val: number | string): string {
  if (typeof val === "string") return val;
  return `$${val.toLocaleString("en-US")}`;
}

/** Dual-currency label used on cards: "₹49,999 · $525" */
export function dualPrice(plan: PlanDef, billing: BillingPeriod): { inr: string; usd: string } {
  const inr = plan.inr[billing];
  const usd = plan.usd[billing];
  return { inr: formatINR(inr), usd: formatUSD(usd) };
}

// ── Categorical comparison (Hostinger-style "Compare plans") ──
// value: true = included, false = not included, string = specific value/limit

export type CellValue = boolean | string;

export interface CompareRow {
  label: string;
  values: [CellValue, CellValue, CellValue]; // starter, growth, enterprise
  addonHint?: boolean; // show "Add-on available" footnote for false cells
}

export interface CompareCategory {
  category: string;
  rows: CompareRow[];
}

export const COMPARISON: CompareCategory[] = [
  {
    category: "Scope & delivery",
    rows: [
      { label: "Pages / routes", values: ["Up to 5", "Up to 20", "Unlimited"] },
      { label: "Delivery timeline", values: ["1–2 weeks", "2–4 weeks", "4–8 weeks"] },
      { label: "Rounds of revisions", values: ["1 round", "3 rounds", "Unlimited"] },
    ],
  },
  {
    category: "Design & experience",
    rows: [
      { label: "Responsive, mobile-first design", values: [true, true, true] },
      { label: "Custom UI design", values: [true, true, true] },
      { label: "Custom animations & WebGL", values: [false, false, true] },
    ],
  },
  {
    category: "Build & backend",
    rows: [
      { label: "Custom database architecture", values: [false, true, true] },
      { label: "Authentication & user roles", values: [false, true, true] },
      { label: "API integrations", values: [false, true, true], addonHint: true },
    ],
  },
  {
    category: "Store & content",
    rows: [
      { label: "E-commerce integration", values: [false, false, true], addonHint: true },
      { label: "CMS for content management", values: [false, true, true] },
    ],
  },
  {
    category: "SEO, performance & launch",
    rows: [
      {
        label: "SEO setup",
        values: ["Basic + domain setup", "Advanced + sitemaps", "Enterprise optimization"],
      },
      { label: "Performance tuning (98+ Lighthouse)", values: [true, true, true] },
      { label: "Domain, SSL & serverless cloud deployment", values: [true, true, true] },
    ],
  },
  {
    category: "Care & trust",
    rows: [
      { label: "Post-launch support", values: ["30-day", "90-day", "6-month"] },
      { label: "NDA-first discovery + 48h proposal", values: [true, true, true] },
    ],
  },
];

/** Flat grouped feature lists for the pricing cards (keeps every concept visible). */
export interface CardFeatureGroup {
  group: string;
  items: { text: string; included: boolean; addon?: boolean }[];
}

export const CARD_FEATURES: Record<PlanId, CardFeatureGroup[]> = {
  starter: [
    {
      group: "Scope",
      items: [
        { text: "Up to 5 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "1 round of revisions", included: true },
      ],
    },
    {
      group: "Build & launch",
      items: [
        { text: "Basic SEO & domain setup", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "30-day post-launch support", included: true },
      ],
    },
    {
      group: "Not included",
      items: [
        { text: "Custom database / auth / e-commerce", included: false },
        { text: "CMS integration", included: false },
        { text: "Custom animations & WebGL", included: false },
      ],
    },
  ],
  growth: [
    {
      group: "Scope",
      items: [
        { text: "Up to 20 pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "3 rounds of revisions", included: true },
      ],
    },
    {
      group: "Build & launch",
      items: [
        { text: "Custom database architecture", included: true },
        { text: "Authentication & user roles", included: true },
        { text: "Advanced SEO & sitemaps", included: true },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "90-day post-launch support", included: true },
      ],
    },
    {
      group: "Not included",
      items: [{ text: "Custom animations & WebGL", included: false }],
    },
  ],
  enterprise: [
    {
      group: "Scope",
      items: [
        { text: "Unlimited pages / routes", included: true },
        { text: "Responsive design & mobile-first", included: true },
        { text: "Unlimited revisions", included: true },
      ],
    },
    {
      group: "Build & launch",
      items: [
        { text: "Custom database architecture", included: true },
        { text: "Authentication & user roles", included: true },
        { text: "Enterprise SEO optimization", included: true },
        { text: "E-commerce integration", included: true },
        { text: "CMS for content management", included: true },
        { text: "Serverless Cloud deployment", included: true },
        { text: "6-month post-launch support", included: true },
        { text: "Custom animations & WebGL", included: true },
      ],
    },
  ],
};

export const ALL_PLANS_INCLUDE = [
  "SSL certificate",
  "Domain configuration",
  "Responsive design",
  "SEO baseline",
  "Cloud deployment",
  "Post-launch support",
];
