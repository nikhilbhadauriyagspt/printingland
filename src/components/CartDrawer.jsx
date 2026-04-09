import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Package, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
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

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white z-[210] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                     <ShoppingBag size={18} className="text-blue-600" />
                     <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em]">Procurement</h3>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[1px] ml-7">Staged Units: {cartCount}</p>
               </div>
               <button 
                 onClick={closeCartDrawer}
                 className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                     <Package size={32} className="text-slate-200" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">Cart is Empty</h4>
                  <p className="text-slate-500 font-medium text-xs mb-8 max-w-[200px]">Your procurement staging area is currently clear.</p>
                  <button 
                    onClick={() => { closeCartDrawer(); navigate('/shop'); }}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl"
                  >
                    Explore Inventory
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex gap-5 p-4 bg-white border border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100 transition-all duration-500"
                    >
                      <div className="h-20 w-20 bg-slate-50 rounded-2xl p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                           <h4 className="text-[11px] font-black text-slate-800 uppercase line-clamp-1 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                           <p className="text-[12px] font-black text-slate-900 mt-1">${parsePrice(item.price).toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center gap-3 p-1 bg-slate-50 rounded-lg border border-slate-100">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-[11px] font-black text-slate-900 min-w-[15px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                              >
                                <Plus size={12} />
                              </button>
                           </div>
                           
                           <button 
                             onClick={() => removeFromCart(item.id)}
                             className="text-slate-300 hover:text-red-500 transition-all"
                           >
                             <Trash2 size={14} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="space-y-3 mb-6">
                   <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Logistics</span>
                      <span className="text-emerald-600 font-black">Free</span>
                   </div>
                   <div className="h-[1px] w-full bg-slate-50 my-2" />
                   <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">Procurement Value</p>
                         <h4 className="text-2xl font-black text-slate-900 leading-none">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-2.5">
                   <button 
                     onClick={handleCheckout}
                     className="w-full h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl group active:scale-[0.98]"
                   >
                     Complete Checkout
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <Link 
                     to="/cart" 
                     onClick={closeCartDrawer}
                     className="w-full h-12 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-[2px] hover:bg-slate-50 transition-all"
                   >
                     View Full Cart
                   </Link>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 opacity-40">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-blue-600" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Secured</span>
                   </div>
                   <div className="h-3 w-[1px] bg-slate-200" />
                   <div className="flex items-center gap-2">
                      <ShoppingBag size={14} className="text-blue-600" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Direct</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
