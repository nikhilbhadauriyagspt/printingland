import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ title, products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  const words = title?.split(" ") || [];
  const firstWord = words[0] || "";
  const restWords = words.slice(1).join(" ");

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        
        {/* --- HEADER: MATCHING DESIGN SYSTEM --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Specialized Selection</span>
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-black  leading-none">
                  <span className="text-slate-900">{firstWord}</span> <span className="text-blue-600 relative">{restWords}
                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h2>
                <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mt-2 leading-relaxed">
                  Professional-grade office printers engineered for high-volume productivity.
                </p>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <button className={`cs-prev-${title.replace(/\s+/g, '-')} h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-90`}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button className={`cs-next-${title.replace(/\s+/g, '-')} h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-90`}>
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- PRODUCT SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            navigation={{
              prevEl: `.cs-prev-${title.replace(/\s+/g, '-')}`,
              nextEl: `.cs-next-${title.replace(/\s+/g, '-')}`,
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1440: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <Skeleton className="w-full aspect-square rounded-2xl bg-slate-50" />
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <Link to={`/product/${p.slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
                    
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-xl bg-white flex items-center justify-center p-6 mb-5 overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name} 
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                      />
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        className={cn(
                          "absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
                          isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500 hover:scale-110"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1">
                      <h4 className="text-[13px] font-bold text-slate-900 truncate mb-1 uppercase ">
                        {p.name}
                      </h4>
                      <p className="text-lg font-black text-blue-600 mb-4">
                        ${p.price}
                      </p>
                      
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="mt-auto w-full h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
