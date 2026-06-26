import { site } from "@/lib/site";

export function TrustBar() {
  const brands = [...site.brands, ...site.brands]; // duplicated for seamless loop

  return (
    <div className="border-b border-slate-200 bg-white py-10">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        We repair all major brands
      </p>
      <div
        className="group relative mt-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-12 group-hover:[animation-play-state:paused]">
          {brands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="select-none text-2xl font-bold tracking-tight text-slate-300 transition-colors hover:text-brand-700"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
