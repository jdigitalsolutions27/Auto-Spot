"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ServiceCard } from "@/components/service-card";
import { ServiceGridSkeleton } from "@/components/service-grid-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceCategories, services } from "@/data/services";

type SortOption = "popular" | "price-asc" | "price-desc" | "duration";

const sortLabels: Record<SortOption, string> = {
  popular: "Popular First",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  duration: "Duration",
};

function parseStartPrice(value: string) {
  const match = value.match(/\d[\d,]*/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

export function ServicesBrowser() {
  const [category, setCategory] = useState<(typeof serviceCategories)[number] | "All">("All");
  const [sort, setSort] = useState<SortOption>("popular");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState<"Sedan" | "SUV" | "Pickup">("Sedan");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 280);
    return () => clearTimeout(timeout);
  }, [category, sort, search]);

  const filtered = useMemo(() => {
    const byCategory = category === "All" ? services : services.filter((service) => service.category === category);
    const bySearch = byCategory.filter((service) =>
      `${service.title} ${service.shortDescription} ${service.category}`.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...bySearch];
    if (sort === "price-asc") sorted.sort((a, b) => parseStartPrice(a.startingPriceRange) - parseStartPrice(b.startingPriceRange));
    if (sort === "price-desc") sorted.sort((a, b) => parseStartPrice(b.startingPriceRange) - parseStartPrice(a.startingPriceRange));
    if (sort === "duration") sorted.sort((a, b) => a.duration.localeCompare(b.duration));
    if (sort === "popular") sorted.sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));

    return sorted;
  }, [category, search, sort]);

  const recommended = useMemo(() => {
    const base = vehicleType === "Sedan" ? ["Maintenance", "Diagnostics"] : vehicleType === "SUV" ? ["Tires", "Maintenance"] : ["Repairs", "Diagnostics"];
    return services.filter((service) => base.includes(service.category)).slice(0, 3);
  }, [vehicleType]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search services..."
            className="border-white/15 bg-slate-900/70 pl-10 text-slate-100 placeholder:text-slate-500"
            aria-label="Search services"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-white/15 bg-transparent text-slate-100 hover:bg-white/10">
              Sort: {sortLabels[sort]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-white/10 bg-slate-950 text-slate-100">
            {(Object.keys(sortLabels) as SortOption[]).map((option) => (
              <DropdownMenuItem key={option} onClick={() => setSort(option)}>
                {sortLabels[option]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-1">
          {(["Sedan", "SUV", "Pickup"] as const).map((type) => (
            <button
              key={type}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                vehicleType === type ? "bg-amber-300 text-slate-900" : "text-slate-300 hover:text-white"
              }`}
              onClick={() => setVehicleType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Tabs value={category} onValueChange={(value) => setCategory(value as typeof category)}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger value="All" className="border border-white/15 bg-slate-900/70 text-slate-200 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900">
            All
          </TabsTrigger>
          {serviceCategories.map((item) => (
            <TabsTrigger
              key={item}
              value={item}
              className="border border-white/15 bg-slate-900/70 text-slate-200 data-[state=active]:bg-amber-300 data-[state=active]:text-slate-900"
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading ? (
        <ServiceGridSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/75 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Recommended for your vehicle</h3>
          <Badge variant="outline" className="border-amber-300/30 text-amber-200">
            {vehicleType}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
