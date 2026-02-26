"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { businessInfo } from "@/data/business";
import { serviceCategories } from "@/data/services";
import { formatPeso } from "@/lib/currency";
import { toWhatsApp } from "@/lib/site";

const addOns = [
  { id: "pickup", label: "Pickup & Drop", price: 1200 },
  { id: "express", label: "Express Priority Lane", price: 1800 },
  { id: "sanitization", label: "Cabin Sanitization", price: 900 },
  { id: "premium-fluids", label: "Premium Fluids Upgrade", price: 2200 },
];

const schema = z.object({
  vehicleType: z.enum(["Sedan", "SUV", "Pickup"]),
  category: z.string().min(1, "Select a service category"),
  addons: z.array(z.string()),
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(7, "Enter a valid phone number"),
});

type QuoteValues = z.infer<typeof schema>;

const basePriceMap: Record<string, number> = {
  Maintenance: 6500,
  Diagnostics: 7800,
  Repairs: 11500,
  Detailing: 9800,
  Aircon: 8400,
  Tires: 7200,
};

const typeMultiplierMap: Record<string, number> = {
  Sedan: 1,
  SUV: 1.2,
  Pickup: 1.25,
};

export function QuoteEstimator() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<QuoteValues | null>(null);

  const form = useForm<QuoteValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleType: "Sedan",
      category: "",
      addons: [],
      name: "",
      phone: "",
    },
  });

  const values = form.watch();

  const estimate = useMemo(() => {
    const base = basePriceMap[values.category] ?? 120;
    const multiplier = typeMultiplierMap[values.vehicleType] ?? 1;
    const addonsTotal = (values.addons ?? []).reduce((total, addonId) => {
      const addon = addOns.find((item) => item.id === addonId);
      return total + (addon?.price ?? 0);
    }, 0);
    const min = Math.round((base * multiplier + addonsTotal) * 0.9);
    const max = Math.round((base * multiplier + addonsTotal) * 1.3);
    return { min, max };
  }, [values.addons, values.category, values.vehicleType]);

  const progress = (step / 4) * 100;

  const handleNext = async () => {
    const fields =
      step === 1 ? ["vehicleType"] : step === 2 ? ["category"] : step === 3 ? ["addons"] : ["name", "phone"];
    const valid = await form.trigger(fields as (keyof QuoteValues)[]);
    if (!valid) return;
    setStep((current) => Math.min(4, current + 1));
  };

  const onSubmit = (formValues: QuoteValues) => {
    setSubmitted(formValues);
    toast.success("Quote estimate prepared");
  };

  const whatsappMessage = submitted
    ? `Hi AUTO SPOT, I need a quote.\nName: ${submitted.name}\nPhone: ${submitted.phone}\nVehicle: ${submitted.vehicleType}\nCategory: ${submitted.category}\nEstimate: ${formatPeso(estimate.min)} - ${formatPeso(estimate.max)}`
    : "";

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-slate-900/75 p-5 sm:p-7">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Guided Estimator</p>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-amber-300 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-slate-400">Step {step} of 4</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {step === 1 ? (
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-100">Select your vehicle type</FormLabel>
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
          ) : null}

          {step === 2 ? (
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-100">Choose service category</FormLabel>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {serviceCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => field.onChange(category)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          field.value === category
                            ? "border-amber-300/50 bg-amber-300/20 text-amber-100"
                            : "border-white/15 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          {step === 3 ? (
            <FormField
              control={form.control}
              name="addons"
              render={() => (
                <FormItem>
                  <FormLabel className="text-slate-100">Add optional upgrades</FormLabel>
                  <div className="space-y-2">
                    {addOns.map((addon) => (
                      <FormField
                        key={addon.id}
                        control={form.control}
                        name="addons"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                            <div>
                              <FormLabel className="text-sm text-slate-200">{addon.label}</FormLabel>
                              <p className="text-xs text-slate-400">+{formatPeso(addon.price)}</p>
                            </div>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(addon.id)}
                                onCheckedChange={(checked) => {
                                  const values = field.value ?? [];
                                  if (checked) {
                                    field.onChange([...values, addon.id]);
                                  } else {
                                    field.onChange(values.filter((value) => value !== addon.id));
                                  }
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        placeholder="Your name"
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
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
                    <FormLabel className="text-slate-100">Phone number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+1 555..."
                        className="border-white/15 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}

          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Estimated range</span>
              <span className="font-semibold text-amber-200">
                {formatPeso(estimate.min)} - {formatPeso(estimate.max)}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Final pricing is confirmed after physical inspection.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {step < 4 ? (
              <Button type="button" onClick={handleNext} className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                Next Step
              </Button>
            ) : (
              <Button type="submit" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                Generate Estimate
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
            {submitted ? (
              <Button asChild variant="outline" className="border-emerald-300/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25">
                <a href={toWhatsApp(businessInfo.whatsapp, whatsappMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 size-4" />
                  Send to WhatsApp
                </a>
              </Button>
            ) : null}
            {submitted ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="border border-white/15 text-slate-200 hover:bg-white/10">
                    <Sparkles className="mr-2 size-4" />
                    View Lead Summary
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-white/10 bg-slate-950 text-slate-100">
                  <DialogHeader>
                    <DialogTitle>Estimate Summary</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      {submitted.name}, your current estimate range is {formatPeso(estimate.min)} - {formatPeso(estimate.max)}.
                    </DialogDescription>
                  </DialogHeader>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>Vehicle: {submitted.vehicleType}</li>
                    <li>Category: {submitted.category}</li>
                    <li>Add-ons: {submitted.addons.length ? submitted.addons.join(", ") : "None selected"}</li>
                    <li>Phone: {submitted.phone}</li>
                  </ul>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
