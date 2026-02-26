import Link from "next/link";
import { Gauge } from "lucide-react";

import { Button } from "@/components/ui/button";
import { maintenanceGuide } from "@/data/maintenanceGuide";

export function MaintenanceGuide() {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <Gauge className="size-4 text-amber-300" />
        <h3 className="text-xl font-semibold text-white">Mileage-Based Maintenance Guide</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {maintenanceGuide.map((step) => (
          <article key={step.mileage} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-sm font-semibold text-amber-200">{step.mileage}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              {step.services.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">{step.note}</p>
          </article>
        ))}
      </div>
      <Button asChild className="mt-5 bg-amber-300 text-slate-950 hover:bg-amber-200">
        <Link href="/booking">Book Recommended Service</Link>
      </Button>
    </section>
  );
}

