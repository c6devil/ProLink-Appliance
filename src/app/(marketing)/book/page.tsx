import type { Metadata } from "next";
import { Phone, ShieldCheck, Clock, DollarSign } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { getServices } from "@/lib/queries";
import { site, telHref } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Repair",
  description:
    "Book your appliance repair online in minutes. Choose your appliance, describe the problem, and pick a time that works for you.",
  alternates: { canonical: "/book" },
};

const perks = [
  { icon: Clock, label: "Same-day & next-day appointments" },
  { icon: DollarSign, label: "Upfront, flat-rate pricing" },
  { icon: ShieldCheck, label: "90-day workmanship warranty" },
];

export default async function BookPage() {
  const services = await getServices();
  const appliances = services.map((s) => ({ name: s.name, icon: s.icon }));

  return (
    <>
      <PageHero
        title="Book Your Repair"
        subtitle="A few quick questions and you're done. We'll call to confirm your appointment."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book" }]}
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm appliances={appliances} />
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-brand-900">Why book with ProLink?</h2>
              <ul className="mt-4 space-y-3">
                {perks.map((p) => (
                  <li key={p.label} className="flex items-start gap-3 text-sm text-slate-700">
                    <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    {p.label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm text-slate-600">Prefer to talk to someone?</p>
                <a
                  href={telHref}
                  className="mt-2 flex items-center gap-2 text-lg font-bold text-brand-800 hover:text-brand-900"
                >
                  <Phone className="h-5 w-5" /> {site.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
