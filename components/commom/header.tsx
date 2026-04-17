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
      <nav className="max-w-360 mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
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
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-10 text-[13px] font-medium font-montserrat tracking-wide text-white">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-zinc-300 transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-5 md:space-x-4">
          <button className="hover:text-zinc-300 transition-colors md:block hidden">
            <IconSearch size={20} stroke={1.5} />
          </button>
          <button className=" hover:text-zinc-300 transition-colors">
            <IconHeart size={20} stroke={1.5} />
          </button>
          <button className=" hover:text-zinc-300 transition-colors">
            <IconUser size={20} stroke={1.5} />
          </button>
          <div className="relative mt-2">
            <button className=" hover:text-zinc-300 transition-colors">
              <IconShoppingBag size={22} stroke={1.5} />
            </button>
            <span className="absolute -top-1 -right-1.5 bg-[#B88E2F] text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <button
            className="md:hidden text-white ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </nav>
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
