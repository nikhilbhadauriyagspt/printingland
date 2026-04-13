import React from 'react';
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from 'framer-motion';

export default function ProductGrid({ products = [], loading = false }) {
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

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
    <section className="bg-white py-12 md:py-20 w-full font-['Poppins']">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        
        {/* --- CENTERED HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-8 md:w-12 bg-blue-600" />
            <span className="text-[12px] font-bold text-blue-600 tracking-[0.2em] uppercase">New Collection</span>
            <span className="h-px w-8 md:w-12 bg-blue-600" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            New <span className="text-blue-600">Arrivals</span>
          </h2>
          <p className="text-slate-500 text-[13px] md:text-[15px] font-medium max-w-2xl leading-relaxed">
            Stay ahead with our latest arrivals. Explore the newest technology and modern designs recently added to our catalog.
          </p>
        </div>

        {/* --- COMPACT PRODUCT GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 md:gap-4">
          {loading ? (
             Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="aspect-[3/4] rounded-xl bg-gray-50 animate-pulse" />
             ))
          ) : (
            products.slice(0, 16).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
              >
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full">
                  <Link to={`/product/${p.slug}`} className="relative block aspect-square bg-white overflow-hidden p-4 border-b border-slate-100">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                    />
                    
                    {/* Minimal Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(p);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center cursor-pointer justify-center text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Heart size={14} className={isInWishlist(p.id) ? "fill-red-500 text-red-500" : ""} />
                    </button>
                  </Link>

                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex-1">
                      <Link to={`/product/${p.slug}`} className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors mb-2">
                        {p.name}
                      </Link>
                    </div>
                    
                    <div className="mt-auto pt-3 flex flex-col gap-3">
                      <p className="text-[16px] font-bold text-slate-900 text-left px-1">
                        ${p.price}
                      </p>
                      <button 
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95 cursor-pointer"
                      >
                        <ShoppingCart size={14} strokeWidth={2.5} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

    
      </div>
    </section>
  );
}
