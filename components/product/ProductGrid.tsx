"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconShoppingBag,
  IconStarFilled,
  IconStar,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link"; //

import { products } from "../../data/products";

// Added slug to your data
// const products = [
//   {
//     id: 1,
//     name: "Oval Vessel Basin",
//     slug: "oval-vessel-basin",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 38,
//     discount: "-30%",
//     image: "/granite-basin.png", 
//     isNew: true,
//   },
//   {
//     id: 2,
//     name: "Oval Vessel Basin",
//     slug: "oval-vessel-basin-2",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 38,
//     discount: "-30%",
//     image: "/piecedemo2.png", 
//     isNew: true,
//   },
//   {
//     id: 3,
//     name: "Granite Kitchen Sink ( Vo2-116LX)",
//     slug: "granite-kitchen-sink-v02",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 56,
//     discount: "-30%",
//     image: "/piecedemo3.png", 
//     isNew: true,
//   },
//   {
//     id: 4,
//     name: "Granite Kitchen Sink ( Vo2-116LX)",
//     slug: "granite-kitchen-sink-v03",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 56,
//     discount: "-30%",
//     image: "/piecedemo3.png", 
//     isNew: true,
//   },
//   {
//     id: 5,
//     name: "Oval Vessel Basin",
//     slug: "oval-vessel-basin-3",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 38,
//     discount: "-30%",
//     image: "/piecedemo2.png", 
//     isNew: true,
//   },
//   {
//     id: 6,
//     name: "Oval Vessel Basin",
//     slug: "oval-vessel-basin-4",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 38,
//     discount: "-30%",
//     image: "/granite-basin.png", 
//     isNew: true,
//   },
//   {
//     id: 7,
//     name: "Granite Kitchen Sink ( Vo2-116LX)",
//     slug: "granite-kitchen-sink-v04",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 56,
//     discount: "-30%",
//     image: "/piecedemo3.png", 
//     isNew: true,
//   },
//   {
//     id: 8,
//     name: "Granite Kitchen Sink ( Vo2-116LX)",
//     slug: "granite-kitchen-sink-v05",
//     category: "GRANITE BASIN",
//     price: "6,400",
//     oldPrice: "8,200",
//     rating: 4,
//     reviews: 56,
//     discount: "-30%",
//     image: "/piecedemo3.png", 
//     isNew: true,
//   },
// ];

const FilterSidebar = () => {
  const filterData = [
    {
      title: "CATEGORY",
      options: [
        "Kitchen Faucets",
        "Bathroom Faucets",
        "Kitchen Sink",
        "Washbasin",
        "Floor Drainer",
        "Food Waste Disposer",
        "Kitchen Assessories",
        "Towel Warmer",
      ],
    },
    {
      title: "MATERIAL",
      options: [
        "304 Stainless Steel",
        "Granite Composite",
        "Brass",
        "Zinc Alloy",
        "ABS Polymer",
      ],
    },
    {
      title: "FINISH",
      options: [
        "Chrome",
        "Brushed Gold",
        "Matte Black",
        "Rose Gold",
        "Brushed Nickel",
        "Antique Brass",
      ],
    },
    {
      title: "PRICE RANGE",
      options: [
        "Under ₹5,000",
        "₹5,000 – ₹10,000",
        "₹10,000 – ₹20,000",
        "Above ₹20,000",
      ],
    },
  ];

  return (
    <div className="space-y-8 py-4">
      {filterData.map((section) => (
        <div key={section.title}>
          <h4 className="text-[11px] tracking-[0.2em] text-[#928E87] mb-5 uppercase font-montserrat font-bold">
            {section.title}
          </h4>
          <div className="space-y-4">
            {section.options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-4 h-4 border border-[#FFBF3F]/30 checked:bg-[#FFBF3F] checked:border-[#FFBF3F] transition-all"
                  />
                  <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-[13px] text-[#EDEBE9] font-inter group-hover:text-[#FFBF3F] transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 pt-4">
        <input
          type="checkbox"
          className="peer appearance-none w-4 h-4 border border-[#FFBF3F]/30 checked:bg-[#FFBF3F]"
        />
        <span className="text-[13px] text-[#EDEBE9] font-inter">
          In Stock Only
        </span>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full space-y-6 md:space-y-10">
      <div className="flex md:hidden items-center justify-between py-4 border-b border-white/5 px-2">
        <Sheet>
          <SheetTrigger>
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
              <FilterSidebar />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-inter">
          128 Results
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {products.map((product) => (
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

              {/* Wrapping Image with Link for product detail navigation */}
              <Link href={`/products/${product.slug}`}>
                <motion.img
                  src={product.image}
                  className="w-full h-full object-cover cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
              
              <div className="absolute inset-x-0 bottom-0 z-30 translate-y-0 md:translate-y-full p-2 group-hover:translate-y-0 transition-transform duration-300">
                <Button className="w-full bg-[#FFBF3F] hover:bg-[#e5ac37] font-inter text-black rounded-sm h-10 md:h-12 font-bold text-[11px] md:text-sm uppercase flex items-center justify-center gap-2">
                  <IconShoppingBag size={18} />
                  Add to cart
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5 px-1 md:px-0">
              <p className="text-[10px] text-[#928E87] tracking-[0.1em] font-montserrat uppercase">
                {product.category}
              </p>
              
              {/* Wrapping Title with Link */}
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
                  ₹{product.price}
                </span>
                <span className="text-[11px] md:text-sm text-[#555] line-through">
                  ₹{product.oldPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs md:text-sm text-[#555] font-inter">
          Showing 1 to 8 of 128 results
        </p>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, "...", 70].map((num, i) => (
            <button
              key={i}
              className={cn(
                "w-8 h-8 text-[12px] flex items-center justify-center transition-all border",
                currentPage === num
                  ? "border-[#FFBF3F] text-[#FFBF3F] bg-[#FFBF3F]/5"
                  : "border-transparent text-[#555] hover:text-white",
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;