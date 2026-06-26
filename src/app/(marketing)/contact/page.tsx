import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/structured-data";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Call ${site.phone} or send us a message and we'll respond quickly.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        title="Contact Us"
        subtitle="Questions, scheduling, or just need advice? We're here to help."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Get in touch</h2>
            <p className="mt-2 text-slate-600">
              Reach us by phone for the fastest response, or send a message and we&apos;ll get
              back to you shortly.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-900">Phone</p>
                  <a href={telHref} className="text-slate-600 hover:text-brand-700">{site.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-900">Email</p>
                  <a href={`mailto:${site.email}`} className="text-slate-600 hover:text-brand-700">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-900">Address</p>
                  <p className="text-slate-600">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-900">Hours</p>
                  <ul className="text-slate-600">
                    {site.hours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
