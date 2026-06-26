import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma 7 uses driver adapters. We connect to PostgreSQL through node-postgres.
 * In production point DATABASE_URL at your managed Postgres (Neon/Supabase).
 *
 * A single client instance is reused across hot-reloads in development to avoid
 * exhausting database connections.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and configure it.");
}

const createClient = () =>
  new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
