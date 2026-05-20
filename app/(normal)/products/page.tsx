import ProductBanner from "@/components/product/ProductBanner";
import FilterSidebar from "@/components/product/FilterSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import React from "react";
import Link from "next/link";
import {
  getProducts,
  getProductFilterOptions,
} from "@/helper/product/action";
import { getCategories } from "@/helper";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    type?: string;
    material?: string;
    finish?: string;
    size?: string;
    min?: string;
    max?: string;
    brand?: string;
    stock?: string;
  }>;
}

const PAGE_SIZE = 20;

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const allCategories = await getCategories();
  const filterOptions = await getProductFilterOptions();

  const result = await getProducts({
    page: Number(params.page ?? "1"),
    pageSize: PAGE_SIZE,
    search: params.search ?? "",
    category: params.category,
    type: params.type,
    material: params.material,
    finish: params.finish,
    size: params.size,
    min: params.min,
    max: params.max,
    brand: params.brand,
    stock: params.stock,
  });

  const products = result?.items || [];

  return (
    <div className="bg-black min-h-screen">
      <ProductBanner />

      <main className="max-w-screen-2xl mx-auto px-6 md:px-10 py-10">
        <div className="mb-12 md:mb-8">
          <nav className="flex items-center gap-2 font-inter text-[10px] md:text-xs text-white mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            <span>&gt;</span>

            <Link
              href="/products"
              className="hover:text-[#EDEBE9] transition-colors"
            >
              Products
            </Link>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar
              categories={allCategories}
              materialOptions={filterOptions.materialOptions}
              finishOptions={filterOptions.finishOptions}
              sizeOptions={filterOptions.sizeOptions}
            />
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm text-zinc-400 font-inter">
                Showing{" "}
                <span className="text-white font-bold">
                  {products.length}
                </span>{" "}
                products
              </div>

              <div className="text-sm text-zinc-400 font-inter">
                Sort by:{" "}
                <span className="text-white border-b border-[#FFBF3F] pb-1 ml-2 cursor-pointer">
                  Featured
                </span>
              </div>
            </div>

            <ProductGrid
              products={products}
              categories={allCategories}
              total={result?.totalPages || 0}
              currentPage={result?.page || 1}
              materialOptions={filterOptions.materialOptions}
              finishOptions={filterOptions.finishOptions}
              sizeOptions={filterOptions.sizeOptions}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;