import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Package,
  Loader2,
  Zap,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zip: '',
    country: 'USA'
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [orderStatus, setStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    const isValid = formData.name && formData.email && formData.address && formData.city && formData.zip && formData.phone;
    setIsFormValid(!!isValid);
  }, [formData]);

  useEffect(() => {
    if (cart.length === 0 && !orderStatus) {
      navigate('/shop');
    }
  }, [cart, orderStatus, navigate]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    
    const orderData = {
      user_id: user?.id || null,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`,
      total_price: cartTotal,
      payment_status: 'paid',
      payment_id: details.id,
      status: 'processing',
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setStatus('success');
        clearCart();
      }
    } catch (err) {
      console.error("Order recording error:", err);
      setStatus('success'); // Still show success since payment was taken
      clearCart();
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="bg-white min-h-screen font-jakarta flex items-center justify-center p-4">
        <SEO title="Procurement Successful" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white border border-slate-100 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl shadow-blue-500/10"
        >
          <div className="h-24 w-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-blue-500/30">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">Units Dispatched.</h1>
          <p className="text-slate-500 text-lg font-bold leading-relaxed mb-12 max-w-md mx-auto">
            Your procurement request has been processed. A tracking reference will be sent to your email shortly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/orders" className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                Track Delivery
             </Link>
             <Link to="/" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                Back to Terminal
             </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Checkout Procurement | Lux Printers" />

      {/* --- MINIMAL PROGRESS HEADER --- */}
      <section className="pt-28 md:pt-36 pb-12 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <Link to="/cart" className="group flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[2px] transition-all">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Cart
           </Link>
           <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 opacity-40">
                 <div className="h-6 w-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">1</div>
                 <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Summary</span>
              </div>
              <div className="h-[1px] w-8 bg-slate-100" />
              <div className="flex items-center gap-2">
                 <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">2</div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Procurement</span>
              </div>
              <div className="h-[1px] w-8 bg-slate-100" />
              <div className="flex items-center gap-2 opacity-40">
                 <div className="h-6 w-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">3</div>
                 <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Dispatch</span>
              </div>
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 md:gap-24">
            
            {/* --- LEFT: LOGISTICS & DATA --- */}
            <div className="xl:col-span-7 space-y-16">
               
               {/* Identity Section */}
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        <User size={20} />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Personal Identification</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Full Name</label>
                        <input 
                          required type="text" placeholder="John Doe"
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Work Email</label>
                        <input 
                          required type="email" placeholder="name@company.com"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                        />
                     </div>
                  </div>
               </div>

               {/* Shipping Section */}
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        <MapPin size={20} />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Delivery Node</h3>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Street Address</label>
                        <input 
                          required type="text" placeholder="2300 Lakeland Dr"
                          value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                        />
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">City</label>
                           <input 
                             required type="text" placeholder="Flowood"
                             value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                             className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Zip Code</label>
                           <input 
                             required type="text" placeholder="39232"
                             value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})}
                             className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                           />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                           <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Phone</label>
                           <input 
                             required type="tel" placeholder="+1 (000) 000-0000"
                             value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Logistics Info Card */}
               <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                        <Truck size={24} className="text-blue-500" />
                        Professional Dispatch
                     </h3>
                     <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-md">
                        Your units will be prioritized for expedited handling. All procurements include standard mechanical transit protection.
                     </p>
                     <div className="flex items-center gap-6 opacity-60">
                        <div className="flex items-center gap-2">
                           <ShieldCheck size={16} className="text-blue-400" />
                           <span className="text-[10px] font-black uppercase tracking-[2px]">Fully Insured</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <span className="text-[10px] font-black uppercase tracking-[3px]">USA Standard Delivery</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* --- RIGHT: PROCUREMENT SUMMARY & PAYMENT --- */}
            <div className="xl:col-span-5">
               <div className="sticky top-32 space-y-8">
                  <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-50 pb-6">Final Summary</h3>
                     
                     <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-10">
                        {cart.map((item) => (
                           <div key={item.id} className="flex items-center gap-5">
                              <div className="h-14 w-14 bg-white border border-slate-100 rounded-xl p-2 shrink-0">
                                 <img 
                                   src={item.images ? `/${typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]}` : "https://via.placeholder.com/100"} 
                                   alt="" className="w-full h-full object-contain" 
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight truncate">{item.name}</h4>
                                 <p className="text-[10px] font-black text-blue-600 mt-0.5">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-sm font-black text-slate-900">
                                 ${(parseFloat(item.price) * item.quantity).toLocaleString()}
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-4 mb-10 bg-slate-50 p-6 rounded-2xl">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                           <span>Units Value</span>
                           <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                           <span>Logistics</span>
                           <span className="text-emerald-600 font-black">Free</span>
                        </div>
                        <div className="h-[1px] w-full bg-slate-200 my-2" />
                        <div className="flex justify-between items-end">
                           <div className="space-y-0.5">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">Total Payable</p>
                              <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none">${(cartTotal || 0).toLocaleString()}</h4>
                           </div>
                        </div>
                     </div>

                     {/* PayPal Integration */}
                     <div className={cn("space-y-4 transition-all duration-500", !isFormValid && "opacity-40 pointer-events-none")}>
                        {!isFormValid && (
                           <div className="p-4 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-amber-100 flex items-center gap-2">
                              <Info size={14} />
                              Complete Logistics Details Above
                           </div>
                        )}
                        <PayPalButtons 
                          style={{ layout: "vertical", shape: "rect", label: "pay" }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                        />
                     </div>

                     <div className="mt-8 flex items-center justify-center gap-4 opacity-40">
                        <ShieldCheck size={16} className="text-blue-600" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Secured Node Terminal</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ size }) {
   return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
   );
}
