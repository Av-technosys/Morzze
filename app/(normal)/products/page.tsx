import ProductBanner from "@/components/product/ProductBanner";
import FilterSidebar from "@/components/product/FilterSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import React from "react";
import Link from "next/link";
import { getProducts } from "@/helper/product/action";
import { getCategories } from "@/helper";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    type?: string;
    material?: string;
    min?: string;
    max?: string;
    brand?: string;
  }>;
}

const PAGE_SIZE = 20;

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  
  // 1. Log incoming URL params
  console.log("---Incoming Params---", params);

  const allCategories = await getCategories();

  const result = await getProducts({
    page: Number(params.page ?? "1"),
    pageSize: PAGE_SIZE,
    search: params.search ?? "",
    category: params.category,
    type: params.type,
    material: params.material,
    min: params.min,
    max: params.max,
    brand: params.brand
  });

  // 2. Log full API result
  console.log("---API Result Structure---", {
    totalItems: result?.items?.length || 0,
    totalPages: result?.totalPages,
    currentPage: result?.page
  });

  // 3. Log first product to see attributes (Specifications checking)
  if (result?.items?.length > 0) {
    console.log("---Sample Product Data---", JSON.stringify(result.items[0], null, 2));
  } else {
    console.warn("!!! No products found in result.items !!!");
  }

  return (
    <div className="bg-black min-h-screen">
      <ProductBanner />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-10 py-10">
        <div className="mb-12 md:mb-8">
          <nav className="flex items-center gap-2 font-inter text-[10px] md:text-xs text-white mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/category" className="hover:text-[#EDEBE9] transition-colors">Category</Link>
            <span>&gt;</span>
            <span className="text-[#FFBF3F]">{params.category || "Granite Basin"}</span>
          </nav>
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold tracking-tight text-[#EDEBE9]">
            {params.category || "Granite Basin"}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm text-zinc-400 font-inter">
                Showing <span className="text-white font-bold">{result?.items?.length || 0}</span> products
              </div>
              <div className="text-sm text-zinc-400 font-inter">
                Sort by: <span className="text-white border-b border-[#FFBF3F] pb-1 ml-2 cursor-pointer">Featured</span>
              </div>
            </div>

            <ProductGrid 
              products={result?.items || []} 
              total={result?.totalPages || 0} 
              currentPage={result?.page || 1} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;