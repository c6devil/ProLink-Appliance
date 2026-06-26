import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const services = [
  {
    name: "Refrigerator Repair",
    slug: "refrigerator-repair",
    icon: "refrigerator",
    shortDesc: "Fast fixes for cooling, leaks, ice makers, and strange noises.",
    longDesc:
      "A failing refrigerator can spoil hundreds of dollars of food fast. Our certified technicians diagnose and repair all major brands the same day, from compressors and thermostats to ice makers, water lines, and door seals.",
    symptoms: [
      "Not cooling or freezing",
      "Leaking water on the floor",
      "Ice maker not working",
      "Loud buzzing or clicking",
      "Frost buildup in freezer",
    ],
    featured: true,
    order: 1,
  },
  {
    name: "Washer Repair",
    slug: "washer-repair",
    icon: "washing-machine",
    shortDesc: "Stop leaks, drainage problems, and mid-cycle shutdowns.",
    longDesc:
      "From front-loaders to top-loaders, we repair washing machines that won't drain, spin, fill, or that leak and shake. We carry common parts on the truck so most repairs are completed in a single visit.",
    symptoms: [
      "Won't drain or spin",
      "Leaking during wash",
      "Excessive shaking",
      "Won't fill with water",
      "Stops mid-cycle",
    ],
    featured: true,
    order: 2,
  },
  {
    name: "Dryer Repair",
    slug: "dryer-repair",
    icon: "fan",
    shortDesc: "No heat, long dry times, and noisy drums fixed fast.",
    longDesc:
      "A dryer that won't heat or takes hours to dry clothes is usually a quick fix. We repair heating elements, thermal fuses, belts, rollers, and vents for gas and electric dryers — and we check for lint hazards while we're there.",
    symptoms: [
      "No heat or low heat",
      "Takes too long to dry",
      "Drum won't tumble",
      "Loud thumping or squealing",
      "Shuts off too soon",
    ],
    featured: true,
    order: 3,
  },
  {
    name: "Dishwasher Repair",
    slug: "dishwasher-repair",
    icon: "utensils",
    shortDesc: "Clean dishes again — fix poor cleaning, leaks, and drainage.",
    longDesc:
      "We repair dishwashers that won't drain, leave dishes dirty, leak onto your floor, or won't start. Our techs service pumps, spray arms, float switches, and control boards across all major brands.",
    symptoms: [
      "Dishes still dirty",
      "Won't drain",
      "Leaking onto the floor",
      "Won't start or fill",
      "Bad odor",
    ],
    featured: true,
    order: 4,
  },
  {
    name: "Oven & Range Repair",
    slug: "oven-range-repair",
    icon: "cooking-pot",
    shortDesc: "Even heating and reliable burners for gas and electric.",
    longDesc:
      "Whether it's an oven that won't reach temperature, a broken igniter, or burners that won't light, we repair gas and electric ovens, ranges, and cooktops safely and to code.",
    symptoms: [
      "Oven won't heat",
      "Uneven baking temperatures",
      "Burner won't ignite",
      "Control panel unresponsive",
      "Self-clean not working",
    ],
    featured: true,
    order: 5,
  },
  {
    name: "Microwave Repair",
    slug: "microwave-repair",
    icon: "microwave",
    shortDesc: "Built-in and over-the-range microwave repairs done right.",
    longDesc:
      "We service over-the-range and built-in microwaves that won't heat, spark, or run. Because microwaves store high voltage, leave these repairs to our trained, insured technicians.",
    symptoms: [
      "Runs but won't heat",
      "Sparking inside",
      "Turntable won't spin",
      "Buttons not responding",
      "Loud humming",
    ],
    featured: false,
    order: 6,
  },
  {
    name: "Freezer Repair",
    slug: "freezer-repair",
    icon: "snowflake",
    shortDesc: "Keep food frozen — stand-alone and built-in freezer repair.",
    longDesc:
      "We repair chest and upright freezers that won't stay cold, build up frost, or run constantly. Fast service protects your frozen goods from spoiling.",
    symptoms: [
      "Not freezing",
      "Excessive frost",
      "Runs constantly",
      "Temperature swings",
      "Door won't seal",
    ],
    featured: false,
    order: 7,
  },
  {
    name: "Garbage Disposal Repair",
    slug: "garbage-disposal-repair",
    icon: "trash-2",
    shortDesc: "Jams, leaks, and humming disposals cleared quickly.",
    longDesc:
      "A jammed or leaking garbage disposal is a quick fix for our team. We clear jams, replace worn units, and stop leaks under the sink so your kitchen is back in business.",
    symptoms: [
      "Humming but not grinding",
      "Won't turn on",
      "Leaking under the sink",
      "Draining slowly",
      "Persistent odor",
    ],
    featured: false,
    order: 8,
  },
];

// NOTE: Sample service areas — replace with your real coverage cities.
const serviceAreas = [
  { city: "Austin", slug: "austin", state: "TX", blurb: "Same-day appliance repair across central Austin and surrounding neighborhoods.", order: 1 },
  { city: "Round Rock", slug: "round-rock", state: "TX", blurb: "Trusted local technicians serving Round Rock homes and businesses.", order: 2 },
  { city: "Cedar Park", slug: "cedar-park", state: "TX", blurb: "Fast, warrantied repairs for every major appliance in Cedar Park.", order: 3 },
  { city: "Pflugerville", slug: "pflugerville", state: "TX", blurb: "Reliable appliance service with upfront pricing in Pflugerville.", order: 4 },
  { city: "Georgetown", slug: "georgetown", state: "TX", blurb: "Certified repair professionals serving the greater Georgetown area.", order: 5 },
  { city: "Leander", slug: "leander", state: "TX", blurb: "Same-day and next-day appointments throughout Leander.", order: 6 },
];

const testimonials = [
  { author: "Sarah M.", location: "Austin, TX", rating: 5, body: "Our fridge died on a Friday and ProLink had it running again the same afternoon. Professional, fair price, and saved all our groceries!", order: 1 },
  { author: "James T.", location: "Round Rock, TX", rating: 5, body: "Technician explained exactly what was wrong with our dryer and fixed it in under an hour. Honest and upfront about the cost. Highly recommend.", order: 2 },
  { author: "Priya K.", location: "Cedar Park, TX", rating: 5, body: "Booked online in two minutes and got a next-morning appointment. Washer is working like new. Will definitely use again.", order: 3 },
  { author: "Marcus D.", location: "Pflugerville, TX", rating: 5, body: "Three other companies couldn't figure out our oven. ProLink diagnosed it on the first visit and the repair came with a warranty.", order: 4 },
  { author: "Elena R.", location: "Georgetown, TX", rating: 5, body: "Courteous, on time, and tidy. They wore shoe covers and cleaned up after the dishwasher repair. Great experience start to finish.", order: 5 },
  { author: "Tom B.", location: "Leander, TX", rating: 4, body: "Good service and reasonable pricing. The part had to be ordered but they kept me updated and finished the next day.", order: 6 },
];

async function main() {
  console.log("Seeding database...");

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`  ✓ ${services.length} services`);

  for (const a of serviceAreas) {
    await prisma.serviceArea.upsert({ where: { slug: a.slug }, update: a, create: a });
  }
  console.log(`  ✓ ${serviceAreas.length} service areas`);

  // Testimonials have no natural unique key; reset and insert.
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
  console.log(`  ✓ ${testimonials.length} testimonials`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash, name: "ProLink Admin" },
    });
    console.log(`  ✓ admin user (${adminEmail})`);
  } else {
    console.warn("  ! ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
