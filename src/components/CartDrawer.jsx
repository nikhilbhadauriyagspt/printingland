import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Subtle Glassmorphic Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[1000]"
          />

          {/* Premium Float & Scale Drawer */}
          <motion.div
            initial={{ x: '20%', opacity: 0, scale: 0.95, rotateY: -10 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ x: '20%', opacity: 0, scale: 0.95, rotateY: -10 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{ perspective: '1000px' }}
            className="fixed top-4 right-4 bottom-4 w-[calc(100%-32px)] max-w-[480px] bg-white z-[1001] flex flex-col font-jakarta shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-gray-50">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 block">Your Selection</span>
                <h2 className="text-2xl font-light uppercase tracking-tight text-black">Shopping <span className="font-semibold italic">Bag</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center rounded-full text-gray-400 hover:text-black hover:bg-gray-50 transition-all group"
              >
                <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-8 relative"
                    >
                      {/* Image Container */}
                      <div className="h-32 w-32 bg-[#FBFBFA] rounded-sm flex items-center justify-center flex-shrink-0 p-4 overflow-hidden relative group-hover:bg-[#F5F5F3] transition-colors duration-500">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.brand_name || 'Premium'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-gray-300 hover:text-black transition-colors p-1"
                              title="Remove Item"
                            >
                              <X size={14} strokeWidth={2} />
                            </button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[14px] font-medium text-black leading-snug line-clamp-2 hover:text-gray-500 transition-colors uppercase tracking-tight">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center border border-gray-100 rounded-full h-9 px-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-black transition-colors"><Minus size={12} /></button>
                            <span className="text-[12px] font-bold w-6 text-center text-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-black transition-colors"><Plus size={12} /></button>
                          </div>
                          <span className="text-base font-light text-black tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="h-24 w-24 bg-[#FBFBFA] rounded-full flex items-center justify-center border border-gray-50">
                    <ShoppingCart size={32} strokeWidth={1} className="text-gray-200" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-light uppercase tracking-widest text-black">Your bag is empty</h3>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Discover our premium printer collection</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="group relative inline-flex items-center gap-4 bg-black text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl active:scale-95"
                  >
                    <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
                    <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 space-y-8 bg-white border-t border-gray-100">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] block">Estimated Total</span>
                     <span className="text-4xl font-light text-black tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-black/40">
                    <Package size={14} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{cartCount} Items</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="group relative w-full inline-flex items-center justify-center gap-6 bg-black text-white h-16 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95"
                  >
                    <span className="relative z-10 text-[12px] font-bold uppercase tracking-[0.3em]">Continue to Checkout</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <button 
                    onClick={closeCartDrawer}
                    className="w-full text-center py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
