import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getServiceAreaBySlug, getServices } from "@/lib/queries";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/structured-data";
import { site, telHref } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  if (!area) return { title: "Area Not Found" };
  return {
    title: `Appliance Repair in ${area.city}, ${area.state}`,
    description: `Same-day appliance repair in ${area.city}, ${area.state}. ${area.blurb}`,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function ServiceAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  if (!area) notFound();

  const services = await getServices();

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: area.city, path: `/service-areas/${area.slug}` },
          ]),
        ]}
      />
      <PageHero
        title={`Appliance Repair in ${area.city}, ${area.state}`}
        subtitle={area.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: area.city },
        ]}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <MapPin className="h-4 w-4" /> Serving {area.city} & nearby
            </span>
            <h2 className="mt-4 text-3xl font-bold text-brand-900">
              Trusted appliance repair, right in your neighborhood
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              When an appliance breaks down in {area.city}, you need a repair team that shows
              up fast and gets it right. Our local, certified technicians carry common parts on
              the truck so most repairs are completed in a single visit — all backed by our
              90-day workmanship warranty.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                `Same-day & next-day appointments throughout ${area.city}`,
                "Upfront, flat-rate pricing with no surprises",
                "Licensed, insured, background-checked technicians",
                "Repairs for all major brands",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book" variant="accent" size="lg">
                Book in {area.city}
              </Button>
              <Button href={telHref} variant="outline" size="lg">
                <Phone className="h-5 w-5" /> {site.phone}
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/areas/neighborhood.jpg"
              alt={`Homes in ${area.city}, ${area.state}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <ServicesGrid
        services={services}
        heading
        className="bg-slate-50"
      />
      <CTA title={`Need a repair in ${area.city}?`} />
    </>
  );
}
