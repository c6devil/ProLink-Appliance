import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/Reveal";
import type { TestimonialData } from "@/lib/types";

export function Testimonials({
  testimonials,
  heading = true,
}: {
  testimonials: TestimonialData[];
  heading?: boolean;
}) {
  if (!testimonials.length) return null;

  const [featured, ...rest] = testimonials;

  return (
    <Section className="mesh-light">
      {heading && (
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="Loved by homeowners"
            description="Real reviews from neighbors who trust ProLink with their appliances."
          />
        </Reveal>
      )}

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {/* Featured quote */}
        <Reveal className="lg:col-span-1">
          <figure className="flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand-900 p-8 text-white shadow-xl">
            <Quote className="h-10 w-10 text-accent-400" />
            <blockquote className="mt-4 text-xl font-semibold leading-relaxed">
              &ldquo;{featured.body}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <Stars rating={featured.rating} />
              <p className="mt-2 font-bold">{featured.author}</p>
              <p className="text-sm text-brand-100/70">{featured.location}</p>
            </figcaption>
          </figure>
        </Reveal>

        {/* Supporting cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {rest.slice(0, 4).map((t, i) => (
            <Reveal key={t.id} delay={(i % 2) * 80}>
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-shadow hover:shadow-lg">
                <Stars rating={t.rating} />
                <blockquote className="mt-3 flex-1 text-slate-700">&ldquo;{t.body}&rdquo;</blockquote>
                <figcaption className="mt-4 border-t border-slate-100 pt-4">
                  <span className="font-bold text-brand-900">{t.author}</span>
                  <span className="block text-sm text-slate-500">{t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
