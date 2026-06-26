import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

const points = [
  "Factory-trained, licensed & insured technicians",
  "Upfront, flat-rate pricing — no surprises",
  "Common parts stocked on every truck",
  "90-day workmanship warranty on every repair",
];

export function FeatureGuarantee() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
            <Image
              src="/images/feature/technician.jpg"
              alt="A certified ProLink technician with tools"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent" />
          </div>
          {/* floating badge */}
          <div className="glass absolute -bottom-6 -right-2 rounded-2xl px-6 py-4 shadow-xl ring-1 ring-black/5 sm:right-6">
            <p className="text-3xl font-extrabold text-brand-900">100%</p>
            <p className="text-sm font-medium text-slate-600">Satisfaction focused</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-sm font-bold uppercase tracking-wider text-accent-600">The ProLink promise</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-900 sm:text-4xl">
            Honest, expert repair you can count on
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We treat your home like our own. Every repair is performed by a vetted professional
            and backed by a guarantee — so you can relax knowing the job is done right.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" />
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/book" variant="primary" size="lg">
              Schedule your repair <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
