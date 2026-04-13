import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner6 from "@/assets/bannerr/promo.jpg";

export default function Collections() {
  return (
    <section className="max-w-[1750px] mx-auto overflow-hidden font-['Poppins'] py-12 md:py-16">
      <div className="flex flex-col-reverse lg:flex-row min-h-[400px] md:h-[500px]">
        
        {/* --- TEXT SIDE (BLUE GRADIENT) --- */}
        <div 
          className="w-full lg:w-1/2 flex items-center px-6 py-12 md:px-16 lg:px-24 text-white relative"
          style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
        >
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Premium Accessories <br /> 
                <span className="text-blue-200">For Perfect Prints</span>
              </h2>
              <p className="text-blue-50/80 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                Find the right ink and parts for your printer. We only sell original items that make your printer last longer and work better every day.
              </p>

             

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/shop" 
                  className="px-8 py-4 bg-white text-blue-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-blue-900/20 group"
                >
                  Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- IMAGE SIDE --- */}
        <div className="w-full lg:w-1/2 relative overflow-hidden bg-slate-100 min-h-[300px] lg:min-h-full">
          <img 
            src={banner6} 
            alt="Elite Collection" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/20 to-transparent" />
        </div>

      </div>
    </section>
  );
}
