import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function TimelineSteps({
  steps,
  activeStep,
  compact = false,
}: {
  steps: string[];
  activeStep?: number;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <ol className="space-y-2">
        {steps.map((step, index) => {
          const state = activeStep !== undefined && index <= activeStep;
          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2",
                state ? "border-emerald-300/25 bg-emerald-500/10" : "border-white/10 bg-slate-900/65"
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                  state ? "border-emerald-300/35 bg-emerald-500/20 text-emerald-100" : "border-white/20 text-slate-300"
                )}
              >
                {state ? <CheckCircle2 className="size-3.5" /> : index + 1}
              </span>
              <span className="text-sm font-medium text-slate-100">{step}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => {
        const state = activeStep !== undefined && index <= activeStep;
        return (
          <li key={step} className="relative rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span
                className={cn(
                  "shrink-0 flex size-6 items-center justify-center rounded-full border text-xs",
                  state ? "border-emerald-300/30 bg-emerald-500/20 text-emerald-100" : "border-white/20 text-slate-300"
                )}
              >
                {state ? <CheckCircle2 className="size-3.5" /> : index + 1}
              </span>
              <span className="min-w-0">{step}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
