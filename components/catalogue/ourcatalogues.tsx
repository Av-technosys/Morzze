"use client";

import React from "react";
import { motion } from "framer-motion";
import { Ruler, Palette, Tag, Award, Check, Phone } from "lucide-react";
import { ContactLink } from "@/components/ContactLink";

const features = [
  {
    icon: Ruler,
    title: "Technical Specs",
    desc: "Detailed dimensions, installation requirements, and flow rates for every product",
  },
  {
    icon: Palette,
    title: "Finish Options",
    desc: "Chrome, brushed nickel, matte black, rose gold, and more finish variants",
  },
  {
    icon: Tag,
    title: "Product Codes",
    desc: "Model numbers and SKUs for easy ordering and specification",
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "ISI marks, BIS certifications, and international quality standards",
  },
];

export default function CatalogueInfoRequestSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Features */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[36px] md:text-[48px] font-semibold tracking-[-0.03em] mb-3"
          >
            What&apos;s Inside Our Catalogues
          </motion.h2>
          <p className="text-[14px] text-[#777777]">
            Everything you need to specify and select the right Morzze products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="bg-[#121212] rounded-[8px] px-5 py-8 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#f4e8c7] text-[#9b5d00] flex items-center justify-center mx-auto mb-5">
                  <Icon size={16} />
                </div>
                <h3 className="text-[16px] font-medium mb-3">{item.title}</h3>
                <p className="text-[12px] leading-6 text-[#777777]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Printed Catalogue */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#b97712] mb-5">
              Physical Copy
            </p>
            <h3 className="text-[34px] md:text-[48px] font-semibold tracking-[-0.03em] mb-5">
              Request a Printed Catalogue
            </h3>
            <p className="max-w-3xl text-[14px] leading-8 text-[#7a7a7a] mb-8">
              Prefer a printed copy? Fill out the form and we&apos;ll courier
              our latest bathroom and kitchen product catalogue to your address.
              Available for interior designers, architects, plumbers, and trade
              professionals
            </p>

            <div className="space-y-4 text-[14px]">
              {[
                "Free shipping across India",
                "Includes finish and material samples",
                "Exclusive trade pricing for professionals",
                "Full technical specification sheets included",
              ].map((point, i) => (
                <p key={i} className="flex items-center gap-3">
                  <Check size={14} className="text-[#d39b10]" /> {point}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-[#121212] border border-[#2a2a2a] p-5 rounded-[4px]"
          >
            <p className="text-[12px] text-white mb-2">Need help choosing?</p>
            <p className="flex items-center gap-2 text-[15px] text-[#f5f2ea] mb-3">
              <Phone size={14} className="text-[#d39b10]" />
              <ContactLink type="phone" value="+91 98765 43210" />
            </p>
            <p className="text-[12px] leading-6 text-[#777777]">
              Our product specialists can guide you through the right bathroom
              and kitchen solutions for your project.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
