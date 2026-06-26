import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { site, telHref } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Link href="/" aria-label={`${site.name} home`}>
        <Logo />
      </Link>
      <p className="mt-10 text-6xl font-extrabold text-brand-900">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-900">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
        on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
        <Button href="/book" variant="accent" size="lg">
          Book a Repair
        </Button>
        <Button href={telHref} variant="outline" size="lg">
          <Phone className="h-5 w-5" /> {site.phone}
        </Button>
      </div>
    </main>
  );
}
