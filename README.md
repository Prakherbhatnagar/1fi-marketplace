# 1Fi Shop - 1Fi Marketplace

Frontend implementation of the 1Fi Marketplace section inside the Shop experience of the 1Fi web app.

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
npm run preview
```

## Overview & Scope

The application is structured into the three main Shop navigation tabs:

- **1Fi Marketplace** (`/shop/marketplace` or `/shop`): Product catalog listing, category filters, product search, product details, variant selection, dynamic EMI plan calculations, and order confirmation.
- **Top Brands** (`/shop/top-brands`): Section placeholder.
- **Nearby Stores** (`/shop/nearby-stores`): Section placeholder.

The bottom navigation includes tabs for Home, Shop, EMI Dues, Limit, and Profile matching the 1Fi app layout.

## Project Structure

```
src/
├── api/
│   └── productApi.ts        # Mock async API services (getProducts, getProductById)
├── components/
│   ├── layout/              # AppShell, ShopHeader, BottomNav, TopBar
│   ├── EMIPlanCard.tsx       # EMI plan card component
│   ├── EMIPlanSelector.tsx   # EMI plan radio selector
│   ├── OrderConfirmation.tsx # Order confirmation view
│   ├── ProductCard.tsx       # Product listing card
│   ├── ProductGrid.tsx       # Product grid layout
│   └── VariantSelector.tsx   # Product variant selector
├── data/
│   └── products.ts          # Product data and EMI ladder generator
├── hooks/
│   ├── useProduct.ts        # Hook for single product state
│   └── useProducts.ts       # Hook for products list state
├── pages/
│   ├── Marketplace.tsx      # Marketplace listing page
│   ├── ProductDetails.tsx   # Product detail & EMI flow page
│   ├── Shop.tsx             # Main Shop entry
│   ├── TopBrands.tsx        # Top Brands page
│   └── NearbyStores.tsx     # Nearby Stores page
├── routes/
│   └── AppRoutes.tsx        # Application routes
├── types.ts                 # TypeScript type definitions
└── index.css                # Tailwind theme configuration
```

## Features & Implementation Details

- **Dynamic Data Handling**: Product data and EMI plan calculations are abstracted into asynchronous API services (`src/api/productApi.ts`) and accessed via custom React hooks (`useProducts`, `useProduct`).
- **QA Testing Helpers**: Loading, error, and empty states can be simulated by appending query parameters to the URL:
  - Error state: `/shop/marketplace?simulate=error`
  - Empty state: `/shop/marketplace?simulate=empty`
- **Responsive Layout**: Designed for mobile and desktop viewports up to `500px` shell container with fixed bottom navigation and auto-scrolling error handling.
