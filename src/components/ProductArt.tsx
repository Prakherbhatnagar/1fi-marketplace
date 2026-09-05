import { useState } from "react";
import { Headphones, Laptop, Smartphone, Tablet, Watch, Package, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const CATEGORY_STYLE: Record<string, { icon: typeof Smartphone; gradient: string; fg: string; badgeBg: string }> = {
  Smartphones: {
    icon: Smartphone,
    gradient: "from-purple-600 via-indigo-600 to-violet-700",
    fg: "#FFFFFF",
    badgeBg: "rgba(255, 255, 255, 0.2)",
  },
  Laptops: {
    icon: Laptop,
    gradient: "from-slate-800 via-slate-900 to-slate-950",
    fg: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.15)",
  },
  Audio: {
    icon: Headphones,
    gradient: "from-amber-600 via-orange-600 to-rose-600",
    fg: "#FFFFFF",
    badgeBg: "rgba(255, 255, 255, 0.2)",
  },
  Wearables: {
    icon: Watch,
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
    fg: "#FFFFFF",
    badgeBg: "rgba(255, 255, 255, 0.2)",
  },
  Tablets: {
    icon: Tablet,
    gradient: "from-violet-600 via-purple-700 to-fuchsia-800",
    fg: "#FFFFFF",
    badgeBg: "rgba(255, 255, 255, 0.2)",
  },
};

interface ProductArtProps {
  category: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "lg";
}

export function ProductArt({ category, imageUrl, alt = "", className, size = "sm" }: ProductArtProps) {
  const [imageError, setImageError] = useState(false);
  const style = CATEGORY_STYLE[category] ?? {
    icon: Package,
    gradient: "from-purple-700 to-indigo-800",
    fg: "#FFFFFF",
    badgeBg: "rgba(255, 255, 255, 0.2)",
  };
  const Icon = style.icon;

  const showImage = imageUrl && !imageError && (imageUrl.startsWith("http") || imageUrl.startsWith("/"));

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden bg-slate-100 transition-all duration-300 group-hover:scale-[1.02]",
        !showImage && "bg-gradient-to-br " + style.gradient,
        className,
      )}
    >
      {showImage ? (
        <>
          <img
            src={imageUrl}
            alt={alt || category}
            onError={() => setImageError(true)}
            className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient shadow at bottom for image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </>
      ) : (
        <>
          {/* Background glow circle */}
          <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-black/10 blur-xl" />

          <div className="relative flex flex-col items-center gap-1.5 p-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/15 p-2 shadow-inner backdrop-blur-sm sm:size-16">
              <Icon
                className={size === "lg" ? "size-9 sm:size-11" : "size-7 sm:size-8"}
                style={{ color: style.fg }}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
            <span className="text-[11px] font-medium tracking-wide text-white/80">{category}</span>
          </div>
        </>
      )}

      {/* Decorative 1Fi Verified Badge on large view */}
      {size === "lg" && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md border border-white/20 shadow-sm">
          <Sparkles className="size-3 text-amber-300 fill-amber-300" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">1Fi Verified</span>
        </div>
      )}
    </div>
  );
}
