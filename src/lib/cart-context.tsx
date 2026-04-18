'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { CartItem, CartState, Product } from './types';

// --- Actions ---
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number; variantId?: string; variantName?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// --- Helper Functions ---
function generateCartItemId(productId: string, variantId?: string): string {
  return variantId ? `${productId}-${variantId}` : productId;
}

function calculateTotals(items: CartItem[]): Omit<CartState, 'items'> {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = subtotal > 99 ? 0 : (itemCount > 0 ? 9.99 : 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // ~8% tax
  const total = subtotal + shippingCost + tax;

  return {
    itemCount,
    subtotal: Math.round(subtotal * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    tax,
    total: Math.round(total * 100) / 100,
    discount: 0,
  };
}

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem('zeneio_cart', JSON.stringify(items));
  } catch {}
}

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('zeneio_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// --- Reducer ---
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, variantId, variantName } = action.payload;
      const itemId = generateCartItemId(product.id, variantId);
      const existingIndex = state.items.findIndex(item => item.id === itemId);

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        // Item exists - increase quantity
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          variantId,
          variantName,
        };
        newItems = [...state.items, newItem];
      }

      saveToStorage(newItems);
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      saveToStorage(newItems);
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== id);
        saveToStorage(newItems);
        return { ...state, items: newItems, ...calculateTotals(newItems) };
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(quantity, 10) } : item
      );
      saveToStorage(newItems);
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }

    case 'CLEAR_CART':
      saveToStorage([]);
      return { ...state, items: [], ...calculateTotals([]) };

    case 'LOAD_CART':
      return { ...state, items: action.payload, ...calculateTotals(action.payload) };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  shippingCost: 0,
  tax: 0,
  total: 0,
  discount: 0,
};

// --- Context ---
interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number, variantId?: string, variantName?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: stored });
    }
  }, []);

  const addItem = useCallback((
    product: Product,
    quantity = 1,
    variantId?: string,
    variantName?: string
  ) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variantId, variantName } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback((productId: string) => {
    return state.items.some(item => item.productId === productId);
  }, [state.items]);

  const getItemQuantity = useCallback((productId: string) => {
    const item = state.items.find(i => i.productId === productId);
    return item?.quantity || 0;
  }, [state.items]);

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
