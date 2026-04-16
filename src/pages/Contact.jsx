import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  CheckCircle2,
  Loader2,
  Send,
  MapPin,
  ChevronDown,
  Phone,
  Clock3,
  Zap,
  ArrowRight,
} from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
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
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO
        title="Contact Us | Printing Land Support"
        description="Connect with our professional support team for printer inquiries and order assistance."
      />

      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <span className="text-[11px] font-bold text-black uppercase tracking-[0.3em] mb-4 block">
             Support Center
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             Get in <span className="text-black">Touch.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Whether you need technical guidance or have questions about an order, our professional specialists are ready to provide the assistance you need.
           </p>
        </div>
      </section>

      {/* --- Main Content Split --- */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Contact Information Cards */}
            <div className="lg:col-span-4 space-y-12">
               <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 pb-2 border-b border-gray-900 w-fit">
                    Direct Contact
                  </h3>
                  <div className="space-y-8">
                     <div className="flex gap-6">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                           <Mail size={20} className="text-black" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Support</p>
                           <p className="text-[15px] font-bold text-gray-900">info@printingland.shop</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                           <MapPin size={20} className="text-black" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Headquarters</p>
                           <p className="text-[15px] font-medium text-gray-900 leading-relaxed">
                              5 SE 1st St, Miami, FL 33131, USA
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                           <Clock3 size={20} className="text-black" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Availability</p>
                           <p className="text-[15px] font-bold text-gray-900">24/7 Global Assistance</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Professional Note */}
               <div className="bg-black p-10 text-white border-none">
                  <Zap size={32} className="mb-6 opacity-50" />
                  <h4 className="text-xl font-bold  mb-4 leading-tight">Fast-Track Your <br /> Resolution</h4>
                  <p className="text-sm opacity-80 leading-relaxed mb-0">
                     Our specialists prioritize enterprise and home-office setups for expedited response times.
                  </p>
               </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-8">
               <div className="bg-white border border-gray-100 p-8 md:p-12 lg:p-16">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900  mb-12">
                    Submit an <span className="text-black">Inquiry.</span>
                  </h3>

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-gray-50 border border-dashed border-gray-200"
                      >
                        <CheckCircle2 size={64} className="text-black mx-auto mb-6" />
                        <h4 className="text-2xl font-bold  mb-4 text-gray-900">Message Received</h4>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 text-sm">Our professional support team will analyze your request and contact you shortly.</p>
                        <button 
                          onClick={() => setStatus(null)}
                          className="px-10 py-4 bg-gray-900 text-white font-bold text-[12px] tracking-widest hover:bg-black transition-all"
                        >
                          New Inquiry
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Phone</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Inquiry Subject</label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full h-14 bg-gray-50 border border-gray-200 px-5 pr-10 text-sm font-bold appearance-none focus:border-black focus:bg-white outline-none transition-all rounded-none"
                            >
                              <option>General Inquiry</option>
                              <option>Product Question</option>
                              <option>Order Support</option>
                              <option>Technical Help</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Message</label>
                          <textarea
                            required
                            rows="6"
                            placeholder="Detail your requirements here..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 p-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all resize-none rounded-none"
                          />
                        </div>
                        <div className="md:col-span-2 pt-4">
                          <button
                            disabled={loading}
                            className="flex items-center justify-center gap-3 px-12 py-5 bg-gray-900 text-white font-bold text-[13px] tracking-[0.2em] hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                          >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Transmit Message'}
                            {!loading && <ArrowRight size={18} />}
                          </button>
                          {status === 'error' && <p className="text-red-500 text-[12px] font-bold mt-4">Submission error. Please verify and retry.</p>}
                        </div>
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