import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'foodfly-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Address = {
  id: string
  user_id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  postal_code: string
  is_default: boolean
  location?: {
    type: 'Point'
    coordinates: [number, number]
  }
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  description?: string
  image_url?: string
  created_at: string
}

export type Restaurant = {
  id: string
  name: string
  description?: string
  image_url?: string
  address: string
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  phone: string
  email?: string
  opening_hours: {
    [key: string]: {
      is_open: boolean
      open: string
      close: string
    }
  }
  delivery_radius: number
  minimum_order_value: number
  delivery_fee: number
  average_preparation_time: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type MenuCategory = {
  id: string
  restaurant_id: string
  name: string
  description?: string
  image_url?: string
  created_at: string
}

export type MenuItem = {
  id: string
  restaurant_id: string
  category_id: string
  name: string
  description?: string
  price: number
  image_url?: string
  is_available: boolean
  preparation_time?: number
  created_at: string
  updated_at: string
}

export type ItemCustomization = {
  id: string
  menu_item_id: string
  name: string
  description?: string
  price: number
  is_required: boolean
  max_selections?: number
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  restaurant_id: string
  address_id: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
  subtotal: number
  delivery_fee: number
  discount: number
  total: number
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  estimated_delivery_time?: string
  actual_delivery_time?: string
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  subtotal: number
  notes?: string
  created_at: string
}

export type OrderItemCustomization = {
  id: string
  order_item_id: string
  customization_id: string
  quantity: number
  unit_price: number
  subtotal: number
  created_at: string
}

export type Review = {
  id: string
  order_id: string
  user_id: string
  restaurant_id: string
  rating: number
  comment?: string
  food_rating?: number
  delivery_rating?: number
  created_at: string
  updated_at: string
}

export type Promotion = {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_value?: number
  max_discount?: number
  start_date: string
  end_date: string
  max_uses?: number
  current_uses: number
  is_active: boolean
  created_at: string
}

export type UserPromotionUse = {
  user_id: string
  promotion_id: string
  uses_count: number
}