"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const FeaturedInnovation = () => {
  // Stats data based on the provided image
  const stats = [
    { value: "100+", label: "Product Range" },
    { value: "35+", label: "Years of Legacy" },
    { value: "300+", label: "Project Done" }
  ];

  return (
    <section className="relative w-full bg-black py-20 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        
        {/* -- LEFT COLUMN: HEADING & TEXT -- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="font-montserrat text-4xl md:text-5xl font-medium text-white leading-tight">
            Featured <br />
            <span className="text-white">Innovation</span>
          </h2>
          <p className="font-inter text-[#928E87] text-sm md:text-base leading-relaxed text-justify">
            The <span className="text-white font-bold">Air Tap</span> is a sleek and 
            innovative hand dryer designed for modern, eco-conscious spaces. Its 
            advanced filtration system ensures clean air while drying, promoting 
            hygiene and reducing the spread of germs. With easy touch operation 
            and intelligent heating, this dryer offers a user-friendly experience, 
            providing efficient and fast drying without compromising on comfort. 
            The eco-friendly design, combined with its space-saving structure, 
            makes it a perfect addition to any restroom, saving both energy and space.
          </p>
        </motion.div>

        {/* -- CENTER COLUMN: PRODUCT IMAGE -- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center h-[400px] md:h-[500px]"
        >
          {/* Central Product Showcase */}
          <div className="relative w-full h-full">
            <Image 
              src="/innovation.png" // Replace with your tap image path
              alt="Air Tap Innovation"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* -- RIGHT COLUMN: STATS WITH GOLD HIGHLIGHTS -- */}
        <div className="flex flex-col gap-6 md:gap-30 lg:pl-10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-center gap-6"
            >
              {/* Vertical Gold Highlight Line */}
              <div className="w-[3px] h-12 bg-[#CBA14D]" />
              
              <div className="flex flex-row items-center gap-12">
                <h3 className="font-montserrat text-4xl md:text-5xl font-medium text-white tracking-tighter">
                  {stat.value}
                </h3>
                <p className="font-montserrat text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.2em] leading-tight max-w-[80px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedInnovation