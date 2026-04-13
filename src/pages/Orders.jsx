import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { Package, Truck, CheckCircle2, Clock, Search, MapPin, Calendar, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setError(null);
    try {
      const url = email 
        ? `${API_BASE_URL}/orders?email=${email}`
        : `${API_BASE_URL}/orders?user_id=${user?.id}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch order history.");
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
    else setLoading(false);
  }, []);

  const handleTrackRequest = (e) => {
    e.preventDefault();
    if (!searchEmail.trim()) return;
    setSearching(true);
    fetchOrders(searchEmail.trim());
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'bg-green-50 text-green-600 border-green-100';
    if (s === 'processing' || s === 'pending') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (s === 'shipped') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return <CheckCircle2 size={12} />;
    if (s === 'processing' || s === 'pending') return <Clock size={12} />;
    if (s === 'shipped') return <Truck size={12} />;
    return <Package size={12} />;
  };

  return (
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO title="Track Your Orders | Print Ease" description="Monitor your professional printer orders and shipment status." />

      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Order Tracking</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Order <span className="text-blue-600">History</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              Keep track of your printer orders and see exactly where your package is right now.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20 py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* --- GUEST TRACKING SEARCH --- */}
          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-16 p-8 md:p-12 border border-slate-200"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-md text-center lg:text-left">
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Track as Guest</h3>
                   <p className="text-slate-500 text-sm font-medium">Enter your email address to find your order status.</p>
                </div>
                <form onSubmit={handleTrackRequest} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required type="email" placeholder="name@example.com"
                      value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 border border-slate-200 outline-none focus:border-blue-600 text-sm font-medium transition-all"
                    />
                  </div>
                  <button
                    disabled={searching}
                    className="h-12 px-10 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50"
                  >
                    {searching ? <Clock className="animate-spin" size={18} /> : "Track Now"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- ORDERS LIST --- */}
          <div className="space-y-8 min-h-[40vh]">
            {loading ? (
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="h-48 w-full bg-slate-50 animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-slate-100"
              >
                <Package size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No orders found</h3>
                <p className="text-slate-500 mb-8">You haven't placed any orders yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-100">
                  Shop Now <ShoppingBag size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, idx) => (
                  <div 
                    key={order.id}
                    className="bg-white border border-slate-200 p-6 md:p-10 transition-all hover:border-blue-400"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
                      <div className="flex items-center gap-6">
                         <div className="h-16 w-16 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Package size={32} />
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{order.order_code || `#${order.id}`}</span>
                               <span className="h-1 w-1 bg-slate-300 rounded-full" />
                               <span className="text-[11px] font-medium text-slate-400">{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-900">Order Information</h4>
                         </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-6 md:text-right">
                         <div className={cn("px-4 py-1.5 border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", getStatusColor(order.status))}>
                            {getStatusIcon(order.status)}
                            {order.status}
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Amount</p>
                            <p className="text-2xl font-bold text-slate-900">${parseFloat(order.total_amount || order.total_price || 0).toLocaleString()}</p>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                       {order.items?.map((item, i) => (
                          <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                             {item.product_name} <span className="text-slate-400 ml-2">x{item.quantity}</span>
                          </div>
                       ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
                       <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-slate-400" />
                          <p className="text-sm font-medium text-slate-600 truncate max-w-xs">{order.shipping_address}</p>
                       </div>
                       <button 
                        onClick={() => setSelectedOrder(order)}
                        className="w-full sm:w-auto px-8 py-3 bg-white border border-slate-900 text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                       >
                          View Details
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedOrder && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedOrder(null)}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white z-[210] flex flex-col"
                >
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
                    <h3 className="text-xl font-bold text-slate-900">Order Details</h3>
                    <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 text-slate-400 hover:text-slate-900 transition-all">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    <div className="flex items-center justify-between p-6 bg-blue-50 border border-blue-100">
                       <div>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Status</p>
                          <p className="text-lg font-bold text-slate-900 capitalize">{selectedOrder.status}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Code</p>
                          <p className="text-lg font-bold text-slate-900">{selectedOrder.order_code || `#${selectedOrder.id}`}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Order Items</h4>
                       <div className="border border-slate-100">
                          {selectedOrder.items?.map((item, i) => (
                             <div key={i} className="flex justify-between p-4 border-b border-slate-100 last:border-0">
                                <span className="text-sm font-semibold text-slate-800">{item.product_name}</span>
                                <span className="text-sm font-bold text-slate-900">${parseFloat(item.price).toLocaleString()} x {item.quantity}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Shipping To</h4>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">{selectedOrder.shipping_address}</p>
                       </div>
                       <div className="md:text-right">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Order Total</h4>
                          <p className="text-3xl font-bold text-blue-600">${parseFloat(selectedOrder.total_amount || selectedOrder.total_price || 0).toLocaleString()}</p>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100 bg-slate-50">
                     <button onClick={() => setSelectedOrder(null)} className="w-full py-4 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-600 transition-all">
                        Close Details
                     </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="mt-16 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold text-sm uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
              <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
