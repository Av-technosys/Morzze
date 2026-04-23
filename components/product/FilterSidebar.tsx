"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const filterData = [
  {
    id: "category",
    title: "CATEGORY",
    items: [
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
    id: "material",
    title: "MATERIAL",
    items: [
      "304 Stainless Steel",
      "Granite Composite",
      "Brass",
      "Zinc Alloy",
      "ABS Polymer",
    ],
  },
  {
    id: "finish",
    title: "FINISH",
    items: ["Chrome", "Brushed Gold", "Matte Black", "Rose Gold"],
  },
  {
    id: "size",
    title: "SIZE",
    items: [
      "Brushed Nickel",
      "12-18 Inch",
      "Antique Brass",
      "18-24 Inch",
      "24-30 Inch",
      "30+ Inch",
    ],
  },
  {
    id: "price",
    title: "PRICE RANGE",
    items: [
      "Under ₹5,000",
      "₹5,000 - ₹10,000",
      "₹10,000 - ₹20,000",
      "Above ₹20,000",
    ],
  },
];

const FilterSidebar = () => {
  return (
    <div className="w-full bg-black p-0 select-none md:block hidden  ">
      {filterData.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 className="text-sm  tracking-[0.15em] font-montserrat text-[#928E87] uppercase mb-4">
            {section.title}
          </h3>

          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <Checkbox
                  id={item}
                  className="w-4 h-4 border-[#CBA14D] rounded-none data-checked:!bg-[#FFBF3F] data-checked:!border-[#FFBF3F] data-checked:!text-black"
                />
                <label
                  htmlFor={item}
                  className="text-sm font-inter text-[#EDEBE9] cursor-pointer group-hover:text-white transition-colors"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center space-x-3 mt-4 group cursor-pointer border-t border-white/5 pt-6">
        <Checkbox
          id="stock"
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
