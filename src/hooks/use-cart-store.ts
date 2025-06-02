
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { CartItem } from '@/types';

const CART_STORAGE_KEY = 'kawaCoffeeCart';

let cartMemoryState: CartItem[] = [];
const cartListeners: Array<(state: CartItem[]) => void> = [];
let clientStoreInitialized = false;

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

if (typeof window !== 'undefined' && !clientStoreInitialized) {
  cartMemoryState = loadCartFromStorage();
  clientStoreInitialized = true;
}

function updateSharedCartState(updater: (prevState: CartItem[]) => CartItem[]) {
  cartMemoryState = updater(cartMemoryState);
  saveCartToStorage(cartMemoryState);
  const newStateSnapshot = [...cartMemoryState];
  cartListeners.forEach(listener => listener(newStateSnapshot));
}

export function useCartStore() {
  const [cartItems, setLocalCartItems] = useState<CartItem[]>(() => [...cartMemoryState]);
  const [isCartLoaded, setIsCartLoaded] = useState(clientStoreInitialized);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        if (!clientStoreInitialized) {
            cartMemoryState = loadCartFromStorage();
            clientStoreInitialized = true;
        }
        setLocalCartItems([...cartMemoryState]);
        setIsCartLoaded(true); 
    }

    const currentListener = (newState: CartItem[]) => {
        setLocalCartItems(newState);
    };
    
    cartListeners.push(currentListener);
    
    return () => {
      const index = cartListeners.indexOf(currentListener);
      if (index > -1) {
        cartListeners.splice(index, 1);
      }
    };
  }, []);

  const addToCart = useCallback((itemToAdd: Omit<CartItem, 'id' | 'quantity'>) => {
    updateSharedCartState(prevItems => {
      const newItem: CartItem = {
        ...itemToAdd,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        quantity: 1,
      };
      // Simple add, no quantity check for existing items for now
      return [...prevItems, newItem];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    updateSharedCartState(prevItems => prevItems.filter(item => item.id !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    updateSharedCartState(() => []);
  }, []);
  
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cartItems]);

  return {
    cartItems,
    isCartLoaded,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
  };
}
