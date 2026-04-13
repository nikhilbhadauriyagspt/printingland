import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

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
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white z-[210] flex flex-col shadow-2xl font-['Poppins']"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h3 className="text-lg font-bold text-slate-900">Your Cart</h3>
                  <p className="text-xs font-medium text-slate-400">{cartCount} Items Selected</p>
               </div>
               <button 
                 onClick={closeCartDrawer}
                 className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 bg-slate-50 flex items-center justify-center mb-6">
                     <ShoppingBag size={32} className="text-slate-200" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Cart is empty</h4>
                  <p className="text-slate-500 text-sm mb-8">Add items to get started with your purchase.</p>
                  <button 
                    onClick={() => { closeCartDrawer(); navigate('/shop'); }}
                    className="px-8 py-3 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-4 p-4 border border-slate-100 transition-all hover:border-blue-200"
                    >
                      <div className="h-20 w-20 shrink-0 flex items-center justify-center bg-white">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                           <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight uppercase">{item.name}</h4>
                           <button 
                             onClick={() => removeFromCart(item.id)}
                             className="text-slate-300 hover:text-red-500 transition-all shrink-0"
                           >
                             <Trash2 size={14} />
                           </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                           <p className="text-sm font-bold text-slate-900">${parsePrice(item.price).toLocaleString()}</p>
                           <div className="flex items-center gap-3 border border-slate-200 p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all"
                              >
                                <Plus size={12} />
                              </button>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-bold">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                   <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-50">
                      <span>Total Amount</span>
                      <span className="text-blue-600">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                   <button 
                     onClick={handleCheckout}
                     className="w-full h-12 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95"
                   >
                     Checkout Now
                   </button>
                   <Link 
                     to="/cart" 
                     onClick={closeCartDrawer}
                     className="w-full h-12 bg-white border border-slate-900 text-slate-900 font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"
                   >
                     View Detail Cart
                   </Link>
                </div>

                <div className="flex items-center justify-center gap-6 pt-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-blue-600" />
                      Secured
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Truck size={14} className="text-blue-600" />
                      Free Shipping
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
