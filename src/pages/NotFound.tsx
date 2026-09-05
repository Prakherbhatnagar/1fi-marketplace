import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function NotFound() {
  return (
    <AppShell>
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist."
        action={
          <Link to="/shop">
            <PrimaryButton variant="secondary">Go to Shop</PrimaryButton>
          </Link>
        }
      />
    </AppShell>
  );
}
