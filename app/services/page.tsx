import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ServicesBrowser } from "@/components/sections/services-browser";

export const metadata: Metadata = {
  title: "Services",
  description: "Browse premium auto maintenance, diagnostics, repairs, detailing, aircon, and tire services.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Catalog"
        title="Complete Auto Services"
        description="Category-driven service discovery with live filtering, sorting, and one-click booking actions."
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <ServicesBrowser />
        </div>
      </section>
    </>
  );
}

