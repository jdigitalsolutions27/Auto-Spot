"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gallery } from "@/data/gallery";

const resultItems = gallery.filter((item) => item.category === "Before/After").slice(0, 10);

export function ResultsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
          onClick={scrollPrev}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10"
          onClick={scrollNext}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {resultItems.map((item) => (
            <div key={item.id} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] xl:flex-[0_0_33.333%]">
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
                <ImageWithSkeleton src={item.image} alt={item.title} width={800} height={520} className="h-56 w-full" />
                <div className="space-y-2 p-4">
                  <Badge variant="outline" className="border-amber-300/30 text-amber-200">
                    {item.tag}
                  </Badge>
                  <p className="text-sm text-slate-200">{item.title}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

