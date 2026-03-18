import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28 w-full overflow-hidden font-jakarta border-t border-gray-50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        
        {/* --- CENTERED MINIMAL HEADER --- */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Premium Hardware
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-black uppercase tracking-tight"
          >
            {title.split(' ').slice(0, -1).join(' ')} <span className="font-semibold">{title.split(' ').pop()}</span>
          </motion.h2>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        {/* --- AIRY LANDSCAPE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 xl:gap-y-12">
          {products.slice(0, 6).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-row items-center gap-6 sm:gap-8 p-4 -mx-4 rounded-2xl transition-all duration-500 hover:bg-[#F9F9F9]"
            >
              {/* Premium Rounded Image Area */}
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 shrink-0 bg-[#F2F2F2] rounded-2xl flex items-center justify-center p-4 sm:p-8 overflow-hidden group-hover:shadow-inner transition-all duration-500">
                <motion.img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                  animate={hoveredId === p.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                
                {/* Floating Heart Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-3 left-3 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 z-20",
                    isInWishlist(p.id) ? "bg-white text-red-500 shadow-sm" : "bg-black/5 text-black hover:bg-white hover:shadow-sm"
                  )}
                >
                  <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              </div>

              {/* Minimalist Info Area */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">
                  {p.brand_name || 'Enterprise'}
                </span>
                
                <Link to={`/product/${p.slug}`}>
                  <h3 className="text-base sm:text-lg font-medium text-black leading-snug line-clamp-2 hover:text-gray-500 transition-colors mb-4">
                    {p.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <p className="text-lg font-light text-black tracking-tight">
                    ${p.price}
                  </p>
                  
                  {/* Clean Circular Actions */}
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/product/${p.slug}`}
                      className="h-10 w-10 rounded-full border border-gray-200 text-black flex items-center justify-center hover:border-black transition-colors"
                      title="Quick View"
                    >
                      <Eye size={16} strokeWidth={1.2} />
                    </Link>
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 hover:scale-105 transition-all shadow-md"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- VIEW ALL FOOTER --- */}
        <div className="mt-20 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors py-4 group"
          >
            Browse Professional Series <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
