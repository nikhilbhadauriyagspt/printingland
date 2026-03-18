import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-12 font-jakarta border-t border-gray-50 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="relative group rounded-sm overflow-hidden bg-black min-h-[400px] md:min-h-[500px] flex items-center shadow-xl">
          
          {/* --- IMMERSIVE BACKGROUND IMAGE --- */}
          <div className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              src={printerCat}
              alt="Professional Collection"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>

          {/* --- CONTENT LAYER --- */}
          <div className="relative z-20 w-full px-8 md:px-16 lg:px-20">
            <div className="max-w-xl space-y-8">
              
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] block"
                >
                  Premium Series
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight uppercase tracking-tight"
                >
                  Home & Office <br /> 
                  <span className="font-semibold italic text-white/90">Printing Solutions</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-md"
                >
                  Quality performance for your daily needs. Reliable printers designed to deliver professional results at home or in the workplace.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-4"
              >
                <Link to="/shop" className="group inline-flex items-center gap-4 bg-white text-black h-14 px-8 rounded-sm overflow-hidden hover:bg-gray-100 transition-all duration-300">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Shop Collection</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
