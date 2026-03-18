import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '../lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [hoveredId, setHoveredId] = useState(null);

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
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden font-jakarta border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        
        {/* --- CENTERED MINIMAL HEADER --- */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Curated Collections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-black uppercase tracking-tight"
          >
            Shop By <span className="font-semibold">Category</span>
          </motion.h2>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        {/* --- CAROUSEL WITH SIDE NAVIGATION --- */}
        <div className="relative group/carousel px-4">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.category-prev',
              nextEl: '.category-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
              1600: { slidesPerView: 7 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group"
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* Circle Image Container */}
                    <div className="w-full aspect-square bg-gray-50 rounded-full flex items-center justify-center p-1 transition-all duration-700 group-hover:bg-white group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-transparent group-hover:border-gray-100 relative overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <motion.img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          animate={hoveredId === item.id ? { scale: 1.15 } : { scale: 1 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                      </div>
                    </div>

                    {/* Elegant Text Label */}
                    <div className="text-center w-full px-2">
                      <h3 className="text-[12px] font-bold text-black uppercase tracking-wide transition-colors group-hover:text-gray-500">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="category-prev absolute top-1/2 -translate-y-1/2 -left-2 lg:-left-8 z-[30] h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-xl border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black hover:text-white hover:border-black disabled:opacity-0 disabled:pointer-events-none">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button className="category-next absolute top-1/2 -translate-y-1/2 -right-2 lg:-right-8 z-[30] h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-xl border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black hover:text-white hover:border-black disabled:opacity-0 disabled:pointer-events-none">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
