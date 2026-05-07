/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cartTypes";

type CartState = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity" | "addedAt">) => void;
  removeItem: (productId: string, sku?: string, uuid?: any) => void;
  updateQuantity: (productId: string, quantity: number, sku?: string) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;

  totalItems: () => number;
  subtotal: () => number;
};

// const getItemKey = (item: { productId: string; sku?: string, uuid?: any }) =>
//   `${item.productId}-${item.sku || "default"}`;

const getItemKey = (item: {
  productId: string;
  sku?: string;
  uuid?: string;
}) =>
  `${item.productId}-${item.sku || "default"}-${item.uuid || "no-uuid"}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      setCart: (items) => set({ items }),

      addItem: (item) =>
        set((state:any) => {
          const existing = state.items.find(
            (i:any) => getItemKey(i) === getItemKey(item)
          );

          if (existing && item.isQuantityChangable == true) {
            return {
              items: state.items.map((i:any) =>
                getItemKey(i) === getItemKey(item)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...item,addedAt: Date.now() },
            ],
          };
        }),

      // removeItem: (productId, sku,uuid) =>
      //   set((state) => ({
      //     items: state.items.filter(
      //       (i) =>
      //         getItemKey(i) !==
      //         getItemKey({ productId, sku , uuid })
      //     ),
      //   })),

      removeItem: (productId, sku, uuid) =>
  set((state) => ({
    items: state.items.filter((i) => {
      // ✅ Case 1: uuid exists → strict match
      if (uuid) {
        return !(i.uuid === uuid);
      }

      // ✅ Case 2: fallback → productId + sku match
      return !(
        i.productId === productId &&
        (sku ? i.sku === sku : true)
      );
    }),
  })),

      updateQuantity: (productId, quantity, sku) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              getItemKey(i) ===
              getItemKey({ productId, sku })
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.length,

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "potent-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);