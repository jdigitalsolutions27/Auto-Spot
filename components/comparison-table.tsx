import { Card } from "@/components/ui/card";

const rows = [
  { feature: "Multi-point Inspection", essential: "Included", performance: "Included", signature: "Included" },
  { feature: "Battery + Charging Test", essential: "Basic", performance: "Advanced", signature: "Advanced" },
  { feature: "Alignment + Balancing", essential: "Optional", performance: "Optional", signature: "Included" },
  { feature: "Aircon System Check", essential: "Optional", performance: "Included", signature: "Included" },
  { feature: "Priority Scheduling", essential: "Standard", performance: "Standard", signature: "Priority" },
  { feature: "Post-Service QA Handoff", essential: "Basic", performance: "Detailed", signature: "Signature QA" },
];

export function ComparisonTable() {
  return (
    <Card className="overflow-hidden border-white/10 bg-slate-900/80">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead className="bg-slate-800/80 text-xs uppercase tracking-[0.12em] text-slate-300">
            <tr>
              <th className="px-6 py-4">Feature</th>
              <th className="px-6 py-4">Essential</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Signature</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-200">
            {rows.map((row) => (
              <tr key={row.feature} className="border-t border-white/10">
                <td className="px-6 py-4 text-slate-300">{row.feature}</td>
                <td className="px-6 py-4">{row.essential}</td>
                <td className="px-6 py-4">{row.performance}</td>
                <td className="px-6 py-4">{row.signature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

