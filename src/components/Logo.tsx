import { cn } from "@/lib/utils";

/** ProLink wordmark with a chain-link + wrench mark. */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="ProLink logo"
      >
        <rect width="40" height="40" rx="9" fill={light ? "#ffffff" : "#1e3a8a"} />
        <path
          d="M14.5 25.5 L25.5 14.5"
          stroke={light ? "#1e3a8a" : "#ffffff"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 23a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1"
          stroke="#f97316"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M23 17a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l1-1"
          stroke={light ? "#ffffff" : "#ffffff"}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight",
            light ? "text-white" : "text-brand-900",
          )}
        >
          ProLink
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.18em]",
            light ? "text-brand-100" : "text-accent-600",
          )}
        >
          Appliance Repair
        </span>
      </span>
    </span>
  );
}
