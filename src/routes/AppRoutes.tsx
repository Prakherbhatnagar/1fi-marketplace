import { Route, Routes } from "react-router-dom";
import Shop from "@/pages/Shop";
import TopBrands from "@/pages/TopBrands";
import NearbyStores from "@/pages/NearbyStores";
import Marketplace from "@/pages/Marketplace";
import ProductDetails from "@/pages/ProductDetails";
import NotFound from "@/pages/NotFound";
import { Placeholder } from "@/pages/Placeholder";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder title="Home" note="Welcome to 1Fi" />} />
      <Route path="/emi-dues" element={<Placeholder title="EMI Dues" note="View and manage your upcoming EMI payments." />} />
      <Route path="/limit" element={<Placeholder title="Limit" note="Check your credit limit and loan details." />} />
      <Route path="/profile" element={<Placeholder title="Profile" note="Manage your profile settings and accounts." />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/top-brands" element={<TopBrands />} />
      <Route path="/shop/nearby-stores" element={<NearbyStores />} />
      <Route path="/shop/marketplace" element={<Marketplace />} />
      <Route path="/shop/marketplace/product/:id" element={<ProductDetails />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
