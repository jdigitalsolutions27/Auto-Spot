"use client";

import Link from "next/link";
import { Heart, Scale, Timer } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const favorites = useAppStore((state) => state.favorites);
  const comparisons = useAppStore((state) => state.comparisons);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const toggleComparison = useAppStore((state) => state.toggleComparison);

  const isFavorite = favorites.includes(service.id);
  const inComparison = comparisons.includes(service.id);

  return (
    <Card className="group border-white/10 bg-slate-900/80 text-slate-100">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="border-amber-300/30 text-amber-200">
            {service.category}
          </Badge>
          <div className="flex items-center gap-2">
            <button
              aria-label="Add to favorites"
              onClick={() => {
                toggleFavorite(service.id);
                toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
              }}
              className={cn(
                "rounded-md border p-1.5 transition",
                isFavorite ? "border-rose-400/40 bg-rose-500/15 text-rose-200" : "border-white/15 text-slate-300 hover:text-white"
              )}
            >
              <Heart className={cn("size-4", isFavorite && "fill-current")} />
            </button>
            <button
              aria-label="Compare service"
              onClick={() => {
                toggleComparison(service.id);
                toast.success(inComparison ? "Removed from comparison" : "Added to comparison");
              }}
              className={cn(
                "rounded-md border p-1.5 transition",
                inComparison
                  ? "border-sky-400/40 bg-sky-500/15 text-sky-200"
                  : "border-white/15 text-slate-300 hover:text-white"
              )}
            >
              <Scale className="size-4" />
            </button>
          </div>
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <p className="text-sm text-slate-300">{service.shortDescription}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Timer className="size-4 text-amber-300" />
          <span>{service.duration}</span>
        </div>
        <p className="text-lg font-semibold text-white">{service.startingPriceRange}</p>
        <ul className="space-y-1 text-sm text-slate-400">
          {service.inclusions.slice(0, 3).map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid gap-2 sm:grid-cols-2">
        <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
          <Link href={`/booking?service=${service.slug}`}>Book</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
          <Link href={`/quote?service=${service.slug}`}>Get Quote</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="col-span-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Link href={`/services/${service.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

