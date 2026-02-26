import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about AUTO SPOT services, pricing, bookings, and estimates.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything customers ask about services, estimates, booking, and support."
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80"
              alt="Customer support consultation"
              width={1200}
              height={680}
              className="h-52 w-full object-cover"
            />
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border border-white/10 px-4">
                <AccordionTrigger className="text-left text-sm text-slate-100">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-slate-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">Need a specific answer?</h2>
            <p className="mt-2 text-sm text-slate-300">Message us directly or start a guided booking to get service-specific support.</p>
            <div className="mt-4">
              <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                <Link href="/contact">Contact AUTO SPOT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
