"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Image as Img,
  BookOpen,
  Folder,
  UserSquare2,
  Contact2,
  Download,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ContactLink } from "@/components/ContactLink";

const resources = [
  {
    icon: FileText,
    title: "Brand Guidelines",
    meta: "PDF · 12.5 MB",
    desc: "Logo usage, color palette, typography for bathroom & kitchen brand",
  },
  {
    icon: Img,
    title: "Product Image Library",
    meta: "ZIP · 245.8 MB",
    desc: "High-res bathroom faucets, kitchen sinks, showers, sanitary ware",
  },
  {
    icon: BookOpen,
    title: "Bathroom Collection Lookbook",
    meta: "PDF · 48.2 MB",
    desc: "Complete bathroom fittings catalogue with specifications",
  },
  {
    icon: Folder,
    title: "Kitchen Solutions Brochure",
    meta: "PDF · 36.5 MB",
    desc: "Kitchen sinks, faucets, and accessories product guide",
  },
  {
    icon: UserSquare2,
    title: "Executive Bios & Headshots",
    meta: "ZIP · 8.4 MB",
    desc: "Leadership team photos and company information",
  },
  {
    icon: Contact2,
    title: "Media Contact Information",
    meta: "PDF · 0.5 MB",
    desc: "Press inquiries and media relations contact details",
  },
];

export default function PressKitRequestSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Left */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#d39b10] mb-4">
            Download Resource
          </p>
          <h2 className="text-[42px] md:text-[54px] font-semibold tracking-[-0.03em] mb-5">
            Press Kit
          </h2>
          <p className="max-w-2xl text-[14px] leading-8 text-white/80 mb-10">
            Access our comprehensive media kit containing brand assets,
            high-resolution bathroom and kitchen product images, company
            information, and executive bios. All resources are free to use for
            media and editorial purposes
          </p>

          <div className="space-y-3">
            {resources.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="border border-[#3a3a3a] bg-[#121212] px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-[6px] bg-[#f4e8c7] text-[#9b5d00] flex items-center justify-center mt-1">
                      <Icon size={15} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#9a9a9a] mb-1">
                        {item.meta}
                      </p>
                      <p className="text-[12px] text-[#777777]">{item.desc}</p>
                    </div>
                  </div>
                  <Download size={14} className="text-[#888888]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#121212] rounded-[10px] p-6 md:p-7"
        >
          <h3 className="text-[26px] font-semibold mb-3">
            Request Press Kit Access
          </h3>
          <p className="text-[13px] text-[#777777] mb-6">
            Fill out the form below to receive download links for our complete
            press kit.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              placeholder="Full Name *"
              className="h-11 bg-[#2a2a2a] px-4 text-[13px] outline-none"
            />
            <input
              placeholder="Email Address *"
              className="h-11 bg-[#2a2a2a] px-4 text-[13px] outline-none"
            />
          </div>
          <input
            placeholder="Publication / Organization *"
            className="w-full h-11 bg-[#2a2a2a] px-4 text-[13px] outline-none mb-3"
          />
          <input
            placeholder="Type of Media *"
            className="w-full h-11 bg-[#2a2a2a] px-4 text-[13px] outline-none mb-3"
          />
          <textarea
            placeholder="Tell us about your story or coverage plans (optional)"
            className="w-full h-[90px] bg-[#2a2a2a] px-4 py-3 text-[13px] outline-none mb-4"
          />

          <button className="w-full h-11 bg-[#e6aa12] text-black text-[13px] font-medium mb-6">
            Request Press Kit Access
          </button>

          <div className="border-t border-[#2a2a2a] pt-6">
            <h4 className="text-[15px] mb-5">Direct Media Contact</h4>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <User size={15} className="text-[#d39b10] mt-1" />
                <div>
                  <p className="text-[14px]">Priya Malhotra</p>
                  <p className="text-[12px] text-[#777777]">
                    Head of Communications
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={15} className="text-[#d39b10] mt-1" />
                <div>
                  <ContactLink
                    type="email"
                    value="info@morzze.com"
                    className="block text-[14px]"
                  />
                  <p className="text-[12px] text-[#777777]">
                    For press inquiries
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={15} className="text-[#d39b10] mt-1" />
                <div>
                  <ContactLink
                    type="phone"
                    value="+91-98765-43212"
                    className="block text-[14px]"
                  />
                  <p className="text-[12px] text-[#777777]">
                    Direct media line
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[12px] text-[#777777] mb-3">
              Follow for updates
            </p>
            <div className="flex gap-3">
              {[
                IconBrandLinkedin,
                IconBrandTwitter,
                IconBrandInstagram,
                IconBrandYoutube,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-[#2a2a2a] flex items-center justify-center"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
