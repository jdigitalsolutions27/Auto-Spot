"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarCheck2, PhoneCall } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";

export function BookingWidget() {
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [phone, setPhone] = useState("");

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-amber-500/10 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <CalendarCheck2 className="size-4 text-amber-300" />
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">Quick Booking</p>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_auto]">
        <Select value={serviceSlug} onValueChange={setServiceSlug}>
          <SelectTrigger
            aria-label="Select service"
            className="h-11 w-full border-white/15 bg-slate-950/60 text-slate-100"
          >
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.slug}>
                {service.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Your phone number"
          className="h-11 w-full border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
          aria-label="Phone number"
        />
        <div className="grid grid-cols-2 gap-2 lg:flex">
          <Button asChild className="h-11 bg-amber-300 px-5 text-slate-950 hover:bg-amber-200">
            <Link href={`/booking?service=${serviceSlug}`}>Book Now</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 border-white/15 bg-transparent px-4 text-slate-200 hover:bg-white/10"
            onClick={() => {
              if (!phone.trim()) {
                toast.error("Enter your phone number for callback");
                return;
              }
              toast.success("Callback request captured. We will reach out shortly.");
            }}
          >
            <PhoneCall className="mr-1.5 size-4" />
            Callback
          </Button>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">Prefer fast response? Enter your number and tap Callback.</p>
    </div>
  );
}
