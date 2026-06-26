import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about ProLink Appliance Repair — pricing, warranties, brands, scheduling, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about booking a repair with ProLink."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <FAQ items={faqs} heading={false} />
      <CTA />
    </>
  );
}
