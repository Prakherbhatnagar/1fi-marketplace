import { NavLink } from "react-router-dom";
import { Home, Store, User } from "lucide-react";
import { cn } from "@/lib/cn";

function EmiDuesIcon({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Serrated receipt tag outline */}
      <path d="M4 3.5L6.5 2L9 3.5L11.5 2L14 3.5L16.5 2L19 3.5V20.5L16.5 22L14 20.5L11.5 22L9 20.5L6.5 22L4 20.5V3.5Z" />
      {/* Indian Rupee Symbol ₹ inside receipt */}
      <path d="M8.5 7.5H15.5" />
      <path d="M8.5 10.5H14.5" />
      <path d="M9.5 7.5V11C9.5 12.3 10.5 13.2 11.8 13.2H12.5" />
      <path d="M9.8 13.5L14.8 18.5" />
    </svg>
  );
}

function LimitIcon({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 4 Vertical bar chart columns */}
      <line x1="6.5" y1="15" x2="6.5" y2="18.5" />
      <line x1="10.5" y1="12" x2="10.5" y2="18.5" />
      <line x1="14.5" y1="9.5" x2="14.5" y2="18.5" />
      <line x1="18.5" y1="6" x2="18.5" y2="18.5" />
      {/* Upward trend line above bars */}
      <path d="M5.5 13.5L9.5 9.5L13.5 12.5L19 6.5" />
    </svg>
  );
}

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/shop", label: "Shop", icon: Store },
  { to: "/emi-dues", label: "EMI Dues", icon: EmiDuesIcon },
  { to: "/limit", label: "Limit", icon: LimitIcon },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-[500px] items-stretch rounded-[28px] bg-white border border-white/40 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center transition-all duration-200",
                isActive ? "text-[#712CDC]" : "text-gray-400 hover:text-gray-600",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <>
                    <span className="absolute left-1/2 -top-[3px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-[#712CDC]" aria-hidden="true" />
                    <span
                      className="absolute inset-1 rounded-[14px] opacity-50"
                      style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.12) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <Icon
                  className={cn("relative h-[22px] w-[22px] transition-transform duration-200 group-active:scale-90", isActive && "drop-shadow-[0_0_6px_rgba(113,44,220,0.3)]")}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                <span className={cn("relative max-w-full truncate text-[10px] tracking-wide", isActive ? "font-bold" : "font-medium")}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
