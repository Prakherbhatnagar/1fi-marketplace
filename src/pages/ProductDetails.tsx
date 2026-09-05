import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertCircle, Star } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useProduct } from "@/hooks/useProduct";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ProductArt } from "@/components/ProductArt";
import { VariantSelector } from "@/components/VariantSelector";
import { EMIPlanSelector } from "@/components/EMIPlanSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { formatINR } from "@/lib/format";
import type { SelectedVariants } from "@/types";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : NaN;
  const { product, isLoading, error, notFound, retry } = useProduct(Number.isNaN(numericId) ? null : numericId);

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<number | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectedPlan = useMemo(
    () => product?.emiPlans.find((plan) => plan.id === selectedEmiPlanId) ?? null,
    [product, selectedEmiPlanId],
  );

  function handleVariantSelect(type: string, option: string) {
    setValidationMessage(null);
    setSelectedVariants((prev) => ({ ...prev, [type]: option }));
  }

  function handleEmiSelect(planId: number) {
    setValidationMessage(null);
    setSelectedEmiPlanId(planId);
  }

  function handleProceed() {
    if (!product) return;

    const missingVariants = product.variants.filter((group) => !selectedVariants[group.type]);
    if (missingVariants.length > 0) {
      setValidationMessage(`Please select ${missingVariants.map((g) => g.type).join(" and ")} to continue.`);
      document.getElementById("variant-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!selectedEmiPlanId) {
      setValidationMessage("Please select an EMI plan to continue.");
      document.getElementById("emi-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setValidationMessage(null);
    setIsConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AppShell header={<TopBar title={product?.name ?? "Product"} />}>
      {isLoading && <LoadingState variant="details" />}

      {!isLoading && error && <ErrorState message={error} onRetry={retry} />}

      {!isLoading && !error && notFound && (
        <EmptyState title="Product not found" description="This product may have been removed from the Marketplace." />
      )}

      {!isLoading && !error && product && !isConfirmed && (
        <div className="pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Artwork & Highlights */}
            <div className="md:col-span-5 space-y-4">
              <ProductArt category={product.category} imageUrl={product.image} alt={product.name} size="lg" className="rounded-2xl shadow-sm" />

              {product.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Highlights</h3>
                  <ul className="space-y-2">
                    {product.highlights.map((point) => (
                      <li
                        key={point}
                        className="rounded-xl bg-slate-100/80 px-3.5 py-2.5 text-xs font-semibold text-slate-700 border border-slate-200/60"
                      >
                        ✓ {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Title, Price, Variants & EMI Plans */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{product.brand}</p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">{product.name}</h2>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span className="font-bold text-slate-900">{product.rating}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{product.reviewCount.toLocaleString("en-IN")} verified reviews</span>
                </div>

                <div className="flex items-baseline gap-3 pt-2">
                  <p className="tabular text-2xl sm:text-3xl font-extrabold text-slate-900">{formatINR(product.price)}</p>
                  {product.mrp && (
                    <p className="tabular text-sm font-medium text-slate-400 line-through">{formatINR(product.mrp)}</p>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                {product.description}
              </p>

              {product.variants.length > 0 && (
                <div id="variant-section" className="space-y-5 border-t border-slate-100 pt-5 scroll-mt-6">
                  {product.variants.map((group) => (
                    <VariantSelector
                      key={group.type}
                      group={group}
                      selectedOption={selectedVariants[group.type]}
                      onSelect={handleVariantSelect}
                    />
                  ))}
                </div>
              )}

              <div id="emi-section" className="space-y-3 border-t border-slate-100 pt-5 scroll-mt-6">
                <h3 className="text-sm font-bold text-slate-900">Choose your EMI Plan</h3>
                <EMIPlanSelector
                  plans={product.emiPlans}
                  selectedPlanId={selectedEmiPlanId}
                  onSelect={handleEmiSelect}
                />
              </div>

              {validationMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm font-semibold text-red-700 shadow-sm"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{validationMessage}</span>
                </div>
              )}

              <div className="hidden md:flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedPlan ? `${selectedPlan.duration} Months Tenure` : "Select an EMI plan"}
                  </p>
                  <p className="tabular text-xl font-extrabold text-[#7C3AED]">
                    {selectedPlan ? `${formatINR(selectedPlan.monthlyAmount)}/mo` : formatINR(product.price)}
                  </p>
                </div>
                <PrimaryButton onClick={handleProceed} className="shrink-0 px-6">
                  Proceed with EMI
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar for Mobile viewports */}
          <div className="md:hidden sticky bottom-0 left-0 right-0 w-full border-t border-slate-200 bg-white/95 p-3.5 backdrop-blur-md shadow-2xl z-30 overflow-hidden">
            <div className="flex items-center justify-between gap-3 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {selectedPlan ? `${selectedPlan.duration} Months Tenure` : "Select an EMI plan"}
                </p>
                <p className="tabular truncate text-base font-black text-[#7C3AED]">
                  {selectedPlan ? `${formatINR(selectedPlan.monthlyAmount)}/mo` : formatINR(product.price)}
                </p>
              </div>
              <PrimaryButton
                onClick={handleProceed}
                className="shrink-0 text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-full font-bold shadow-md shadow-purple-600/30 whitespace-nowrap"
              >
                Proceed with EMI
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && product && isConfirmed && selectedPlan && (
        <OrderConfirmation product={product} selectedVariants={selectedVariants} plan={selectedPlan} />
      )}
    </AppShell>
  );
}
