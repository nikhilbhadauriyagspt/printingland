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
  Truck,
  Zap,
  Sparkles
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
      <SEO title="Procurement Cart | Lux Printers" description="Review your selected professional printing units before final procurement." />

      {/* --- PURE WHITE CENTERED HEADER --- */}
      <section className="pt-28 md:pt-40 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <ShoppingBag size={12} className="text-blue-600 fill-current" />
            Procurement Summary
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Your <span className="text-blue-600">Cart.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto">
            Review your selected professional units and supplies. Finalize your specifications for immediate dispatch.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8 shadow-sm"
              >
                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <ShoppingBag size={32} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Procurement Cart is Empty</h2>
                <p className="text-slate-400 font-bold mb-10 max-w-xs mx-auto">Select high-performance machines from our inventory to begin your procurement process.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group">
                  Explore Inventory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
                
                {/* --- LEFT: ITEMS LIST --- */}
                <div className="xl:col-span-8 space-y-6">
                  <div className="flex items-center justify-between px-4 mb-8">
                     <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                        <Package size={20} className="text-blue-600" />
                        Selected Units ({cartCount})
                     </h3>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="group relative flex flex-col md:flex-row items-center gap-8 p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-100 transition-all duration-700"
                      >
                        {/* Image */}
                        <div className="h-32 w-32 md:h-40 md:w-40 bg-white border border-slate-50 rounded-2xl p-4 shrink-0 flex items-center justify-center overflow-hidden">
                          <img 
                            src={getImagePath(item.images)} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 text-center md:text-left">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-1">
                               <h4 className="text-[14px] md:text-[16px] font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight">
                                 {item.name}
                               </h4>
                               <p className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Professional Unit</p>
                            </div>
                            <div className="text-xl font-black text-slate-900 tracking-tight">
                               ${(parsePrice(item.price) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
                            <div className="flex items-center justify-center md:justify-start gap-4 p-1.5 bg-slate-50 border border-slate-100 rounded-xl w-fit mx-auto md:mx-0">
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
                              <div className="h-8 w-8 rounded-lg bg-slate-50 group-hover/del:bg-red-50 flex items-center justify-center transition-colors">
                                 <Trash2 size={14} />
                              </div>
                              Remove Unit
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT: SUMMARY PANEL --- */}
                <div className="xl:col-span-4 sticky top-32">
                  <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-50 pb-6">Summary</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Units Total</span>
                        <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Logistics (Standard)</span>
                        <span className="text-emerald-600 font-black">Free Delivery</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Estimated Tax</span>
                        <span className="text-slate-900 font-black">$0.00</span>
                      </div>
                      
                      <div className="h-[1px] w-full bg-slate-100 my-8" />
                      
                      <div className="flex justify-between items-end mb-10">
                        <div className="space-y-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Procurement Value</span>
                           <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 group"
                      >
                        Initiate Checkout
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="mt-10 grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                            <ShieldCheck size={18} className="text-blue-600" />
                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Secured Node</span>
                         </div>
                         <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                            <Truck size={18} className="text-blue-600" />
                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Tracked Units</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <Link to="/shop" className="group flex items-center justify-center gap-3 mt-8 text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[2px] transition-all">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Continue Procuring
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
