import { BadgeCheck, ShieldCheck, Wrench } from "lucide-react";

import { TimelineSteps } from "@/components/timeline-steps";
import { certifications } from "@/data/business";

export function TrustEngine() {
  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
      <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="mb-3 flex items-center gap-2 text-amber-300">
          <BadgeCheck className="size-4" />
          <h3 className="font-semibold text-white">Transparent Process</h3>
        </div>
        <TimelineSteps steps={["Inspection", "Estimate", "Approval", "Delivery"]} activeStep={1} compact />
      </article>
      <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="mb-3 flex items-center gap-2 text-amber-300">
          <Wrench className="size-4" />
          <h3 className="font-semibold text-white">Parts & Quality Promise</h3>
        </div>
        <p className="text-sm text-slate-300">
          We use quality-tested parts and documented fitting standards. Service recommendations are reviewed with you before work begins.
        </p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="mb-3 flex items-center gap-2 text-amber-300">
          <ShieldCheck className="size-4" />
          <h3 className="font-semibold text-white">Warranty / Guarantee Policy</h3>
        </div>
        <p className="text-sm text-slate-300">
          Support terms vary by service category and installed components. Your advisor confirms coverage details before completion.
        </p>
        <ul className="mt-3 space-y-1 text-xs text-slate-400">
          {certifications.slice(0, 3).map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
