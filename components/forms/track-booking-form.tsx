"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { TimelineSteps } from "@/components/timeline-steps";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookingRecord } from "@/lib/types";

const schema = z.object({
  reference: z.string().min(5, "Enter booking reference"),
});

type TrackValues = z.infer<typeof schema>;

const steps = ["Received", "Confirmed", "In Service", "Ready"];

export function TrackBookingForm() {
  const [booking, setBooking] = useState<BookingRecord | null>(null);

  const form = useForm<TrackValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      reference: "",
    },
  });

  const onSubmit = async (values: TrackValues) => {
    const response = await fetch(`/api/bookings?reference=${encodeURIComponent(values.reference)}`);
    if (!response.ok) {
      setBooking(null);
      toast.error("Reference not found");
      return;
    }
    const payload = (await response.json()) as { booking: BookingRecord };
    setBooking(payload.booking);
    toast.success("Booking status loaded");
  };

  const activeStep = booking ? Math.max(0, steps.indexOf(booking.status)) : undefined;

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-100">Booking Reference</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="AS-260226-AB12C"
                    className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
            <Search className="mr-2 size-4" />
            Track Booking
          </Button>
        </form>
      </Form>

      {booking ? (
        <div className="space-y-4 rounded-xl border border-white/10 bg-slate-950/60 p-5">
          <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <p>
              <span className="text-slate-500">Reference:</span> {booking.reference}
            </p>
            <p>
              <span className="text-slate-500">Service:</span> {booking.serviceName}
            </p>
            <p>
              <span className="text-slate-500">Vehicle:</span> {booking.make} {booking.model} ({booking.year})
            </p>
            <p>
              <span className="text-slate-500">Schedule:</span> {booking.date} at {booking.slot}
            </p>
          </div>
          <TimelineSteps steps={steps} activeStep={activeStep} />
        </div>
      ) : (
        <p className="text-sm text-slate-400">Use your reference to view progress: Received → Confirmed → In Service → Ready.</p>
      )}
    </div>
  );
}

