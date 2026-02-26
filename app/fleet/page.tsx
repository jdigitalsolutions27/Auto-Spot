import type { Metadata } from "next";
import Image from "next/image";
import { Building2, CalendarClock, ClipboardList, Gauge, ShieldCheck } from "lucide-react";

import { FleetInquiryForm } from "@/components/forms/fleet-inquiry-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Fleet Services",
  description: "AUTO SPOT fleet and corporate service programs with preventive planning, reporting, and priority lanes.",
};

const benefits = [
  { title: "Preventive Schedule Control", description: "Mileage and usage-based planning to reduce downtime.", icon: CalendarClock },
  { title: "Fleet Health Reporting", description: "Structured service logs and condition summaries.", icon: ClipboardList },
  { title: "Priority Service Lanes", description: "Reserved time windows for operational continuity.", icon: Gauge },
  { title: "Account-Level Service Advisor", description: "Dedicated point of contact for approvals and planning.", icon: Building2 },
  { title: "Quality and Safety Standards", description: "Consistent procedures across every fleet visit.", icon: ShieldCheck },
];

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet / Corporate"
        title="Service Programs for Business Fleets"
        description="Designed for uptime, predictable maintenance cycles, and centralized reporting for operations teams."
      />
      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1300&q=80"
                alt="Fleet service lane"
                width={1300}
                height={760}
                className="h-52 w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">Fleet Benefits</h2>
            <div className="grid gap-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                  <benefit.icon className="mb-2 size-4 text-amber-300" />
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm text-slate-300">{benefit.description}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-slate-400">
              Fleet pricing is quoted based on service scope, fleet size, and operational schedule requirements.
            </p>
          </div>
          <FleetInquiryForm />
        </div>
      </section>
    </>
  );
}
