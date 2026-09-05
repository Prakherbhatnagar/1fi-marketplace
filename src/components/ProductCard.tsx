import { Link } from "react-router-dom";
import { Star, ArrowRight, Zap } from "lucide-react";
import type { Product } from "@/types";
import { ProductArt } from "@/components/ProductArt";
import { formatINR } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingEmi = product.emiPlans.reduce(
    (min, plan) => (plan.monthlyAmount < min ? plan.monthlyAmount : min),
    product.emiPlans[0]?.monthlyAmount ?? 0,
  );

  const discountPercent = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const savingsAmount = product.mrp ? product.mrp - product.price : 0;

  return (
    <Link
      to={`/shop/marketplace/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#712CDC] hover:shadow-lg active:scale-[0.98] min-w-0"
    >
      {/* Product Image & Badges */}
      <div className="relative border-b border-slate-100">
        <ProductArt category={product.category} imageUrl={product.image} alt={product.name} />
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 max-w-[85%]">
          {discountPercent > 0 && (
            <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          <span className="rounded-md bg-[#712CDC] px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-sm flex items-center gap-0.5 whitespace-nowrap">
            <Zap className="size-2.5 text-amber-300 fill-amber-300" />
            No Cost EMI
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3 space-y-2.5 min-w-0">
        {/* Brand & Title */}
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-slate-600 uppercase truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200/50 shrink-0">
              <Star className="size-2.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="line-clamp-2 text-xs sm:text-[13px] font-extrabold leading-snug text-slate-900 group-hover:text-[#712CDC] transition-colors min-h-[32px]">
            {product.name}
          </h3>
        </div>

        {/* Clean, High-Contrast Pricing & EMI Box */}
        <div className="rounded-xl border border-purple-200/80 bg-[#FAF8FF] p-2 space-y-1.5 min-w-0">
          {/* Prominent EMI Section */}
          {startingEmi > 0 && (
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-1 text-[9px]">
                <span className="font-extrabold uppercase tracking-wider text-purple-700">EMI Starts @</span>
                <span className="font-extrabold bg-purple-100 text-[#712CDC] px-1 py-0.2 rounded">0% Interest</span>
              </div>
              <div className="flex items-baseline gap-0.5 mt-0.5 min-w-0">
                <span className="text-base sm:text-lg font-black text-[#712CDC] tracking-tight">
                  {formatINR(startingEmi)}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 shrink-0">/mo</span>
              </div>
            </div>
          )}

          {/* Total Price & MRP Info */}
          <div className="border-t border-purple-100 pt-1.5 space-y-0.5 text-[10px] sm:text-[11px]">
            <div className="flex items-center justify-between gap-1">
              <span className="text-slate-500 font-medium shrink-0">Total:</span>
              <span className="font-extrabold text-slate-900 truncate">{formatINR(product.price)}</span>
            </div>
            <div className="flex items-center justify-between gap-1 flex-wrap">
              {product.mrp && (
                <span className="text-[9px] font-bold text-slate-400 line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
              {savingsAmount > 0 && (
                <span className="text-[9px] font-black text-emerald-600 ml-auto">
                  Save {formatINR(savingsAmount)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center gap-1 rounded-xl bg-[#712CDC] text-white py-2 px-2 text-xs font-extrabold shadow-sm group-hover:bg-[#5b24b5] transition-colors w-full min-w-0">
          <span className="truncate">Proceed with EMI</span>
          <ArrowRight className="size-3 text-white shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
