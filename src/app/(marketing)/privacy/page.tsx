import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <Section containerClassName="max-w-3xl">
        <div className="space-y-6 text-slate-700">
          <p className="text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>
          <p>
            {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
            explains what information we collect and how we use it. This template is provided as
            a starting point and should be reviewed by a qualified attorney before launch.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Information we collect</h2>
          <p>
            When you book a repair or contact us, we collect the information you provide — such
            as your name, phone number, email, service address, and a description of your
            appliance problem. We use this solely to schedule and perform your service and to
            communicate with you about it.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">How we use your information</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To schedule, perform, and follow up on appliance repairs.</li>
            <li>To send appointment confirmations and service updates.</li>
            <li>To respond to your questions and requests.</li>
          </ul>
          <h2 className="text-2xl font-bold text-brand-900">Sharing</h2>
          <p>
            We do not sell your personal information. We share it only with service providers
            who help us operate (such as email delivery) and as required by law.
          </p>
          <h2 className="text-2xl font-bold text-brand-900">Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
