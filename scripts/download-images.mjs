/**
 * Downloads & optimizes the site's royalty-free imagery (Unsplash) into
 * /public/images. Re-run any time: `node scripts/download-images.mjs`
 *
 * All photos are from Unsplash (https://unsplash.com/license) — free for
 * commercial use. Swap any `id` for your own branded photography.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public", "images");

const U = (id) => `https://images.unsplash.com/photo-${id}?w=2200&q=82&fm=jpg&fit=crop`;

const manifest = [
  // Hero / large
  { id: "1484154218962-a197022b5858", out: "hero/kitchen-dark.jpg", w: 2200, h: 1300, alt: "Dark modern kitchen with stainless steel appliances" },
  { id: "1484154218962-a197022b5858", out: "og/og-default.jpg", w: 1200, h: 630, alt: "ProLink Appliance Repair" },

  // Service cards (mapped by slug in src/lib/service-images.ts)
  { id: "1571175443880-49e1d25b2bc5", out: "services/refrigerator.jpg", w: 900, h: 700, alt: "Refrigerator in a bright kitchen" },
  { id: "1626806787461-102c1bfaaea1", out: "services/washer.jpg", w: 900, h: 700, alt: "Front-load washing machine in a laundry room" },
  { id: "1604335399105-a0c585fd81a1", out: "services/dryer.jpg", w: 900, h: 700, alt: "Row of dryers" },
  { id: "1565538810643-b5bdb714032a", out: "services/dishwasher.jpg", w: 900, h: 700, alt: "Modern kitchen sink and dishwasher area" },
  { id: "1574269909862-7e1d70bb8078", out: "services/oven.jpg", w: 900, h: 700, alt: "Countertop oven and range" },
  { id: "1556911220-bff31c812dba", out: "services/microwave.jpg", w: 900, h: 700, alt: "Bright modern kitchen with built-in appliances" },
  { id: "1610557892470-55d9e80c0bce", out: "services/freezer.jpg", w: 900, h: 700, alt: "Appliance drum detail" },
  { id: "1607472586893-edb57bdc0e39", out: "services/disposal.jpg", w: 900, h: 700, alt: "Under-sink plumbing and fittings" },

  // Feature / lifestyle
  { id: "1558618666-fcd25c85cd64", out: "feature/technician.jpg", w: 1200, h: 1500, alt: "Certified ProLink technician with tools" },
  { id: "1556909114-f6e7ad7d3136", out: "feature/homeowners.jpg", w: 1400, h: 1050, alt: "Happy homeowners in their kitchen" },
  { id: "1610557892470-55d9e80c0bce", out: "feature/abstract.jpg", w: 1600, h: 1000, alt: "Stylized appliance drum" },

  // Service areas
  { id: "1616137466211-f939a420be84", out: "areas/neighborhood.jpg", w: 1600, h: 1000, alt: "Bright modern living room" },
  { id: "1615874959474-d609969a20ed", out: "areas/interior.jpg", w: 1400, h: 1000, alt: "Cozy living room interior" },

  // CTA background
  { id: "1556911220-bff31c812dba", out: "cta/kitchen.jpg", w: 2000, h: 1000, alt: "Modern kitchen" },

  // About
  { id: "1558618666-fcd25c85cd64", out: "about/workshop.jpg", w: 1400, h: 1100, alt: "ProLink technician at work" },
];

async function run() {
  const credits = [];
  for (const item of manifest) {
    const dest = join(publicDir, item.out);
    await mkdir(dirname(dest), { recursive: true });
    process.stdout.write(`Downloading ${item.out} ... `);
    const res = await fetch(U(item.id));
    if (!res.ok) {
      console.log(`FAILED (${res.status})`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(item.w, item.h, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(dest);
    console.log("done");
    credits.push(`- \`public/images/${item.out}\` — Unsplash photo \`${item.id}\` (Unsplash License) — _${item.alt}_`);
  }

  const creditsMd = `# Image Credits

All photography is sourced from [Unsplash](https://unsplash.com/license) and is
free for commercial use. Attribution is appreciated but not required.

Replace any image with your own branded photography by editing the manifest in
\`scripts/download-images.mjs\` and re-running \`node scripts/download-images.mjs\`,
or by dropping files directly into \`public/images/\`.

## Photos

${credits.join("\n")}

## Brand assets

- \`src/components/Logo.tsx\` — original ProLink wordmark (inline SVG)
- \`src/app/icon.svg\` — favicon generated from the logo mark
`;
  await writeFile(join(root, "IMAGE_CREDITS.md"), creditsMd);
  console.log("\nWrote IMAGE_CREDITS.md");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
