// ============================================
// ZENEIO E-commerce Platform - Type Definitions
// ============================================

// --- Product Types ---
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  category: CategorySlug;
  images: string[];
  thumbnail?: string;
  inStock: boolean;
  stockCount?: number;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  discountPercent?: number;
  sku?: string;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string; // e.g., "Size M", "Color Red"
  priceModifier?: number;
  inStock: boolean;
}

// --- Category System ---
export type CategorySlug = 'male' | 'female' | 'lingerie';

export interface Category {
  slug: CategorySlug;
  name: string;
  nameZh?: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'male',
    name: "MALE SERIES",
    nameZh: '男性实验室',
    description: 'Precision-engineered devices designed for male pleasure and performance. From vibrating rings to premium masturbators.',
    image: '/images/categories/male.jpg',
    icon: 'Mars',
    productCount: 0,
    color: '#81D8D0',
  },
  {
    slug: 'female',
    name: "FEMALE SERIES",
    nameZh: '女性实验室',
    description: 'Elegant intimate wellness products crafted for female pleasure and self-discovery.',
    image: '/images/categories/female.jpg',
    icon: 'Venus',
    productCount: 0,
    color: '#F472B6',
  },
  {
    slug: 'lingerie',
    name: 'INTIMATE COUTURE',
    nameZh: '感官着装',
    description: 'Alluring intimate apparel that celebrates your body and ignites desire.',
    image: '/images/categories/lingerie.jpg',
    icon: 'Sparkles',
    productCount: 0,
    color: '#9B87F5',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

// --- User & Auth Types ---
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// --- Cart Types ---
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  discount: number;
}

// --- Order Types ---
export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variantName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pending Payment', color: '#FBBF24' },
  confirmed: { label: 'Confirmed', color: '#81D8D0' },
  processing: { label: 'Processing', color: '#9B87F5' },
  shipped: { label: 'Shipped', color: '#60A5FA' },
  delivered: { label: 'Delivered', color: '#4ADE80' },
  cancelled: { label: 'Cancelled', color: '#F87171' },
  refunded: { label: 'Refunded', color: '#888888' },
};

// --- Review Types ---
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

// --- Address Book ---
export interface Address {
  id: string;
  userId: string;
  label: string; // e.g., "Home", "Office"
  fullName: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// --- Wishlist ---
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

// --- Blog/News ---
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  source: string;
  publishedAt: string;
}
