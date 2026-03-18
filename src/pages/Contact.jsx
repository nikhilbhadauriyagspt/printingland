import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
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
        setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
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
    <div className="bg-white min-h-screen font-jakarta text-black overflow-x-hidden">
      <SEO 
        title="Contact Us | Mike's Printer" 
        description="Connect with Mike's Printer. Our dedicated team is here to provide expert assistance for all your printing needs."
      />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block"
          >
            Concierge Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight"
          >
            Get In <span className="font-semibold italic">Touch</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 h-[1px] bg-black mx-auto mt-8"
          />
        </div>
      </section>

      {/* --- MAIN CONTACT CONTENT --- */}
      <section className="py-20 md:py-32 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32">
            
            {/* --- CONTACT INFO --- */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Direct Assistance</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    Our dedicated specialists are available to provide tailored solutions for your professional printing requirements.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="group flex items-start gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#FBFBFA] flex items-center justify-center shrink-0 border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <Mail size={18} strokeWidth={1.2} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Us</p>
                      <p className="text-base font-medium text-black">info@mikesprinter.shop</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#FBFBFA] flex items-center justify-center shrink-0 border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <MapPin size={18} strokeWidth={1.2} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                      <p className="text-base font-medium text-black leading-relaxed">
                        4100 University Ave, <br/> 
                        West Des Moines, IA 50266, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- CONTACT FORM --- */}
            <div className="lg:col-span-8">
              <div className="relative">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-center py-24 bg-[#FBFBFA] rounded-sm border border-gray-50"
                  >
                    <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-gray-50">
                      <CheckCircle2 size={32} strokeWidth={1} />
                    </div>
                    <h2 className="text-2xl font-light uppercase tracking-widest mb-4 text-black">Message Received</h2>
                    <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">Thank you for connecting. A specialist will review your request and respond shortly.</p>
                    <button 
                      onClick={() => setStatus(null)} 
                      className="text-[11px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-200 transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
                        <input 
                          required type="text" placeholder="YOUR NAME" value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[13px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
                        <input 
                          required type="email" placeholder="YOUR EMAIL" value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-14 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[13px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Phone Number</label>
                        <input 
                          type="tel" placeholder="OPTIONAL" value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full h-14 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[13px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Inquiry Type</label>
                        <div className="relative">
                          <select 
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className="w-full h-14 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[13px] font-medium transition-all appearance-none cursor-pointer pr-12 uppercase tracking-widest"
                          >
                            <option>General Question</option>
                            <option>Printer Help</option>
                            <option>Order Status</option>
                            <option>Technical Support</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Message Details</label>
                      <textarea 
                        required rows="4" placeholder="HOW CAN WE ASSIST YOU?" value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[13px] font-medium transition-all resize-none placeholder:text-gray-200 uppercase tracking-widest"
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <button 
                        disabled={loading}
                        className="group relative inline-flex items-center gap-8 bg-black text-white h-16 px-12 rounded-full overflow-hidden transition-all duration-500 hover:pr-16 hover:shadow-2xl active:scale-95 disabled:opacity-50"
                      >
                        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                          {loading ? "Processing..." : "Send Message"}
                        </span>
                        {!loading && <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />}
                        <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                    {status === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-6">Transmission failure. Please try again.</p>}
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
