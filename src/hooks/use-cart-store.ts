
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { CartItem } from '@/types';

const CART_STORAGE_KEY = 'kawaCoffeeCart';

// Global state for cart data and listeners
let cartMemoryState: CartItem[] = [];
const cartListeners: Array<(state: CartItem[]) => void> = [];
let globalStoreInitialized = false; // Renamed for clarity

// Function to load cart from storage (client-side only)
function loadInitialCartData(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    localStorage.removeItem(CART_STORAGE_KEY); // Clear potentially corrupted data
    return [];
  }
}

// Initialize global cartMemoryState once on the client when the module loads
if (typeof window !== 'undefined' && !globalStoreInitialized) {
  cartMemoryState = loadInitialCartData();
  globalStoreInitialized = true;
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

// Function to update shared state and notify listeners
function updateSharedCartState(updater: (prevState: CartItem[]) => CartItem[]) {
  cartMemoryState = updater(cartMemoryState);
  saveCartToStorage(cartMemoryState);
  const newStateSnapshot = [...cartMemoryState]; // Create a new array for listeners
  cartListeners.forEach(listener => listener(newStateSnapshot));
}

export function useCartStore() {
  // Local state for the component instance, initialized from the current global state
  const [cartItems, setLocalCartItems] = useState<CartItem[]>(() => [...cartMemoryState]);
  // This state determines if THIS hook instance has completed its client-side setup
  const [hookInstanceLoaded, setHookInstanceLoaded] = useState(false);

  useEffect(() => {
    // This effect runs once per hook instance on the client-side
    
    // Ensure global state is initialized if it somehow wasn't by the module-level code
    // This is a safeguard, especially for environments where module execution timing might vary.
    if (typeof window !== 'undefined' && !globalStoreInitialized) {
      cartMemoryState = loadInitialCartData();
      globalStoreInitialized = true;
    }
    
    // Sync local component state with the potentially updated global state
    // This ensures the component has the latest cart data when it becomes "loaded"
    setLocalCartItems([...cartMemoryState]);
    
    // Mark this hook instance as loaded AFTER syncing state
    setHookInstanceLoaded(true);

    // Subscribe to changes in the global cart state
    const currentListener = (newState: CartItem[]) => {
      setLocalCartItems(newState);
    };
    cartListeners.push(currentListener);
    
    // Cleanup listener on unmount
    return () => {
      const index = cartListeners.indexOf(currentListener);
      if (index > -1) {
        cartListeners.splice(index, 1);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount for this hook instance

  const addToCart = useCallback((itemToAdd: Omit<CartItem, 'id' | 'quantity'>) => {
    updateSharedCartState(prevItems => {
      const newItem: CartItem = {
        ...itemToAdd,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        quantity: 1,
      };
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
    isCartLoaded: hookInstanceLoaded, // This ensures isCartLoaded is false on server and initial client render
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
  };
}
