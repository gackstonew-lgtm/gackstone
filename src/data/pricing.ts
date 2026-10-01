export type PlanId = "basic" | "pro" | "enterprise";

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  /** Display price, e.g. "$200". `null` means custom quote. */
  priceUsd: number | null;
  priceLabel: string;
  priceSuffix?: string;
  priceKes?: string;
  popular?: boolean;
  cta: string;
  /** Pre-selected project type on the Start a Project form */
  defaultProjectType: string;
  features: PlanFeature[];
}

const yes = (label: string): PlanFeature => ({ label, included: true });
const no = (label: string): PlanFeature => ({ label, included: false });

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For startups & small projects",
    priceUsd: 200,
    priceLabel: "$200",
    priceSuffix: "/project",
    priceKes: "≈ KES 25,000",
    cta: "Get started",
    defaultProjectType: "web-app",
    features: [
      yes("Single Page Website"),
      yes("Mobile Responsive Design"),
      yes("Basic SEO Setup"),
      yes("Contact Form Integration"),
      yes("3 Revision Rounds"),
      yes("1 Month Free Support"),
      yes("Custom Domain Setup"),
      no("AI Chatbot Integration"),
      no("Advanced Analytics"),
      no("Priority 24/7 Support"),
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing businesses",
    priceUsd: 400,
    priceLabel: "$400",
    priceSuffix: "/project",
    priceKes: "≈ KES 50,000",
    popular: true,
    cta: "Go Pro",
    defaultProjectType: "web-app",
    features: [
      yes("Multi-Page Website / App"),
      yes("Mobile Responsive Design"),
      yes("Advanced SEO Optimization"),
      yes("Contact & Booking Forms"),
      yes("Unlimited Revisions"),
      yes("6 Months Free Support"),
      yes("Custom Domain + SSL"),
      yes("AI Chatbot Integration"),
      yes("Advanced Analytics Dashboard"),
      no("Priority 24/7 Support"),
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Full-scale digital transformation",
    priceUsd: null,
    priceLabel: "Custom",
    cta: "Contact sales",
    defaultProjectType: "custom",
    features: [
      yes("Full Custom Software System"),
      yes("Mobile App (Android & iOS)"),
      yes("Enterprise SEO & Marketing"),
      yes("All Form Integrations"),
      yes("Unlimited Revisions"),
      yes("12 Months Free Support"),
      yes("Custom Domain + SSL + CDN"),
      yes("AI Chatbot + Voice Assistant"),
      yes("Full Analytics & Reporting"),
      yes("Dedicated 24/7 Support Team"),
    ],
  },
];

export function getPlanById(id: string | null | undefined): PricingPlan | undefined {
  if (!id) return undefined;
  const normalized = id.trim().toLowerCase();
  return pricingPlans.find((plan) => plan.id === normalized);
}

/** Human-readable price line used in the WhatsApp inquiry and the form summary. */
export function formatPlanPrice(plan: PricingPlan): string {
  if (plan.priceUsd === null) return "Custom quote";
  return `${plan.priceLabel}${plan.priceSuffix ?? ""}${plan.priceKes ? ` (${plan.priceKes})` : ""}`;
}
