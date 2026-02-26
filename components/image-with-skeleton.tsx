"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ImageWithSkeleton({ className, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded ? <Skeleton className="absolute inset-0 bg-slate-800/70" /> : null}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900 text-center text-xs text-slate-400">
          <AlertTriangle className="size-4 text-amber-300" />
          <span>Image unavailable</span>
        </div>
      ) : null}
      <Image
        {...props}
        alt={alt}
        className={cn("h-full w-full object-cover transition duration-500", loaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}
