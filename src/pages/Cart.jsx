import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingBag, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-black">
        <SEO title="Empty Bag | Mike's Printer" />
        <div className="h-24 w-24 bg-[#FBFBFA] rounded-full border border-gray-100 flex items-center justify-center mb-8">
          <ShoppingBag size={32} className="text-gray-200" strokeWidth={1} />
        </div>
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-4 text-center">Your bag is <span className="font-semibold italic">empty</span></h2>
        <p className="text-gray-400 text-sm font-medium mb-10 text-center max-w-sm">Looks like you haven't added any premium hardware to your selection yet.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-black text-white h-16 px-12 rounded-full overflow-hidden transition-all duration-500 hover:pr-14 hover:shadow-2xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Start Shopping</span>
          <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
          <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-black overflow-x-hidden pb-24">
      <SEO title="My Bag | Mike's Printer" description="Review your selected printers before checkout." />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block"
          >
            Review Selection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight"
          >
            Shopping <span className="font-semibold italic">Bag</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- CART ITEMS --- */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center gap-10 group relative pb-12 border-b border-gray-50 last:border-0"
                >
                  <div className="h-48 w-full sm:w-48 bg-[#FBFBFA] rounded-sm flex items-center justify-center p-8 shrink-0 transition-colors group-hover:bg-[#F5F5F3] overflow-hidden relative">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full py-2">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">{item.brand_name || 'Enterprise'}</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-xl font-medium text-black uppercase tracking-tight leading-snug line-clamp-2 hover:text-gray-500 transition-colors">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-black transition-colors p-2"
                        title="Remove Item"
                      >
                        <Trash2 size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50/50">
                      {/* Refined Counter */}
                      <div className="h-10 bg-[#FBFBFA] border border-gray-100 rounded-full flex items-center justify-between px-1 w-[130px]">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center rounded-full text-black hover:bg-white hover:shadow-sm transition-all"><Minus size={12} strokeWidth={1.5} /></button>
                        <span className="text-[12px] font-bold text-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center rounded-full text-black hover:bg-white hover:shadow-sm transition-all"><Plus size={12} strokeWidth={1.5} /></button>
                      </div>
                      
                      <div className="text-right">
                         <span className="text-2xl font-light text-black tracking-tight leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all pt-12 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Hardware
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-10 rounded-sm sticky top-[160px] space-y-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)]">
              <div className="space-y-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b border-gray-100 pb-4">Order Manifest</h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="text-sm font-medium text-black">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Shipping</span>
                    <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] bg-[#FBFBFA] px-3 py-1 rounded-full border border-gray-50">Complimentary</span>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-gray-100 space-y-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Total Amount</span>
                  <span className="text-5xl font-light text-black tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    className="group relative w-full h-16 bg-black text-white rounded-full flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-4 text-gray-300">
                    <ShieldCheck size={16} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Checkout Active</span>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="flex items-center justify-center gap-8 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
