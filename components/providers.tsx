"use client";

import { Toaster } from "@/components/ui/sonner";

export function Providers() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "border-white/10 bg-slate-900 text-slate-100",
        },
      }}
    />
  );
}

