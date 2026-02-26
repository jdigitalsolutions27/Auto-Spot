import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ServicePackage } from "@/lib/types";

export function PackageCard({ item, featured = false }: { item: ServicePackage; featured?: boolean }) {
  return (
    <Card className={`border-white/10 bg-slate-900/80 text-slate-100 ${featured ? "ring-1 ring-amber-300/40" : ""}`}>
      {item.image ? <ImageWithSkeleton src={item.image} alt={item.name} width={1200} height={640} className="h-40 w-full" /> : null}
      <CardHeader className="space-y-3">
        <Badge variant="outline" className="w-fit border-amber-300/30 text-amber-200">
          {item.type}
        </Badge>
        <CardTitle className="text-2xl">{item.name}</CardTitle>
        <p className="text-sm text-slate-300">{item.idealFor}</p>
        <p className="text-2xl font-bold text-white">{item.priceRange}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-400">Turnaround: {item.turnaround}</p>
        <ul className="space-y-2 text-sm text-slate-300">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-300" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid gap-2 sm:grid-cols-2">
        <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
          <Link href="/booking">Book Package</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
          <Link href="/quote">Get Quote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
