import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
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
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        
        {/* --- ENHANCED PROFESSIONAL HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Our Collections</span>
             </div>
             <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-black  leading-none">
                  <span className="text-slate-900">Shop by</span> <span className="text-blue-600 relative">Category
                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h2>
                <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mt-2 leading-relaxed">
                  Discover a curated selection of premium industrial printers and precision components engineered for professional excellence.
                </p>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="cat-prev h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-90">
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button className="cat-next h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-90">
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- SIMPLE CLEAN SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={2.2}
            freeMode={true}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4.2 },
              1024: { slidesPerView: 5.2 },
              1440: { slidesPerView: 6.2 },
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
              subcategories.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link to={`/shop?category=${item.slug}`} className="group block">
                    {/* Image Box */}
                    <div className="relative w-full aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:border-blue-100 group-hover:-translate-y-2">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>

                    {/* Name Below */}
                    <div className="mt-5 text-center">
                      <h4 className="text-[12px] md:text-[13px] font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-[0.1em] truncate px-2">
                        {item.name}
                      </h4>
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
