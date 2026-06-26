import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { getServiceAreas } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "ProLink Appliance Repair proudly serves homeowners across the metro area with same-day appliance repair. Find your city.",
  alternates: { canonical: "/service-areas" },
};

export default async function ServiceAreasPage() {
  const areas = await getServiceAreas();

  return (
    <>
      <PageHero
        title="Areas We Serve"
        subtitle="Fast, local appliance repair across the metro area. Find your city below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/service-areas/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-brand-900">
                  {a.city}, {a.state}
                </h2>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{a.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-accent-600">
                Repair in {a.city}{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
