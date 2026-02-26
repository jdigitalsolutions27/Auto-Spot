import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import { PageTransition } from "@/components/motion/page-transition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | AUTO SPOT`,
      description: service.shortDescription,
      images: service.images[0] ? [{ url: service.images[0] }] : [],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const related = services.filter((item) => item.category === service.category && item.id !== service.id).slice(0, 3);
  const snippetReviews = testimonials.slice(0, 3);

  return (
    <PageTransition>
      <section className="relative isolate border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0">
          <Image src={service.images[0]} alt={service.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Badge variant="outline" className="border-amber-300/30 text-amber-200">
            {service.category}
          </Badge>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl text-white sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
              <Link href={`/booking?service=${service.slug}`}>Book This Service</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link href={`/quote?service=${service.slug}`}>Get Instant Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-semibold text-white">What&apos;s Included</h2>
              <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                {service.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 text-amber-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-semibold text-white">Benefits</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {service.benefits.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>

            {service.symptoms?.length ? (
              <article className="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-6">
                <h2 className="text-xl font-semibold text-amber-100">Common Symptoms We Check</h2>
                <ul className="mt-4 grid gap-2 text-sm text-amber-50/90 sm:grid-cols-2">
                  {service.symptoms.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CircleAlert className="mt-0.5 size-4 text-amber-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>

          <aside className="space-y-4">
            <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="text-lg font-semibold text-white">Pricing Range</h3>
              <p className="mt-2 text-3xl font-bold text-amber-200">{service.startingPriceRange}</p>
              <p className="mt-2 text-xs text-slate-400">Final pricing depends on inspection results and vehicle condition.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <Clock3 className="size-4 text-amber-300" />
                Estimated time: {service.duration}
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="text-lg font-semibold text-white">Mini Reviews</h3>
              <div className="mt-3 space-y-3">
                {snippetReviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                    <p className="text-sm text-slate-200">{review.message}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {review.name} • {review.vehicle}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>

      <section className="section-pad border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-white">Related Services</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.slug}`}
                className="rounded-xl border border-white/10 bg-slate-900/80 p-4 transition hover:border-amber-300/40"
              >
                <p className="text-sm text-amber-200">{item.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

