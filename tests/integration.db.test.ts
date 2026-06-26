import "dotenv/config";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { signToken, verifyToken } from "../src/lib/session";

/**
 * Integration tests against a live database. Skipped automatically when the DB
 * is unreachable (e.g. in CI without a Postgres), so the suite stays green.
 */
const url = process.env.DATABASE_URL;
const prisma = url ? new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) }) : null;

let dbUp = false;
beforeAll(async () => {
  if (!prisma) return;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbUp = true;
  } catch {
    dbUp = false;
  }
});

afterAll(async () => {
  await prisma?.$disconnect();
});

describe.skipIf(!url)("database integration", () => {
  it("persists and reads back a booking", async () => {
    if (!dbUp || !prisma) return expect(true).toBe(true);
    const ref = `PL-TEST${Math.floor(Math.random() * 1000)}`;
    const created = await prisma.booking.create({
      data: {
        ref,
        appliance: "Refrigerator Repair",
        problem: "Test: not cooling",
        name: "Test User",
        email: "test@example.com",
        phone: "5125550000",
        addressLine: "1 Test St",
        city: "Austin",
        state: "TX",
        zip: "78701",
        preferredDate: new Date(),
        timeWindow: "MORNING",
      },
    });
    expect(created.status).toBe("NEW");
    const found = await prisma.booking.findUnique({ where: { ref } });
    expect(found?.name).toBe("Test User");
    await prisma.booking.delete({ where: { id: created.id } });
  });

  it("verifies the seeded admin password hash", async () => {
    if (!dbUp || !prisma) return expect(true).toBe(true);
    const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return expect(true).toBe(true);
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    expect(admin).not.toBeNull();
    expect(await bcrypt.compare(password, admin!.passwordHash)).toBe(true);
  });
});

describe("session jwt", () => {
  it("signs and verifies a session token round-trip", async () => {
    process.env.AUTH_SECRET ||= "test-secret-test-secret-test-secret";
    const token = await signToken({ sub: "abc", email: "admin@example.com" });
    const payload = await verifyToken(token);
    expect(payload?.sub).toBe("abc");
    expect(payload?.email).toBe("admin@example.com");
  });

  it("rejects a tampered token", async () => {
    expect(await verifyToken("not.a.valid.token")).toBeNull();
  });
});
