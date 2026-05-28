"use client";

import { useRouter } from "next/navigation";
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
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  MailIcon,
  MapPin,
  PhoneIcon,
  Clock,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { ContactLink } from "@/components/ContactLink";



const page = () => {
  const maxLength = 500;

  const router = useRouter();

const handleFaqRedirect = () => {
  router.push("/support?tab=faq");
};

  const [messageLength, setMessageLength] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "message") {
      setMessageLength(value.length);
    }

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[0-9+\-\s()]{9,15}$/;

      if (!phoneRegex.test(formData.phone)) {
        setError("Please enter a valid phone number");
        return;
      }
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Subject is required");
      return;
    }

    if (!formData.message.trim()) {
      setError("Message is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Message sent successfully!");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          category: "",
          subject: "",
          message: "",
        });

        setMessageLength(0);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex flex-col lg:flex-row justify-center gap-20 px-4 lg:px-0 lg:-mt-20 mt-20  relative">
        <div className="w-full lg:w-80 h-auto rounded-xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <MapPin className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Morzze India Pvt. Ltd.
            <br />
            A-42, Phase-1,
            <br />
            Naraina Industrial Area,
            <br />
            New Delhi – 110012
            <br />
            India
          </p>
        </div>

        <div className="w-full lg:w-80 h-auto rounded-xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <PhoneIcon className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Call Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            Toll Free: <br />
            <ContactLink
              type="phone"
              value="1800 110 123"
              className="text-yellow-400"
            />
            <br />
            Sales: <br />
            <ContactLink
              type="phone"
              value="+91-87503-13000"
              className="text-yellow-400"
            />
            <br />
            Support: <br />
            <ContactLink
              type="phone"
              value="+91-87503-13000"
              className="text-yellow-400"
            />
          </p>
        </div>

        <div className="w-full lg:w-80 h-auto rounded-xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
            <MailIcon className="text-black w-6 h-6" />
          </div>
          <h3 className="text-white font-semibold mb-2">Email Us</h3>
          <p className="text-gray-300 text-sm leading-6">
            General: <br />
            <ContactLink
              type="email"
              value="info@morzze.com"
              className="text-yellow-400"
            />
            <br />
            Sales: <br />
            <ContactLink
              type="email"
              value="sales@morzze.com"
              className="text-yellow-400"
            />
            <br />
            Support: <br />
            <ContactLink
              type="email"
              value="info@morzze.com"
              className="text-yellow-400"
            />
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

              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 text-white font-bold">
                    !
                  </div>
                  <p className="text-sm text-black">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 flex items-center gap-3 rounded-md border border-green-500 bg-green-500/10 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500 text-white font-bold">
                    ✓
                  </div>
                  <p className="text-sm text-green-400">{success}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Full Name *
                    </FieldLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Email Address *
                    </FieldLabel>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Phone Number
                    </FieldLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <FieldLabel className="text-white mb-3 block text-sm font-medium">
                      Category *
                    </FieldLabel>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#171717] border border-[#928E87] text-white/80 placeholder:text-gray-500 px-4 py-3 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                    >
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

                <div>
                  <FieldLabel className="text-white mb-3 block text-sm font-medium">
                    Subject *
                  </FieldLabel>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you"
                    className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <FieldLabel className="text-white mb-3 block text-sm font-medium">
                    Message *
                  </FieldLabel>
                  <div className="relative">
                    <Textarea
                      name="message"
                      value={formData.message}
                      placeholder="Tell us more about your inquiry..."
                      maxLength={maxLength}
                      onChange={handleChange}
                      className="bg-[#171717] border border-[#928E87] text-white placeholder:text-gray-500 px-4 py-5 rounded-xs focus:border-yellow-400 focus:outline-none transition min-h-32 resize-none"
                    />

                    <span className="absolute bottom-3 right-4 text-sm text-gray-500">
                      {messageLength}/{maxLength}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 w-full py-5 rounded-xs mt-6"
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>

            {/* Right Section - Map, Business Hours, WhatsApp */}
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden h-64 lg:h-72">
                <iframe
                  src="https://www.google.com/maps?q=A-42,+Phase-1,+Naraina+Industrial+Area,+New+Delhi+-+110012&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* <div className="bg-white/5 border border-white/20 rounded-xs p-6">
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
                    <span className="text-white/80">
                      9:00 AM - 6:00 PM IST
                    </span>
                  </div>
                  <div className="flex border-b border-b-[#928E87] py-4 justify-between">
                    <span className="text-[#FEFFF1]">Saturday</span>
                    <span className="text-white/80">
                      10:00 AM - 4:00 PM IST
                    </span>
                  </div>
                  <div className="flex py-4 justify-between">
                    <span className="text-[#FEFFF1]">Sunday</span>
                    <span className="text-[#EF4444]">Closed</span>
                  </div>
                </div>
              </div> */}

            <a
              href="https://wa.me/918750313000"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-[#F0FDF4] border rounded-xs p-6 flex items-center gap-4 cursor-pointer hover:bg-[#E8FBEF] transition-colors">
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
            </a>

              <div className="flex gap-4 justify-center lg:justify-start pt-4">
                <a
                  href="https://www.facebook.com/Morzzeindia/"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center transition"
                >
                  <IconBrandFacebook className="text-[#4B5563] w-5 h-5" />
                </a>
                {/* <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center transition"
                >
                  <IconBrandTwitter className="text-[#4B5563] w-5 h-5" />
                </a> */}
                <a
                  href="https://www.linkedin.com/company/anupamretailltd/?originalSubdomain=in"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center transition"
                >
                  <IconBrandLinkedin className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="http://instagram.com/morzzeindia/"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center transition"
                >
                  <IconBrandInstagram className="text-[#4B5563] w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@MorzzeIndia"
                  className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center transition"
                >
                  <IconBrandYoutube className="text-[#4B5563] w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {/* <div className="px-4 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/80">
            Find quick answers to common questions about our products and
            services
          </p>
        </div>
        <div className="max-w-2xl mx-auto pb-10 text-center">
          <Button
            onClick={handleFaqRedirect}
            className="border-2 text-[#FDB813] border-[#FDB813] font-semibold p-6 px-16 rounded-sm"
          >
            View All FAQs
          </Button>
        </div>
      </div> */}
    </section>
  );
};

export default page;
