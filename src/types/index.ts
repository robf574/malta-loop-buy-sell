// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string;
  locality: string;
  owned_brands: string[];
  wishlist_brands: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Listing Types
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: string;
  location: string;
  images: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  locality: string;
  price_range: string;
  contact_info: string;
  status: 'Active' | 'Inactive';
  user_id: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

// Garage Sale Types
export interface GarageSale {
  id: string;
  title: string;
  description: string;
  location: string;
  open_date: string;
  open_time: string;
  contact_info: string;
  items_count: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  featured_items?: FeaturedItem[];
}

export interface FeaturedItem {
  id: string;
  garage_sale_id: string;
  name: string;
  description: string;
  image_url: string;
  estimated_value_eur: number;
  sort_order: number;
  created_at: string;
}

// Wanted Ad Types
export interface WantedAd {
  id: string;
  title: string;
  description: string;
  category: string;
  max_price?: number;
  location: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

// Form Types
export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface ProfileFormData {
  username: string;
  locality: string;
  owned_brands: string[];
  wishlist_brands: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
