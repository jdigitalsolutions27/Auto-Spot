"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

export function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
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
          {testimonials.map((item) => (
            <div key={item.id} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] xl:flex-[0_0_33.333%]">
              <article className="h-full rounded-2xl border border-white/10 bg-slate-900/75 p-5">
                <div className="mb-3 flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={`size-4 ${index < item.rating ? "fill-current" : "text-slate-600"}`} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{item.message}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      {item.vehicle} • {item.source}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

