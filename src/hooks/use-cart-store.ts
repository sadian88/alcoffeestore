"use client";

import { useState, useEffect, useCallback } from 'react';
import type { KitConfig, CartItem } from '@/types';

const CART_STORAGE_KEY = 'kawaCoffeeCart';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    // corrupted data, clear it
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

export function useCartStore() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) { 
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = useCallback((kit: Omit<KitConfig, 'id'>) => {
    setCartItems(prevItems => {
      const newKit: CartItem = { 
        ...kit, 
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        quantity: 1, // Default quantity
      };
      // For simplicity, we add as a new item even if identical.
      // Future enhancement: check if identical item exists and increment quantity.
      return [...prevItems, newKit];
    });
  }, []);

  const removeFromCart = useCallback((kitId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== kitId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
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
