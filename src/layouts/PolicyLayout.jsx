import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-jakarta pb-24 text-black">
      {/* --- PREMIUM POLICY HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={12} strokeWidth={1.5} className="text-gray-200" />
              <span>Legal Center</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight leading-none">
              {title.split(' ').slice(0, -1).join(' ')} <span className="font-semibold italic">{title.split(' ').pop()}</span>
            </h1>

            {subtitle && (
              <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className="pt-4 flex flex-col items-center gap-4">
              <div className="w-12 h-[1px] bg-black" />
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                <Clock size={14} strokeWidth={1.5} />
                <span>Last Revised: {lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto prose prose-zinc prose-headings:font-semibold prose-headings:uppercase prose-headings:text-black prose-h2:text-2xl prose-h2:pt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-gray-50 prose-h2:pb-4 prose-p:text-gray-500 prose-p:text-base prose-p:leading-relaxed prose-li:text-gray-500 prose-li:text-base prose-strong:text-black prose-a:text-black prose-a:underline hover:prose-a:text-gray-400 transition-colors"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
