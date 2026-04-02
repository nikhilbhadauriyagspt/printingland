import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, Send, MapPin, Phone,ChevronDown, MessageSquare, Sparkles } from 'lucide-react';
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
        title="Contact Us | Lux Printers" 
        description="Connect with Lux Printers for support and inquiries about our printers."
      />
      
      {/* --- PURE WHITE CENTERED HEADER --- */}
      <section className="pt-28 md:pt-40 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <Sparkles size={12} className="text-blue-600 fill-current" />
            Get in Touch
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900  leading-none mb-6">
            Contact <span className="text-blue-600">Support.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto">
            Our team is available to assist with printer models, ink compatibility, and your orders.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT: INFO CARDS */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase ">Direct Access</h3>
                <p className="text-slate-400 text-sm font-bold leading-relaxed">
                  Reach out through our channels for assistance with your machines and supplies.
                </p>
              </div>
                
              <div className="grid gap-4">
                {[
                  { icon: <Mail size={18} />, label: "Email Support", val: "info@luxprinters.shop", link: "mailto:info@luxprinters.shop" },
                  { icon: <MapPin size={18} />, label: "Location", val: "2300 Lakeland Dr, Flowood, MS 39232, USA", link: "#" },
                 
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-100 rounded-2xl group hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-xl">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{item.label}</p>
                    {item.link !== "#" ? (
                      <a href={item.link} className="text-[14px] font-black text-slate-900 break-all hover:text-blue-600 transition-colors">{item.val}</a>
                    ) : (
                      <p className="text-[14px] font-black text-slate-900 leading-relaxed">{item.val}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
                 <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                       <MessageSquare size={18} />
                       <span className="text-[9px] font-black uppercase tracking-[2px]">Quick Help</span>
                    </div>
                    <h4 className="text-lg font-black">Rapid Response</h4>
                    <p className="text-slate-400 text-xs font-bold leading-relaxed opacity-80">
                       We aim to provide a detailed response within one business day for all printer-related inquiries.
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-700">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-20 w-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-4 ">Message Sent Successfully</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-bold">Your inquiry has been received by our support team.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[2px] transition-all hover:bg-blue-600 shadow-lg"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Your Name</label>
                          <input 
                            required type="text" placeholder="John Doe" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Email Address</label>
                          <input 
                            required type="email" placeholder="john@email.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Phone Number</label>
                          <input 
                            type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Topic</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all appearance-none cursor-pointer"
                            >
                              <option>General Inquiry</option>
                              <option>Printer Specifications</option>
                              <option>Order Shipping</option>
                              <option>Customer Support</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Message Details</label>
                        <textarea 
                          required rows="5" placeholder="Tell us about your printer needs..." value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all resize-none min-h-[150px] placeholder:text-slate-300"
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button 
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white h-14 px-12 rounded-2xl font-black text-[11px] uppercase tracking-[2px] transition-all hover:bg-slate-900 shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 group"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : "Send Message"}
                          {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mt-4">Message failed to send. Please try again.</p>}
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
