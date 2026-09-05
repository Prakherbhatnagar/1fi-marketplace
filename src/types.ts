export interface VariantGroup {
  type: string;
  options: string[];
}

export interface EMIPlan {
  id: number;
  duration: number;
  monthlyAmount: number;
  totalPayable: number;
  interestRate: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  mrp?: number;
  rating: number;
  reviewCount: number;
  variants: VariantGroup[];
  emiPlans: EMIPlan[];
  description: string;
  highlights: string[];
}

export type SelectedVariants = Record<string, string>;
