import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getServiceAreas } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/book",
    "/about",
    "/reviews",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Dynamic routes — tolerate DB being unavailable at build time.
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [services, areas] = await Promise.all([getServices(), getServiceAreas()]);
    dynamicRoutes = [
      ...services.map((s) => ({
        url: `${base}/services/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...areas.map((a) => ({
        url: `${base}/service-areas/${a.slug}`,
        lastModified: a.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch (err) {
    console.warn("sitemap: could not load dynamic routes:", err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
