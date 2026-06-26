"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { sendBookingEmails } from "@/lib/email";
import { generateBookingRef } from "@/lib/utils";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

export type BookingState = {
  status: "idle" | "success" | "error";
  message?: string;
  ref?: string;
  errors?: Record<string, string>;
};

export async function createBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Rate limit by IP
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const limit = rateLimit(`booking:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return { status: "error", message: "Too many requests. Please try again in a minute." };
  }

  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  // Honeypot triggered — silently accept without persisting.
  if (parsed.data.company) {
    return { status: "success", ref: "PL-OK", message: "Thanks!" };
  }

  const data = parsed.data;
  const ref = generateBookingRef();

  try {
    const booking = await prisma.booking.create({
      data: {
        ref,
        appliance: data.appliance,
        brand: data.brand || null,
        modelNo: data.modelNo || null,
        problem: data.problem,
        name: data.name,
        email: data.email,
        phone: data.phone,
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        zip: data.zip,
        preferredDate: new Date(data.preferredDate),
        timeWindow: data.timeWindow,
      },
    });

    // Fire-and-await emails (non-fatal if they fail).
    await sendBookingEmails(booking).catch((e) => console.error("booking email error", e));

    return { status: "success", ref, message: "Your repair request has been received." };
  } catch (err) {
    console.error("createBooking error", err);
    return {
      status: "error",
      message: "Something went wrong saving your request. Please call us instead.",
    };
  }
}
