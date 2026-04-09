import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();

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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="My Wishlist | Iconic Printers" description="Review your saved professional printing solutions." />
      
      {/* --- PROFESSIONAL HEADER --- */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-white border-b border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Personal Archive</span>
             </div>
             <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                  <span className="text-slate-900">My</span> <span className="text-blue-600 relative">Wishlist
                    <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">
                  Review and manage your saved printer models and specialized supplies in one professional space.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 md:py-20 min-h-[60vh] bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-slate-50 rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8"
              >
                <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Heart size={32} className="text-slate-200" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-wider">Archive is Empty</h2>
                <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto">Save your preferred machines to easily access them for future procurement.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
                  Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                      >
                        <div className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
                          
                          {/* Image Box */}
                          <div className="relative aspect-square rounded-xl bg-slate-50 flex items-center justify-center p-6 mb-5 overflow-hidden">
                            <img 
                              src={getImagePath(p.images)} 
                              alt={p.name} 
                              className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                            />
                            
                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 text-slate-300 hover:text-red-500 hover:scale-110"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col flex-1">
                            <h4 className="text-[13px] font-bold text-slate-900 truncate mb-1 uppercase tracking-tight">
                              {p.name}
                            </h4>
                            <p className="text-lg font-black text-blue-600 mb-4">
                              ${parseFloat(p.price).toLocaleString()}
                            </p>
                            
                            <button
                              onClick={(e) => handleAddToCart(e, p)}
                              className="mt-auto w-full h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                            >
                              <ShoppingBag size={16} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-20 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-4 px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
