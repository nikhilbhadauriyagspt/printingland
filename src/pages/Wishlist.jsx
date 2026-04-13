import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, ChevronLeft, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

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
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO title="My Wishlist | Print Ease" description="Review your saved professional printing solutions." />
      
      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Your Collection</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                My <span className="text-blue-600">Wishlist</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              You have {wishlistCount} items saved. Review and manage your favorite printers and supplies.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 md:py-20 min-h-[60vh]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-slate-100 max-w-4xl mx-auto px-8"
              >
                <div className="h-20 w-20 bg-slate-50 flex items-center justify-center mx-auto mb-6">
                  <Heart size={40} className="text-slate-200" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                <p className="text-slate-500 mb-10">Save items you like to find them easily later.</p>
                <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95">
                  Explore Products <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 md:gap-5">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="bg-white border border-slate-200 overflow-hidden flex flex-col h-full">
                          <Link to={`/product/${p.slug}`} className="relative block aspect-square bg-white overflow-hidden p-4 border-b border-slate-100">
                            <img 
                              src={getImagePath(p.images)} 
                              alt={p.name} 
                              className="w-full h-full object-contain"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                            />
                            <button 
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-2 right-2 h-8 w-8 bg-white shadow-sm border border-slate-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </Link>

                          <div className="p-3 flex flex-col flex-1">
                            <div className="flex-1">
                              <Link to={`/product/${p.slug}`} className="text-[12px] md:text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors mb-2">
                                {p.name}
                              </Link>
                            </div>
                            
                            <div className="mt-auto pt-3 flex flex-col gap-3">
                              <p className="text-[15px] md:text-[16px] font-bold text-slate-900 text-left">
                                ${parseFloat(p.price).toLocaleString()}
                              </p>
                              <button 
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full py-2.5 bg-blue-600 text-white text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95"
                              >
                                <ShoppingCart size={14} strokeWidth={2.5} />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-16 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
