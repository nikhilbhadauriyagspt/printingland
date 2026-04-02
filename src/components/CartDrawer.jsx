import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Package, ShieldCheck, Zap } from 'lucide-react';
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
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                     <ShoppingBag size={20} className="text-blue-600" />
                     <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Procurement</h3>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Selected Units: {cartCount}</p>
               </div>
               <button 
                 onClick={closeCartDrawer}
                 className="relative z-10 h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90 shadow-sm"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="h-24 w-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8">
                     <Package size={40} className="text-slate-200" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">Cart is Empty</h4>
                  <p className="text-slate-400 font-bold text-sm mb-10 max-w-[200px]">No professional units have been staged for procurement yet.</p>
                  <button 
                    onClick={() => { closeCartDrawer(); navigate('/shop'); }}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl"
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
                      className="group flex gap-5 p-4 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:border-blue-100 transition-all duration-500"
                    >
                      <div className="h-20 w-20 bg-slate-50 rounded-2xl p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                           <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                           <p className="text-[12px] font-black text-slate-900 mt-1">${parsePrice(item.price).toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center gap-3 p-1 bg-slate-50 rounded-lg border border-slate-100">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-[11px] font-black text-slate-900 min-w-[15px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
                              >
                                <Plus size={12} />
                              </button>
                           </div>
                           
                           <button 
                             onClick={() => removeFromCart(item.id)}
                             className="h-8 w-8 rounded-xl bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
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
              <div className="p-8 border-t border-slate-50 bg-white">
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Staged Units Value</span>
                      <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Logistics Node</span>
                      <span className="text-emerald-600 font-black">Free Standard</span>
                   </div>
                   <div className="h-[1px] w-full bg-slate-50 my-2" />
                   <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">Total Procurement</p>
                         <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                   <button 
                     onClick={handleCheckout}
                     className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl group"
                   >
                     Complete Checkout
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <Link 
                     to="/cart" 
                     onClick={closeCartDrawer}
                     className="w-full h-14 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-[2px] hover:bg-slate-50 transition-all"
                   >
                     View Procurement Cart
                   </Link>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-blue-600" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Secured Terminal</span>
                   </div>
                   <div className="h-4 w-[1px] bg-slate-200" />
                   <div className="flex items-center gap-2">
                      <Zap size={14} className="text-blue-600" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Rapid Dispatch</span>
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
