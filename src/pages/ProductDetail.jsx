import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-jakarta">
        <Loader2 className="animate-spin h-8 w-8 text-gray-200 mb-6" strokeWidth={1.5} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Retrieving Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white font-jakarta">
        <div className="h-20 w-20 bg-[#FBFBFA] rounded-full border border-gray-100 flex items-center justify-center mb-8">
           <ShoppingBag size={32} className="text-gray-200" strokeWidth={1} />
        </div>
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-4">Product Not Found</h2>
        <Link to="/shop" className="group relative inline-flex items-center gap-4 bg-black text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Return to Shop</span>
          <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-24 pb-24 font-jakarta text-black overflow-x-hidden">
      <SEO title={`${product.name} | Mike's Printer`} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-16">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-gray-300" />
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-gray-300" />
          <span className="text-black truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-square bg-[#FBFBFA] flex items-center justify-center p-12 overflow-hidden rounded-sm group transition-colors duration-700 hover:bg-[#F5F5F3]">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 rounded-full transition-all duration-500 flex items-center justify-center active:scale-90 shadow-sm border",
                    isInWishlist(product.id) ? "bg-white border-red-100 text-red-500 shadow-md" : "bg-white/50 border-white text-black hover:bg-white hover:shadow-md"
                  )}
                >
                  <Heart size={20} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="absolute bottom-8 left-8 z-20">
                 <div className="bg-white text-black border border-gray-100 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
                    {product.brand_name || 'Enterprise Series'}
                 </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-6">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square border transition-all duration-500 flex items-center justify-center p-4 bg-white rounded-sm group overflow-hidden",
                      activeImage === idx ? "border-black shadow-lg" : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">Technical Hardware</span>
                 <div className="flex-1 h-px bg-gray-100" />
              </div>

              <h1 className="text-3xl md:text-5xl font-light text-black leading-tight uppercase tracking-tight">
                {product.name.split(' ').slice(0, -1).join(' ')} <span className="font-semibold italic">{product.name.split(' ').pop()}</span>
              </h1>

              <div className="flex items-baseline gap-6 pt-4">
                <span className="text-4xl font-light text-black tracking-tight">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl font-medium text-gray-300 line-through tracking-tight">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Info size={16} className="text-black" strokeWidth={1.5} />
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Product Overview</h4>
               </div>
               <p className="text-gray-500 text-base leading-relaxed font-medium">
                 {product.description || "A high-performance printing solution engineered for professional workstations. Delivers consistent precision and reliability across all business environments."}
               </p>
            </div>

            <div className="space-y-10 pt-10 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                {/* Minimalist Counter */}
                <div className="h-14 bg-[#FBFBFA] border border-gray-50 rounded-full flex items-center justify-between px-2 w-full sm:w-[160px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center rounded-full text-black hover:bg-white hover:shadow-sm transition-all"><Minus size={14} strokeWidth={1.5} /></button>
                  <span className="text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center rounded-full text-black hover:bg-white hover:shadow-sm transition-all"><Plus size={14} strokeWidth={1.5} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "group relative flex-1 h-14 rounded-full overflow-hidden transition-all duration-500 active:scale-95 shadow-xl",
                    isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:shadow-2xl"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em]">
                    {isAdded ? <CheckCircle size={18} /> : <ShoppingBag size={18} />}
                    {isAdded ? "Added to Bag" : "Secure to Cart"}
                  </span>
                  {!isAdded && <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
                </button>
              </div>

              {/* Minimal Trust Grid */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { icon: <Truck size={20} strokeWidth={1.2} />, label: "Express" },
                  { icon: <ShieldCheck size={20} strokeWidth={1.2} />, label: "Secure" },
                  { icon: <RefreshCcw size={20} strokeWidth={1.2} />, label: "Refunds" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group">
                    <div className="text-black group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 pt-24 border-t border-gray-100">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Curated Pairing</span>
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight">You Might <span className="font-semibold italic">Also Need</span></h2>
              <div className="w-12 h-[1px] bg-black mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
              {relatedProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="group relative flex flex-col h-full bg-white">
                  <div className="relative aspect-[4/5] w-full bg-[#FBFBFA] flex items-center justify-center p-8 overflow-hidden rounded-sm transition-all duration-700 group-hover:bg-[#F5F5F3]">
                    <img src={getImagePath(p.images)} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="h-12 w-12 bg-white text-black hover:shadow-xl flex items-center justify-center rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowRight size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  </div>

                  <div className="pt-6 pb-2 text-center">
                    <Link to={`/product/${p.slug}`} className="block mb-2 group/title">
                      <h3 className="text-[13px] font-semibold text-black uppercase tracking-wide line-clamp-1 group-hover/title:text-gray-500 transition-colors">{p.name}</h3>
                    </Link>
                    <span className="text-sm font-bold text-black">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
