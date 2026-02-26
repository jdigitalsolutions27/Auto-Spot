import type { Metadata } from "next";
import Image from "next/image";

import { ComparisonTable } from "@/components/comparison-table";
import { PackageCard } from "@/components/package-card";
import { PageHero } from "@/components/page-hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description: "Transparent package ranges for maintenance and detailing. Final pricing is confirmed after inspection.",
};

export default function PricingPage() {
  const maintenancePackages = packages.filter((item) => item.type === "Maintenance");
  const detailingPackages = packages.filter((item) => item.type === "Detailing");
  const fleetPackages = packages.filter((item) => item.type === "Fleet");

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent Pricing & Packages"
        description="Choose a package that matches your vehicle goals. Pricing ranges are guidance and can vary by vehicle condition and inspection outcomes."
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1400&q=80"
                alt="AUTO SPOT premium service bay"
                width={1400}
                height={860}
                className="h-full w-full object-cover"
              />
            </div>
            <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-semibold text-white">Transparent Package Strategy</h2>
              <p className="mt-3 text-sm text-slate-300">
                Every package has clear inclusions, expected turnaround, and upfront pricing ranges in Philippine peso to reduce booking hesitation.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Maintenance, detailing, and fleet tiers</li>
                <li>• Inspection-first final pricing confirmation</li>
                <li>• Upgrade options discussed before work starts</li>
              </ul>
            </article>
          </div>

          <Tabs defaultValue="maintenance" className="space-y-6">
            <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
              <TabsTrigger value="maintenance" className="border border-white/15 bg-slate-900/70 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
                Maintenance Packages
              </TabsTrigger>
              <TabsTrigger value="detailing" className="border border-white/15 bg-slate-900/70 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
                Detailing Packages
              </TabsTrigger>
              <TabsTrigger value="fleet" className="border border-white/15 bg-slate-900/70 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
                Fleet Programs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="maintenance">
              <div className="grid gap-4 lg:grid-cols-3">
                {maintenancePackages.map((item, index) => (
                  <PackageCard key={item.id} item={item} featured={index === 2} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="detailing">
              <div className="grid gap-4 lg:grid-cols-3">
                {detailingPackages.map((item, index) => (
                  <PackageCard key={item.id} item={item} featured={index === 2} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fleet">
              <div className="grid gap-4 lg:grid-cols-2">
                {fleetPackages.map((item) => (
                  <PackageCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Package Comparison</h2>
            <ComparisonTable />
          </div>

          <p className="text-sm text-slate-400">
            Disclaimer: Listed price ranges are estimates only. Final pricing is confirmed after on-site inspection and service advisor review.
          </p>
        </div>
      </section>
    </>
  );
}
