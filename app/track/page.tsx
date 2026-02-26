import type { Metadata } from "next";
import Image from "next/image";

import { TrackBookingForm } from "@/components/forms/track-booking-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Track Booking",
  description: "Track your AUTO SPOT booking reference and follow service progress from received to ready.",
};

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Portal"
        title="Track Your Booking"
        description="Enter your reference number to view live status progression from intake to ready-for-pickup."
      />
      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
          <TrackBookingForm />
          <aside className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
                alt="Vehicle service progress"
                width={1200}
                height={760}
                className="h-48 w-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white">Portal Notes</h2>
            <p className="text-sm text-slate-300">
              Use the booking reference from your confirmation page. Status updates move from intake to ready-for-pickup.
            </p>
            <p className="text-xs text-slate-500">Sample reference format: AS-260226-AB12C</p>
          </aside>
        </div>
      </section>
    </>
  );
}
