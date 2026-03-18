import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, Eye, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();
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

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-black">
        <SEO title="Empty Wishlist | Mike's Printer" />
        <div className="h-24 w-24 bg-[#FBFBFA] rounded-full border border-gray-100 flex items-center justify-center mb-8">
          <Heart size={32} className="text-gray-200" strokeWidth={1} />
        </div>
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-4 text-center">Your wishlist is <span className="font-semibold italic">empty</span></h2>
        <p className="text-gray-400 text-sm font-medium mb-10 text-center max-w-sm">Save your favorite printers here to easily find them later.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-black text-white h-16 px-12 rounded-full overflow-hidden transition-all duration-500 hover:pr-14 hover:shadow-2xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Start Shopping</span>
          <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
          <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-black overflow-x-hidden">
      <SEO title="My Wishlist | Mike's Printer" description="Review your saved printers." />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block"
          >
            Personal Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight"
          >
            My <span className="font-semibold italic">Wishlist</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 h-[1px] bg-black mx-auto mt-8"
          />
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (idx % 5) * 0.05 }}
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

                  {/* Remove Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all duration-300 z-20 shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>

                  {/* Quick Action Buttons - Sliding Up on Hover */}
                  <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.22, 1, 0.36, 1]">
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="w-full h-11 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-xl"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <Link 
                      to={`/product/${p.slug}`}
                      className="h-11 bg-white text-black border border-gray-100 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
                    >
                      <Eye size={14} /> View Details
                    </Link>
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
