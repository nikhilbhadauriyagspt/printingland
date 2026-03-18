import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track Order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the Printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty from the brand, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & Help",
    questions: [
      { q: "How can I contact you?", a: "You can send us an email or use the form on our Contact page. We're here to help every day." },
      { q: "When are you open?", a: "Our website is always open! Our team answers messages throughout the day, usually within 24 hours." },
      { q: "Can you help me find the right ink?", a: "Of course! Just tell us the name of your printer and we'll show you exactly what ink you need." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-black">
      <SEO 
        title="FAQ | Mike's Printer" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block">Help Center</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight">
            How can we <span className="font-semibold italic text-black/80">Help?</span>
          </h1>
          <div className="w-20 h-[1px] bg-black mx-auto mt-8" />
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b border-gray-100 pb-4">Categories</h4>
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "px-6 py-4 text-[12px] font-bold transition-all whitespace-nowrap text-left flex items-center justify-between rounded-sm",
                    activeCategory === f.category 
                      ? "bg-gray-100 text-black border border-gray-200" 
                      : "bg-[#FBFBFA] text-gray-500 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <span className="uppercase tracking-[0.1em]">{f.category}</span>
                  <ChevronRight size={16} strokeWidth={1.5} className={cn("transition-transform duration-300", activeCategory === f.category ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
            </div>
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div 
                  key={i}
                  className={cn(
                    "bg-white border-b transition-all duration-500 overflow-hidden",
                    activeIdx === i ? "border-black" : "border-gray-100 hover:border-gray-300"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className={cn(
                      "text-base md:text-lg font-semibold transition-colors leading-tight pr-8",
                      activeIdx === i ? "text-black" : "text-gray-800 group-hover:text-black"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0",
                      activeIdx === i ? "border-black bg-white text-black rotate-180" : "border-gray-200 bg-white text-black group-hover:border-black"
                    )}>
                      <ChevronDown size={16} strokeWidth={1.5} />
                    </div>
                  </button>

                  <div className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeIdx === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="pb-8 pr-12">
                      <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 lg:px-12 bg-[#FBFBFA] border-t border-gray-100 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-black">Still Need <span className="font-semibold italic text-black/80">Help?</span></h2>
            <p className="text-gray-500 text-base font-medium">If you couldn't find your answer here, our team is always ready to talk.</p>
          </div>
          <div className="pt-4 flex justify-center">
            <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-black text-white h-16 px-12 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Talk To Us</span>
              <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
