import type { Metadata } from "next";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { OpenNowBadge } from "@/components/open-now-badge";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { businessHours, businessInfo } from "@/data/business";
import { toTel, toWhatsApp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AUTO SPOT by call, WhatsApp, or form. View map, business hours, and open status.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to AUTO SPOT"
        description="Call, message, or send your request through the contact form. We respond quickly during service hours."
      />
      <section className="section-pad">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={businessInfo.mapEmbedUrl}
                title="AUTO SPOT map"
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">Contact Details</h2>
                <OpenNowBadge />
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-amber-300" />
                  {businessInfo.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-amber-300" />
                  <a href={toTel(businessInfo.phone)} className="hover:text-white">
                    {businessInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 text-amber-300" />
                  <a href={`mailto:${businessInfo.email}`} className="hover:text-white">
                    {businessInfo.email}
                  </a>
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                  <a href={toTel(businessInfo.phone)}>Call Now</a>
                </Button>
                <Button asChild variant="outline" className="border-white/15 bg-transparent text-slate-100 hover:bg-white/10">
                  <a href={toWhatsApp(businessInfo.whatsapp, "Hi AUTO SPOT, I need assistance.")}>WhatsApp</a>
                </Button>
                <Button asChild variant="outline" className="border-white/15 bg-transparent text-slate-100 hover:bg-white/10">
                  <Link href="/booking">Book Service</Link>
                </Button>
              </div>
              <div className="mt-5 flex items-center gap-3 text-slate-400">
                <a aria-label="Instagram" href={businessInfo.social.instagram} className="hover:text-white">
                  <Instagram className="size-4" />
                </a>
                <a aria-label="Facebook" href={businessInfo.social.facebook} className="hover:text-white">
                  <Facebook className="size-4" />
                </a>
                <a aria-label="YouTube" href={businessInfo.social.youtube} className="hover:text-white">
                  <Youtube className="size-4" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <h3 className="text-xl font-semibold text-white">Business Hours</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {businessHours.map((item) => (
                  <li key={item.day} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>{item.day}</span>
                    <span>{item.closed ? "Closed" : `${item.open} - ${item.close}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

