import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageSquare, ShieldCheck, Truck, RotateCcw, Info, LayoutGrid, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: <ShieldCheck size={20} />,
    questions: [
      { q: "How do I place an order for a printer?", a: "To place an order, select your desired model from our inventory and add it to your cart. Follow the secure checkout process to provide your shipping and payment information." },     
      { q: "Is an account required to shop?", a: "No, we offer a guest checkout option. However, creating an account allows you to track your order history and manage your preferences more efficiently." },
      { q: "How can I check my order status?", a: "Upon completing your purchase, an order confirmation will be sent immediately. You can also use the 'Track Order' feature available in the main navigation." },
      { q: "What payment methods are supported?", a: "We accept all major credit cards and PayPal. All transactions are processed through encrypted, secure gateways." }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: <Truck size={20} />,
    questions: [
      { q: "Where do you ship to?", a: "We provide nationwide shipping across the United States, serving both residential and business locations." },
      { q: "How long does delivery take?", a: "Standard delivery typically takes between 3 to 7 business days. You will receive a precise tracking reference once your unit is dispatched." },
      { q: "How can I track my shipment?", a: "A tracking number will be provided via email as soon as your order leaves our facility. You can monitor the real-time progress through our logistics partner's portal." }
    ]
  },
  {
    category: "Printer Information",
    icon: <Info size={20} />,
    questions: [
      { q: "Are all printers original and new?", a: "Yes, we exclusively provide brand-new, authentic printers in original manufacturer packaging with all factory seals intact." },
      { q: "Is there a warranty provided?", a: "All printers include a full manufacturer's warranty, ensuring you have access to official support and repairs if required." },
      { q: "Are original ink and toner available?", a: "We maintain a comprehensive inventory of original ink and toner cartridges for all models we carry to ensure optimal performance." }
    ]
  },
  {
    category: "Returns & Support",
    icon: <RotateCcw size={20} />,
    questions: [
      { q: "What is your return policy?", a: "Unused products in their original, unopened packaging may be returned within 14 days of delivery for a full refund." },
      { q: "What if the machine arrives with issues?", a: "In the unlikely event of shipping damage or mechanical issues, please report it immediately. We will arrange for a replacement." }
    ]
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(f => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="FAQ | Iconic Printers" 
        description="Find answers to common questions about our printers and delivery."
      />

      {/* --- PURE WHITE CENTERED HEADER --- */}
      <section className="pt-28 md:pt-40 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <Sparkles size={12} className="text-blue-600 fill-current" />
            Knowledge Base
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900  leading-none mb-6">
            Common <span className="text-blue-600">Queries.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto">
            Quick answers to frequent inquiries regarding our printer models and logistics.
          </p>
        </div>
      </section>

      <div className="w-full px-4 md:px-10 lg:px-16 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: CATEGORY NAV */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4 px-4">Support Areas</h4>
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-2xl text-[12px] font-black transition-all flex items-center gap-4 group border",
                    activeCategory === f.category 
                      ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20" 
                      : "bg-white border-slate-50 text-slate-500 hover:border-blue-100 hover:text-blue-600"
                  )}
                >
                  <span className={cn(
                    "shrink-0",
                    activeCategory === f.category ? "text-white" : "text-blue-600 group-hover:scale-110 transition-transform"
                  )}>
                    {f.icon}
                  </span>
                  {f.category}
                </button>
              ))}
            </div>

            <div className="p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -mr-8 -mt-8" />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-blue-500">
                     <MessageSquare size={18} />
                     <span className="text-[9px] font-black uppercase tracking-[2px]">Direct Help</span>
                  </div>
                  <h4 className="text-lg font-black uppercase ">Need More Info?</h4>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed opacity-80">
                    Our team is ready to provide specific details for your machines.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-white hover:text-blue-500 transition-colors group/link">
                    Contact Us Now <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          </aside>

          {/* RIGHT: ACCORDION PANEL */}
          <main className="lg:col-span-8">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {currentCategoryData?.icon}
              </div>
              <h2 className="text-xl font-black text-slate-900  uppercase tracking-widest">{activeCategory}</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "bg-white rounded-2xl transition-all duration-500 overflow-hidden border",
                      activeIdx === i ? "border-blue-600 shadow-xl" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                    >
                      <span className={cn(
                        "text-[14px] md:text-[15px] font-bold transition-colors leading-relaxed pr-8",
                        activeIdx === i ? "text-blue-600" : "text-slate-800"
                      )}>
                        {faq.q}
                      </span>
                      <div className={cn(
                        "h-10 w-10 rounded-xl border flex items-center justify-center transition-all duration-500 shrink-0",
                        activeIdx === i ? "bg-blue-600 text-white border-blue-600 rotate-180" : "bg-white border-slate-100 text-slate-400 group-hover:border-blue-600 group-hover:text-blue-600"
                      )}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 md:px-8 pb-8 pt-0">
                            <div className="h-px w-full bg-slate-50 mb-6" />
                            <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-3xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* --- MINIMAL CTA --- */}
      <section className="py-24 text-center bg-white border-t border-slate-50">
        <div className="w-full px-4 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 er leading-none">Still Have Questions?</h2>
          <p className="text-slate-400 text-base font-bold">Our support team is ready to provide any assistance you need with our products.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white h-14 px-12 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
            >
              Contact Support
            </Link>
            <Link 
              to="/shop" 
              className="bg-white border-2 border-slate-900 text-slate-900 h-14 px-12 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[2px] hover:bg-slate-900 hover:text-white transition-all active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
