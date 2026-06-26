import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, Clock, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ProLink Appliance Repair — certified, local technicians dedicated to fast, honest, warrantied appliance repair.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "10,000+", label: "Repairs completed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "Same-day", label: "Service available" },
  { value: "90-day", label: "Workmanship warranty" },
];

const values = [
  { icon: Clock, title: "Fast", body: "We respect your time with punctual arrivals and same-day service whenever possible." },
  { icon: ShieldCheck, title: "Trustworthy", body: "Background-checked, insured technicians and honest, upfront pricing — always." },
  { icon: Award, title: "Expert", body: "Factory-trained pros who repair all major brands to manufacturer standards." },
  { icon: Users, title: "Local", body: "We live and work here, and we treat every home like it's our own." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About ProLink Appliance Repair"
        subtitle="Your neighbors in fast, honest, expert appliance repair."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about/workshop.jpg"
              alt="Modern kitchen with stainless steel appliances serviced by ProLink"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built on doing right by our customers"
            />
            <div className="mt-5 space-y-4 text-slate-700">
              <p>
                {site.name}{" "}was founded on a simple idea: appliance repair should be fast,
                fair, and stress-free. Too many homeowners had been let down by no-shows,
                surprise fees, and repairs that didn&apos;t last.
              </p>
              <p>
                We set out to be different. Every member of our team is factory-trained,
                background-checked, and insured. We give you an upfront price before any work
                begins, carry common parts on the truck, and stand behind every repair with a
                90-day workmanship warranty.
              </p>
              <p>
                Today we&apos;re proud to be one of the most trusted appliance repair teams in
                the area — one fixed fridge, washer, and oven at a time.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-900 text-white">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-accent-400">{s.value}</div>
              <div className="mt-2 text-sm font-medium text-brand-100">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="Our Values" title="What we stand for" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
