import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import higher quality banners from assets
import banner1 from '@/assets/bannerr/banner1.jpg';
import banner5 from '@/assets/bannerr/banner5.jpg';

const TripleBanners = () => {
  const banners = [
    {
      title: "Business",
      highlight: "Printers",
      description: "Fast and reliable laser printers built for everyday professional use.",
      image: banner1,
      link: "/shop?category=laser-printers",
      tag: "FEATURED"
    },
    {
      title: "Color",
      highlight: "Inkjet",
      description: "Brilliant color quality and sharp details for all your creative projects.",
      image: banner5,
      link: "/shop?category=inkjet-printers",
      tag: "EXCLUSIVE"
    }
  ];

  return (
    <section className="bg-white py-12 px-6 lg:px-12 w-full font-jakarta">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative h-[300px] md:h-[400px] overflow-hidden group rounded-sm"
            >
              {/* Background Image */}
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-white/80 uppercase">
                      {banner.tag}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-light text-white leading-tight uppercase tracking-tight">
                      {banner.title} <span className="font-semibold">{banner.highlight}</span>
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[320px]">
                    {banner.description}
                  </p>
                  
                  <div className="pt-2">
                    <Link 
                      to={banner.link} 
                      className="inline-flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-all group/link"
                    >
                      Shop Collection <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripleBanners;
