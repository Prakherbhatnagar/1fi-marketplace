import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { EmptyState } from "@/components/EmptyState";

interface PlaceholderProps {
  title: string;
  note: string;
}

export function Placeholder({ title, note }: PlaceholderProps) {
  return (
    <AppShell
      header={
        <header className="sticky top-0 z-20 border-b border-(--color-line) bg-(--color-canvas)/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium text-(--color-ink-faint)">1Fi</p>
            <h1 className="text-[20px] font-bold text-(--color-ink)">{title}</h1>
          </div>
        </header>
      }
      footer={<BottomNav />}
    >
      <EmptyState title={title} description={note} />
    </AppShell>
  );
}
