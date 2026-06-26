import Image from "next/image";
import { Clock, DollarSign, ShieldCheck, Users, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";

export function ValueProps() {
  return (
    <Section className="mesh-light">
      <Reveal>
        <SectionHeading
          eyebrow="Why ProLink"
          title="Repairs done right, the first time"
          description="Thousands of local homeowners trust us to fix their appliances quickly, affordably, and with a smile."
        />
      </Reveal>

      <Reveal className="mt-14 grid gap-5 lg:auto-rows-[176px] lg:grid-cols-3">
        {/* Feature image tile */}
        <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 lg:col-span-2 lg:row-span-2">
          <Image
            src="/images/feature/homeowners.jpg"
            alt="Happy homeowners in their kitchen"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/90 via-brand-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
              ))}
              <span className="ml-2 text-sm font-semibold text-white/90">4.9/5 · 2,000+ reviews</span>
            </div>
            <h3 className="max-w-md text-2xl font-bold text-white sm:text-3xl">
              Trusted by thousands of homeowners across the metro
            </h3>
          </div>
        </div>

        {/* Same-day — accent gradient */}
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 p-6 text-white shadow-lg">
          <Clock className="h-7 w-7" />
          <div>
            <p className="text-lg font-bold">Same-Day Service</p>
            <p className="mt-1 text-sm text-white/85">Most repairs done in a single visit.</p>
          </div>
        </div>

        {/* Warranty */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <ShieldCheck className="h-7 w-7 text-brand-700" />
          <div>
            <p className="text-lg font-bold text-brand-900">90-Day Warranty</p>
            <p className="mt-1 text-sm text-slate-600">Workmanship guaranteed, parts covered.</p>
          </div>
        </div>

        {/* Upfront */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <DollarSign className="h-7 w-7 text-brand-700" />
          <div>
            <p className="text-lg font-bold text-brand-900">Upfront Pricing</p>
            <p className="mt-1 text-sm text-slate-600">Flat-rate quotes before any work begins.</p>
          </div>
        </div>

        {/* Certified — wide brand tile */}
        <div className="flex items-center justify-between gap-4 rounded-3xl bg-brand-900 p-6 text-white shadow-lg lg:col-span-2">
          <div>
            <p className="text-lg font-bold">Certified, Background-Checked Technicians</p>
            <p className="mt-1 text-sm text-brand-100/80">
              Factory-trained, licensed, and insured pros who respect your home.
            </p>
          </div>
          <Users className="hidden h-10 w-10 shrink-0 text-accent-400 sm:block" />
        </div>
      </Reveal>
    </Section>
  );
}
