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
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(7, "Enter valid phone"),
  email: z.union([z.literal(""), z.string().email("Enter valid email")]),
  message: z.string().min(8, "Add your message"),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    toast.success(`Thanks ${values.name}, we received your message.`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
        <h3 className="text-xl font-semibold text-white">Send Us a Message</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-100">Name</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-100">Email (optional)</FormLabel>
              <FormControl>
                <Input {...field} className="border-white/15 bg-slate-950/60 text-slate-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-100">Message</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-28 border-white/15 bg-slate-950/60 text-slate-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
          Send Message
        </Button>
      </form>
    </Form>
  );
}

