import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ArrowRight, Search, Printer, MapPin, Calendar, ShoppingBag, X, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

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
    if (s === 'delivered' || s === 'completed') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Track Orders | Iconic Printers" description="Monitor your professional printer orders and shipment status." />

      {/* --- PROFESSIONAL HEADER --- */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-white border-b border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Logistics Tracking</span>
             </div>
             <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-black  leading-none">
                  <span className="text-slate-900">Order</span> <span className="text-blue-600 relative">History
                    <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">
                  Monitor the status of your procurement and track your machine shipments in real-time.
                </p>
             </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 md:px-10 lg:px-16 py-12 md:py-20 max-w-[1920px] mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* --- GUEST TRACKING SEARCH --- */}
          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-16 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-100"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-md text-center lg:text-left">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">Guest Tracking</h3>
                   <p className="text-slate-500 font-medium text-sm">Enter the email used during procurement to view your unit status.</p>
                </div>
                <form onSubmit={handleTrackRequest} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input
                      required type="email" placeholder="order@company.com"
                      value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-14 pr-6 text-sm font-bold outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                  <button
                    disabled={searching}
                    className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 shrink-0"
                  >
                    {searching ? <Clock className="animate-spin" size={18} /> : "Track Units"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- ORDERS LIST --- */}
          <div className="space-y-8 min-h-[40vh]">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 w-full bg-slate-50 rounded-[2.5rem] animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="h-20 w-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Package size={32} className="text-slate-200" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider mb-2">No Active Records</h3>
                <p className="text-slate-500 font-medium mb-10">No professional unit orders associated with this account.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                  Browse Inventory <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, idx) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-blue-100 transition-all duration-700"
                  >
                    <div className="p-8 md:p-10">
                      {/* Top Meta */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
                        <div className="flex items-center gap-6">
                           <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                              <Package size={28} />
                           </div>
                           <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Node</p>
                                 <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded-md">{order.order_code || `#${order.id}`}</span>
                              </div>
                              <h4 className="text-lg font-black text-slate-900 uppercase leading-none truncate">Procurement Package</h4>
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6">
                           <div className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2", getStatusColor(order.status))}>
                              {getStatusIcon(order.status)}
                              {order.status}
                           </div>
                           <div className="flex flex-col items-end">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</span>
                              <span className="text-xl font-black text-slate-900 ">${parseFloat(order.total_amount || order.total_price || 0).toLocaleString()}</span>
                           </div>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                         {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                               <div className="flex-1 min-w-0">
                                  <h5 className="text-[11px] font-black text-slate-800 uppercase truncate mb-1">{item.product_name}</h5>
                                  <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Qty: {item.quantity}</span>
                                     <div className="h-1 w-1 rounded-full bg-slate-300" />
                                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Industrial Spec</span>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Bottom Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-50">
                         <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-slate-300" />
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Dispatch Date</p>
                               <p className="text-xs font-bold text-slate-700">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-slate-300" />
                            <div className="min-w-0">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Delivery Terminal</p>
                               <p className="text-xs font-bold text-slate-700 truncate">{order.shipping_address}</p>
                            </div>
                         </div>
                         <div className="flex items-center sm:justify-end">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="flex items-center gap-2 py-3 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-600 shadow-lg active:scale-95 group/btn"
                            >
                               Track Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
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
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
                >
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-900 uppercase">Unit Status</h3>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedOrder.order_code || `#${selectedOrder.id}`}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                    {/* Status Steps */}
                    <div className="relative">
                       <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-100" />
                       <div className="space-y-8 relative">
                          {[
                            { label: 'Order Received', desc: 'Procurement logged in terminal', icon: Package, status: 'completed' },
                            { label: 'Unit Inspection', desc: 'Technical configuration & QA', icon: Zap, status: selectedOrder.status?.toLowerCase() === 'pending' ? 'current' : 'completed' },
                            { label: 'Logistics Handover', desc: 'Dispatched to transit network', icon: Truck, status: ['shipped', 'delivered'].includes(selectedOrder.status?.toLowerCase()) ? 'completed' : selectedOrder.status?.toLowerCase() === 'processing' ? 'current' : 'pending' },
                            { label: 'Terminal Delivery', desc: 'Unit secured at destination', icon: CheckCircle2, status: selectedOrder.status?.toLowerCase() === 'delivered' ? 'completed' : selectedOrder.status?.toLowerCase() === 'shipped' ? 'current' : 'pending' }
                          ].map((step, i) => (
                            <div key={i} className="flex gap-6">
                               <div className={cn(
                                 "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 z-10 border shadow-sm transition-all duration-500",
                                 step.status === 'completed' ? "bg-emerald-500 text-white border-emerald-500" :
                                 step.status === 'current' ? "bg-blue-600 text-white border-blue-600 animate-pulse" :
                                 "bg-white text-slate-300 border-slate-100"
                               )}>
                                  <step.icon size={20} />
                               </div>
                               <div className="py-1">
                                  <h5 className={cn("text-sm font-black uppercase ", step.status === 'pending' ? "text-slate-300" : "text-slate-900")}>{step.label}</h5>
                                  <p className="text-xs font-bold text-slate-400 mt-0.5">{step.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                       <div className="flex gap-4">
                          <MapPin size={20} className="text-blue-600 shrink-0" />
                          <div className="space-y-1">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Destination Node</p>
                             <p className="text-sm font-bold text-slate-900 leading-tight">{selectedOrder.shipping_address}</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 border-l-2 border-blue-600 pl-4 ml-[-32px]">Procured Inventory</h4>
                       {selectedOrder.items?.map((item, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
                            <div className="flex-1 min-w-0">
                               <p className="text-[11px] font-black text-slate-800 uppercase truncate">{item.product_name}</p>
                               <p className="text-[10px] font-bold text-blue-600 mt-0.5">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-[13px] font-black text-slate-900">${parseFloat(item.price || 0).toLocaleString()}</p>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100 bg-white flex items-center justify-between">
                     <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Valuation</p>
                        <p className="text-2xl font-black text-slate-900 ">${parseFloat(selectedOrder.total_amount || selectedOrder.total_price || 0).toLocaleString()}</p>
                     </div>
                     <button onClick={() => setSelectedOrder(null)} className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                        Close Log
                     </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="mt-20 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-4 px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
              <ShoppingBag size={18} />
              Continue Procurement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
