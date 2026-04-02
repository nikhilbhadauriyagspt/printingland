import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package, Plus, Eye, Zap, Sparkles } from 'lucide-react';
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
      <SEO title="My Wishlist | Lux Printers" description="Review your saved professional printing solutions." />
      
      {/* --- PURE WHITE CENTERED HEADER --- */}
      <section className="pt-5 md:pt-5 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <Heart size={12} className="text-red-500 fill-current" />
            Personal Archive
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900  leading-none mb-6">
            My <span className="text-blue-600">Wishlist.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-md font-bold leading-relaxed max-w-3xl mx-auto">
            Review and manage your saved printer models and specialized supplies in one professional space.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-5 min-h-[60vh] bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8 shadow-sm"
              >
                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Heart size={32} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4  uppercase">Wishlist is Empty</h2>
                <p className="text-slate-400 font-bold mb-10  mx-auto">Save your preferred machines to easily access them for future procurement.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
                  Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="group/card"
                      >
                        <div className="flex flex-col">
                          
                          {/* Seamless Card Design */}
                          <div className="relative w-full aspect-square bg-white rounded-[2rem] flex items-center justify-center p-6 transition-all duration-500 group-hover/card:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover/card:-translate-y-2 overflow-hidden">

                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-xl bg-white border border-slate-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 text-slate-300 hover:text-red-500 hover:border-red-100 shadow-sm"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>

                            {/* Image */}
                            <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                              <img
                                src={getImagePath(p.images)} alt={p.name}
                                className="max-w-full max-h-full object-contain transition-all duration-500 group-hover/card:scale-105"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                              />
                            </Link>

                            {/* Floating Action Overlay */}
                            <div className="absolute inset-x-4 bottom-4 flex gap-1.5 translate-y-16 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-400 ease-out z-20">
                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="flex-1 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                              >
                                <ShoppingBag size={14} /> Add
                              </button>
                              <Link to={`/product/${p.slug}`} className="h-10 w-10 bg-white text-slate-700 border border-slate-100 rounded-xl flex items-center justify-center hover:text-blue-600 transition-all shadow-md">
                                <Eye size={16} />
                              </Link>
                            </div>
                          </div>

                          {/* Info Area */}
                          <div className="mt-5 px-1 flex flex-col items-center text-center">
                            <h3 className="text-[11px] md:text-[12px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-all duration-300 uppercase tracking-widest line-clamp-2 min-h-[32px] mb-2 leading-relaxed">
                              {p.name}
                            </h3>

                            {/* Price */}
                            <div className="text-sm font-black text-slate-900 ">
                               ${parseFloat(p.price).toLocaleString()}
                            </div>

                            <div className="mt-3 h-[1px] w-4 bg-slate-50 group-hover/card:w-12 group-hover/card:bg-blue-600 transition-all duration-500 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-24 pt-12 border-t border-slate-50 flex justify-center">
            <Link to="/shop" className="group inline-flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[3px] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm active:scale-95">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
