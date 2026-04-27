"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandWhatsappFilled,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  MailIcon,
  MapPin,
  PhoneIcon,
  MessageCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  const [messageLength, setMessageLength] = useState(0);
  const maxLength = 500;

  return (
    <section className="relative w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <Image
          src="/footer-bg.png"
          alt="contact"
          width={10000}
          height={500}
          className="object-fill z-0 w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 z-40">
          <p className="text-xl text-yellow-400">Get in Touch</p>
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-lg max-w-2xl">
            We'd love to hear from you. Reach out for inquiries, support, or
            partnership opportunities.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="flex flex-col lg:flex-row justify-center gap-20 px-4 lg:px-0 lg:-mt-20  mt-20 z-50 relative ">
        {/* Card 1 - Visit Us */}
        <div
          className="w-full lg:w-80 h-auto rounded-xl p-6 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <MapPin className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Morzze India Pvt. Ltd.
            <br />
            12th Floor, Tower B,
            <br />
            DLF Cyber City, Phase III,
            <br />
            Gurugram, Haryana 122001
            <br />
            India
          </p>
        </div>

        {/* Card 2 - Call Us */}
        <div
          className="w-full lg:w-80 h-auto rounded-xl p-6 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <PhoneIcon className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Call Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Toll Free: <br />
            <span className="text-yellow-400">1800-123-4567</span>
            <br />
            Sales: <br />
            <span className="text-yellow-400">+91-98765-43210</span>
            <br />
            Support: <br />
            <span className="text-yellow-400">+91-98765-43211</span>
          </p>
        </div>

        {/* Card 3 - Email Us */}
        <div
          className="w-full lg:w-80 h-auto rounded-xl p-6 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-lg shadow-black/30"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <MailIcon className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Email Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            General: <br />
            <span className="text-yellow-400">info@morzze.com</span>
            <br />
            Sales: <br />
            <span className="text-yellow-400">sales@morzze.com</span>
            <br />
            Support: <br />
            <span className="text-yellow-400">support@morzze.com</span>
          </p>
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="px-4 lg:px-36 py-20">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <p className="text-yellow-600 text-xs font-semibold mb-4 tracking-widest">
                SEND A MESSAGE
              </p>
              <h2 className="text-4xl font-bold mb-10">Get In Touch</h2>

              <form className="space-y-6">
                {/* Full Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Full Name *
                    </FieldLabel>
                    <Input
                      placeholder="Your name"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Email Address *
                    </FieldLabel>
                    <Input
                      placeholder="your@email.com"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Phone and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Phone Number
                    </FieldLabel>
                    <Input
                      placeholder="+91 98765 43210"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Category *
                    </FieldLabel>
                    <select className="w-full bg-[#171717] border border-[#928E87] text-[#928E87] placeholder:text-gray-500 px-4 py-3 rounded-xs focus:border-yellow-400 focus:outline-none transition">
                      <option value="" className="text-gray-500">
                        Select a category
                      </option>
                      <option value="inquiry" className="text-white">
                        General Inquiry
                      </option>
                      <option value="support" className="text-white">
                        Support
                      </option>
                      <option value="partnership" className="text-white">
                        Partnership
                      </option>
                      <option value="other" className="text-white">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <FieldLabel className="text-white mb-3 block text-sm font-medium">
                    Subject *
                  </FieldLabel>
                  <Input
                    placeholder="How can we help you"
                    className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                  />
                </div>

                {/* Message Field with Character Count */}
                <div>
                  <FieldLabel className="text-white mb-3 block text-sm font-medium">
                    Message *
                  </FieldLabel>
                  <div className="relative">
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      maxLength={maxLength}
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition min-h-32 resize-none"
                    />
                    <span className="absolute bottom-3 right-4 text-sm text-gray-500">
                      {messageLength}/{maxLength}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 w-full py-5 rounded-xs mt-6">
                  Send
                </Button>
              </form>
            </div>

            {/* Right Section - Map, Business Hours, WhatsApp */}
            <div className="space-y-6">
              {/* Map */}
              <div className="rounded-lg overflow-hidden h-64 lg:h-72">
                <Image
                  src="/map.png"
                  alt="office location map"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Business Hours */}
              <div className="bg-white/5 border border-white/20 rounded-xs p-6">
                <h3 className="text-white font-semibold mb-4">
                  <Clock
                    size={14}
                    className="inline-block mr-4 text-[#D97706]"
                  />
                  Business Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex border-b border-b-[#928E87] py-4 justify-between">
                    <span className="text-[#FEFFF1]">Monday - Friday</span>
                    <span className="text-[#928E87]">
                      9:00 AM - 6:00 PM IST
                    </span>
                  </div>
                  <div className="flex border-b border-b-[#928E87] py-4 justify-between">
                    <span className="text-[#FEFFF1]">Saturday</span>
                    <span className="text-[#928E87]">
                      10:00 AM - 4:00 PM IST
                    </span>
                  </div>
                  <div className="flex  py-4 justify-between">
                    <span className="text-[#FEFFF1]">Sunday</span>
                    <span className="text-[#EF4444]">Closed</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat */}
              <div className="bg-[#F0FDF4] border  rounded-xs p-6 flex items-center gap-4 cursor-pointer  ">
                <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <IconBrandWhatsapp className="text-white w-8 h-8" />
                </div>
                <div>
                  <p className="text-[#111827] font-semibold">
                    Chat on WhatsApp
                  </p>
                  <p className="text-[#4B5563] text-sm">
                    We typically reply within minutes
                  </p>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 justify-center lg:justify-start pt-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center  transition"
                >
                  <IconBrandFacebook className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center  transition"
                >
                  <IconBrandTwitter className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center  transition"
                >
                  <IconBrandLinkedin className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center  transition"
                >
                  <IconBrandInstagram className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center  transition"
                >
                  <IconBrandYoutube className="text-[#4B5563] w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 lg:px-20 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Find quick answers to common questions about our products and
            services
          </p>
        </div>
        <div className="max-w-2xl mx-auto pb-10 text-center">
          <Button className="border-2 text-[#FDB813] border-[#FDB813]  font-semibold p-6 px-16 rounded-sm">
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default page;
