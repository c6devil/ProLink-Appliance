import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedTestimonials, getRatingSummary } from "@/lib/queries";
import { localBusinessSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read real reviews from homeowners who trust ProLink Appliance Repair for fast, honest, warrantied repairs.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const [testimonials, rating] = await Promise.all([
    getPublishedTestimonials(),
    getRatingSummary(),
  ]);

  return (
    <>
      <JsonLd data={localBusinessSchema(rating)} />
      <PageHero
        title="Customer Reviews"
        subtitle="Don't just take our word for it — hear from your neighbors."
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />

      {rating.count > 0 && (
        <div className="border-b border-slate-200 bg-slate-50 py-8">
          <Container className="flex flex-col items-center justify-center gap-3 text-center">
            <Stars rating={Math.round(rating.average)} className="scale-125" />
            <p className="text-lg font-bold text-brand-900">
              {rating.average} out of 5 — based on {rating.count} reviews
            </p>
          </Container>
        </div>
      )}

      <Testimonials testimonials={testimonials} heading={false} />
      <CTA />
    </>
  );
}
