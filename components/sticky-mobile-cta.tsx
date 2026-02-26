"use client";

import Link from "next/link";
import { CalendarCheck2, MessageCircle, Phone } from "lucide-react";

import { businessInfo } from "@/data/business";
import { toTel, toWhatsApp } from "@/lib/site";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-slate-950/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={toTel(businessInfo.phone)}
          className="flex items-center justify-center gap-1 rounded-lg border border-white/15 py-2 text-xs font-semibold text-white"
        >
          <Phone className="size-3.5" />
          Call
        </a>
        <a
          href={toWhatsApp(businessInfo.whatsapp, "Hi AUTO SPOT, I need assistance.")}
          className="flex items-center justify-center gap-1 rounded-lg border border-emerald-400/40 bg-emerald-500/15 py-2 text-xs font-semibold text-emerald-100"
        >
          <MessageCircle className="size-3.5" />
          WhatsApp
        </a>
        <Link
          href="/booking"
          className="flex items-center justify-center gap-1 rounded-lg bg-amber-300 py-2 text-xs font-semibold text-slate-900"
        >
          <CalendarCheck2 className="size-3.5" />
          Book
        </Link>
      </div>
    </div>
  );
}
