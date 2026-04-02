import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ArrowRight, Search, Printer, MapPin, Calendar, ShoppingBag, Layers, Zap, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
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
      <SEO title="Track Orders | Lux Printers" description="Monitor your professional hardware orders and shipment status." />

      {/* --- PURE WHITE CENTERED HEADER --- */}
      <section className="pt-28 md:pt-40 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <Truck size={12} className="text-blue-600 fill-current" />
            Logistics Tracking
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Order <span className="text-blue-600">History.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto">
            Monitor the status of your procurement and track your machine shipments in real-time.
          </p>
        </div>
      </section>

      <div className="w-full px-4 md:px-10 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* --- GUEST TRACKING SEARCH --- */}
          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-16 p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-md text-center md:text-left">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">Guest Access</h3>
                   <p className="text-slate-400 font-bold text-sm">Enter the email address used during procurement to view your order status.</p>
                </div>
                <form onSubmit={handleTrackRequest} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input
                      required type="email" placeholder="order@company.com"
                      value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                    />
                  </div>
                  <button
                    disabled={searching}
                    className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 shrink-0"
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
                  <div key={i} className="h-48 w-full bg-slate-50 rounded-3xl animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                   <Package size={32} className="text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">No Active Records</h3>
                <p className="text-slate-400 font-bold mb-10">We couldn't find any professional unit orders associated with this account.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                  Browse Inventory <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, idx) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-700"
                  >
                    <div className="p-8 md:p-10">
                      {/* Top Meta */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
                        <div className="flex items-center gap-6">
                           <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                              <Package size={28} />
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                                 <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded-md">{order.order_code || `#${order.id}`}</span>
                              </div>
                              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">Procurement Unit</h4>
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                           <div className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2", getStatusColor(order.status))}>
                              {getStatusIcon(order.status)}
                              {order.status}
                           </div>
                           <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
                           <div className="flex flex-col items-end">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unit Value</span>
                              <span className="text-xl font-black text-slate-900 tracking-tight">${parseFloat(order.total_price).toLocaleString()}</span>
                           </div>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                         {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                               <div className="h-16 w-16 bg-white border border-slate-100 rounded-xl p-2 shrink-0">
                                  <img 
                                    src={item.product?.images ? `/${JSON.parse(item.product.images)[0]}` : "https://via.placeholder.com/100"} 
                                    alt="" className="w-full h-full object-contain" 
                                  />
                               </div>
                               <div className="flex-1 min-w-0">
                                  <h5 className="text-[12px] font-black text-slate-800 uppercase tracking-tight truncate mb-1">{item.product_name}</h5>
                                  <div className="flex items-center gap-3">
                                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Qty: {item.quantity}</span>
                                     <div className="h-1 w-1 rounded-full bg-slate-300" />
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Model</span>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Timeline / Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-50">
                         <div className="flex items-center gap-3">
                            <Calendar size={16} className="text-slate-300" />
                            <div>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Procurement Date</p>
                               <p className="text-xs font-bold text-slate-700">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-slate-300" />
                            <div className="min-w-0">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Delivery Node</p>
                               <p className="text-xs font-bold text-slate-700 truncate">{order.shipping_address}</p>
                            </div>
                         </div>
                         <div className="flex items-center sm:justify-end">
                            <button className="flex items-center gap-2 py-3 px-6 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group/btn">
                               View Specs <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-24 pt-12 border-t border-slate-50 flex justify-center">
            <Link to="/shop" className="group inline-flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[3px] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm active:scale-95">
              <ShoppingBag size={18} />
              Procure More Units
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
