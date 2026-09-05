import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface TopBarProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  action?: ReactNode;
}

export function TopBar({ title, onBack, showBack = true, action }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-(--color-line) bg-(--color-canvas)/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3.5">
        {showBack && (
          <button
            type="button"
            onClick={onBack ?? (() => navigate(-1))}
            aria-label="Go back"
            className="-ml-1.5 flex size-9 items-center justify-center rounded-full text-(--color-ink) transition-colors duration-150 hover:bg-(--color-surface-sunken)"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        )}
        <h1 className="flex-1 truncate text-[17px] font-semibold text-(--color-ink)">{title}</h1>
        {action}
      </div>
    </header>
  );
}
