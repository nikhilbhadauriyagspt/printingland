import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Truck,
  Info,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: 'Orders & Purchasing',
    icon: <ShieldCheck size={20} />,
    questions: [
      {
        q: 'How do I place an order for a printer?',
        a: 'To place an order, select your preferred printer, add it to your cart, and complete the checkout process with your shipping and payment details.',
      },
      {
        q: 'Is an account required to shop?',
        a: 'No, you can place an order as a guest. Creating an account can make it easier to manage orders and preferences later.',
      },
      {
        q: 'How can I check my order status?',
        a: 'Once your order is placed, you will receive confirmation details. You can also use the order tracking option available on the website.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We accept major payment methods through secure checkout so your transactions remain protected and reliable.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: <Truck size={20} />,
    questions: [
      {
        q: 'Where do you ship to?',
        a: 'We currently offer shipping across the United States for both homes and business locations.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery usually takes around 3 to 7 business days depending on your location and order details.',
      },
      {
        q: 'How can I track my shipment?',
        a: 'After your order is dispatched, you will receive tracking details so you can follow your shipment status.',
      },
    ],
  },
  {
    category: 'Printer Information',
    icon: <Info size={20} />,
    questions: [
      {
        q: 'Are all printers original and new?',
        a: 'Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.',
      },
      {
        q: 'Is there a warranty provided?',
        a: 'Most printers include manufacturer warranty coverage. Warranty details may vary depending on the product model.',
      },
      {
        q: 'Are original ink and toner available?',
        a: 'Yes, we also offer compatible printing supplies for many of the models available in our catalog.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    icon: <RotateCcw size={20} />,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.',
      },
      {
        q: 'What if the machine arrives with issues?',
        a: 'If your order arrives damaged or has a problem, please contact support as soon as possible so we can help with the next steps.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find((f) => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO
        title="FAQ | Support & Guidance"
        description="Find professional answers to common questions about orders, shipping, and printer specifications."
      />

      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <span className="text-[11px] font-bold text-black uppercase tracking-[0.3em] mb-4 block">
             Knowledge Base
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             Help <span className="text-black">Center.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Consolidated resources and professional guidance for all your printing hardware and logistics inquiries.
           </p>
        </div>
      </section>

      {/* --- Main Content Split --- */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Category Navigation */}
            <aside className="lg:col-span-4">
               <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 pb-2 border-b border-gray-900 w-fit">
                 Topics
               </h3>
               <div className="flex flex-col border-t border-l border-gray-100">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'flex items-center justify-between p-6 border-r border-b border-gray-100 text-left transition-all group',
                        activeCategory === f.category ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("text-black group-hover:scale-110 transition-transform", activeCategory === f.category && "text-blue-400")}>
                           {f.icon}
                        </div>
                        <span className="text-[13px] font-bold tracking-widest">{f.category}</span>
                      </div>
                      <ChevronRight size={16} className={cn("opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all", activeCategory === f.category && "opacity-100")} />
                    </button>
                  ))}
               </div>
            </aside>

            {/* Right: FAQ Accordion */}
            <main className="lg:col-span-8">
               <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                 Showing questions for: <span className="text-gray-900">{activeCategory}</span>
               </h3>

               <div className="space-y-0 border-t border-gray-100">
                  {filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 transition-all group"
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between py-8 text-left group"
                      >
                        <span className="text-[15px] md:text-lg font-bold text-gray-900 pr-12 group-hover:text-black transition-colors  leading-snug">
                          {faq.q}
                        </span>
                        <div className="shrink-0 text-gray-300 group-hover:text-black transition-colors">
                           {activeIdx === i ? <Minus size={20} /> : <Plus size={20} />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 pr-12">
                              <p className="text-[14px] md:text-[15px] text-gray-500 font-medium leading-relaxed max-w-3xl">
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

      {/* --- Footer CTA (Sharp style) --- */}
      <section className="pb-32 px-4">
        <div className="max-w-[1440px] mx-auto">
           <div className="bg-gray-900 p-12 md:p-20 text-center border-none">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 ">Still have questions?</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-12 text-[14px] font-medium leading-relaxed">Our support specialists are ready to provide professional assistance for all your enterprise printing requirements.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/contact" className="px-10 py-5 bg-black text-white font-bold text-[12px] tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95">Contact us</Link>
                <Link to="/shop" className="px-10 py-5 border-2 border-white text-white font-bold text-[12px] tracking-[0.2em] hover:bg-white hover:text-gray-900 transition-all active:scale-95">Browse Hardware</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}