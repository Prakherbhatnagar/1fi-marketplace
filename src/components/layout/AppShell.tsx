import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AppShellProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
}

export function AppShell({ header, footer, children, noPadding = false }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full bg-[#FAFAFA] text-gray-900 selection:bg-purple-100 selection:text-purple-900 flex justify-center overflow-x-hidden">
      <div className="flex min-h-dvh w-full max-w-[500px] flex-col bg-white shadow-2xl border-x border-gray-200/60 relative overflow-x-hidden min-w-0">
        {header}
        <main className={cn("w-full flex-1 min-w-0", footer ? "pb-24" : "pb-6")}>
          <div className={noPadding ? "" : "px-4 py-4"}>{children}</div>
        </main>
        {footer}
      </div>
    </div>
  );
}

