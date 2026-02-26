import { Badge } from "@/components/ui/badge";
import { isBusinessOpen } from "@/lib/site";

export function OpenNowBadge() {
  const open = isBusinessOpen();
  return (
    <Badge
      className={open ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200" : "border-red-400/30 bg-red-500/15 text-red-200"}
    >
      <span className={`mr-2 size-2 rounded-full ${open ? "bg-emerald-300" : "bg-red-300"}`} />
      {open ? "Open Now" : "Closed"}
    </Badge>
  );
}

