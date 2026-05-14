"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconShoppingBag, IconStarFilled, IconX, IconHeart } from "@tabler/icons-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { getProductsBySlugList } from "@/helper/product/action";

type WishlistProduct = {
  id: string;
  name: string | null;
  slug: string | null;
  sku: string | null;
  basePrice: number | null;
  strikethroughPrice: number | null;
  bannerImage: string | null;
  isInStock: boolean | null;
  rateing4Star: number | null;
  rateing5Star: number | null;
};

const WishlistPage = () => {
  const { wishlistSlugs, toggleWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);
  const [fetching, setFetching] = useState(false);

  // Fetch real product data from DB whenever wishlistSlugs changes
  useEffect(() => {
    if (loading || wishlistSlugs.length === 0) {
      setWishlistItems([]);
      return;
    }
    setFetching(true);
    getProductsBySlugList(wishlistSlugs)
      .then((items) => setWishlistItems(items as WishlistProduct[]))
      .catch(() => setWishlistItems([]))
      .finally(() => setFetching(false));
  }, [wishlistSlugs, loading]);

  // ─── Loading skeleton ────────────────────────────────────────────────────
  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-black text-white p-2 font-inter">
        <h2 className="text-2xl mb-8 font-medium">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-sm overflow-hidden">
              <div className="aspect-square bg-zinc-900 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Empty state ─────────────────────────────────────────────────────────
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-2 font-inter">
        <h2 className="text-2xl mb-8 font-medium">Wishlist</h2>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <IconHeart size={48} className="text-zinc-700 mb-4" />
          <p className="text-zinc-500 text-sm mb-6">Your wishlist is empty</p>
          <Link
            href="/products"
            className="bg-[#FFBF3F] hover:bg-[#ffb31f] text-black font-bold py-3 px-8 rounded-md text-sm transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ─── Product grid ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white p-2 font-inter">
      <h2 className="text-2xl mb-8 font-medium">Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => {
          const avgRating = ((item.rateing5Star ?? 0) * 5 + (item.rateing4Star ?? 0) * 4) /
            Math.max(1, (item.rateing5Star ?? 0) + (item.rateing4Star ?? 0));
          const displayRating = Math.round(avgRating) || 4;

          return (
            <div
              key={item.slug}
              className="bg-[#111] border border-white/5 rounded-sm overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative aspect-square bg-[#0A0A0A]">
                <button
                  onClick={() => toggleWishlist(item.slug!, item.id)}
                  className="absolute top-3 right-3 z-10 text-white/50 hover:text-white transition-colors"
                >
                  <IconX size={20} />
                </button>

                <Link href={`/products/${item.slug}`}>
                  {item.bannerImage ? (
                    <img
                      src={item.bannerImage}
                      alt={item.name ?? "Product"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <IconShoppingBag size={48} />
                    </div>
                  )}
                </Link>

                {!item.isInStock && (
                  <span className="absolute bottom-3 left-3 bg-red-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-1.5">
                {item.sku && (
                  <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                    {item.sku}
                  </p>
                )}
                <Link href={`/products/${item.slug}`}>
                  <h3 className="text-sm font-medium text-gray-200 hover:text-white transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                {/* Stars */}
                <div className="flex items-center gap-1 py-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStarFilled
                      key={i}
                      size={12}
                      className={i < displayRating ? "text-[#FFBF3F]" : "text-gray-800"}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 pb-4">
                  <span className="text-base font-bold">
                    ₹{item.basePrice?.toLocaleString("en-IN")}
                  </span>
                  {item.strikethroughPrice && (
                    <span className="text-xs text-gray-600 line-through">
                      ₹{item.strikethroughPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!item.isInStock}
                  onClick={() =>
                    addToCart(item.slug!, 1, {
                      name: item.name ?? undefined,
                      price: item.basePrice ?? undefined,
                      oldPrice: item.strikethroughPrice ?? undefined,
                      image: item.bannerImage ?? undefined,
                      sku: item.sku ?? undefined,
                      productId: item.id,
                    })
                  }
                  className="w-full bg-[#FFBF3F] hover:bg-[#ffb31f] text-black font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconShoppingBag size={18} />
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;