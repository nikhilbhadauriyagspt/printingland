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
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

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
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO title="Your Shopping Cart | Print Ease" description="Review your selected items before completing your purchase." />

      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Your Selection</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Shopping <span className="text-blue-600">Cart</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              You have {cartCount} items in your cart. Review your selection before you checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-slate-100 max-w-4xl mx-auto px-8"
              >
                <div className="h-20 w-20 bg-slate-50 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={40} className="text-slate-200" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-10">Add some products to your cart to see them here.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95">
                  Start Shopping <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                
                {/* --- LEFT: ITEMS LIST --- */}
                <div className="xl:col-span-8 space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="p-6 border border-slate-200 flex flex-col sm:flex-row items-center gap-8 transition-all hover:border-blue-400"
                    >
                      {/* Image */}
                      <div className="h-32 w-32 md:h-40 md:w-40 shrink-0 flex items-center justify-center bg-white">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 w-full space-y-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <h4 className="text-base font-bold text-slate-900 capitalize">
                            {item.name}
                          </h4>
                          <p className="text-lg font-bold text-slate-900">
                             ${(parsePrice(item.price) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-4 border border-slate-200 p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider transition-all"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* --- RIGHT: SUMMARY --- */}
                <div className="xl:col-span-4 sticky top-32">
                  <div className="p-8 border border-slate-200 space-y-8 bg-white">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4">Order Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium text-slate-500">
                        <span>Subtotal</span>
                        <span className="text-slate-900 font-bold">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-slate-500">
                        <span>Shipping</span>
                        <span className="text-green-600 font-bold">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
                        <span>Total</span>
                        <span className="text-blue-600">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate('/checkout')}
                      className="w-full h-14 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95"
                    >
                      Checkout Now
                    </button>

                    <div className="space-y-4 pt-4">
                       <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <ShieldCheck size={18} className="text-blue-600" />
                          Secure SSL Checkout
                       </div>
                       <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <Truck size={18} className="text-blue-600" />
                          Fast Shipping across USA
                       </div>
                    </div>
                  </div>

                  <Link to="/shop" className="flex items-center justify-center gap-2 mt-8 text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all">
                    <ChevronLeft size={16} />
                    Back to Shopping
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
