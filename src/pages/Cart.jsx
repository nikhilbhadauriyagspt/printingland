import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ChevronLeft, 
  Package, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[$,]/g, '')) || 0;
    }
    return parseFloat(price) || 0;
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Procurement Cart | Iconic Printers" description="Review your selected professional printing units before final procurement." />

      {/* --- PROFESSIONAL HEADER --- */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-white border-b border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Procurement Summary</span>
             </div>
             <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-black  leading-none">
                  <span className="text-slate-900">Your</span> <span className="text-blue-600 relative">Cart
                    <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">
                  Review your selected professional units and supplies. Finalize your specifications for immediate dispatch.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-slate-50 rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8"
              >
                <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <ShoppingBag size={32} className="text-slate-200" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-wider">Cart is Empty</h2>
                <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto">Select high-performance machines from our inventory to begin procurement.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
                  Explore Inventory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* --- LEFT: ITEMS LIST --- */}
                <div className="xl:col-span-8 space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                        <Package size={18} className="text-blue-600" />
                        Selected Units ({cartCount})
                     </h3>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="group flex flex-col md:flex-row items-center gap-8 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
                      >
                        {/* Image */}
                        <div className="h-32 w-32 md:h-40 md:w-40 bg-slate-50 rounded-2xl p-4 shrink-0 flex items-center justify-center overflow-hidden">
                          <img 
                            src={getImagePath(item.images)} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-1">
                               <h4 className="text-[14px] md:text-[15px] font-black text-slate-900 uppercase  line-clamp-2">
                                 {item.name}
                               </h4>
                               <p className="text-[9px] font-black text-blue-600 uppercase tracking-[2px]">Professional Series</p>
                            </div>
                            <div className="text-lg font-black text-slate-900">
                               ${(parsePrice(item.price) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-4 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[13px] font-black text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-all group/del"
                            >
                              <Trash2 size={14} className="group-hover/del:scale-110 transition-transform" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT: SUMMARY PANEL --- */}
                <div className="xl:col-span-4 sticky top-32">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10 border-b border-slate-50 pb-6 text-center">Summary</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Logistics</span>
                        <span className="text-emerald-600 font-black">Free</span>
                      </div>
                      
                      <div className="h-[1px] w-full bg-slate-50 my-8" />
                      
                      <div className="flex justify-between items-end mb-10">
                        <div className="space-y-1">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-[3px]">Total Value</span>
                           <h4 className="text-3xl font-black text-slate-900 leading-none">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                      >
                        Secure Checkout
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="mt-10 grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                            <ShieldCheck size={18} className="text-blue-600" />
                            <span className="text-[8px] font-black text-slate-900 uppercase tracking-widest leading-tight">Secured Procurement</span>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                            <Truck size={18} className="text-blue-600" />
                            <span className="text-[8px] font-black text-slate-900 uppercase tracking-widest leading-tight">National Logistics</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <Link to="/shop" className="group flex items-center justify-center gap-3 mt-8 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[3px] transition-all">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                  </Link>
                </div>

              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
