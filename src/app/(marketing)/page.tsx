import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValueProps } from "@/components/sections/ValueProps";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureGuarantee } from "@/components/sections/FeatureGuarantee";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreasTeaser } from "@/components/sections/ServiceAreasTeaser";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import {
  getFeaturedServices,
  getServiceAreas,
  getPublishedTestimonials,
  getRatingSummary,
} from "@/lib/queries";
import { localBusinessSchema, faqSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, areas, testimonials, rating] = await Promise.all([
    getFeaturedServices(),
    getServiceAreas(),
    getPublishedTestimonials(),
    getRatingSummary(),
  ]);

  return (
    <>
      <JsonLd data={[localBusinessSchema(rating), faqSchema(faqs)]} />
      <Hero />
      <TrustBar />
      <ValueProps />
      <ServicesGrid services={services} />
      <FeatureGuarantee />
      <HowItWorks />
      <StatsBand />
      <Testimonials testimonials={testimonials.slice(0, 6)} />
      <ServiceAreasTeaser areas={areas} />
      <FAQ items={faqs} />
      <CTA />
    </>
  );
}
