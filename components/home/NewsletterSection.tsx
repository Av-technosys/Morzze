"use client"
import React from 'react'
import { motion } from 'framer-motion'

const   NewsletterSection = () => {
  return (
    <section className="bg-[#050505] text-white py-24 px-6 overflow-hidden relative border-t border-white/5">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Animated Wrapper for all content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 w-full flex flex-col items-center"
        >
          
          {/* Header Section */}
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2 }}
              className="block font-inter text-[10px] md:text-xs font-bold text-[#CBA14D] uppercase tracking-[0.5em]"
            >
              STAY UPDATED
            </motion.span>
            
            <h2 className="font-montserrat text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight">
              Join the World of Style
            </h2>
            
            <p className="font-inter text-[#928E87] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive offers, and design inspiration.
            </p>
          </div>

          {/* Form Section - Exactly like your attachment */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl px-4 pt-4">
            
            {/* Input Field */}
            <div className="w-full relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-14 bg-[#111111] border rounded-md border-zinc-800 px-6 text-white font-inter text-sm focus:outline-none focus:border-[#CBA14D]/50 transition-all duration-300 placeholder:text-zinc-600"
              />
            </div>

            {/* Premium Gold Button */}
            <motion.button 
              whileHover={{ backgroundColor: "#CBA14D", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-[180px] rounded-md h-14 border-2 border-[#CBA14D] text-[#CBA14D] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 bg-transparent shrink-0"
            >
              SUBSCRIBE
            </motion.button>

          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default NewsletterSection