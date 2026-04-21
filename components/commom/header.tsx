"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSearch,
  IconUser,
  IconShoppingBag,
  IconMenu2,
  IconX,
  IconHeart,
} from "@tabler/icons-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Bathroom", href: "/bathroom" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-black text-white w-full border-b border-zinc-900 sticky top-0 z-50">
      <nav className="max-w-[1440px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        
        {/* -- MOBILE: Hamburger Menu (Left) [From Code 2] -- */}
        <div className="lg:hidden flex-1">
          <button
            className="text-white hover:text-[#B88E2F] transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <IconMenu2 size={26} stroke={1.5} />
          </button>
        </div>

        {/* -- Logo Section (Left on Web [Code 1], Center on Mobile [Code 2]) -- */}
        <div className="flex-none lg:flex-none flex justify-center lg:justify-start pt-1">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Morzze Logo"
              width={150}
              height={50}
              priority
              className="w-[120px] md:w-[150px]"
            />
          </Link>
        </div>

        {/* -- WEB: Navigation Links [From Code 1] -- */}
        <div className="hidden lg:flex items-center ml-15">
          <ul className="flex space-x-8 lg:space-x-7 text-[13px] font-medium font-montserrat tracking-wide text-white">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-[#B88E2F] transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* -- RIGHT SECTION: Search & Icons -- */}
        <div className="flex items-center justify-end space-x-4 lg:space-x-6 flex-1">
          
          {/* WEB: Search Bar Input [From Code 1] */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
              <IconSearch size={18} stroke={1.5} />
            </div>
            <input
              type="text"
              placeholder="Search Product"
              className="bg-[#111111] border border-zinc-800 text-[12px] font-inter rounded-md pl-10 pr-4 py-2 w-[200px] lg:w-[280px] focus:outline-none focus:border-[#B88E2F]/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* MOBILE: Search Icon [From Code 2] */}
          <button className="lg:hidden text-white hover:text-[#B88E2F] transition-colors">
            <IconSearch size={24} stroke={1.5} />
          </button>

          {/* Icons Actions [Merged Styles] */}
          <div className="flex items-center space-x-4">
            <button className="hidden lg:block hover:text-[#B88E2F] transition-colors">
              <IconHeart size={20} stroke={1.5} />
            </button>
            <button className="hidden lg:block hover:text-[#B88E2F] transition-colors">
              <IconUser size={20} stroke={1.5} />
            </button>
            
            {/* Cart with Badge [From Code 2 Style] */}
            <div className="relative mt-1">
              <button className="text-white hover:text-[#B88E2F] transition-colors">
                <IconShoppingBag size={24} stroke={1.5} />
              </button>
              <span className="absolute -top-1.5 -right-2 bg-[#B88E2F] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                0
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* -- MOBILE: SIDEBAR OVERLAY [From Code 2] -- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[100] lg:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-900">
              <Image src="/logo.png" alt="Morzze" width={110} height={35} />
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <IconX size={28} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col p-8 space-y-8 font-montserrat">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-light text-zinc-300 hover:text-[#B88E2F] flex justify-between items-center group"
                  >
                    {link.name}
                    <span className="h-[1px] w-0 bg-[#B88E2F] group-hover:w-10 transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions for Mobile */}
            <div className="mt-auto p-8 border-t border-zinc-900 bg-zinc-950 flex justify-around">
               <IconHeart size={24} className="text-zinc-500" />
               <IconUser size={24} className="text-zinc-500" />
               <IconSearch size={24} className="text-zinc-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;