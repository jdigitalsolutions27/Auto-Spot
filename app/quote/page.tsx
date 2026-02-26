import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { QuoteEstimator } from "@/components/quote-estimator";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Instant Quote",
  description: "Guided estimate tool for AUTO SPOT services with vehicle type, add-ons, and lead capture.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant Quote"
        title="Get a Guided Estimate in Minutes"
        description="Select your vehicle type, service category, and optional add-ons to see an instant estimate range before booking."
      />
      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <QuoteEstimator />
          <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1486006920555-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
                alt="Diagnostic consultation"
                width={1200}
                height={720}
                className="h-44 w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">Why Customers Use This Tool</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Clear expected range before inspection</li>
              <li>• Add-on visibility for better planning</li>
              <li>• Lead capture with instant WhatsApp handoff</li>
              <li>• Built to reduce booking hesitation</li>
            </ul>
            <p className="text-xs text-slate-500">Final pricing is always confirmed after physical inspection and diagnostic verification.</p>
            <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
              <Link href="/booking">Continue to Booking</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
