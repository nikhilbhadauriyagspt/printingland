import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={18} />,
    title: "Free Shipping",
    desc: "All US Orders"
  },
  {
    icon: <RotateCcw size={18} />,
    title: "Money Back",
    desc: "7 Day Guarantee"
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Safe Checkout",
    desc: "100% Secure"
  },
  {
    icon: <Headphones size={18} />,
    title: "Expert Help",
    desc: "24/7 Support"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-blue-600 py-3 md:py-4 font-['Poppins'] border-y border-blue-500/30">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 group px-2"
            >
              <div className="h-8 w-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                {item.icon}
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-[12px] md:text-[13px] font-bold text-white leading-none whitespace-nowrap">
                  {item.title}:
                </h3>
                <p className="text-blue-100/70 text-[11px] md:text-[12px] font-medium leading-none whitespace-nowrap">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
