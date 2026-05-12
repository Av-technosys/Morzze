"use client";

import React, { useState } from 'react';
import { Trash2, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

const WishlistPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      slug: "farmhouse-apron-sink",
      name: "Farmhouse Apron Sink",
      category: "ROSE GOLD",
      price: 20300, // Number for easier calculation
      oldPrice: 27000,
      rating: 4,
      reviews: 47,
      image: "/granite-basin.png",
      quantity: 1
    }
  ]);

  // Quantity Handlers
  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  return (
    <div>
      figma me nhi h isliye build nhi kiya !!
    </div>
    // <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-20 bg-black min-h-screen">
    //   <div className="mb-12">
    //     <h1 className="text-white text-2xl md:text-4xl font-montserrat font-bold tracking-tight uppercase">
    //       My Wishlist
    //     </h1>
    //     <p className="text-zinc-500 text-sm mt-2 uppercase tracking-[0.2em]">
    //       {items.length} Item Saved
    //     </p>
    //   </div>

    //   <div className="w-full">
    //     {/* --- DESKTOP TABLE HEADER --- */}
    //     <div className="hidden md:grid grid-cols-12 pb-6 border-b border-zinc-800 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
    //       <div className="col-span-5">Product Details</div>
    //       <div className="col-span-2 text-center">Price</div>
    //       <div className="col-span-2 text-center">Quantity</div>
    //       <div className="col-span-3 text-right">Action</div>
    //     </div>

    //     {items.length > 0 ? (
    //       items.map((item) => (
    //         <div key={item.id} className="group">
    //           {/* --- DESKTOP VIEW --- */}
    //           <div className="hidden md:grid grid-cols-12 py-10 border-b border-zinc-900 items-center">
    //             <div className="col-span-5 flex gap-8">
    //               <div className="w-32 h-32 bg-zinc-900 rounded-sm overflow-hidden shrink-0 border border-white/5">
    //                 <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    //               </div>
    //               <div className="flex flex-col justify-center space-y-1">
    //                 <p className="text-[#FDB813] text-[10px] font-bold tracking-widest uppercase">{item.category}</p>
    //                 <h3 className="text-white text-lg font-medium font-montserrat">{item.name}</h3>
    //                 <div className="flex items-center gap-1 text-[#FDB813]">
    //                   {[...Array(5)].map((_, i) => (
    //                     <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-zinc-700"} />
    //                   ))}
    //                   <span className="text-zinc-600 text-[10px] ml-1">({item.reviews} reviews)</span>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Price Column */}
    //             <div className="col-span-2 text-center flex flex-col gap-1">
    //               <span className="text-white text-xl font-bold">₹{item.price.toLocaleString()}</span>
    //               <span className="text-zinc-600 text-sm line-through">₹{item.oldPrice.toLocaleString()}</span>
    //             </div>

    //             {/* Desktop Quantity Selector */}
    //             <div className="col-span-2 flex justify-center">
    //               <div className="flex items-center border border-zinc-800 rounded-full px-2 py-1">
    //                 <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-500 hover:text-white p-1">
    //                   <Minus size={14} />
    //                 </button>
    //                 <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
    //                 <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-500 hover:text-white p-1">
    //                   <Plus size={14} />
    //                 </button>
    //               </div>
    //             </div>

    //             <div className="col-span-3 text-right">
    //               <div className="flex items-center justify-end gap-6">
    //                 <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest hover:bg-[#FDB813] transition-all active:scale-95">
    //                   <ShoppingCart size={16} />
    //                   Add to Cart
    //                 </button>
    //                 <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
    //                   <Trash2 size={20} />
    //                 </button>
    //               </div>
    //             </div>
    //           </div>

    //           {/* --- MOBILE VIEW --- */}
    //           <div className="md:hidden flex flex-col py-8 border-b border-zinc-900">
    //             <div className="flex gap-4 mb-6">
    //               <div className="w-24 h-24 bg-zinc-900 rounded-sm overflow-hidden shrink-0 border border-white/5">
    //                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    //               </div>
    //               <div className="flex-1 space-y-2">
    //                 <div className="flex justify-between items-start">
    //                    <p className="text-[#FDB813] text-[9px] font-bold tracking-widest uppercase">{item.category}</p>
    //                    <button onClick={() => removeItem(item.id)} className="text-zinc-700">
    //                     <Trash2 size={18} />
    //                   </button>
    //                 </div>
    //                 <h3 className="text-white text-base font-medium">{item.name}</h3>

    //                 <div className="flex justify-between items-center">
    //                   <div className="flex flex-col">
    //                     <span className="text-white text-lg font-bold">₹{item.price.toLocaleString()}</span>
    //                     <span className="text-zinc-600 text-xs line-through">₹{item.oldPrice.toLocaleString()}</span>
    //                   </div>

    //                   {/* Mobile Quantity Selector */}
    //                   <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1">
    //                     <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-400 p-1">
    //                       <Minus size={12} />
    //                     </button>
    //                     <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
    //                     <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-400 p-1">
    //                       <Plus size={12} />
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <button className="w-full bg-white text-black py-4 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 active:bg-[#FDB813]">
    //               <ShoppingCart size={16} />
    //               Add to Cart
    //             </button>
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <div className="py-20 text-center">
    //         <p className="text-zinc-500 mb-6">Your wishlist is empty.</p>
    //         <Link href={"/products"}>
    //         <button className="border border-white/20 px-8 py-3 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
    //           Go to Shop
    //         </button>
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default WishlistPage;