"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";
const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Become a Dealer", href: "/dealer" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "Media", href: "/media" },
  { name: "Careers", href: "/careers" },
];
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-white overflow-hidden font-inter">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-bg.png"
          alt="Footer Background"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Main Grid: Mobile par vertical stack, Web par grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Logo & Description Section */}
          <div className="space-y-6 text-left">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-16 md:w-48 md:h-20">
                <Image
                  src="/footer-logo.png"
                  alt="Morzze Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm md:text-[13px] text-white/90 font-inter leading-relaxed max-w-sm">
              Premium kitchen & bathroom fittings crafted with European design
              sensibility and Indian craftsmanship.
            </p>
            {/* Social Icons Stacked like Mobile Screenshot */}
            <div className="flex items-center space-x-5 pt-2">
              <IconBrandInstagram
                size={22}
                stroke={1.5}
                className="text-white/90 hover:text-[#CBA14D] cursor-pointer transition-colors"
              />
              <IconBrandFacebook
                size={22}
                stroke={1.5}
                className="text-white/90 hover:text-[#CBA14D] cursor-pointer transition-colors"
              />
              <IconBrandYoutube
                size={22}
                stroke={1.5}
                className="text-white/90 hover:text-[#CBA14D] cursor-pointer transition-colors"
              />
              <IconBrandLinkedin
                size={22}
                stroke={1.5}
                className="text-white/90 hover:text-[#CBA14D] cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* Links Sections: Mobile par 2 columns mein split */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Shop Section */}
            <div className="text-left">
              <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-[0.15em] mb-6 border-b border-white/10 pb-2 md:border-none">
                Shop
              </h4>
              <ul className="space-y-3">
                {[
                  "Steel Sinks",
                  "Kitchen Faucets",
                  "Granite Basins",
                  "Air Taps",
                  "Floor Drainers",
                  "Towel Warmers",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-white/70 hover:text-[#CBA14D] font-inter transition-colors block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="text-left">
              <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-[0.15em] mb-6 border-b border-white/10 pb-2 md:border-none">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 hover:text-[#CBA14D] font-inter transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="text-left">
            <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-[0.15em] mb-6 border-b border-white/10 pb-2 md:border-none">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                "Contact Us",
                "Warranty",
                "Shipping & Returns",
                "FAQ",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/70 hover:text-[#CBA14D] font-inter transition-colors block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Mobile Optimized Layout */}
      <div className="relative z-10 border-t border-white/40 mx-4 md:mx-10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-8 flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
          <p className="text-[11px] text-white/60 font-inter tracking-wide order-3 md:order-1">
            © {currentYear} Morzze. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-inter order-1 md:order-2">
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Refund
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Return Policy
            </Link>
          </div>

          <p className="text-[11px] text-white/60 font-inter text-center md:text-right order-2 md:order-3 max-w-[200px] md:max-w-none">
            A-42, Phase-1, Naraina Industrial Area, New Delhi, 110012
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
