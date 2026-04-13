import React from 'react';
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function ShopByCategory({ categories = [], loading = false }) {
  // Filter logic (keeping original data logic)
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    })
    .slice(0, 10);

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-white py-6 md:py-10 w-full font-['Poppins'] border-t border-slate-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        
        {/* --- ULTRA COMPACT HEADER --- */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <span className="h-8 w-1.5 bg-blue-600 rounded-full" />
            Top <span className="text-blue-600">Categories</span>
          </h2>
          <Link 
            to="/shop" 
            className="text-[12px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all"
          >
            See All Catalog
          </Link>
        </div>

        {/* --- HIGH DENSITY MINI GRID --- */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-2 md:gap-3">
          {loading ? (
             Array.from({ length: 7 }).map((_, i) => (
               <div key={i} className="aspect-square rounded-lg  animate-pulse" />
             ))
          ) : (
            subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/shop?category=${item.slug}`} 
                  className="group flex flex-col items-center p-1.5 rounded-xl  "
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg  border border-slate-100 mb-1.5  ">
                    <img 
                      src={getImagePath(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2 "
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                    />
                  </div>

                  <div className="text-center w-full">
                    <h4 className="text-[11px] md:text-[12px] font-semibold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
                      {item.name}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
