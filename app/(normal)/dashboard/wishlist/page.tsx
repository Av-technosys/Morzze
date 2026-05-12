"use client";

import React from 'react';
import Link from 'next/link';
import { IconShoppingBag, IconStarFilled, IconX, IconHeart } from "@tabler/icons-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const WishlistPage = () => {
  const { wishlistSlugs, toggleWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  // Get full product data from static products using slugs
  const wishlistItems = wishlistSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  if (loading) {
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

  return (
    <div className="min-h-screen bg-black text-white p-2 font-inter">
      <h2 className="text-2xl mb-8 font-medium">Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item: any) => (
          <div key={item.slug} className="bg-[#111] border border-white/5 rounded-sm overflow-hidden group">

            {/* Image Section */}
            <div className="relative aspect-square bg-[#0A0A0A]">
              {item.isNew && (
                <span className="absolute top-3 left-3 z-10 bg-[#CBA14D]/80 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  NEW
                </span>
              )}
              <button
                onClick={() => toggleWishlist(item.slug, item.productId)}
                className="absolute top-3 right-3 z-10 text-white/50 hover:text-white transition-colors"
              >
                <IconX size={20} />
              </button>
              <Link href={`/products/${item.slug}`}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-1.5">
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{item.category}</p>
              <Link href={`/products/${item.slug}`}>
                <h3 className="text-sm font-medium text-gray-200 hover:text-white transition-colors">{item.name}</h3>
              </Link>

              {/* Stars */}
              <div className="flex items-center gap-1 py-1">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} size={12} className={i < (item.rating || 4) ? "text-[#FFBF3F]" : "text-gray-800"} />
                ))}
                <span className="text-[10px] text-gray-600">({item.reviews || 0})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 pb-4">
                <span className="text-base font-bold">₹{item.price}</span>
                {item.oldPrice && (
                  <span className="text-xs text-gray-600 line-through">₹{item.oldPrice}</span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(item.slug)}
                className="w-full bg-[#FFBF3F] hover:bg-[#ffb31f] text-black font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
              >
                <IconShoppingBag size={18} />
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;