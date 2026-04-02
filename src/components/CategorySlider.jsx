import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ArrowRight, Plus, Eye, LayoutGrid, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <section className="bg-white py-12 md:py-24 w-full overflow-hidden border-y border-slate-100 relative">
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        {/* --- CENTERED PURE WHITE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-4 shadow-sm"
          >
            <Zap size={12} className="text-blue-600 fill-current" />
            Specialized Selection
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900  leading-none mb-4"
          >
            {firstWord} <span className="text-blue-600">{restWords}.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed max-w-xl"
          >
            Professional-grade {title.toLowerCase()} engineered for high-volume productivity and exceptional precision.
          </motion.p>
        </div>

        {/* --- PURE WHITE PRODUCT SWIPER --- */}
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay, Pagination, FreeMode]}
            spaceBetween={16}
            slidesPerView={1.8}
            freeMode={true}
            navigation={{
              prevEl: `.cs-prev-${title.replace(/\s+/g, '-')}`,
              nextEl: `.cs-next-${title.replace(/\s+/g, '-')}`,
            }}
            pagination={{
              clickable: true,
              el: `.cs-pagination-${title.replace(/\s+/g, '-')}`,
              bulletClass: 'cs-bullet',
              bulletActiveClass: 'cs-bullet-active',
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween: 20 },
              768: { slidesPerView: 3.5, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 24 },
              1440: { slidesPerView: 6.2, spaceBetween: 24 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-square rounded-[2rem] bg-white border-none shadow-sm" />
                    <Skeleton className="h-4 w-2/3 mx-auto bg-white" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 15).map((p, index) => (
                <SwiperSlide key={p.id} className="pb-12 pt-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="group/card"
                  >
                    <Link to={`/product/${p.slug}`} className="flex flex-col">
                      {/* Seamless White Card Design */}
                      <div className="relative w-full aspect-square bg-white rounded-[2rem] flex items-center justify-center p-6 transition-all duration-500 group-hover/card:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover/card:-translate-y-2 overflow-hidden">
                        
                        {/* Wishlist Button (Seamless White) */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-4 right-4 z-20 h-9 w-9 rounded-xl bg-white border border-slate-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 hover:scale-105 active:scale-90",
                            isInWishlist(p.id) ? "text-red-500 border-red-50 opacity-100 shadow-sm" : "text-slate-300 hover:text-red-500 hover:shadow-md"
                          )}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Image - Seamless with BG */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 group-hover/card:scale-105">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain transition-all duration-500"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                            }}
                          />
                        </div>

                        {/* Floating Action Overlay */}
                        <div className="absolute inset-x-4 bottom-4 flex gap-1.5 translate-y-16 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-400 ease-out z-20">
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="flex-1 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                          >
                            <ShoppingBag size={14} />
                            Add to Cart
                          </button>
                          <div className="h-10 w-10 bg-white text-slate-700 border border-slate-50 rounded-xl flex items-center justify-center hover:text-blue-600 transition-all shadow-md">
                            <Eye size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="mt-5 px-1 flex flex-col items-center">
                        <h4 className="text-[11px] md:text-[12px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-all duration-300 uppercase tracking-widest text-center line-clamp-2 leading-relaxed w-full min-h-[32px] mb-2">
                          {p.name}
                        </h4>

                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black text-slate-900 ">
                              ${p.price}
                           </span>
                        </div>

                        <div className="mt-3 h-[1px] w-4 bg-slate-50 group-hover/card:w-12 group-hover/card:bg-blue-600 transition-all duration-500 rounded-full" />
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* --- MINIMALIST NAVIGATION --- */}
          <div className="flex items-center justify-center mt-6 gap-6">
            <button className={`cs-prev-${title.replace(/\s+/g, '-')} h-11 w-11 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90`}>
              <ChevronLeft size={20} />
            </button>

            <div className={`cs-pagination-${title.replace(/\s+/g, '-')} !static !w-auto !flex gap-1.5`} />

            <button className={`cs-next-${title.replace(/\s+/g, '-')} h-11 w-11 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90`}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cs-bullet {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #f1f5f9;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .cs-bullet-active {
          width: 24px;
          background: #2563eb;
        }
      `}} />
    </section>
  );
}
