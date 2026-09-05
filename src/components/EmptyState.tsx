import type { ReactNode } from "react";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-(--color-line-strong) bg-(--color-surface) px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-(--color-surface-sunken) text-(--color-ink-faint)">
        <PackageSearch className="size-5" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-[15px] font-semibold text-(--color-ink)">{title}</p>
        {description && <p className="text-sm text-(--color-ink-soft)">{description}</p>}
      </div>
      {action}
    </div>
  );
}
