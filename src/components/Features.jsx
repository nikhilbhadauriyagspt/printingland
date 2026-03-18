import { Truck, RotateCcw, Headset, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={20} strokeWidth={1.5} className="text-black" />,
    title: "Complimentary Shipping",
    desc: "On all domestic orders"
  },
  {
    icon: <RotateCcw size={20} strokeWidth={1.5} className="text-black" />,
    title: "30-Day Returns",
    desc: "Hassle-free guarantee"
  },
  {
    icon: <Headset size={20} strokeWidth={1.5} className="text-black" />,
    title: "Dedicated Support",
    desc: "24/7 expert assistance"
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} className="text-black" />,
    title: "Secure Checkout",
    desc: "Encrypted payments"
  }
];

export default function Features() {
  return (
    <section className="relative z-20 -mt-6 md:-mt-10 pb-16 font-jakarta">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-50">
            {features.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-5 p-8 lg:p-10 group hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="h-12 w-12 bg-gray-50 flex items-center justify-center rounded-full shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[12px] font-bold text-black uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
