import Image from "next/image";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center">
      {compact ? (
        <Image src="/auto-spot-mark.svg" alt="AUTO SPOT" width={38} height={38} className="size-9" priority />
      ) : (
        <Image src="/auto-spot-logo.svg" alt="AUTO SPOT" width={320} height={76} className="h-10 w-auto" priority />
      )}
    </span>
  );
}
