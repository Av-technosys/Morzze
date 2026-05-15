"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconStarFilled,
  IconMinus,
  IconPlus,
  IconShoppingBag,
  IconBolt,
  IconHeart,
  IconHeartFilled,
  IconRotate360,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import DescriptionTabs from "@/components/product/DescriptionTabs";
import SpecificationsTabs from "@/components/product/SpecificationsTabs";
import ProductComparison from "@/components/product/ProductComparison";
import CareAndMaintenance from "@/components/product/CareAndMaintenance";
import AteliersGrid from "@/components/product/AteliersGrid";
import CommonEnquiries from "@/components/product/CommonEnquiries";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const ProductClient = ({ product, slug }: any) => {
  console.log("Product Data in Client Component:", product);
  const router = useRouter()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);


  // FOR MEDIA AND PDF DOCUMENTATION
const mediaImages = (product.productMediaRes || [])
  .filter((item: any) => item.mediaType === "image")
  .map((item: any) => item.mediaURL);

const pdfDocuments = (product.productMediaRes || [])
  .filter((item: any) => item.mediaType === "pdf");

const images = [
  product.bannerImage,
  product.image,
  ...mediaImages,
].filter(Boolean);

  const wishlisted = isInWishlist(slug)


  // 1. Sare Attributes ko as variables nikal lo
  const attributes = product.productAttributeRes || [];

  const tabDescription = attributes.find((a: any) => a.attribute === "DESCRIPTION")?.value;
  const tabDimensions = attributes.find((a: any) => a.attribute === "DIMENSIONS")?.value;
  const tabFeatures = attributes.find((a: any) => a.attribute === "FEATURES")?.value;
  const tabAccessories = attributes.find((a: any) => a.attribute === "Accessories Included")?.value;
  const tabDocumentation = attributes.find((a: any) => a.attribute === "Documentation")?.value;


  // 1. "size" wala attribute find karein
  const sizeAttr = product.productAttributeRes?.find((a: any) => a.attribute === "size")?.value;

  // 2. Comma se split karke array banayein (agar data nahi hai to empty array)
  const finishesArray = sizeAttr ? sizeAttr.split(",") : [];

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4 md:p-10 font-inter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT - IMAGES */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-[#1A1A1A] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* ARROWS */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <IconChevronLeft size={20} />
                  </button>

                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev + 1) % images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <IconChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 border-2",
                    selectedImage === i
                      ? "border-[#FFBF3F]"
                      : "border-white/10"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}

              <div className="w-20 h-20 border border-dashed border-white/20 flex flex-col items-center justify-center text-[#555]">
                <IconRotate360 size={20} />
                <span className="text-[10px]">360°</span>
              </div>
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col space-y-6">

            <div>
              <p className="text-[11px] tracking-[0.3em] text-white/80 uppercase font-bold mb-2">
                mORzee
              </p>

              <h1 className="text-2xl md:text-3xl font-medium">
                {product.name}
              </h1>

              <p className="text-[11px] text-[#555] mt-2">
                {product.sku}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled
                    key={i}
                    size={16}
                    className={i < 4 ? "text-[#FFBF3F]" : "text-[#333]"}
                  />
                ))}
              </div>
              <span className="text-xs text-white/70">({product.reviews} Reviews)</span>
            </div>

            {/* PRICE */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">₹{product.basePrice}</span>
              <span className="text-lg text-[#555] line-through">
                ₹{product.strikethroughPrice}
              </span>
              <span className="text-sm text-[#EF4444] font-bold">
                {product.discount}
              </span>
            </div>

            {/* DESC */}
            <p className="text-white/80 text-sm">
              {product.description}
            </p>

            {/* FINISH */}
            <div>
              <p className="text-xs text-white/80 mb-2">
                FINISH: {selectedFinish}
              </p>

              <div className="flex gap-2 flex-wrap">
                {finishesArray.map((finish: string) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={cn(
                      "px-4 py-2 border text-xs",
                      selectedFinish === finish
                        ? "border-yellow-400 text-yellow-400  rounded-md"
                        : "border-white/10 text-white/70"
                    )}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <IconMinus />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity(q => q + 1)}>
                <IconPlus />
              </button>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <Button
                onClick={() => {
                  addToCart(slug, quantity, {
                    name: product.name,
                    price: product.basePrice,
                    oldPrice: product.strikethroughPrice,
                    image: product.bannerImage,
                    sku: product.sku,
                    productId: product.id,
                  });
                }}
                className="flex-1 py-5 bg-[#FDB813] text-black"
              >
                <IconShoppingBag size={16} /> Add to Cart
              </Button>

              <Button
                onClick={() => {
                  addToCart(slug, quantity, {
                    name: product.name,
                    price: product.basePrice,
                    oldPrice: product.strikethroughPrice,
                    image: product.bannerImage,
                    sku: product.sku,
                    productId: product.id,
                  });
                  router.push("/checkout");
                }}
                className="flex-1 py-5 border border-white/20"
              >
                <IconBolt size={16} /> Buy Now
              </Button>

              <Button
                variant="outline"
                onClick={() => toggleWishlist(slug, product.id)}
                className={cn(
                  "bg-[#1F1F1F] border-[#2E2E2E] transition-all",
                  wishlisted && "border-red-500/50 bg-red-500/10"
                )}
              >
                {wishlisted ? (
                  <IconHeartFilled className="text-red-500" />
                ) : (
                  <IconHeart />
                )}
              </Button>
            </div>
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-y-4 pt-8 border-t border-white/5">
              {[
                { label: "Free Shipping", icon: "•" },
                { label: "12-Month Warranty", icon: "•" },
                { label: "Easy Returns", icon: "•" },
                { label: "Quality Assured", icon: "•" }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] text-white/70 uppercase tracking-widest"
                >
                  <span className="text-[#FFBF3F] text-lg leading-none">
                    {feature.icon}
                  </span>
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EXTRA SECTIONS */}
      <DescriptionTabs productAttributeRes={product?.productAttributeRes} pdfDocuments={pdfDocuments} />
      <SpecificationsTabs productAttributeRes={product?.productAttributeRes} />
      {/* <ProductComparison /> */}
      <CareAndMaintenance />
      <AteliersGrid />
      <CommonEnquiries   faqs={product?.productFaqRes || []} />
    </>
  );
};

export default ProductClient;