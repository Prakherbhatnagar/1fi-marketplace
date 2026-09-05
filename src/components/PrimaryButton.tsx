import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function PrimaryButton({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]",
        variant === "primary" &&
          "bg-[#712CDC] text-white shadow-lg shadow-purple-600/25 hover:bg-[#5b24b5] active:bg-[#5b24b5]",
        variant === "secondary" &&
          "border border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:bg-purple-50/50",
        variant === "ghost" && "text-[#712CDC] hover:bg-purple-50",
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
