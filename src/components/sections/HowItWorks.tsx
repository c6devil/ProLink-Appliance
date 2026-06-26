import { CalendarCheck, Wrench, ThumbsUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book in 2 minutes",
    body: "Schedule online or call us. Choose the day and arrival window that works for you.",
  },
  {
    icon: Wrench,
    title: "We diagnose & repair",
    body: "A certified tech arrives on time, diagnoses the issue, and gives an upfront price before fixing it.",
  },
  {
    icon: ThumbsUp,
    title: "Back to normal",
    body: "Your appliance works like new — backed by our 90-day workmanship warranty.",
  },
];

export function HowItWorks() {
  return (
    <Section className="mesh-brand grain relative text-white">
      <Reveal>
        <SectionHeading
          eyebrow="How It Works"
          title="Getting fixed has never been easier"
          className="[&_h2]:text-white [&_p]:text-brand-100/80"
        />
      </Reveal>

      <div className="relative mt-16">
        {/* connector line */}
        <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent md:block" />
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="relative text-center">
              <div className="relative mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-white text-brand-800 shadow-xl">
                <s.icon className="h-8 w-8" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-sm font-extrabold text-white ring-4 ring-brand-950">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-brand-100/80">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
