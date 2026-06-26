"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export function FAQ({
  items,
  heading = true,
}: {
  items: readonly FaqItem[];
  heading?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      {heading && <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />}
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-semibold text-brand-900">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-brand-600 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-slate-600">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
