import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your printer is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your printer will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to you.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] pt-40 pb-20 font-jakarta px-6 flex flex-col items-center justify-center text-black">
        <SEO title="Track Order | Mike's Printer" />
        <div className="max-w-[440px] w-full">
          <div className="text-center mb-12 space-y-4">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 block">Status Check</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-light uppercase tracking-tight">Track <span className="font-semibold italic">Order</span></motion.h1>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 md:p-12 border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] rounded-sm">
            <form onSubmit={handleGuestSearch} className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    type="email" required placeholder="YOUR EMAIL" value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[12px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-widest"
                  />
                </div>
              </div>
              <button className="group relative w-full inline-flex items-center justify-center gap-4 bg-black text-white h-14 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl active:scale-95">
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Find Order</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
              <Link to="/login" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-black transition-colors">Sign in for full history</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-black overflow-x-hidden">
      <SEO title="Order History | Mike's Printer" />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block">Customer Portal</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight">My <span className="font-semibold italic">Orders</span></motion.h1>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="w-20 h-[1px] bg-black mx-auto mt-8" />
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-8 w-8 text-gray-200 mb-6" strokeWidth={1.5} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Syncing History...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-[#FBFBFA] rounded-sm border border-gray-50">
            <Package size={48} strokeWidth={1} className="mx-auto text-gray-200 mb-6" />
            <h2 className="text-lg font-light uppercase tracking-widest">No orders found</h2>
            <Link to="/shop" className="mt-10 bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-gray-800 inline-flex items-center gap-4 group">
              Browse Shop <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden group hover:border-black/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
              >
                {/* Meta Header */}
                <div className="p-6 md:p-10 border-b border-gray-50 flex flex-wrap items-center justify-between gap-8 bg-[#FBFBFA]/50">
                  <div className="flex flex-wrap items-center gap-10 md:gap-16">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Order Ref</p>
                      <h3 className="text-sm font-bold text-black tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date</p>
                      <p className="text-sm font-medium text-black">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total</p>
                      <p className="text-lg font-light text-black tracking-tight">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border",
                    order.status === 'delivered' ? "bg-black text-white border-black" : "bg-white text-black border-gray-200"
                  )}>
                    {order.status}
                  </div>
                </div>

                {/* Items & Track */}
                <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 space-y-8">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group/item">
                        <div className="h-20 w-20 bg-[#FBFBFA] rounded-sm border border-gray-50 flex items-center justify-center p-4 shrink-0 group-hover/item:bg-white transition-all overflow-hidden relative">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-semibold text-black uppercase tracking-wide truncate mb-1">{item.product_name}</h4>
                          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Qty: {item.quantity} â€¢ ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[320px] shrink-0">
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="w-full h-14 bg-black text-white rounded-full flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all hover:shadow-xl active:scale-95 group"
                    >
                      Live Tracking
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-lg bg-white z-[1001] shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-sm p-10 md:p-16 font-jakarta border border-gray-100"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Order Journey</span>
                     <h2 className="text-2xl font-light uppercase tracking-tight text-black">Live <span className="font-semibold italic">Status</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 flex items-center justify-center bg-[#FBFBFA] rounded-full text-gray-400 hover:text-black transition-all border border-gray-50"><X size={20} strokeWidth={1.5} /></button>
                </div>
                
                <div className="space-y-12 relative px-2">
                  <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-10">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-1000 border", isCompleted ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white text-gray-200 border-gray-100')}>
                          <Icon size={14} strokeWidth={2} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h4 className={cn("text-[12px] font-bold uppercase tracking-widest", isCompleted ? 'text-black' : 'text-gray-300')}>{step.label}</h4>
                          <p className={cn("text-[11px] font-medium mt-1 leading-relaxed", isCompleted ? 'text-gray-500' : 'text-gray-200')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-black border-t border-gray-50 transition-all">Dismiss Tracking</button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-24 pt-12 border-t border-gray-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
