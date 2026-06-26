import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";
import type { ServiceAreaData } from "@/lib/types";

export function ServiceAreasTeaser({ areas }: { areas: ServiceAreaData[] }) {
  if (!areas.length) return null;

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Service Areas"
          title="Proudly serving your neighborhood"
          description="Local technicians ready to help across the metro area."
        />
      </Reveal>
      <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
        {areas.map((a) => (
          <Link
            key={a.slug}
            href={`/service-areas/${a.slug}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-800 hover:shadow-md"
          >
            <MapPin className="h-4 w-4 text-accent-500" />
            {a.city}, {a.state}
          </Link>
        ))}
      </Reveal>
      <div className="mt-8 text-center">
        <Link
          href="/service-areas"
          className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-accent-600"
        >
          View all service areas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
