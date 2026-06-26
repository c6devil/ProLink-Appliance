import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTA } from "@/components/sections/CTA";
import { getServices } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Appliance Repair Services",
  description:
    "Professional repair for refrigerators, washers, dryers, dishwashers, ovens, microwaves, freezers, and garbage disposals. Same-day service available.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        title="Appliance Repair Services"
        subtitle="Certified, warrantied repairs for every major appliance in your home."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesGrid services={services} heading={false} />
      <CTA />
    </>
  );
}
