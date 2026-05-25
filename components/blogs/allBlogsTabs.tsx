"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { getBlogs } from "@/helper/blog/action";
import { getImageUrl } from "@/helper/getimageUrl";

// const tabs = [
//   "All",
//   "Air Taps",
//   "Bathroom Faucet",
//   "Food Waste Disposers",
//   "Floor Drainer",
//   "Granite Wash Basin",
//   "Kitchen Accessories",
//   "Kitchen Faucet",
//   "Steel Sinks",
//   "Towel Warmer",
// ];

export default function BlogGridTabs() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data || []);
    }

    fetchBlogs();
  }, []);

  const filtered = blogs.filter((blog) => {
    const tabMatch = activeTab === "All" || blog.blogCategory === activeTab;

    const searchMatch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.metaDescription?.toLowerCase().includes(search.toLowerCase());

    return tabMatch && searchMatch && blog.isVisible !== false;
  });

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">


          <div className="relative w-full mx-auto lg:max-w-xl lg:mb-4  ">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-11 rounded-full bg-[#141414] border border-[#303030] pl-10 pr-4 text-[13px] outline-none placeholder:text-[#666666]"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + search}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
          >
            {filtered.map((blog, i) => (
              <Link href={`/blogs/${blog.slug}`} key={blog.id || i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full h-[210px] md:h-[230px] overflow-hidden rounded-[6px] mb-5 bg-[#141414]">
                    {blog.image && (
                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title || "Blog image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    )}

                    {/* <span className="absolute top-3 left-3 px-3 py-[4px] rounded-full bg-[#efefef] text-black text-[10px]">
                      {blog.blogCategory || "Blog"}
                    </span> */}
                  </div>

                  <h3 className="text-[16px] font-semibold text-[#f5f2ea] mb-3 leading-7">
                    {blog.title}
                  </h3>

                  <p className="text-[13px] text-[white]/80 leading-6 mb-6">
                    {blog.metaDescription}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative w-7 h-7 rounded-full bg-[#222222] overflow-hidden">
                      {blog.userImage && (
                        <img
                          src={blog.userImage}
                          alt={blog.userName || "Author"}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <p className="text-[13px] text-white">
                        {blog.userName || "Morzze Team"}
                      </p>
                      <p className="text-[11px] text-[white]/70">
                        {blog.date} · 5 min read
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}