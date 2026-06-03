"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import {
  clearCart as clearCartDB,
  getCart,
  setUserCartItemQuantity,
} from "@/helper/cart/action";
import { isUserLoggedIn } from "@/helper/auth/action";
import { useRouter } from "next/navigation";

const CART_STORAGE_KEY = "morzze_cart";
const CART_SYNC_DEBOUNCE_MS = 500;

export type CartItem = {
  slug: string;
  quantity: number;
  name?: string;
  price?: number;
  oldPrice?: number;
  image?: string;
  sku?: string;
  productId?: string;
  productVarientBox?: string | null;
  isTypeSubscription?: boolean;
  frequencyInMonths?: number | null;
  clientCartItemId?: string | null;
};

export type AppliedCoupon = {
  code: string;
  discountValue: string;
  title?: string;
  discountPercent?: number;
  upto?: string | null;
  minimumOrder?: string | null;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (slug: string, quantity?: number, productData?: Partial<CartItem>) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (slug: string) => number;
  totalItems: number;
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
  clearCoupon: () => void;
};

type PendingSync = ReturnType<typeof setTimeout>;

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getItemQuantity: () => 0,
  totalItems: 0,
  appliedCoupon: null,
  setAppliedCoupon: () => {},
  clearCoupon: () => {},
});

const pendingSyncs = new Map<string, PendingSync>();
const syncVersions = new Map<string, number>();

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

function getItemKey(item: Pick<CartItem, "slug" | "productId" | "productVarientBox">) {
  return `${item.productId ?? item.slug}:${item.productVarientBox ?? "default"}`;
}

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(0, Math.trunc(quantity));
}

function mapDbCartItems(items: unknown[]): CartItem[] {
  return items.reduce<CartItem[]>((mappedItems, item) => {
    const row = item as {
      productId?: string;
      productVarientBox?: string | null;
      isTypeSubscription?: boolean;
      frequencyInMonths?: number | null;
      quantity?: number | null;
      title?: string | null;
      image?: string | null;
      price?: number | null;
      originalPrice?: number | null;
      slug?: string | null;
      sku?: string | null;
    };

    if (!row.productId) return mappedItems;

    mappedItems.push({
        productId: row.productId,
        productVarientBox: row.productVarientBox ?? null,
        isTypeSubscription: row.isTypeSubscription,
        frequencyInMonths: row.frequencyInMonths ?? null,
        slug: row.slug || row.productId,
        name: row.title || "Product",
        image: row.image || "/product.png",
        price: row.price || 0,
        oldPrice: row.originalPrice || undefined,
        sku: row.sku || undefined,
        quantity: row.quantity ?? 1,
      });

    return mappedItems;
  }, []);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const syncCartFromDb = useCallback(async () => {
    const result = await getCart();

    if (result.success && result.items) {
      setCartItems(mapDbCartItems(result.items));
    }
  }, []);

  const syncItemNow = useCallback(
    async (item: CartItem, quantity: number) => {
      if (!item.productId) {
        toast.error("Unable to sync this cart item");
        return false;
      }

      const key = getItemKey(item);
      const existingTimer = pendingSyncs.get(key);

      if (existingTimer) {
        clearTimeout(existingTimer);
        pendingSyncs.delete(key);
      }

      const version = (syncVersions.get(key) ?? 0) + 1;
      syncVersions.set(key, version);

      try {
        const result = await setUserCartItemQuantity({
          productId: item.productId,
          productVarientBox: item.productVarientBox ?? null,
          quantity,
          isTypeSubscription: item.isTypeSubscription,
          frequencyInMonths: item.frequencyInMonths ?? null,
          clientCartItemId: item.clientCartItemId ?? null,
        });

        if (syncVersions.get(key) !== version) {
          return true;
        }

        if (result.userIsNotLoggedIn) {
          await syncCartFromDb();
          return false;
        }

        if (!result.success) {
          toast.error(result.message ?? "Unable to update cart");
          await syncCartFromDb();
          return false;
        }

        return true;
      } catch (error) {
        console.error(error);
        toast.error("Unable to update cart");
        await syncCartFromDb();
        return false;
      }
    },
    [syncCartFromDb],
  );

  const debouncedSyncItem = useCallback(
    (item: CartItem, quantity: number) => {
      if (!item.productId) {
        toast.error("Unable to sync this cart item");
        return false;
      }

      const key = getItemKey(item);
      const existingTimer = pendingSyncs.get(key);

      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const version = (syncVersions.get(key) ?? 0) + 1;
      syncVersions.set(key, version);

      const timer = setTimeout(async () => {
        pendingSyncs.delete(key);

        try {
          const result = await setUserCartItemQuantity({
            productId: item.productId,
            productVarientBox: item.productVarientBox ?? null,
            quantity,
            isTypeSubscription: item.isTypeSubscription,
            frequencyInMonths: item.frequencyInMonths ?? null,
            clientCartItemId: item.clientCartItemId ?? null,
          });

          if (syncVersions.get(key) !== version) {
            return;
          }

          if (result.userIsNotLoggedIn) {
            await syncCartFromDb();
            return;
          }

          if (!result.success) {
            toast.error(result.message ?? "Unable to update cart");
            await syncCartFromDb();
          }
        } catch (error) {
          console.error(error);
          toast.error("Unable to update cart");
          await syncCartFromDb();
        }
      }, CART_SYNC_DEBOUNCE_MS);

      pendingSyncs.set(key, timer);
      return true;
    },
    [syncCartFromDb],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(getLocalCart());
      setCartLoaded(true);
      void syncCartFromDb();
    }, 0);

    return () => clearTimeout(timer);
  }, [syncCartFromDb]);

  useEffect(() => {
    if (!cartLoaded) return;
    setLocalCart(cartItems);
  }, [cartItems, cartLoaded]);

  const addToCart = useCallback(
    async (slug: string, quantity: number = 1, productData?: Partial<CartItem>) => {
      const loggedIn = await isUserLoggedIn();

      if (!loggedIn) {
        router.push("/login");
        return;
      }

      const safeQuantity = normalizeQuantity(quantity || 1);
      let nextSyncTarget: CartItem | undefined;

      setCartItems((prev) => {
        const candidate: CartItem = {
          slug,
          quantity: safeQuantity,
          ...(productData ?? {}),
        };
        const existing = prev.find((item) => getItemKey(item) === getItemKey(candidate));

        if (existing) {
          nextSyncTarget = {
            ...existing,
            ...(productData ?? {}),
            quantity: existing.quantity + safeQuantity,
          };

          return prev.map((item) =>
            getItemKey(item) === getItemKey(candidate) ? nextSyncTarget! : item,
          );
        }

        nextSyncTarget = candidate;
        return [...prev, candidate];
      });

      if (nextSyncTarget) {
        debouncedSyncItem(nextSyncTarget, nextSyncTarget.quantity);
      }
    },
    [debouncedSyncItem, router],
  );

  const removeFromCart = useCallback(
    (slug: string) => {
      const item = cartItems.find((cartItem) => cartItem.slug === slug);
      if (!item) return;

      setCartItems((prev) => prev.filter((cartItem) => cartItem.slug !== slug));
      void syncItemNow(item, 0);
    },
    [cartItems, syncItemNow],
  );

  const updateQuantity = useCallback(
    (slug: string, quantity: number) => {
      const item = cartItems.find((cartItem) => cartItem.slug === slug);
      if (!item) return;

      const safeQuantity = normalizeQuantity(quantity);
      const updatedItem = { ...item, quantity: safeQuantity };

      if (safeQuantity <= 0) {
        setCartItems((prev) => prev.filter((cartItem) => cartItem.slug !== slug));
        void syncItemNow(item, 0);
        return;
      }

      setCartItems((prev) =>
        prev.map((cartItem) => (cartItem.slug === slug ? updatedItem : cartItem)),
      );
      debouncedSyncItem(updatedItem, safeQuantity);
    },
    [cartItems, debouncedSyncItem, syncItemNow],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
    void clearCartDB();
  }, []);

  const clearCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const getItemQuantity = useCallback(
    (slug: string) => {
      return cartItems.find((item) => item.slug === slug)?.quantity ?? 0;
    },
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

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
        appliedCoupon,
        setAppliedCoupon,
        clearCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
