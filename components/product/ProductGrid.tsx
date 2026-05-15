"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconShoppingBag,
  IconStarFilled,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Pagination from "../commom/Pagination";
import FilterSidebar from "@/components/product/FilterSidebar";

const ProductGrid = ({
  products,
  categories,
  total,
  currentPage,
}: {
  products: any[];
  categories: any[];
  total: number;
  currentPage: number;
}) => {
  const { addToCart } = useCart();

  return (
    <div className="w-full space-y-6 md:space-y-10">
      <div className="flex md:hidden items-center justify-between py-4 border-b border-white/5 px-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2.5 text-[13px] text-[#EDEBE9] font-inter uppercase tracking-[0.15em] font-medium">
              <IconAdjustmentsHorizontal size={20} className="text-[#FFBF3F]" />
              Filters
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-[#0A0A0A] border-r border-white/10 w-[300px] text-white p-0 overflow-y-auto custom-scrollbar"
          >
            <SheetHeader className="p-6 border-b border-white/5 text-left">
              <SheetTitle className="text-white font-inter text-lg tracking-tight uppercase">
                Product Filters
              </SheetTitle>
            </SheetHeader>

            <div className="px-6 pb-10">
              <FilterSidebar categories={categories} />
            </div>
          </SheetContent>
        </Sheet>

        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">
          {products.length} Results
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {products.map((product: any) => (
          <div key={product.id} className="group flex flex-col">
            <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-4">
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 font-montserrat">
                {product.isNew && (
                  <Badge className="bg-[#CBA14D] text-black hover:bg-[#CBA14D] rounded-none px-2 py-0.5 text-[9px] font-semibold">
                    NEW
                  </Badge>
                )}
              </div>

              <div className="absolute top-2 right-3 z-20">
                <Badge className="bg-[#EF4444] text-white hover:bg-[#EF4444] rounded-none px-2 py-0.5 text-[9px] font-semibold">
                  {product.discount}
                </Badge>
              </div>

              <Link href={`/products/${product.slug}`}>
                <motion.img
                  src={product.bannerImage}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </Link>

              <div className="absolute inset-x-0 bottom-0 z-30 translate-y-0 md:translate-y-full p-2 group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product.slug, 1, {
                      name: product.name,
                      price: product.basePrice,
                      oldPrice: product.strikethroughPrice,
                      image: product.bannerImage,
                      sku: product.sku,
                      productId: product.id,
                    });
                  }}
                  className="w-full bg-[#FFBF3F] hover:bg-[#e5ac37] font-inter text-black rounded-sm h-10 md:h-12 font-bold text-[11px] md:text-sm uppercase flex items-center justify-center gap-2"
                >
                  <IconShoppingBag size={18} />
                  Add to cart
                </Button>
              </div>
            </div>

            <div className="space-y-1.5 px-1 md:px-0">
              <p className="text-[10px] text-[#928E87] tracking-[0.1em] font-montserrat uppercase">
                {product.category}
              </p>

              <Link href={`/products/${product.slug}`}>
                <h3 className="text-sm md:text-[15px] font-inter text-[#EDEBE9] group-hover:text-[#FFBF3F] transition-colors line-clamp-1 cursor-pointer">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 py-0.5">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled
                    key={i}
                    size={11}
                    className={
                      i < product.rating ? "text-[#CBA14D]" : "text-[#333]"
                    }
                  />
                ))}

                <span className="text-[10px] text-[#555] ml-1">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-white font-inter text-sm md:text-base">
                  ₹{product.basePrice}
                </span>

                <span className="text-[11px] md:text-sm text-[#555] line-through">
                  ₹{product.strikethroughPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs md:text-sm text-[#FEFFF1] font-inter">
          Showing {products.length} results
        </p>

        <Pagination
          currentPage={currentPage}
          totalPages={total}
          onPageChange={(page: number) => {
            window.location.href = `?page=${page}`;
          }}
        />
      </div>
    </div>
  );
};

export default ProductGrid;