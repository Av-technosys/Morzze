import ProductBanner from "@/components/product/ProductBanner";
import FilterSidebar from "@/components/product/FilterSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-black min-h-screen">
      <ProductBanner />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-10 py-10">
        <div className="mb-12 md:mb-8">
          <nav  className="flex items-center gap-2 font-inter text-[10px] md:text-xs text-white mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <Link
              href="/category"
              className="hover:text-[#EDEBE9] transition-colors"
            >
              Category
            </Link>
            <span>&gt;</span>
            <Link
              href="/category"
              className="hover:text-[#EDEBE9] transition-colors"
            >
              Granite Basin
            </Link>
            <span>&gt;</span>
          </nav>
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold tracking-tight text-[#EDEBE9]">
            Granite Basin
          </h2>
        </div>
        <div  className="flex flex-col lg:flex-row  ">
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>
          <div className="lg:w-3/4 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className=""></h2>
              <div className="text-sm text-zinc-400">
                Sort by:{" "}
                <span className="text-white border-b border-[#FFBF3F] pb-1 ml-2 cursor-pointer">
                  Featured
                </span>
              </div>
            </div>
            <ProductGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
