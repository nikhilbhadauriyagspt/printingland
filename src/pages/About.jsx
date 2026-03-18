import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import printerHero from "@/assets/category/printer_cat.jpg";
import aboutHero from "@/assets/bannerr/about.jpg";

const About = () => {
  return (
    <div className="bg-[#FBFBFA] min-h-screen font-jakarta text-black overflow-x-hidden">
      <SEO 
        title="Our Story | Mike's Printer"
        description="Discover the philosophy behind Mike's Printer. We combine luxury design with high-performance printing technology."
      />

      {/* --- PREMIUM STORY HEADER --- */}
      <section className="pt-24 pb-16 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block"
          >
            The Art of Printing
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight"
          >
            A Legacy of <span className="font-semibold italic">Precision</span>
          </motion.h1>
        </div>
      </section>

      {/* --- LUXURY PRODUCT STORY LAYOUT --- */}
      <section className="py-20 md:py-32 px-6 lg:px-12 relative">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-0">
          
          {/* LEFT CONTENT BLOCK */}
          <div className="lg:col-span-3 space-y-24 text-right hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">Our Goal</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                We work hard to bring you the best printer for your daily life, making sure every page looks perfect.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">Top Quality</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                We only pick the strongest printer models that are built to last a long time in any home or office.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">New Designs</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Our team finds the newest printer styles that are easy to use and look great on your desk.
              </p>
            </motion.div>
          </div>

          {/* CENTER PRODUCT IMAGE */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative group">
              {/* Main Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[500px] aspect-square bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border-4 border-white"
              >
                <img 
                  src={aboutHero} 
                  alt="About Us" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>

              {/* Floating Category Details */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-4 border-white bg-white z-20 flex items-center justify-center p-0.5 shadow-2xl overflow-hidden hidden md:flex"
              >
                <img src="/category/all-in-one-printers.jpg" className="w-full h-full object-cover rounded-full" alt="All-in-One" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-4 border-white bg-white z-20 flex items-center justify-center p-0.5 shadow-2xl overflow-hidden hidden md:flex"
              >
                <img src="/category/laser-printers.jpg" className="w-full h-full object-cover rounded-full" alt="Laser Printers" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT CONTENT BLOCK */}
          <div className="lg:col-span-3 space-y-24 text-left">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">Reliable</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                You can trust your printer to work every time you need to print an important document.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">Fast Printing</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Get your papers ready quickly with a printer that starts fast and finishes even faster.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">Helpful Team</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Our experts are here to help you pick the right printer and show you how to use it easily.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MINIMALIST VALUES GRID --- */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:divide-x divide-gray-100">
            {[
              { icon: <Shield size={24} strokeWidth={1} />, title: "Safe Buying", desc: "Your details are always safe when you buy a printer from us." },
              { icon: <Zap size={24} strokeWidth={1} />, title: "Quick Setup", desc: "Get your printer ready to go in just a few simple steps." },
              { icon: <Award size={24} strokeWidth={1} />, title: "Real Brand", desc: "We only sell the original printer brands that you know and trust." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-10 space-y-6 group"
              >
                <div className="text-black group-hover:scale-110 transition-transform duration-500">{v.icon}</div>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.2em]">{v.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-6 lg:px-12 bg-[#FBFBFA] border-t border-gray-100 text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-black">Find Your <br /><span className="font-semibold italic">Perfect Printer</span></h2>
            <p className="text-gray-500 text-base font-medium">Upgrade your home or office setup with a new printer today.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/shop" className="bg-black text-white px-12 h-16 flex items-center justify-center rounded-full font-bold text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-gray-800 hover:shadow-2xl active:scale-95 w-full sm:w-auto">
              Shop Now
            </Link>
            <Link to="/contact" className="bg-white border border-gray-100 text-black px-12 h-16 flex items-center justify-center rounded-full font-bold text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-black hover:text-white active:scale-95 shadow-sm w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
