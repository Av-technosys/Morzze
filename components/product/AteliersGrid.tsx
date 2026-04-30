"use client"
import React from 'react'

const AteliersGrid = () => {
  return (
    <div className="w-full  py-24 px-6 font-inter bg-[#1C1B1B]">
      <div className="max-w-7xl mx-auto ">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-[#E5E2E1] mb-4">
            The Ateliers
          </h2>
          <p className="text-[#928E87] text-sm tracking-wide">
            Witness the V02-119LX in world-class architectural environments.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[550px]">
          
          {/* 1. Left Big Image (Occupies 6 columns) */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden group h-[400px] md:h-full">
            <img 
              src="/detailpage-1.png" // Replace with your image name
              alt="Kitchen environment 1"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* 2. Middle Column (Occupies 3 columns) */}
          <div className="md:col-span-3 grid grid-rows-2 gap-4 h-[500px] md:h-full">
            {/* Top Small */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/detailpage-2.png" 
                alt="Kitchen environment 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Bottom Small */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/detailpage-3.png" 
                alt="Kitchen environment 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 3. Right Portrait Image (Occupies 3 columns) */}
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden group h-[500px] md:h-full">
            <img 
              src="/detailpage-4.png" 
              alt="Kitchen environment 4"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default AteliersGrid