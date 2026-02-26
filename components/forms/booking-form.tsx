"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus2, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { TimelineSteps } from "@/components/timeline-steps";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { businessInfo } from "@/data/business";
import { packages } from "@/data/packages";
import { services } from "@/data/services";
import { createIcsFile, toWhatsApp } from "@/lib/site";
import { useAppStore } from "@/lib/store";
import { BookingRecord } from "@/lib/types";

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Select a service"),
  packageId: z.string().optional(),
  vehicleType: z.enum(["Sedan", "SUV", "Pickup"]),
  make: z.string().min(2, "Enter vehicle make"),
  model: z.string().min(1, "Enter vehicle model"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Use a 4-digit year")
    .refine((value) => Number(value) >= 1990 && Number(value) <= new Date().getFullYear() + 1, "Year out of range"),
  date: z.string().min(1, "Select preferred date"),
  slot: z.string().min(1, "Select a time slot"),
  symptoms: z.array(z.string()).optional(),
  name: z.string().min(2, "Enter full name"),
  phone: z.string().min(7, "Enter valid phone number"),
  email: z.union([z.literal(""), z.string().email("Enter valid email")]).optional(),
  notes: z.string().optional(),
  photoName: z.string().optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

const slots = ["08:30 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

const symptomOptions = [
  "Check engine light",
  "Rough idle",
  "Brake noise",
  "AC weak cooling",
  "Steering vibration",
  "Unusual smell",
];

const steps = ["Service", "Vehicle", "Schedule", "Contact", "Notes"];

export function BookingForm({ initialServiceSlug }: { initialServiceSlug?: string }) {
  const draft = useAppStore((state) => state.bookingDraft);
  const setDraft = useAppStore((state) => state.setBookingDraft);
  const clearDraft = useAppStore((state) => state.clearBookingDraft);

  const defaultService = useMemo(
    () => services.find((service) => service.slug === initialServiceSlug)?.id ?? services[0]?.id ?? "",
    [initialServiceSlug]
  );
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<BookingRecord | null>(null);

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: draft.serviceId ?? defaultService,
      packageId: draft.packageId ?? "",
      vehicleType: (draft.vehicleType as BookingValues["vehicleType"]) ?? "Sedan",
      make: draft.make ?? "",
      model: draft.model ?? "",
      year: draft.year ?? "",
      date: draft.date ?? "",
      slot: draft.slot ?? "",
      symptoms: [],
      name: draft.name ?? "",
      phone: draft.phone ?? "",
      email: draft.email ?? "",
      notes: draft.notes ?? "",
      photoName: "",
    },
  });

  const selectedService = services.find((service) => service.id === form.watch("serviceId"));
  const isDiagnostics = selectedService?.category === "Diagnostics";

  const triggerStep = async () => {
    const fieldsByStep: Record<number, (keyof BookingValues)[]> = {
      1: ["serviceId", "packageId"],
      2: ["vehicleType", "make", "model", "year"],
      3: ["date", "slot"],
      4: ["name", "phone", "email"],
      5: ["notes", "photoName"],
    };
    const valid = await form.trigger(fieldsByStep[step]);
    if (!valid) return false;
    return true;
  };

  const handleNext = async () => {
    const valid = await triggerStep();
    if (!valid) return;

    setDraft(form.getValues());
    setStep((current) => Math.min(5, current + 1));
  };

  const onSubmit = async (values: BookingValues) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Could not create booking. Try again.");
      return;
    }

    const payload = (await response.json()) as { booking: BookingRecord };
    setResult(payload.booking);
    clearDraft();
    toast.success(`Booking confirmed with ref ${payload.booking.reference}`);
  };

  const handleIcsDownload = () => {
    if (!result) return;
    const startDate = new Date(`${result.date} ${result.slot}`);
    if (Number.isNaN(startDate.getTime())) {
      toast.error("Could not generate calendar file for this time slot.");
      return;
    }
    const ics = createIcsFile({
      title: `AUTO SPOT - ${result.serviceName}`,
      description: `Booking reference: ${result.reference}\nVehicle: ${result.make} ${result.model}`,
      location: businessInfo.address,
      startDate,
      durationMinutes: 90,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.reference}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Calendar file downloaded");
  };

  if (result) {
    const stepsView = ["Received", "Confirmed", "In Service", "Ready"];
    return (
      <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5 sm:p-7">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Booking Completed</p>
          <h3 className="text-2xl font-semibold text-white">Reference: {result.reference}</h3>
          <p className="text-sm text-slate-300">We have received your request and will confirm details shortly.</p>
        </div>
        <TimelineSteps steps={stepsView} activeStep={1} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild className="bg-emerald-500 text-emerald-50 hover:bg-emerald-400">
            <a
              href={toWhatsApp(
                businessInfo.whatsapp,
                `Hi AUTO SPOT, I submitted booking ${result.reference} for ${result.serviceName}.`
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mr-2 size-4" />
              Open in WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/15 bg-transparent text-slate-100 hover:bg-white/10"
            onClick={handleIcsDownload}
          >
            <CalendarPlus2 className="mr-2 size-4" />
            Add to Calendar (.ics)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5 sm:p-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Premium Booking Flow</p>
        <h3 className="text-2xl font-semibold text-white">Book Your Service in 5 Steps</h3>
      </div>

      <div className="space-y-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-amber-300 transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
        <p className="text-sm text-slate-400">Step {step} of 5</p>
      </div>

      <TimelineSteps steps={steps} activeStep={step - 1} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {step === 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-white/15 bg-slate-950/60 text-slate-100">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Optional Package</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-white/15 bg-slate-950/60 text-slate-100">
                          <SelectValue placeholder="No package" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No package</SelectItem>
                        {packages.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-slate-100">Vehicle type</FormLabel>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {["Sedan", "SUV", "Pickup"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => field.onChange(type)}
                          className={`rounded-xl border px-4 py-3 text-sm transition ${
                            field.value === type
                              ? "border-amber-300/50 bg-amber-300/20 text-amber-100"
                              : "border-white/15 text-slate-300 hover:border-white/30"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Make</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="Toyota"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Model</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="Camry"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="2022"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Preferred date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" className="border-white/15 bg-slate-950/60 text-slate-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Time slot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-white/15 bg-slate-950/60 text-slate-100">
                            <SelectValue placeholder="Choose time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {slots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isDiagnostics ? (
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-slate-100">Symptoms checklist (if applicable)</FormLabel>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {symptomOptions.map((symptom) => (
                          <FormField
                            key={symptom}
                            control={form.control}
                            name="symptoms"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                                <FormLabel className="text-sm text-slate-300">{symptom}</FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(symptom)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value ?? [];
                                      if (checked) {
                                        field.onChange([...current, symptom]);
                                      } else {
                                        field.onChange(current.filter((value) => value !== symptom));
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              ) : null}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Full name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="Jane Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="+1 555..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-slate-100">Email (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                        placeholder="you@email.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Notes for the technician</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe any extra details or concerns."
                        className="min-h-28 border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photoName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-100">Optional photo upload (mock)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        aria-label="Upload vehicle photo"
                        className="border-white/15 bg-slate-950/60 text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-amber-300 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-900"
                        onChange={(event) => {
                          const name = event.target.files?.[0]?.name ?? "";
                          field.onChange(name);
                        }}
                      />
                    </FormControl>
                    <p className="text-xs text-slate-500">File handling is UI-only in this demo flow.</p>
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {step < 5 ? (
              <Button type="button" onClick={handleNext} className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                Continue
              </Button>
            ) : (
              <Button type="submit" className="bg-emerald-500 text-emerald-50 hover:bg-emerald-400">
                <Check className="mr-2 size-4" />
                Submit Booking
              </Button>
            )}
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
                onClick={() => setStep((current) => Math.max(1, current - 1))}
              >
                Back
              </Button>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}

