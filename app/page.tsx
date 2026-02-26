import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, Shield, Wrench } from "lucide-react";

import { BookingWidget } from "@/components/booking-widget";
import { LazySectionSkeleton } from "@/components/lazy-section-skeleton";
import { MaintenanceGuide } from "@/components/maintenance-guide";
import { PageTransition } from "@/components/motion/page-transition";
import { PackageCard } from "@/components/package-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TrustEngine } from "@/components/trust-engine";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { businessInfo, certifications, trustBadges } from "@/data/business";
import { faqs } from "@/data/faqs";
import { media } from "@/data/media";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { toWhatsApp } from "@/lib/site";

const ReviewsCarousel = dynamic(() => import("@/components/reviews-carousel").then((mod) => mod.ReviewsCarousel), {
  loading: () => <LazySectionSkeleton />,
});
const ResultsCarousel = dynamic(() => import("@/components/results-carousel").then((mod) => mod.ResultsCarousel), {
  loading: () => <LazySectionSkeleton />,
});

export const metadata: Metadata = {
  title: "Home",
  description: "AUTO SPOT premium diagnostics, maintenance, repairs, and detailing with instant quote and booking flow.",
  openGraph: {
    title: "AUTO SPOT | Premium Auto Care. Precision Service.",
    description: "Diagnostics, maintenance, and detailing done right with transparent process and trusted quality.",
  },
};

const heroImage = media.homeHero;

const howItWorks = [
  {
    title: "Book or Quote in Minutes",
    description: "Use our guided booking and instant estimate flow tailored to your vehicle and needs.",
    icon: Gauge,
  },
  {
    title: "Transparent Inspection",
    description: "We check, document, and explain recommended work before any service proceeds.",
    icon: CheckCircle2,
  },
  {
    title: "Precision Delivery",
    description: "Final QA checks and clear handoff notes so you drive away informed and confident.",
    icon: Shield,
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image
          src={heroImage}
          alt="Premium auto service bay"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/45" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:py-24 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-7">
            <Badge variant="outline" className="border-amber-300/40 text-amber-200">
              Premium Automotive Experience
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-4xl leading-tight text-white sm:text-6xl">
                Premium Auto Care. Precision Service.
              </h1>
              <p className="max-w-xl text-base text-slate-200 sm:text-lg">
                Diagnostics, maintenance, and detailing - done right. Built for trust, transparency, and repeat confidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                <Link href="/booking">
                  Book Service
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                <Link href="/quote">Instant Quote</Link>
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {trustBadges.slice(0, 3).map((badge) => (
                <div key={badge} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  {badge}
                </div>
              ))}
            </div>
          </div>
          <div className="self-start">
            <BookingWidget />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="Featured Services"
            title="Most Booked Services"
            description="High-demand services designed around reliable turnaround and documented quality checks."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="Built for Clarity from Day One"
            description="A conversion-focused process that keeps customers informed at every step."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {howItWorks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <item.icon className="mb-3 size-5 text-amber-300" />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Instant Quote"
              title="Estimate in Under 60 Seconds"
              description="Vehicle type, service category, and add-ons produce an instant range with a clear inspection disclaimer."
            />
            <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
              <Link href="/quote">Open Estimator</Link>
            </Button>
          </div>
          <TrustEngine />
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="Packages"
            title="Maintenance & Detailing Tiers"
            description="Clear package inclusions to speed up decision-making and reduce booking friction."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.slice(0, 3).map((item, index) => (
              <PackageCard key={item.id} item={item} featured={index === 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="Before / After"
            title="Real Service Outcomes"
            description="Cinematic results from detailing and restoration sessions."
          />
          <ResultsCarousel />
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="Reviews"
            title="Trusted by Daily Drivers and Enthusiasts"
            description="Google-style feedback cards with customer vehicle context."
          />
          <ReviewsCarousel />
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
          <SectionHeading
            eyebrow="Standards"
            title="Our Tools & Technical Standards"
            description="A precision-first environment with modern diagnostics and quality-control handoffs."
          />
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={media.toolsStandards}
                alt="Tools and workshop standards"
                width={1300}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-3">
              {certifications.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-200">
                  <Wrench className="size-4 text-amber-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions Customers Ask Most"
              description="Straight answers to booking, pricing, parts, and turnaround expectations."
            />
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.slice(0, 6).map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border border-white/10 px-4">
                  <AccordionTrigger className="text-left text-sm text-slate-100">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="space-y-6">
            <MaintenanceGuide />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={businessInfo.mapEmbedUrl}
              title="AUTO SPOT map location"
              className="h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h3 className="text-2xl font-semibold text-white">Visit AUTO SPOT</h3>
            <p className="mt-2 text-sm text-slate-300">{businessInfo.address}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                <Link href="/contact">Get Directions</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-transparent text-slate-100 hover:bg-white/10">
                <a href={toWhatsApp(businessInfo.whatsapp, "Hi AUTO SPOT, I need assistance with my vehicle.")}>WhatsApp Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
