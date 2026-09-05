import { Check } from "lucide-react";
import type { EMIPlan } from "@/types";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (planId: number) => void;
}

export function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(plan.id)}
      className={cn(
        "flex w-full items-center justify-between gap-2.5 rounded-xl border px-3.5 sm:px-4 py-3 text-left transition-all duration-200 min-w-0 overflow-hidden",
        isSelected
          ? "border-[#712CDC] bg-purple-50/80 shadow-md ring-2 ring-[#712CDC]/30"
          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30",
      )}
    >
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <p className="text-xs sm:text-[15px] font-extrabold text-gray-900">{plan.duration} Months</p>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-[#712CDC] uppercase tracking-wide">
            No-Cost EMI
          </span>
        </div>
        <p className="tabular text-[11px] sm:text-xs font-semibold text-gray-500">
          Total {formatINR(plan.totalPayable)} <span className="text-gray-400">·</span> {plan.interestRate.toFixed(0)}% p.a.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <p className="tabular text-xs sm:text-[15px] font-black text-[#712CDC]">{formatINR(plan.monthlyAmount)}/mo</p>
        <span
          className={cn(
            "flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isSelected ? "border-[#712CDC] bg-[#712CDC] text-white" : "border-gray-300 bg-white",
          )}
        >
          {isSelected && <Check className="size-3 stroke-[3]" aria-hidden="true" />}
        </span>
      </div>
    </button>
  );
}
