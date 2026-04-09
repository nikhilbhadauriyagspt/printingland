import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';

export default function ProductGrid({ products = [], loading = false }) {
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

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">

        {/* --- HEADER: MATCHING DESIGN SYSTEM --- */}
        <div className="flex flex-col gap-3 mb-12 md:mb-16">
           <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">New Collection</span>
           </div>
           <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black  leading-none">
                <span className="text-slate-900">New</span> <span className="text-blue-600 relative">Arrivals
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mt-2 leading-relaxed">
                Experience the latest innovations in printing technology with our freshest industrial-grade equipment.
              </p>
           </div>
        </div>

        {/* --- CLEAN PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-square rounded-2xl bg-slate-50" />
                <Skeleton className="h-4 w-2/3 bg-slate-50" />
              </div>
            ))
          ) : (
            products.slice(0, 18).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom Action CTA */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-16 md:mt-24">
            <Link
              to="/shop"
              className="group flex items-center gap-4 px-12 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 active:scale-95"
            >
              Explore Full Catalog
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
