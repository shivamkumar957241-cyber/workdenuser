import React from "react";
import PricingSection4 from "@/components/ui/pricing-section-4";

export const metadata = {
  title: "Pricing",
  description: "Our pricing plans",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <PricingSection4 />
    </main>
  );
}
