import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface ShopHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

export function ShopHeader({
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search online stores & products...",
}: ShopHeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: "marketplace",
      label: "1Fi Marketplace",
      to: "/shop/marketplace",
      isActive: currentPath === "/shop/marketplace" || currentPath === "/shop" || currentPath.startsWith("/shop/marketplace"),
    },
    {
      id: "top-brands",
      label: "Top Brands",
      to: "/shop/top-brands",
      isActive: currentPath === "/shop/top-brands",
    },
    {
      id: "nearby-stores",
      label: "Nearby Stores",
      to: "/shop/nearby-stores",
      isActive: currentPath === "/shop/nearby-stores",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. Top Banner Hero Section with Image */}
      <div className="relative overflow-hidden bg-[#350C6A] text-white">
        <div className="relative mx-auto max-w-5xl overflow-hidden">
          <img
            src="/images/shop-banner.png"
            alt="Shop today, Pay later using Mutual funds"
            className="w-full h-auto object-cover object-top min-h-[160px] max-h-[260px] sm:max-h-[320px]"
          />
        </div>
      </div>

      {/* Floating Toggle Track */}
      <div className="relative mx-auto max-w-5xl px-3 sm:px-4 -mt-5 sm:-mt-6 z-10">
        <nav
          className="flex items-center gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
          aria-label="Shop categories"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.to}
              className={cn(
                "relative flex flex-1 items-center justify-center py-2.5 px-1 sm:px-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-all text-center rounded-full",
                tab.isActive
                  ? "bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <span className="truncate">{tab.label}</span>

              {tab.isActive && (
                <span className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-[#712CDC]" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Search Bar */}
      {onSearchChange && (
        <div className="px-3.5 sm:px-4 pt-3.5 pb-1 bg-white">
          <div className="flex items-center gap-[10px] h-[46px] rounded-full border border-gray-200 bg-white px-4">
            <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-w-0 flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
