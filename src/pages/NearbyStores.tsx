import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShopHeader } from "@/components/layout/ShopHeader";

export default function NearbyStores() {
  return (
    <AppShell noPadding header={<ShopHeader searchPlaceholder="Search nearby partner stores..." />} footer={<BottomNav />}>
      <div className="px-4 py-16 text-center space-y-2">
        <p className="text-sm font-bold text-slate-700">Nearby Stores</p>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Find 1Fi partner retail stores near your location.
        </p>
      </div>
    </AppShell>
  );
}
