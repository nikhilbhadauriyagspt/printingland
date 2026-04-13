import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, ShieldCheck, Truck, Info, RotateCcw } from 'lucide-react';
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
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO 
        title="FAQ | Print Ease" 
        description="Find answers to common questions about our printers and delivery."
      />

      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Common Questions</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              Need quick answers? We have compiled a list of common questions about our products, shipping, and support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: CATEGORIES */}
            <aside className="lg:col-span-4 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Select Category</h4>
              <div className="flex flex-col gap-2">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left px-6 py-4 flex items-center gap-4 transition-all border",
                      activeCategory === f.category 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/10" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                    )}
                  >
                    <div className={cn(
                      "shrink-0",
                      activeCategory === f.category ? "text-white" : "text-blue-600"
                    )}>
                      {f.icon}
                    </div>
                    <span className="text-sm font-bold">{f.category}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* RIGHT: ACCORDION */}
            <main className="lg:col-span-8">
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">{activeCategory}</h2>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "bg-white border transition-all duration-300",
                      activeIdx === i ? "border-blue-600 shadow-xl shadow-blue-900/5" : "border-slate-200 hover:border-blue-400"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className={cn(
                        "text-base font-bold transition-colors pr-8",
                        activeIdx === i ? "text-blue-600" : "text-slate-800"
                      )}>
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={cn(
                          "shrink-0 transition-transform duration-300",
                          activeIdx === i ? "rotate-180 text-blue-600" : "text-slate-400"
                        )} 
                      />
                    </button>

                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px w-full bg-slate-100 mb-6" />
                            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </main>

          </div>
        </div>
      </section>

      {/* --- MINI CTA --- */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Still have questions?</h2>
              <p className="text-slate-500 font-medium">Our friendly support team is here to help you.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Link to="/contact" className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all text-center">
                Contact Us
              </Link>
              <Link to="/shop" className="flex-1 md:flex-none px-8 py-3 bg-white border border-slate-900 text-slate-900 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-center">
                View Printers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
