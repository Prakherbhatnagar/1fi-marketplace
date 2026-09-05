import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShopHeader } from "@/components/layout/ShopHeader";

export default function TopBrands() {
  return (
    <AppShell noPadding header={<ShopHeader searchPlaceholder="Search online stores..." />} footer={<BottomNav />}>
      <div className="px-4 py-16 text-center space-y-2">
        <p className="text-sm font-bold text-slate-700">Top Brands</p>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Explore partner brand stores and exclusive offers.
        </p>
      </div>
    </AppShell>
  );
}
