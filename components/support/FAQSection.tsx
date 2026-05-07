"use client";
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const FAQSection = () => {
  const categories = ["General", "Stainless Steel Sink", "Faucets", "Quartz Sink", "Accessories"];

  return (
    <div className="space-y-16">
      {/* Category Pills */}
      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-6 py-2 rounded-full text-[11px] font-bold transition-all border ${i === 0 ? 'bg-[#FDB813] text-black border-[#FDB813]' : 'bg-transparent text-white border-white/10 hover:border-white/40'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Lists */}
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* General Section */}
        <div className="space-y-6">
          <h3 className="text-center text-white font-bold tracking-[4px] text-sm uppercase">General</h3>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <AccordionItem key={item} value={`item-${item}`} className="border-none bg-[#0D0D0D] px-6">
                <AccordionTrigger className="text-white hover:no-underline text-sm py-5 font-medium">
                  What's your helpline number?
                </AccordionTrigger>
                <AccordionContent className="text-[#928E87] pb-5">
                  You can reach our support team at +91 123 456 7890 between 9 AM to 6 PM.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Repeat for other sub-sections like Sinks... */}
      </div>
    </div>
  );
};

export default FAQSection;