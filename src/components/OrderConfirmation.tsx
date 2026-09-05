import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { EMIPlan, Product, SelectedVariants } from "@/types";
import { formatINR } from "@/lib/format";
import { PrimaryButton } from "@/components/PrimaryButton";

interface OrderConfirmationProps {
  product: Product;
  selectedVariants: SelectedVariants;
  plan: EMIPlan;
}

export function OrderConfirmation({ product, selectedVariants, plan }: OrderConfirmationProps) {
  const variantEntries = Object.entries(selectedVariants);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 py-6 text-center overflow-hidden"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="flex size-16 items-center justify-center rounded-full bg-purple-100 text-[#7C3AED] shadow-sm ring-8 ring-purple-50"
      >
        <CheckCircle2 className="size-9 stroke-[2.2]" aria-hidden="true" />
      </motion.span>

      <div className="space-y-1">
        <h2 className="text-[20px] font-extrabold text-slate-900">EMI Application Confirmed</h2>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          We've reserved your EMI plan for <span className="font-bold text-slate-800">{product.name}</span>.
        </p>
      </div>

      <div className="w-full space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Product</span>
          <span className="text-sm font-bold text-slate-900">{product.name}</span>
        </div>

        {variantEntries.map(([type, option]) => (
          <div key={type} className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{type}</span>
            <span className="text-sm font-semibold text-slate-800">{option}</span>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-sm text-slate-500">Total Price</span>
          <span className="tabular text-sm font-bold text-slate-900">{formatINR(product.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">EMI Duration</span>
          <span className="text-sm font-bold text-slate-900">{plan.duration} Months</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Monthly EMI</span>
          <span className="tabular text-sm font-extrabold text-[#7C3AED]">
            {formatINR(plan.monthlyAmount)}/mo
          </span>
        </div>
      </div>

      <Link to="/shop/marketplace" className="w-full">
        <PrimaryButton fullWidth>Back to Marketplace</PrimaryButton>
      </Link>
    </motion.div>
  );
}
