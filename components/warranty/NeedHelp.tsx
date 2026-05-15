"use client";
import React from "react";
import { IconPhone, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const NeedHelp = () => {
  return (
    <section className="bg-[#171717] py-20 font-montserrat border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Need Help?
        </h2>
        
        {/* Availability Text */}
        <p className="text-white/80 text-[13px] md:text-sm font-medium mb-10 opacity-80 max-w-lg mx-auto leading-relaxed">
          Our warranty support team is available Monday–Saturday, 9 AM – 6 PM IST
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Phone Button - Solid Yellow */}
          <Button 
            className="w-full sm:w-auto bg-[#FDB813] hover:bg-[#FFD700] text-black font-bold py-7 px-10 rounded-sm flex items-center gap-3 transition-all active:scale-95"
          >
            <IconPhone size={20} stroke={2.5} />
            <span className="text-sm tracking-wide">+91 124 467 8900</span>
          </Button>

          {/* Email Button - Outlined */}
          <Button 
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-2 border-[#FDB813]/40 hover:border-[#FDB813] hover:bg-[#FDB813]/5 text-[#FDB813] font-bold py-7 px-10 rounded-sm flex items-center gap-3 transition-all active:scale-95"
          >
            <IconMail size={20} stroke={2} />
            <span className="text-sm tracking-wide">warranty@morzze.com</span>
          </Button>

        </div>
      </div>
    </section>
  );
};

export default NeedHelp;