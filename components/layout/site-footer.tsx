import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { businessInfo } from "@/data/business";
import { footerLinks, navLinks } from "@/data/navigation";
import { toTel, toWhatsApp } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="space-y-3">
          <Link href="/" aria-label="AUTO SPOT Home" className="inline-flex">
            <BrandLogo />
          </Link>
          <p className="text-sm text-slate-400">Premium auto care and diagnostics designed for confidence.</p>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Phone className="size-4" />
            <a className="hover:text-white" href={toTel(businessInfo.phone)}>
              {businessInfo.phone}
            </a>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <MapPin className="mt-0.5 size-4" />
            <span>{businessInfo.address}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Navigation</h4>
          <div className="mt-4 grid gap-2 text-sm">
            {navLinks.slice(0, 6).map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-400 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Customer</h4>
          <div className="mt-4 grid gap-2 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-400 transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <a
              href={toWhatsApp(businessInfo.whatsapp, "Hi AUTO SPOT, I need help with booking.")}
              className="text-slate-400 transition hover:text-white"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Newsletter</h4>
          <p className="text-sm text-slate-400">Get service reminders and maintenance tips.</p>
          <div className="flex rounded-xl border border-white/10 bg-slate-900 p-1">
            <input
              aria-label="Email address"
              placeholder="Your email"
              className="h-10 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none"
            />
            <button
              type="button"
              className="rounded-lg bg-amber-300 px-3 text-sm font-medium text-slate-900 transition hover:bg-amber-200"
            >
              Join
            </button>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <a aria-label="Instagram" href={businessInfo.social.instagram} className="hover:text-white">
              <Instagram className="size-4" />
            </a>
            <a aria-label="Facebook" href={businessInfo.social.facebook} className="hover:text-white">
              <Facebook className="size-4" />
            </a>
            <a aria-label="YouTube" href={businessInfo.social.youtube} className="hover:text-white">
              <Youtube className="size-4" />
            </a>
            <a aria-label="Email" href={`mailto:${businessInfo.email}`} className="hover:text-white">
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 lg:px-6">
          <span>© {new Date().getFullYear()} AUTO SPOT. All rights reserved.</span>
          <span>Final pricing is confirmed after inspection.</span>
        </div>
      </div>
    </footer>
  );
}

