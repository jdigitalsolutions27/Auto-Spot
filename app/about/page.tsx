import type { Metadata } from "next";
import Image from "next/image";
import { Award, Target, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/business";
import { media, teamMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "About Our Shop",
  description: "AUTO SPOT brand story, shop standards, certifications, and team profiles.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-slate-950 py-14 sm:py-18">
        <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6">
          <Badge variant="outline" className="border-amber-300/30 text-amber-200">
            About AUTO SPOT
          </Badge>
          <h1 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl text-white sm:text-5xl">
            Built Around Precision, Transparency, and Customer Confidence
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            AUTO SPOT was built to deliver a modern automotive service experience where every job follows a documented process. We combine technical rigor with customer-first communication so owners can make decisions with confidence.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <Target className="mb-2 size-5 text-amber-300" />
            <h2 className="text-xl font-semibold text-white">Mission</h2>
            <p className="mt-2 text-sm text-slate-300">Deliver trustworthy service outcomes with no guesswork and clear inspection-based recommendations.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <Award className="mb-2 size-5 text-amber-300" />
            <h2 className="text-xl font-semibold text-white">Standards</h2>
            <p className="mt-2 text-sm text-slate-300">Use calibrated tools, quality-checked components, and multi-point QA before release.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <Users className="mb-2 size-5 text-amber-300" />
            <h2 className="text-xl font-semibold text-white">Culture</h2>
            <p className="mt-2 text-sm text-slate-300">Respect every customer, explain every recommendation, and maintain consistency in every handoff.</p>
          </article>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <Image
            src={media.aboutWorkshop}
            alt="AUTO SPOT workshop"
            width={1200}
            height={800}
            className="rounded-2xl border border-white/10 object-cover"
          />
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold text-white">Certifications & Tools</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <Badge key={item} variant="outline" className="border-amber-300/35 text-amber-200">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6">
          <h2 className="text-3xl font-semibold text-white">Meet the Team</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {teamMedia.map((member) => (
              <article key={member.name} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
                <Image src={member.image} alt={member.name} width={700} height={700} className="h-60 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-slate-300">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
