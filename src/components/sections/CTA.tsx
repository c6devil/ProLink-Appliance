import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { site, telHref } from "@/lib/site";

export function CTA({
  title = "Ready to fix your appliance?",
  subtitle = "Book online in minutes or call now for same-day service.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] px-8 py-16 text-center shadow-2xl sm:px-16">
            <Image
              src="/images/cta/kitchen.jpg"
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 mesh-brand opacity-90 mix-blend-multiply" />
            <div className="absolute inset-0 -z-10 bg-brand-950/55" />

            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100/90">{subtitle}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/book" variant="accent" size="lg" className="shine">
                Book a Repair <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href={telHref} variant="white" size="lg">
                <Phone className="h-5 w-5" /> {site.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
