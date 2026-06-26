import { cn } from "@/lib/utils";
import { statusLabels } from "@/lib/utils";

const styles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-amber-100 text-amber-800",
  SCHEDULED: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-slate-200 text-slate-600",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
        styles[status] ?? "bg-slate-100 text-slate-700",
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
