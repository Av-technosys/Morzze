"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Shield } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Intelligence is Creativity Unleashed",
    desc: "We encourage bold ideas and reward innovative thinking across every department.",
  },
  {
    icon: Heart,
    title: "Passion Over Process",
    desc: "We hire for passion and cultivate skills. If you love what you do, you’ll thrive here.",
  },
  {
    icon: Shield,
    title: "Excellence Without Compromise",
    desc: "Every product, every interaction, every decision — we hold ourselves to the highest standard.",
  },
];

export default function WorkCultureSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-12 lg:gap-10 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[56px] md:text-[76px] leading-[0.9] italic font-semibold tracking-[-0.04em] mb-5">
            Work <br />
            <span className="text-[#d39b10]">Culture</span>
          </h2>

          <p className="max-w-[520px] text-[14px] md:text-[15px] leading-8 text-white/70 mb-10">
            We believe that the best furniture comes from the best environments.
            That’s why we invest heavily in our workplace — creating spaces
            where creativity and collaboration flourish naturally.
          </p>

          <div className="space-y-4 max-w-[560px]">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  className="border border-[#404040] bg-[#121212] rounded-[8px] px-5 py-5"
                >
                  <div className="flex gap-4">
                    <div className="mt-1 text-[#d39b10]">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-[#f5f2ea] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[13px] leading-7 text-[#7a7a7a]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[430px] md:h-[520px] overflow-hidden rounded-tl-[120px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[120px]"
        >
          <Image
            src="/culture.png"
            alt="Work Culture"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
