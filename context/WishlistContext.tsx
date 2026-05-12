"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { addToWishlistDB, removeFromWishlistDB, getWishlistDB } from "@/helper";
import { isUserLoggedIn } from "@/helper/auth/action";
import { toast } from "sonner";

const WISHLIST_STORAGE_KEY = "morzze_wishlist";

type WishlistContextType = {
  wishlistSlugs: string[];
  isInWishlist: (slug: string) => boolean;
  toggleWishlist: (slug: string, productId?: string) => void;
  loading: boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlistSlugs: [],
  isInWishlist: () => false,
  toggleWishlist: () => {},
  loading: false,
});

export const useWishlist = () => useContext(WishlistContext);

// Local storage helpers
function getLocalWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalWishlist(slugs: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(slugs));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    isUserLoggedIn()
      .then((status) => setLoggedIn(status))
      .catch(() => setLoggedIn(false));
  }, []);

  // Load wishlist based on auth status
  useEffect(() => {
    if (loggedIn === null) return; // still checking

    const loadWishlist = async () => {
      setLoading(true);
      try {
        if (loggedIn) {
          // Sync local wishlist to DB first (if any local items exist)
          const localSlugs = getLocalWishlist();
          if (localSlugs.length > 0) {
            // We can't sync slugs to DB without productIds, so we keep them as-is
            // The DB wishlist uses productIds, local uses slugs
            // Clear local after login since DB is the source of truth
            // Note: local items without DB product IDs will be lost on login
            setLocalWishlist([]);
          }

          // Load from DB
          const dbItems = await getWishlistDB();
          // dbItems have productId and product details, but we need slugs
          // Since the DB join returns product info, we can extract slugs
          const slugs = dbItems
            .map((item: any) => item.slug)
            .filter(Boolean);
          setWishlistSlugs(slugs);
        } else {
          // Load from localStorage
          setWishlistSlugs(getLocalWishlist());
        }
      } catch {
        // Fallback to local storage
        setWishlistSlugs(getLocalWishlist());
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [loggedIn]);

  const isInWishlist = useCallback(
    (slug: string) => wishlistSlugs.includes(slug),
    [wishlistSlugs]
  );

  const toggleWishlist = useCallback(
    async (slug: string, productId?: string) => {
      const isCurrentlyInWishlist = wishlistSlugs.includes(slug);

      // Optimistic update
      const newSlugs = isCurrentlyInWishlist
        ? wishlistSlugs.filter((s) => s !== slug)
        : [...wishlistSlugs, slug];

      setWishlistSlugs(newSlugs);

      if (loggedIn && productId) {
        // Logged in → DB operations
        try {
          if (isCurrentlyInWishlist) {
            await removeFromWishlistDB(productId);
            toast.success("Removed from wishlist");
          } else {
            await addToWishlistDB(productId);
            toast.success("Added to wishlist");
          }
        } catch (error: any) {
          // Revert optimistic update
          setWishlistSlugs(wishlistSlugs);
          toast.error(error.message || "Failed to update wishlist");
        }
      } else {
        // Not logged in → localStorage
        setLocalWishlist(newSlugs);
        if (isCurrentlyInWishlist) {
          toast.success("Removed from wishlist");
        } else {
          toast.success("Added to wishlist");
        }
      }
    },
    [wishlistSlugs, loggedIn]
  );

  return (
    <WishlistContext.Provider value={{ wishlistSlugs, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}
