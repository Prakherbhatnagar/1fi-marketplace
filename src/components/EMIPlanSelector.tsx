import type { EMIPlan } from "@/types";
import { EMIPlanCard } from "@/components/EMIPlanCard";

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlanId: number | null;
  onSelect: (planId: number) => void;
}

export function EMIPlanSelector({ plans, selectedPlanId, onSelect }: EMIPlanSelectorProps) {
  return (
    <div className="space-y-2.5" role="radiogroup" aria-label="EMI plan">
      {plans.map((plan) => (
        <EMIPlanCard key={plan.id} plan={plan} isSelected={plan.id === selectedPlanId} onSelect={onSelect} />
      ))}
    </div>
  );
}
