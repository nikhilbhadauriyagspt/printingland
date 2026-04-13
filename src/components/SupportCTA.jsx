import React from 'react';
import { Link } from 'react-router-dom';
import { HeadphonesIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-10 md:py-16 font-['Poppins']">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        <div 
          className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white shadow-xl shadow-blue-900/10"
          style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
        >
          {/* Subtle Background Icon */}
          <div className="absolute right-0 bottom-0 p-4 opacity-10 pointer-events-none">
            <HeadphonesIcon size={120} strokeWidth={1} />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-2xl mb-8 md:mb-0"
          >
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              Not sure which printer to buy?
            </h2>
            <p className="text-blue-50/80 text-sm md:text-base font-medium leading-relaxed">
              Our experts are here to help you find the best printer for your work. Talk to us today for free advice.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 relative z-10"
          >
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-white text-blue-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Get Free Help <ArrowRight size={16} />
            </Link>
            <Link 
              to="/faq" 
              className="px-8 py-3 bg-transparent border border-white/30 text-white font-bold text-sm flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
            >
              View FAQs
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
