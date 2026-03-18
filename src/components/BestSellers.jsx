import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/navigation';

import featuredBestSeller from "@/assets/bannerr/banner4.jpg";

export default function BestSellers({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

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
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-20 md:py-32 w-full font-jakarta border-t border-gray-50 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        
        {/* --- HEADING (MATCHING SHOP BY CATEGORY) --- */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Top Performance
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-black uppercase tracking-tight"
          >
            Best <span className="font-semibold">Sellers</span>
          </motion.h2>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start relative">
          
          {/* --- STUCK FEATURED CARD (LEFT) --- */}
          <div className="w-full lg:w-[400px] shrink-0 sticky top-[150px] z-10 lg:-ml-6 xl:-ml-12 lg:-mt-24">
            <div className="relative aspect-[4/5] w-full bg-black rounded-r-3xl overflow-hidden group shadow-2xl">
              <img 
                src={featuredBestSeller} 
                alt="Featured Best Seller" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[3000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Premium Choice</span>
                  <h2 className="text-2xl md:text-3xl font-light text-white uppercase tracking-tight leading-tight">
                    Next-Gen <br/> <span className="font-semibold italic text-white/90">Smart Printers</span>
                  </h2>
                </div>
                <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed max-w-[280px]">
                  Professional hardware engineered for high-performance and flawless print quality.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/shop" 
                    className="group relative inline-flex items-center gap-4 bg-white text-black h-12 px-8 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95"
                  >
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">Shop Now</span>
                    <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- SCROLLABLE PRODUCTS (RIGHT) --- */}
          <div className="flex-1 min-w-0 relative group/carousel">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1.2}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1280: { slidesPerView: 3.2 },
                1600: { slidesPerView: 4.2 },
              }}
              className="!overflow-visible"
            >
              {products.slice(0, 12).map((p) => (
                <SwiperSlide key={p.id}>
                  <div 
                    className="group relative flex flex-col h-full bg-white"
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Image Container with Hover Actions */}
                    <div className="relative aspect-[4/5] w-full bg-[#FBFBFA] flex items-center justify-center p-8 overflow-hidden rounded-sm transition-all duration-700 group-hover:bg-[#F5F5F3]">
                      <motion.img 
                        src={getImagePath(p.images)} 
                        alt={p.name} 
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                        animate={hoveredId === p.id ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />

                      {/* Quick Action Buttons */}
                      <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.22, 1, 0.36, 1]">
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="w-full h-11 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-xl"
                        >
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <Link 
                            to={`/product/${p.slug}`}
                            className="h-11 bg-white text-black border border-gray-100 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
                          >
                            <Eye size={14} /> View
                          </Link>
                          <button 
                            onClick={() => toggleWishlist(p)}
                            className={cn(
                              "h-11 bg-white border border-gray-100 flex items-center justify-center transition-all shadow-lg",
                              isInWishlist(p.id) ? "text-red-500 bg-red-50 border-red-100" : "text-black hover:bg-black hover:text-white hover:border-black"
                            )}
                          >
                            <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="pt-6 pb-2 text-center">
                      <Link to={`/product/${p.slug}`} className="block mb-2 group/title">
                        <h3 className="text-[13px] font-semibold text-black uppercase tracking-wide line-clamp-1 group-hover/title:text-gray-500 transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-black">${p.price}</span>
                        <div className="w-8 h-[1px] bg-gray-100 mt-2 transition-all duration-500 group-hover:w-16 group-hover:bg-black" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows (Matching Shop By Category behavior) */}
            <button className="bs-prev absolute top-1/2 -translate-y-1/2 -left-4 z-20 h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-xl border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black hover:text-white">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button className="bs-next absolute top-1/2 -translate-y-1/2 -right-4 z-20 h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-xl border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black hover:text-white">
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
