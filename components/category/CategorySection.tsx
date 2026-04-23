import Link from "next/link";
import React from "react";

const allCategories = [
  {
    name: "Granite Basins",
    desc: "Luxurious granite wash basins for bathrooms",
    img: "/category/category-1.png",
  },
  {
    name: "Steel Sinks",
    desc: "Premium stainless steel sinks for kitchen",
    img: "/category/category-2.png",
  },
  {
    name: "Floor Drainer",
    desc: "Modern Looking & Luxurious",
    img: "/category/category-3.png",
  },
  {
    name: "Food Waste Disposers",
    desc: "Silent, powerful food waste disposal units",
    img: "/category/category-4.png",
  },
  {
    name: "Bathroom Faucets",
    desc: "Complete accessory collections",
    img: "/category/category-5.png",
  },
  {
    name: "Towel Warmers",
    desc: "Heated towel racks for ultimate comfort",
    img: "/category/category-6.png",
  },
  {
    name: "Kitchen Accessories",
    desc: "Functional kitchen organization accessories",
    img: "/category/category-7.jpg",
  },
  {
    name: "Air Taps",
    desc: "Innovative air-infused tap technology",
    img: "/category/category-8.png",
  },
  {
    name: "Bathroom Faucets",
    desc: "Complete bathroom accessory collections",
    img: "/category/category-9.png",
  },
];

const CategorySection = () => {
  return (
    <section
      id="category-section"
      className="bg-black py-16 px-6 md:px-10 font-montserrat "
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-12 md:mb-16">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs text-white/50 mb-4 uppercase tracking-widest">
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
          </nav>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#EDEBE9]">
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[300px]">
          {allCategories.map((cat, index) => {
            let spanClass = "";

            if (index === 0) spanClass = "lg:col-span-5 lg:row-span-2";
            else if (index === 1) spanClass = "lg:col-span-4 lg:row-span-1";
            else if (index === 2) spanClass = "lg:col-span-3 lg:row-span-1";
            else if (index === 3) spanClass = "lg:col-span-3 lg:row-span-1";
            else if (index === 4) spanClass = "lg:col-span-4 lg:row-span-1";
            else if (index === 5) spanClass = "lg:col-span-4 md:col-span-6";
            else if (index === 6) spanClass = "lg:col-span-2 md:col-span-6";
            else if (index === 7) spanClass = "lg:col-span-2 md:col-span-6";
            else if (index === 8) spanClass = "lg:col-span-4 md:col-span-6";
            else spanClass = "lg:col-span-3 md:col-span-6";

            return (
              <div
                key={index}
                className={`relative group cursor-pointer overflow-hidden rounded-sm bg-zinc-900 ${spanClass}`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl md:text-2xl font-medium text-white transition-colors duration-300 group-hover:text-[#FFBF3F]">
                    {cat.name}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm mt-2 font-inter line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
