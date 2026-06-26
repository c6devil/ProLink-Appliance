import { z } from "zod";

export const timeWindows = ["MORNING", "AFTERNOON", "EVENING"] as const;

export const bookingSchema = z.object({
  appliance: z.string().min(1, "Please choose an appliance"),
  brand: z.string().max(60).optional().or(z.literal("")),
  modelNo: z.string().max(60).optional().or(z.literal("")),
  problem: z.string().min(5, "Please describe the problem (at least 5 characters)").max(2000),
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number").max(30),
  addressLine: z.string().min(3, "Please enter your street address").max(200),
  city: z.string().min(2, "Please enter your city").max(100),
  state: z.string().min(2, "Please enter your state").max(40),
  zip: z.string().min(3, "Please enter your ZIP code").max(12),
  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date"),
  timeWindow: z.enum(timeWindows),
  // Honeypot — must be empty. Bots tend to fill every field.
  company: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().min(2, "Please enter a subject").max(150),
  message: z.string().min(10, "Please enter a message (at least 10 characters)").max(2000),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
