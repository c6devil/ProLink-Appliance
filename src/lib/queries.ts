import { prisma } from "@/lib/db";

/** All services ordered for display. */
export function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export function getFeaturedServices() {
  return prisma.service.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });
}

export function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export function getServiceAreas() {
  return prisma.serviceArea.findMany({ orderBy: { order: "asc" } });
}

export function getServiceAreaBySlug(slug: string) {
  return prisma.serviceArea.findUnique({ where: { slug } });
}

export function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

/** Average rating + count across published testimonials (for schema + UI). */
export async function getRatingSummary() {
  const reviews = await prisma.testimonial.findMany({
    where: { published: true },
    select: { rating: true },
  });
  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { count, average: Math.round(avg * 10) / 10 };
}
