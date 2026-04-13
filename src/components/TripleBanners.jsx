import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

// Assets
import trip1 from '@/assets/bannerr/trip1.jpg';
import trip2 from '@/assets/bannerr/trip2.jpg';
import trip3 from '@/assets/bannerr/trip3.jpg';

const banners = [
  {
    id: "01",
    title: "Workforce Pro Series",
    subtitle: "Enterprise Solutions",
    desc: "Industrial-grade efficiency for high-volume corporate environments.",
    image: trip1,
  },
  {
    id: "02",
    title: "Precision Laser Tech",
    subtitle: "Advanced Documentation",
    desc: "Next-gen imaging for crystal clear documentation and accuracy.",
    image: trip2,
  },
  {
    id: "03",
    title: "Supply Eco System",
    subtitle: "Authentic Components",
    desc: "Reliable components ensuring peak mechanical longevity.",
    image: trip3,
  }
];

export default function TripleBanners() {
  const gradientStyle = {
    background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)'
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 font-['Poppins']">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {banners.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden group flex flex-row min-h-[220px] md:min-h-[280px] shadow-xl shadow-blue-900/10"
              style={gradientStyle}
            >
              {/* --- LEFT CONTENT --- */}
              <div className="w-[60%] p-6 md:p-8 flex flex-col justify-center text-white relative z-10">
                <span className="inline-block text-[11px] font-bold text-blue-100/70 mb-2 tracking-wider">
                  {item.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-blue-50/70 line-clamp-2 mb-6">
                  {item.desc}
                </p>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center justify-center px-6 py-2 bg-white text-black text-[12px] font-bold transition-all hover:bg-slate-900 hover:text-white w-fit"
                >
                  Buy Now
                </Link>
              </div>

              {/* --- RIGHT IMAGE --- */}
              <div className="w-[40%] relative overflow-hidden bg-white/5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
