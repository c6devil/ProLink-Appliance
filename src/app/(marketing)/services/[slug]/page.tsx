import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon } from "@/lib/icons";
import { serviceImage } from "@/lib/service-images";
import { getServiceBySlug, getServices } from "@/lib/queries";
import { serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import { site, telHref } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.name,
    description: service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const others = (await getServices()).filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        title={service.name}
        subtitle={service.shortDesc}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src={serviceImage(service.slug)}
                alt={service.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
              <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </div>
            </div>
            <p className="text-lg leading-relaxed text-slate-700">{service.longDesc}</p>

            <h2 className="mt-10 text-2xl font-bold text-brand-900">Problems we fix</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.symptoms.map((sym) => (
                <li key={sym} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-slate-700">{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-brand-900">Need it fixed today?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Book online for the next available appointment, or call us for same-day service.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href="/book" variant="accent" size="lg">
                  Book {service.name}
                </Button>
                <Button href={telHref} variant="outline" size="lg">
                  <Phone className="h-5 w-5" /> {site.phone}
                </Button>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" /> Same-day & next-day slots
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" /> Upfront, flat-rate pricing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" /> 90-day workmanship warranty
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section className="bg-slate-50">
          <SectionHeading title="Other services" align="left" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ServiceIcon name={o.icon} className="h-6 w-6" />
                </div>
                <span className="font-semibold text-brand-900">{o.name}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-brand-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTA />
    </>
  );
}
