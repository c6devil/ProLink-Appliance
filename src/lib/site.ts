/**
 * Central site configuration. Swap these placeholders for the real business
 * details (phone, email, address). Phone is also read from
 * NEXT_PUBLIC_BUSINESS_PHONE so it can be overridden per-environment.
 */
export const site = {
  name: "ProLink Appliance Repair",
  shortName: "ProLink",
  tagline: "Same-Day Appliance Repair You Can Trust",
  description:
    "ProLink Appliance Repair offers fast, same-day repair for refrigerators, washers, dryers, dishwashers, ovens, and more. Certified technicians, upfront pricing, and a workmanship warranty.",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(555) 555-0123",
  email: "service@prolinkappliancerepair.com",
  // Placeholder address — replace with the real business location.
  address: {
    street: "1200 Service Center Dr, Suite 4",
    city: "Austin",
    state: "TX",
    zip: "78701",
  },
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 7:00 PM" },
    { days: "Saturday", time: "8:00 AM – 5:00 PM" },
    { days: "Sunday", time: "Emergency service only" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    google: "https://google.com",
  },
  // Brands we service — shown as a trust strip.
  brands: [
    "Samsung",
    "LG",
    "Whirlpool",
    "GE",
    "Maytag",
    "KitchenAid",
    "Bosch",
    "Frigidaire",
    "Kenmore",
    "Sub-Zero",
  ],
} as const;

/** Digits-only phone for tel: links. */
export const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;
