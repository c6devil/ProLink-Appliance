import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <Section containerClassName="max-w-3xl">
        <div className="space-y-6 text-slate-700">
          <p className="text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>
          <p>
            These terms govern your use of {site.name}&apos;s website and services. This template
            is provided as a starting point and should be reviewed by a qualified attorney before
            launch.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Booking & estimates</h2>
          <p>
            Online bookings are requests for service and are confirmed by our team. A diagnostic
            fee may apply and, where applicable, is credited toward the cost of an approved
            repair. All repair prices are provided upfront before work begins.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Warranty</h2>
          <p>
            Repairs are backed by a 90-day workmanship warranty. Parts are covered by the
            manufacturer&apos;s warranty. The warranty does not cover new, unrelated issues or
            damage caused by misuse.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, our liability is limited to the amount paid
            for the service in question.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
