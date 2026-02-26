import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { OpenNowBadge } from "@/components/open-now-badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { businessInfo, businessHours } from "@/data/business";
import { navLinks } from "@/data/navigation";
import { toTel, toWhatsApp } from "@/lib/site";

export function SiteHeader() {
  const weekdayHours = businessHours.find((item) => item.day === "Monday");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-300 sm:px-6">
          <div className="hidden items-center gap-4 md:flex">
            <span>{businessInfo.phone}</span>
            <span className="text-slate-500">|</span>
            <span>{businessInfo.address}</span>
          </div>
          <div className="flex w-full items-center justify-between md:w-auto md:justify-end md:gap-4">
            <span className="hidden text-slate-400 sm:inline">
              Hours: {weekdayHours?.open}-{weekdayHours?.close}
            </span>
            <OpenNowBadge />
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="AUTO SPOT Home">
          <BrandLogo compact />
          <span className="font-[family-name:var(--font-heading)] text-base tracking-[0.18em] text-white sm:text-lg">
            AUTO SPOT
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
            <a href={toTel(businessInfo.phone)}>
              <PhoneCall className="mr-2 size-4" />
              Call
            </a>
          </Button>
          <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
            <Link href="/booking">Book Service</Link>
          </Button>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-white/20 bg-transparent text-white">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-slate-950 text-slate-100">
              <SheetHeader>
                <SheetTitle className="text-left text-white">
                  <Link href="/" className="inline-flex items-center gap-2.5" aria-label="AUTO SPOT Home">
                    <BrandLogo compact />
                    <span className="font-[family-name:var(--font-heading)] text-base tracking-[0.18em] text-white sm:text-lg">
                      AUTO SPOT
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 grid gap-3">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:border-amber-300/40 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-8 grid gap-3">
                <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                  <Link href="/booking">Book Service</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                  <a href={toWhatsApp(businessInfo.whatsapp, "Hi AUTO SPOT, I need assistance with my vehicle.")}>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
