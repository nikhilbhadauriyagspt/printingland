import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import newban1 from '@/assets/bannerr/newban1.jpg';
import newban2 from '@/assets/bannerr/newban2.jpg';
import newban3 from '@/assets/bannerr/newban3.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: newban1,
      tag: "NEW ARRIVAL 2026",
      title: "The Future of",
      subtitle: "Precision Printing",
      desc: "Experience unmatched clarity and performance with our latest enterprise-grade laser technology.",
    },
    {
      id: 2,
      image: newban2,
      tag: "OFFICE ESSENTIALS",
      title: "Streamline Your",
      subtitle: "Workflow Today",
      desc: "Smart all-in-one solutions designed for the modern high-pace workspace environment.",
    },
    {
      id: 3,
      image: newban3,
      tag: "EXCLUSIVE SERIES",
      title: "Elegance Meets",
      subtitle: "Efficiency",
      desc: "Sleek, powerful, and reliable printers that redefine professional document standards.",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[55vh] md:h-[90vh] overflow-hidden bg-white font-jakarta">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 bg-white">
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover"
            />
            {/* Soft Overlay for text readability - keeping it subtle */}
            <div className="absolute inset-0 bg-white/30 md:bg-transparent md:bg-gradient-to-r md:from-white/50 md:to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative h-full w-full mx-auto px-6 lg:px-12 flex items-center">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-black/60 mb-6"
              >
                {slides[currentSlide].tag}
              </motion.span>
              
              <div className="overflow-hidden mb-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.1] tracking-tight"
                >
                  {slides[currentSlide].title} <br />
                  <span className="font-semibold">{slides[currentSlide].subtitle}</span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-black/60 text-sm md:text-base lg:text-lg max-w-lg mb-10 leading-relaxed font-medium"
              >
                {slides[currentSlide].desc}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <Link 
                  to="/shop" 
                  className="group relative inline-flex items-center gap-4 bg-black text-white px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black/90"
                >
                  Explore Shop
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/about" 
                  className="text-[12px] font-bold uppercase tracking-[0.2em] text-black hover:text-black/60 transition-colors py-4 px-2"
                >
                  Want to Know More?
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 lg:right-12 z-20 flex items-center gap-8">
        {/* Slide Indicators */}
        <div className="flex gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="group relative py-4"
            >
              <div className={`h-[2px] transition-all duration-700 rounded-full bg-black ${currentSlide === i ? 'w-12' : 'w-6 opacity-20 group-hover:opacity-50'}`} />
            </button>
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex gap-4 border-l border-black/10 pl-8 ml-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full text-black hover:bg-black hover:text-white transition-all duration-300"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} strokeWidth={1.2} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full text-black hover:bg-black hover:text-white transition-all duration-300"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} strokeWidth={1.2} />
          </button>
        </div>
      </div>

      {/* Vertical Decorative Element */}
      <div className="hidden lg:block absolute left-12 bottom-0 w-[1px] h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
};

export default Hero;
