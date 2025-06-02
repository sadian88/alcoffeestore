
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { KitConfig, CartItem } from '@/types';

const CART_STORAGE_KEY = 'kawaCoffeeCart';

// --- Module-level store ---
let cartMemoryState: CartItem[] = [];
const cartListeners: Array<(state: CartItem[]) => void> = [];
let clientStoreInitialized = false; // To track if localStorage has been loaded

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    // If parsing fails, clear corrupted data
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

// Initialize store once on the client when the module is first imported
if (typeof window !== 'undefined' && !clientStoreInitialized) {
  cartMemoryState = loadCartFromStorage();
  clientStoreInitialized = true;
}

// Function to update the shared state, persist it, and notify listeners
function updateSharedCartState(updater: (prevState: CartItem[]) => CartItem[]) {
  cartMemoryState = updater(cartMemoryState);
  saveCartToStorage(cartMemoryState);
  // Notify all listeners with a new array reference (snapshot)
  const newStateSnapshot = [...cartMemoryState];
  cartListeners.forEach(listener => listener(newStateSnapshot));
}
// --- End Module-level store ---

export function useCartStore() {
  // Initialize local state with a snapshot of the current shared state
  const [cartItems, setLocalCartItems] = useState<CartItem[]>(() => [...cartMemoryState]);
  // isCartLoaded reflects if the shared store has been initialized from localStorage
  const [isCartLoaded, setIsCartLoaded] = useState(clientStoreInitialized);

  useEffect(() => {
    // This effect runs on mount to handle client-side specifics and subscribe to updates.
    if (typeof window !== 'undefined') {
        // If the shared store wasn't initialized when useState ran (e.g. module just loaded on client),
        // ensure it is initialized and local state is synced.
        if (!clientStoreInitialized) {
            cartMemoryState = loadCartFromStorage();
            clientStoreInitialized = true;
        }
        // Sync local state if it somehow diverged or for initial client load.
        setLocalCartItems([...cartMemoryState]);
        setIsCartLoaded(true); // Mark as loaded for this instance
    }

    // Define the listener for this specific instance of the hook
    const currentListener = (newState: CartItem[]) => {
        setLocalCartItems(newState); // newState is already a snapshot
    };
    
    cartListeners.push(currentListener); // Subscribe
    
    // Clean up listener on component unmount
    return () => {
      const index = cartListeners.indexOf(currentListener);
      if (index > -1) {
        cartListeners.splice(index, 1);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  const addToCart = useCallback((kit: Omit<KitConfig, 'id'>) => {
    updateSharedCartState(prevItems => {
      const newKit: CartItem = {
        ...kit,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        quantity: 1, // Default quantity
      };
      return [...prevItems, newKit];
    });
  }, []);

  const removeFromCart = useCallback((kitId: string) => {
    updateSharedCartState(prevItems => prevItems.filter(item => item.id !== kitId));
  }, []);

  const clearCart = useCallback(() => {
    updateSharedCartState(() => []); // Pass a function that returns an empty array
  }, []);
  
  const getCartItemCount = useCallback(() => {
    // Calculates based on the local, synced cartItems state
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cartItems]);

  return {
    cartItems, // This is the local state, kept in sync with cartMemoryState
    isCartLoaded,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
  };
}
