import { Phone, CalendarCheck } from "lucide-react";
import { site, telHref } from "@/lib/site";

/** Sticky bottom call/book bar shown on small screens — high-converting for repair. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <a
        href={telHref}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-brand-800"
      >
        <Phone className="h-5 w-5" />
        Call Now
      </a>
      <a
        href="/book"
        className="flex items-center justify-center gap-2 bg-accent-500 py-3.5 text-sm font-bold text-white"
      >
        <CalendarCheck className="h-5 w-5" />
        Book Online
      </a>
    </div>
  );
}
