"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

const StoreLocator = () => {
  return (
    <section className="relative w-full  py-8 md:py-24  flex items-center ">
      <div className="absolute inset-0 z-0">
        <img 
          src="/store.png" 
          alt="World Store Map"
          className="w-full h-full object-cover " 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="font-montserrat text-2xl md:text-2xl font-medium text-white leading-tight">
              Find the nearest store and explore our 
              products
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button 
              variant="outline"
              className="rounded-md border-[#CBA14D] font-montserrat text-[#CBA14D] hover:bg-[#CBA14D] hover:text-black font-bold uppercase tracking-[0.2em] md:px-10 md:h-14 transition-all duration-500 bg-transparent"
            >
              FIND A STORE NEAR YOU
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default StoreLocator