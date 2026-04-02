import React from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden relative">
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        {/* --- CENTERED HEADER (Smaller) --- */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-4"
          >
            <Layers size={12} className="text-blue-600" />
            Collections
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900  leading-tight"
          >
            Shop by <span className="text-blue-600">Category.</span>
          </motion.h2>
        </div>

        {/* --- PREMIUM SWIPER LAYOUT (Smaller Cards) --- */}
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay, Pagination, FreeMode]}
            spaceBetween={16}
            slidesPerView={2.2}
            freeMode={true}
            loop={true}
            navigation={{
              prevEl: '.premium-cat-prev',
              nextEl: '.premium-cat-next',
            }}
            pagination={{
              clickable: true,
              el: '.premium-cat-pagination',
              bulletClass: 'cat-bullet',
              bulletActiveClass: 'cat-bullet-active',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { slidesPerView: 3.2, spaceBetween: 20 },
              768: { slidesPerView: 4.2, spaceBetween: 24 },
              1024: { slidesPerView: 6.2, spaceBetween: 24 },
              1440: { slidesPerView: 7.2, spaceBetween: 30 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-square rounded-[2rem] bg-slate-50" />
                    <Skeleton className="h-3 w-1/2 mx-auto bg-slate-50" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item, index) => (
                <SwiperSlide key={item.id} className="pb-12 pt-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="group/card relative"
                  >
                    <Link 
                      to={`/shop?category=${item.slug}`}
                      className="flex flex-col"
                    >
                      {/* Floating Premium Card (Smaller) */}
                      <div className="relative w-full aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center p-6 transition-all duration-500 group-hover/card:bg-white group-hover/card:border-blue-200 group-hover/card:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.12)] group-hover/card:-translate-y-2 overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ease-out group-hover/card:scale-105">
                          <img 
                            src={getImagePath(item.image)} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain drop-shadow-xl transition-transform duration-500"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                          />
                        </div>

                        {/* Smaller Action Button */}
                        <div className="absolute bottom-4 right-4 z-99 h-9 w-9 bg-slate-900 text-white rounded-xl flex items-center justify-center translate-y-12 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-400 shadow-lg hover:!bg-blue-600">
                           <ArrowRight size={16} />
                        </div>
                      </div>

                      {/* Floating Text Label (Smaller) */}
                      <div className="mt-5 text-center px-1">
                        <h4 className="text-[11px] md:text-[12px] font-black text-slate-800 group-hover/card:text-blue-600 transition-all duration-300 uppercase tracking-widest leading-none truncate">
                          {item.name}
                        </h4>
                        <div className="mt-3 h-[1.5px] w-4 mx-auto bg-slate-200 group-hover/card:w-8 group-hover/card:bg-blue-600 transition-all duration-500 rounded-full" />
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* --- MINIMALIST CONTROLS (No Text) --- */}
          <div className="flex items-center justify-center mt-6 gap-6">
            <button className="premium-cat-prev h-11 w-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90">
              <ChevronLeft size={20} />
            </button>

            <div className="premium-cat-pagination !static !w-auto !flex gap-1.5" />

            <button className="premium-cat-next h-11 w-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-90">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .premium-cat-pagination .cat-bullet {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .premium-cat-pagination .cat-bullet-active {
          width: 24px;
          background: #2563eb;
        }
      `}} />
    </section>
  );
}
