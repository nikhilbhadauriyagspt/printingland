import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={24} className="text-blue-600" />,
    title: "FREE SHIPPING",
    desc: "On all orders"
  },
  {
    icon: <RotateCcw size={24} className="text-blue-600" />,
    title: "MONEY GUARANTEE",
    desc: "7 days money back"
  },
  {
    icon: <ShieldCheck size={24} className="text-blue-600" />,
    title: "SAFE SHOPPING",
    desc: "Safe shopping guarantee"
  },
  {
    icon: <Headphones size={24} className="text-blue-600" />,
    title: "ONLINE SUPPORT",
    desc: "Support 24/24h on day"
  },
  {
    icon: <CreditCard size={24} className="text-blue-600" />,
    title: "PAYMENT METHOD",
    desc: "Many different ways"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-12 md:py-16 border-y border-slate-100">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-10 xl:gap-0">
          {features.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 group flex-1 min-w-[240px] xl:min-w-0 xl:px-6"
              >
                {/* Icon in Thin Circular Border */}
                <div className="h-14 w-14 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-50/50">
                  {item.icon}
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-[12px] xl:text-[13px] font-black text-slate-900 uppercase tracking-widest leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider">
                    {item.desc}
                  </p>
                </div>
              </motion.div>

              {/* Vertical Divider - only visible on Desktop (xl) and between items */}
              {index !== features.length - 1 && (
                <div className="hidden xl:block h-10 w-[1px] bg-slate-100 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
