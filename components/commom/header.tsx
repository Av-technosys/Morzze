"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <nav className="max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        
        {/* -- Logo Section -- */}
        <div className="flex-none pt-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Morzze Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* -- Navigation Links (Hidden on Mobile) -- */}
        <div className="hidden lg:flex items-center">
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

        {/* -- Right Section: Search Bar + Icons -- */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          
          {/* Exact Same Search Bar from Attachment 8 */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
              <IconSearch size={18} stroke={1.5} />
            </div>
            <input
              type="text"
              placeholder="Search Product"
              className="bg-[#111111] border border-zinc-800 text-[12px] font-inter rounded-md pl-10 pr-4 py-2 w-[200px] lg:w-[280px] focus:outline-none focus:border-[#B88E2F]/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Icon Actions */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-[#B88E2F] transition-colors">
              <IconHeart size={20} stroke={1.5} />
            </button>
            <button className="hover:text-[#B88E2F] transition-colors">
              <IconUser size={20} stroke={1.5} />
            </button>
            
            {/* Cart with Badge */}
            <div className="relative mt-1">
              <button className="hover:text-[#B88E2F] transition-colors">
                <IconShoppingBag size={22} stroke={1.5} />
              </button>
              <span className="absolute -top-1 -right-1.5 bg-[#B88E2F] text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* -- Mobile Navigation Menu (Logic Unchanged) -- */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-900 animate-in fade-in slide-in-from-top duration-1000">
          <ul className="flex flex-col p-6 space-y-4 font-montserrat">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-zinc-300 hover:text-white block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;