interface LoadingStateProps {
  variant?: "grid" | "details";
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-(--color-line) bg-(--color-surface)">
      <div className="aspect-square animate-pulse bg-(--color-surface-sunken)" />
      <div className="space-y-2 p-3.5">
        <div className="h-3 w-2/5 animate-pulse rounded-full bg-(--color-surface-sunken)" />
        <div className="h-3.5 w-4/5 animate-pulse rounded-full bg-(--color-surface-sunken)" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-(--color-surface-sunken)" />
        <div className="h-4 w-3/5 animate-pulse rounded-full bg-(--color-surface-sunken)" />
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="aspect-square w-full animate-pulse rounded-[var(--radius-lg)] bg-(--color-surface-sunken)" />
      <div className="space-y-3">
        <div className="h-3 w-1/4 animate-pulse rounded-full bg-(--color-surface-sunken)" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-(--color-surface-sunken)" />
        <div className="h-6 w-1/3 animate-pulse rounded-full bg-(--color-surface-sunken)" />
      </div>
      <div className="h-24 w-full animate-pulse rounded-[var(--radius-md)] bg-(--color-surface-sunken)" />
      <div className="h-32 w-full animate-pulse rounded-[var(--radius-md)] bg-(--color-surface-sunken)" />
    </div>
  );
}

export function LoadingState({ variant = "grid" }: LoadingStateProps) {
  if (variant === "details") {
    return (
      <div role="status" aria-live="polite" aria-label="Loading product">
        <DetailsSkeleton />
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading products"
      className="grid grid-cols-2 gap-2.5 xs:gap-3.5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
