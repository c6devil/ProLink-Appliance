import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/lib/icons";
import { serviceImage } from "@/lib/service-images";
import type { ServiceCardData } from "@/lib/types";

export function ServicesGrid({
  services,
  heading = true,
  className,
}: {
  services: ServiceCardData[];
  heading?: boolean;
  className?: string;
}) {
  return (
    <Section className={className}>
      {heading && (
        <SectionHeading
          eyebrow="Our Services"
          title="Expert repair for every appliance"
          description="From refrigerators to ovens, our certified technicians fix it all — quickly, cleanly, and affordably."
        />
      )}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 80}>
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl"
            >
              <Image
                src={serviceImage(s.slug)}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/5" />

              <div className="relative p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition-colors group-hover:bg-accent-500 group-hover:ring-accent-400">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="flex items-center gap-1.5 text-xl font-bold text-white">
                  {s.name}
                  <ArrowUpRight className="h-5 w-5 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-relaxed text-brand-100/90 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {s.shortDesc}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
