import type { VariantGroup } from "@/types";
import { cn } from "@/lib/cn";

interface VariantSelectorProps {
  group: VariantGroup;
  selectedOption?: string;
  onSelect: (type: string, option: string) => void;
}

export function VariantSelector({ group, selectedOption, onSelect }: VariantSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-[13px] font-semibold text-(--color-ink)">{group.type}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={group.type}>
        {group.options.map((option) => {
          const isSelected = option === selectedOption;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(group.type, option)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150",
                isSelected
                  ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-purple-300 hover:text-purple-700",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
