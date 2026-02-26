import type { Metadata } from "next";
import Image from "next/image";

import { BookingForm } from "@/components/forms/booking-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Book your AUTO SPOT service with our premium 5-step booking flow and receive a reference instantly.",
};

export default function BookingPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <>
      <PageHero
        eyebrow="Book Service"
        title="Schedule Your Appointment"
        description="Guided 5-step booking with service selection, vehicle details, slot selection, notes, and optional photo upload."
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=1600&q=80"
              alt="Technician preparing service order"
              width={1600}
              height={820}
              className="h-52 w-full object-cover"
            />
          </div>
          <BookingForm initialServiceSlug={searchParams.service} />
        </div>
      </section>
    </>
  );
}
