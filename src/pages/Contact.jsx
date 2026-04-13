import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, Send, MapPin, Phone, ChevronDown } from 'lucide-react';
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
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO 
        title="Contact Us | Print Ease" 
        description="Get in touch with Print Ease for help with your printer or orders."
      />
      
      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Help Center</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Get In <span className="text-blue-600">Touch</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              We are here to help you. Whether you have a question about a product or need help with an order, our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: INFO */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Choose the best way to reach us. We usually reply within a few hours during business days.
                </p>
              </div>
                
              <div className="grid gap-4">
                <div className="p-6 bg-white border border-slate-200 flex items-center gap-5 transition-all hover:border-blue-400">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                    <a href="mailto:info@printease.shop" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">info@printease.shop</a>
                  </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 flex items-center gap-5 transition-all hover:border-blue-400">
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-sm font-bold text-slate-900">1901 S Woodrow St, Little Rock, AR 72204, USA</p>
                  </div>
                </div>
              </div>

              {/* Simple Banner */}
              <div 
                className="p-8 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
              >
                 <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-3">Quick Support</h4>
                    <p className="text-blue-50/80 text-sm font-medium leading-relaxed">
                       Our team is available every day to answer your messages. We make sure you get the help you need fast.
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-12 border border-slate-200">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-20 w-20 bg-blue-600 text-white flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">Message Sent!</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Thank you for reaching out. We have received your message and will get back to you very soon.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-blue-600 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Name</label>
                          <input 
                            required type="text" placeholder="Enter your full name" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-12 px-4 bg-white border border-slate-200 outline-none focus:border-blue-600 font-medium text-sm transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Email</label>
                          <input 
                            required type="email" placeholder="Enter your email address" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-12 px-4 bg-white border border-slate-200 outline-none focus:border-blue-600 font-medium text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Phone Number</label>
                          <input 
                            type="tel" placeholder="Enter your phone number" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-12 px-4 bg-white border border-slate-200 outline-none focus:border-blue-600 font-medium text-sm transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Subject</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-12 px-4 bg-white border border-slate-200 outline-none focus:border-blue-600 font-medium text-sm transition-all appearance-none cursor-pointer"
                            >
                              <option>General Inquiry</option>
                              <option>Product Question</option>
                              <option>Order Support</option>
                              <option>Technical Help</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Message</label>
                        <textarea 
                          required rows="5" placeholder="How can we help you today?" value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-4 bg-white border border-slate-200 outline-none focus:border-blue-600 font-medium text-sm transition-all resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <button 
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white h-14 px-12 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={20} className="animate-spin" /> : "Send Message"}
                          {!loading && <Send size={18} />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-xs font-bold mt-4">Something went wrong. Please try again later.</p>}
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
