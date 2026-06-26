/**
 * Maps a Service slug to a self-hosted hero image. Falls back to a generic
 * kitchen image for any slug without a dedicated photo. Frontend-only — keeps
 * the backend schema untouched.
 */
const map: Record<string, string> = {
  "refrigerator-repair": "/images/services/refrigerator.jpg",
  "washer-repair": "/images/services/washer.jpg",
  "dryer-repair": "/images/services/dryer.jpg",
  "dishwasher-repair": "/images/services/dishwasher.jpg",
  "oven-range-repair": "/images/services/oven.jpg",
  "microwave-repair": "/images/services/microwave.jpg",
  "freezer-repair": "/images/services/freezer.jpg",
  "garbage-disposal-repair": "/images/services/disposal.jpg",
};

export function serviceImage(slug: string) {
  return map[slug] ?? "/images/services/microwave.jpg";
}
