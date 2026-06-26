"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return { status: "error", message: "Too many requests. Please try again in a minute." };
  }

  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  if (parsed.data.company) {
    return { status: "success", message: "Thanks!" };
  }

  const data = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    await sendContactEmail(data).catch((e) => console.error("contact email error", e));

    return { status: "success", message: "Thanks! We'll get back to you shortly." };
  } catch (err) {
    console.error("sendContactMessage error", err);
    return { status: "error", message: "Something went wrong. Please call us instead." };
  }
}
