import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, Send, MapPin, Phone, ChevronDown, MessageSquare, Sparkles, HeadphonesIcon } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="Contact Us | Iconic Printers" 
        description="Connect with Iconic Printers for support and inquiries about our printers."
      />
      
      {/* --- PROFESSIONAL HEADER --- */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-white border-b border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Get in Touch</span>
             </div>
             <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-black  leading-none">
                  <span className="text-slate-900">Contact</span> <span className="text-blue-600 relative">Support
                    <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">
                  Our dedicated specialist team is available to assist with technical specifications, logistics, and account support.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: INFO & CONTACT CARDS */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Communication Channels</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Select your preferred method of contact. Our systems ensure your inquiry is routed to the correct specialist immediately.
                </p>
              </div>
                
              <div className="grid gap-4">
                {[
                  { icon: <Mail size={20} />, label: "Email Support", val: "info@iconicprinters.shop", link: "mailto:info@iconicprinters.shop" },
                  { icon: <MapPin size={20} />, label: "Headquarters", val: "8560 Florida Blvd, Baton Rouge, LA 70815, USA", link: "#" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-white border border-slate-100 rounded-2xl group hover:border-blue-100 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-500">
                    <div className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all text-slate-400">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">{item.label}</p>
                       {item.link !== "#" ? (
                         <a href={item.link} className="text-[13px] font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">{item.val}</a>
                       ) : (
                         <p className="text-[13px] font-bold text-slate-900 leading-tight">{item.val}</p>
                       )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Banner */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/30 transition-colors" />
                 <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                       <HeadphonesIcon size={18} />
                       <span className="text-[10px] font-black uppercase tracking-[2px]">Availability</span>
                    </div>
                    <h4 className="text-xl font-black">24/7 Monitoring</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                       Our technical monitoring systems are active 24/7. Human support response times currently average under 4 hours.
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-6 md:p-12 lg:p-16 rounded-[3rem] border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/40">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-20 w-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20 rotate-3">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-4 ">Transmission Successful</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Your inquiry has been logged in our system. A specialist will be assigned to your case shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[3px] transition-all hover:bg-blue-600 shadow-xl active:scale-95"
                      >
                        New Submission
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Full Identity</label>
                          <input 
                            required type="text" placeholder="e.g. Alexander Hamilton" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Email Address</label>
                          <input 
                            required type="email" placeholder="name@company.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Contact Number</label>
                          <input 
                            type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Inquiry Subject</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all appearance-none cursor-pointer"
                            >
                              <option>General Inquiry</option>
                              <option>Industrial Printer Specs</option>
                              <option>Shipping & Logistics</option>
                              <option>Technical Support</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Detailed Message</label>
                        <textarea 
                          required rows="5" placeholder="Specify your requirements or describe the technical issue..." value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all resize-none min-h-[180px] placeholder:text-slate-300"
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <button 
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-slate-900 text-white h-16 px-14 rounded-2xl font-black text-[11px] uppercase tracking-[3px] transition-all hover:bg-blue-600 shadow-xl active:scale-[0.98] disabled:opacity-50 group"
                        >
                          {loading ? <Loader2 size={20} className="animate-spin" /> : "Dispatch Message"}
                          {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-[10px] font-black uppercase tracking-[2px] mt-6">Transmission failure. Internal server error. Please retry.</p>}
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
