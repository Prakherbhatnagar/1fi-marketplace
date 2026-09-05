import { AlertTriangle } from "lucide-react";
import { PrimaryButton } from "@/components/PrimaryButton";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message = "Unable to load products", onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface) px-6 py-14 text-center"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-(--color-warn-soft) text-(--color-warn)">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-[15px] font-semibold text-(--color-ink)">{message}</p>
        <p className="text-sm text-(--color-ink-soft)">Check your connection and try again.</p>
      </div>
      <PrimaryButton variant="secondary" onClick={onRetry}>
        Try again
      </PrimaryButton>
    </div>
  );
}
