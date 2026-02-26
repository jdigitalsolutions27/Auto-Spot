"use client";

import { useMemo, useState } from "react";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";

const categories = ["All", "Before/After", "Shop", "Diagnostics", "Detailing", "Customer"] as const;

export function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (activeCategory === "All" ? gallery : gallery.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeCategory === category
                ? "border-amber-300/40 bg-amber-300/20 text-amber-100"
                : "border-white/15 text-slate-300 hover:border-white/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 12).map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <button className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 text-left">
                <ImageWithSkeleton src={item.image} alt={item.title} width={1000} height={700} className="h-48 w-full" />
                <div className="space-y-2 p-4">
                  <Badge variant="outline" className="border-amber-300/30 text-amber-200">
                    {item.category}
                  </Badge>
                  <p className="text-sm text-slate-200 transition group-hover:text-white">{item.title}</p>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-white/10 bg-slate-950 text-slate-100">
              <DialogTitle>{item.title}</DialogTitle>
              <ImageWithSkeleton src={item.image} alt={item.title} width={1400} height={900} className="h-[65vh] w-full rounded-xl" />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

