import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent per-project pricing from Quantum Code Technologies: Basic ($200), Pro ($400) and custom Enterprise software plans.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
