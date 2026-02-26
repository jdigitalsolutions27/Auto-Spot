import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-3", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">{eyebrow}</p>
      ) : null}
      <h2 className="font-[family-name:var(--font-heading)] text-3xl text-white sm:text-4xl">{title}</h2>
      {description ? <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p> : null}
    </div>
  );
}

