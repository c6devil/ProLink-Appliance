import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

const stats = [
  { value: "10k+", label: "Repairs completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "Same-day", label: "Appointments" },
  { value: "90-day", label: "Warranty" },
];

export function StatsBand() {
  return (
    <section className="bg-brand-900">
      <Container className="py-14">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-4xl font-extrabold text-accent-400 sm:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-100/80">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
