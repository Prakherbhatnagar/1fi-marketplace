import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShopHeader } from "@/components/layout/ShopHeader";
import { useProducts } from "@/hooks/useProducts";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ProductGrid } from "@/components/ProductGrid";
import { cn } from "@/lib/cn";

export default function Marketplace() {
  const { products, isLoading, error, retry } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <AppShell
      noPadding
      header={
        <ShopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search products, brands (e.g. Samsung, Apple)..."
        />
      }
      footer={<BottomNav />}
    >
      <div className="px-4 py-5 space-y-4">
        {/* Category Pill Filters */}
        {!isLoading && !error && products.length > 0 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-150",
                  activeCategory === category
                    ? "border-[#712CDC] bg-[#712CDC] text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-700",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState variant="grid" />}

        {/* Error State */}
        {!isLoading && error && <ErrorState message={error} onRetry={retry} />}

        {/* Empty State when no products returned from API */}
        {!isLoading && !error && products.length === 0 && (
          <EmptyState
            title="No products available"
            description="There are currently no products available in the Marketplace. Please check back later."
          />
        )}

        {/* Product Grid / Filtered Empty State */}
        {!isLoading && !error && products.length > 0 && (
          visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <EmptyState
              title="No matching products"
              description={`We couldn't find anything matching "${searchQuery || activeCategory}". Try searching for something else.`}
            />
          )
        )}
      </div>
    </AppShell>
  );
}
