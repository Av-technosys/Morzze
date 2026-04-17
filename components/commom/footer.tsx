import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  IconBrandInstagram, 
  IconBrandFacebook, 
  IconBrandYoutube, 
  IconBrandLinkedin 
} from '@tabler/icons-react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-white overflow-hidden font-inter">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/footer-bg.png" 
          alt="Footer Background"
          fill
          className="object-cover object-center opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex justify-between items-start md:block space-y-0 md:space-y-6">
            <div className="space-y-6 max-w-[75%] md:max-w-xs">
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
              <p className="text-sm text-white/90 font-inter leading-relaxed">
                Premium kitchen & bathroom fittings crafted with European design sensibility and Indian craftsmanship.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 pt-2 md:pt-0">
              <IconBrandInstagram size={25} stroke={1.5} className="text-white/90 hover:text-zinc-400 cursor-pointer transition-colors" />
              <IconBrandFacebook size={25} stroke={1.5} className="text-white/90 hover:text-zinc-400 cursor-pointer transition-colors" />
              <IconBrandYoutube size={25} stroke={1.5} className="text-white/90 hover:text-zinc-400 cursor-pointer transition-colors" />
              <IconBrandLinkedin size={25} stroke={1.5} className="text-white/90 hover:text-zinc-400 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:contents">
            <div>
              <h4 className="font-montserrat text-sm font-bold text-white/90 uppercase tracking-[0.15em] mb-6">Shop</h4>
              <ul className="space-y-3">
                {['Steel Sinks', 'Kitchen Faucets', 'Granite Basins', 'Air Taps', 'Floor Drainers', 'Towel Warmers'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-white/90 hover:text-zinc-400 font-inter transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-bold text-white/90 uppercase tracking-[0.15em] mb-6">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Become a Dealer', 'Catalogue', 'Media', 'Careers'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-white/90 hover:text-zinc-400 font-inter transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-montserrat text-sm font-bold text-white/90 uppercase tracking-[0.15em] mb-6">Support</h4>
            <ul className="flex flex-wrap justify-center md:flex-col md:justify-start gap-x-6 gap-y-3">
              {['Contact Us', 'Warranty', 'Shipping & Returns', 'FAQ', 'Track Order'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/90 hover:text-zinc-400 font-inter transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      <div className="relative z-10 border-t border-white/90 md:mx-10 mx-3 bg-black/40">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/90 font-inter tracking-wide text-center md:text-left">
            © {currentYear} Morzze. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 sm:space-x-8 text-xs font-inter">
            <Link href="#" className="text-white/90 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/90 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-white/90 transition-colors">Sitemap</Link>
          </div>
          <p className="text-xs text-white/90 font-inter text-center md:text-right">
            A-42, Phase-1, Naraina Industrial Area, New Delhi, 110012
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer