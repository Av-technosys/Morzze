"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const CART_STORAGE_KEY = "morzze_cart";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (slug: string, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (slug: string) => number;
  totalItems: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getItemQuantity: () => 0,
  totalItems: 0,
});

export const useCart = () => useContext(CartContext);

function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getLocalCart());
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever cart changes (after initial load)
  useEffect(() => {
    if (loaded) {
      setLocalCart(cartItems);
    }
  }, [cartItems, loaded]);

  const addToCart = useCallback((slug: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        toast.success("Cart updated");
        return prev.map((item) =>
          item.slug === slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success("Added to cart");
        return [...prev, { slug, quantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
    toast.success("Removed from cart");
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.slug !== slug));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (slug: string) => {
      return cartItems.find((item) => item.slug === slug)?.quantity ?? 0;
    },
    [cartItems]
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
