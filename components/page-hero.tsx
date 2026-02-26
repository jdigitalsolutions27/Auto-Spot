import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-white/10 bg-slate-950 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {eyebrow ? (
          <Badge variant="outline" className="mb-4 border-amber-300/30 text-amber-200">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>
      </div>
    </section>
  );
}

