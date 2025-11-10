'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  extras?: Array<{ id: string; name: string; price: number }>;
  notes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  deliveryFee: number;
  minOrder: number;
}

interface CartStore {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: Omit<CartItem, 'quantity'>, restaurant: Restaurant) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  canCheckout: () => boolean;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurant: null,

      addItem: (item, restaurant) => {
        const state = get();
        
        // If cart has items from another restaurant, clear it
        if (state.restaurant && state.restaurant.id !== restaurant.id) {
          set({ items: [], restaurant });
        } else if (!state.restaurant) {
          set({ restaurant });
        }

        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          restaurant: state.items.filter((item) => item.id !== id).length === 0 ? null : state.restaurant,
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], restaurant: null });
      },

      getTotalPrice: () => {
        const state = get();
        const subtotal = state.items.reduce((total, item) => {
          const extrasTotal = item.extras?.reduce((extraTotal, extra) => 
            extraTotal + extra.price, 0) || 0;
          return total + (item.price + extrasTotal) * item.quantity;
        }, 0);
        
        return subtotal + (state.restaurant?.deliveryFee || 0);
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const extrasTotal = item.extras?.reduce((extraTotal, extra) => 
            extraTotal + extra.price, 0) || 0;
          return total + (item.price + extrasTotal) * item.quantity;
        }, 0);
      },

      getDeliveryFee: () => {
        const state = get();
        return state.restaurant?.deliveryFee || 0;
      },

      canCheckout: () => {
        const state = get();
        if (!state.restaurant) return false;
        
        const subtotal = state.getSubtotal();
        return subtotal >= state.restaurant.minOrder;
      },
    }),
    {
      name: 'rioeats-cart',
    }
  )
);