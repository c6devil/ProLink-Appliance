import { describe, it, expect } from "vitest";
import { generateBookingRef, formatDate, timeWindowLabels } from "@/lib/utils";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

describe("generateBookingRef", () => {
  it("matches the PL-XXXXXX format", () => {
    const ref = generateBookingRef();
    expect(ref).toMatch(/^PL-[A-Z2-9]{6}$/);
  });

  it("avoids ambiguous characters (no 0, 1, I, O)", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateBookingRef()).not.toMatch(/[01IO]/);
    }
  });
});

describe("formatDate", () => {
  it("formats an ISO date", () => {
    expect(formatDate("2026-07-01T00:00:00")).toContain("2026");
  });
});

describe("timeWindowLabels", () => {
  it("has labels for each window", () => {
    expect(timeWindowLabels.MORNING).toBeTruthy();
    expect(timeWindowLabels.AFTERNOON).toBeTruthy();
    expect(timeWindowLabels.EVENING).toBeTruthy();
  });
});

describe("structured data", () => {
  it("builds a LocalBusiness schema with rating", () => {
    const s = localBusinessSchema({ average: 4.9, count: 120 });
    expect(s["@type"]).toBe("HomeAndConstructionBusiness");
    expect((s as Record<string, any>).aggregateRating.ratingValue).toBe(4.9);
  });

  it("omits rating when count is zero", () => {
    const s = localBusinessSchema({ average: 0, count: 0 }) as Record<string, unknown>;
    expect(s.aggregateRating).toBeUndefined();
  });

  it("builds a FAQ schema", () => {
    const s = faqSchema([{ q: "Q?", a: "A." }]) as Record<string, any>;
    expect(s.mainEntity).toHaveLength(1);
    expect(s.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });

  it("builds breadcrumbs with positions", () => {
    const s = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]) as Record<string, any>;
    expect(s.itemListElement[1].position).toBe(2);
  });
});
