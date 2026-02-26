"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  company: z.string().min(2, "Enter company name"),
  contactPerson: z.string().min(2, "Enter contact person"),
  phone: z.string().min(7, "Enter valid phone"),
  vehiclesCount: z.string().min(1, "Enter vehicle count"),
  needs: z.string().min(10, "Add a short requirement summary"),
});

type FleetInquiryValues = z.infer<typeof schema>;

export function FleetInquiryForm() {
  const form = useForm<FleetInquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      contactPerson: "",
      phone: "",
      vehiclesCount: "",
      needs: "",
    },
  });

  const onSubmit = (values: FleetInquiryValues) => {
    toast.success(`Fleet inquiry received for ${values.company}`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
        <h3 className="text-xl font-semibold text-white">Fleet Inquiry</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-100">Company</FormLabel>
                <FormControl>
                  <Input {...field} className="border-white/15 bg-slate-950/60 text-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-100">Contact Person</FormLabel>
                <FormControl>
                  <Input {...field} className="border-white/15 bg-slate-950/60 text-slate-100" />
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
                  <Input {...field} className="border-white/15 bg-slate-950/60 text-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehiclesCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-100">Vehicle Count</FormLabel>
                <FormControl>
                  <Input {...field} className="border-white/15 bg-slate-950/60 text-slate-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="needs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-100">Service Needs</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-28 border-white/15 bg-slate-950/60 text-slate-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
          Submit Fleet Inquiry
        </Button>
      </form>
    </Form>
  );
}

