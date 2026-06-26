import Image from "next/image";
import { Phone, ShieldCheck, Clock, BadgeCheck, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, telHref } from "@/lib/site";

const badges = [
  { icon: Clock, label: "Same-Day Service" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "90-Day Warranty" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white grain">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/kitchen-dark.jpg"
          alt="Modern kitchen with stainless steel appliances"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Aurora mesh + readability gradients */}
        <div className="absolute inset-0 mesh-brand opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="relative grid items-center gap-12 pb-28 pt-36 sm:pt-44 lg:grid-cols-12 lg:pb-36">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-accent-200 ring-1 ring-white/20 backdrop-blur">
            <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
            Rated 4.9/5 by 2,000+ local homeowners
          </p>

          <h1
            className="animate-fade-up mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Appliance repair,
            <br />
            <span className="text-gradient">done right today.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-brand-100/90 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Same-day service for refrigerators, washers, dryers, ovens and more —
            backed by certified technicians, upfront pricing, and a workmanship warranty.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="/book" variant="accent" size="lg" className="shine">
              Book a Repair <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={telHref} variant="white" size="lg">
              <Phone className="h-5 w-5" /> {site.phone}
            </Button>
          </div>

          <ul
            className="animate-fade-up mt-10 flex flex-wrap gap-x-7 gap-y-3"
            style={{ animationDelay: "320ms" }}
          >
            {badges.map((b) => (
              <li key={b.label} className="flex items-center gap-2 text-sm font-semibold text-brand-50">
                <b.icon className="h-5 w-5 text-accent-400" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating glass cards */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto h-[420px] w-full max-w-md">
            <div
              className="animate-float glass-dark absolute right-4 top-4 w-64 rounded-3xl p-5 shadow-2xl"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <p className="mt-3 text-sm text-white/85">
                &ldquo;Fixed our fridge the same afternoon and saved all our groceries.
                Incredible service.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-white/60">— Sarah M., verified customer</p>
            </div>

            <div
              className="animate-float glass-dark absolute bottom-8 left-0 flex items-center gap-4 rounded-3xl p-5 shadow-2xl"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-2xl font-extrabold">
                ⚡
              </div>
              <div>
                <p className="text-3xl font-extrabold leading-none">Same-day</p>
                <p className="mt-1 text-sm text-white/70">appointments available</p>
              </div>
            </div>

            <div
              className="animate-float glass-dark absolute right-12 bottom-0 rounded-3xl px-6 py-4 shadow-2xl"
              style={{ animationDelay: "0.9s" }}
            >
              <p className="text-3xl font-extrabold text-accent-300">10k+</p>
              <p className="text-xs text-white/70">repairs completed</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
