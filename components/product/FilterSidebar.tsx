"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Category = {
  id?: string;
  name: string;
  slug: string;
};

type FilterSidebarProps = {
  categories: Category[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/₹/g, "")
    .replace(/\+/g, "plus")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/–/g, "-")
    .replace(/--+/g, "-")
    .trim();

const getPriceParams = (item: string) => {
  if (item === "Under ₹5,000") return { min: "", max: "5000" };
  if (item === "₹5,000 - ₹10,000") return { min: "5000", max: "10000" };
  if (item === "₹10,000 - ₹20,000") return { min: "10000", max: "20000" };
  if (item === "Above ₹20,000") return { min: "20000", max: "" };
  return { min: "", max: "" };
};

const FilterSidebar = ({ categories }: FilterSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterData = [
    {
      id: "category",
      title: "CATEGORY",
      items:
        categories?.map((cat) => ({
          label: cat.name,
          value: cat.slug,
        })) || [],
    },
    {
      id: "material",
      title: "MATERIAL",
      items: [
        { label: "304 Stainless Steel", value: "304-stainless-steel" },
        { label: "Granite Composite", value: "granite-composite" },
        { label: "Brass", value: "brass" },
        { label: "Zinc Alloy", value: "zinc-alloy" },
        { label: "ABS Polymer", value: "abs-polymer" },
      ],
    },
    {
      id: "finish",
      title: "FINISH",
      items: [
        { label: "Chrome", value: "chrome" },
        { label: "Brushed Gold", value: "brushed-gold" },
        { label: "Matte Black", value: "matte-black" },
        { label: "Rose Gold", value: "rose-gold" },
      ],
    },
    {
      id: "size",
      title: "SIZE",
      items: [
        { label: "Brushed Nickel", value: "brushed-nickel" },
        { label: "12-18 Inch", value: "12-18-inch" },
        { label: "Antique Brass", value: "antique-brass" },
        { label: "18-24 Inch", value: "18-24-inch" },
        { label: "24-30 Inch", value: "24-30-inch" },
        { label: "30+ Inch", value: "30plus-inch" },
      ],
    },
    {
      id: "price",
      title: "PRICE RANGE",
      items: [
        { label: "Under ₹5,000", value: "Under ₹5,000" },
        { label: "₹5,000 - ₹10,000", value: "₹5,000 - ₹10,000" },
        { label: "₹10,000 - ₹20,000", value: "₹10,000 - ₹20,000" },
        { label: "Above ₹20,000", value: "Above ₹20,000" },
      ],
    },
  ];

  const updateFilter = (sectionId: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (sectionId === "price") {
      const { min, max } = getPriceParams(value);

      const alreadyChecked =
        searchParams.get("min") === min && searchParams.get("max") === max;

      if (alreadyChecked) {
        params.delete("min");
        params.delete("max");
      } else {
        min ? params.set("min", min) : params.delete("min");
        max ? params.set("max", max) : params.delete("max");
      }

      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    const current = params.get(sectionId);

    if (current === value) {
      params.delete(sectionId);
    } else {
      params.set(sectionId, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const updateStock = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (params.get("stock") === "true") {
      params.delete("stock");
    } else {
      params.set("stock", "true");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const isChecked = (sectionId: string, value: string) => {
    if (sectionId === "price") {
      const { min, max } = getPriceParams(value);
      return searchParams.get("min") === min && searchParams.get("max") === max;
    }

    return searchParams.get(sectionId) === value;
  };

  return (
    <div className="w-full bg-black p-0 select-none md:block hidden">
      {filterData.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 className="text-sm tracking-[0.15em] font-montserrat text-[#928E87] uppercase mb-4">
            {section.title}
          </h3>

          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item.value}
                onClick={() => updateFilter(section.id, item.value)}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <Checkbox
                  id={`${section.id}-${item.value}`}
                  checked={isChecked(section.id, item.value)}
                  className="w-4 h-4 border-[#CBA14D] rounded-none data-checked:!bg-[#FFBF3F] data-checked:!border-[#FFBF3F] data-checked:!text-black"
                />

                <label
                  htmlFor={`${section.id}-${item.value}`}
                  className="text-sm font-inter text-[#EDEBE9] cursor-pointer group-hover:text-white transition-colors"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        onClick={updateStock}
        className="flex items-center space-x-3 mt-4 group cursor-pointer border-t border-white/5 pt-6"
      >
        <Checkbox
          id="stock"
          checked={searchParams.get("stock") === "true"}
          className="w-4 h-4 border-[#CBA14D] rounded-none data-checked:!bg-[#FFBF3F] data-checked:!border-[#FFBF3F] data-checked:!text-black"
        />

        <label
          htmlFor="stock"
          className="text-[13px] text-[#999999] cursor-pointer group-hover:text-white"
        >
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;