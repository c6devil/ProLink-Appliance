import { describe, it, expect } from "vitest";
import { bookingSchema, contactSchema } from "@/lib/validation";

const validBooking = {
  appliance: "Refrigerator Repair",
  problem: "Not cooling at all",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "5125550123",
  addressLine: "123 Main St",
  city: "Austin",
  state: "TX",
  zip: "78701",
  preferredDate: "2026-07-01",
  timeWindow: "MORNING",
};

describe("bookingSchema", () => {
  it("accepts a valid booking", () => {
    const r = bookingSchema.safeParse(validBooking);
    expect(r.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const r = bookingSchema.safeParse({ ...validBooking, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects a too-short problem description", () => {
    const r = bookingSchema.safeParse({ ...validBooking, problem: "no" });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid time window", () => {
    const r = bookingSchema.safeParse({ ...validBooking, timeWindow: "NIGHT" });
    expect(r.success).toBe(false);
  });

  it("rejects a non-empty honeypot", () => {
    const r = bookingSchema.safeParse({ ...validBooking, company: "bot inc" });
    expect(r.success).toBe(false);
  });

  it("rejects an unparseable date", () => {
    const r = bookingSchema.safeParse({ ...validBooking, preferredDate: "soon" });
    expect(r.success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("accepts a valid message", () => {
    const r = contactSchema.safeParse({
      name: "Bob",
      email: "bob@example.com",
      subject: "Question",
      message: "I have a question about my dryer.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects a short message", () => {
    const r = contactSchema.safeParse({
      name: "Bob",
      email: "bob@example.com",
      subject: "Hi",
      message: "short",
    });
    expect(r.success).toBe(false);
  });
});
