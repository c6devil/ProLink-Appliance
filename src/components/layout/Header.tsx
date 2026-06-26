"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid when scrolled or mobile menu open; transparent (over dark hero) at top.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "glass border-b border-slate-200/70 shadow-sm" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo light={!solid} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                solid ? "text-slate-700 hover:text-brand-700" : "text-white/85 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref}
            className={cn(
              "flex items-center gap-2 text-sm font-bold transition-colors",
              solid ? "text-brand-800 hover:text-brand-900" : "text-white hover:text-accent-300",
            )}
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Button href="/book" variant="accent" size="md" className="shine">
            Book Online
          </Button>
        </div>

        <button
          type="button"
          className={cn("rounded-lg p-2 lg:hidden", solid ? "text-brand-900" : "text-white")}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-semibold text-slate-800 hover:bg-brand-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <Button href={telHref} variant="outline" size="lg">
                <Phone className="h-5 w-5" /> Call {site.phone}
              </Button>
              <Button href="/book" variant="accent" size="lg" onClick={() => setOpen(false)}>
                Book Online
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
