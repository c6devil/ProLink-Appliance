"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { login, logout, requireAdmin } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!email || !password) return { error: "Email and password are required." };

  const ok = await login(email, password);
  if (!ok) return { error: "Invalid email or password." };

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

const BOOKING_STATUSES = ["NEW", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"] as const;

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!BOOKING_STATUSES.includes(status as (typeof BOOKING_STATUSES)[number])) return;
  await prisma.booking.update({ where: { id }, data: { status: status as never } });
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${id}`);
}

export async function updateBookingNotes(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const notes = String(formData.get("notes") ?? "");
  await prisma.booking.update({ where: { id }, data: { notes } });
  revalidatePath(`/admin/bookings/${id}`);
}

export async function deleteBooking(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin/bookings");
  redirect("/admin/bookings");
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") || name));
  const data = {
    name,
    slug,
    icon: String(formData.get("icon") ?? "wrench").trim(),
    shortDesc: String(formData.get("shortDesc") ?? "").trim(),
    longDesc: String(formData.get("longDesc") ?? "").trim(),
    symptoms: String(formData.get("symptoms") ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

// ---------------------------------------------------------------------------
// Service Areas
// ---------------------------------------------------------------------------

export async function saveServiceArea(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const city = String(formData.get("city") ?? "").trim();
  const data = {
    city,
    slug: slugify(String(formData.get("slug") || city)),
    state: String(formData.get("state") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
  if (id) {
    await prisma.serviceArea.update({ where: { id }, data });
  } else {
    await prisma.serviceArea.create({ data });
  }
  revalidatePath("/admin/service-areas");
  redirect("/admin/service-areas");
}

export async function deleteServiceArea(formData: FormData) {
  await requireAdmin();
  await prisma.serviceArea.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/service-areas");
  redirect("/admin/service-areas");
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    author: String(formData.get("author") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    rating: Math.min(5, Math.max(1, Number(formData.get("rating") ?? 5) || 5)),
    body: String(formData.get("body") ?? "").trim(),
    published: formData.get("published") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

export async function toggleMessageRead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const read = formData.get("read") === "true";
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/messages");
}
