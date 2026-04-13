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
  ShoppingBag,
  Info,
  ArrowRight
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
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-['Poppins']">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-6" strokeWidth={1.5} />
        <p className="text-sm font-bold text-gray-400">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white font-['Poppins'] text-slate-900">
        <div className="h-20 w-20 bg-gray-50 flex items-center justify-center mb-8 border border-gray-100">
           <ShoppingBag size={32} className="text-gray-200" />
        </div>
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white h-12 px-8 font-bold text-sm hover:bg-slate-900 transition-all">
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-['Poppins'] text-slate-900">
      <SEO title={`${product.name} | Print Ease`} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 overflow-hidden">
          <Link to="/" className="hover:text-blue-600 transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-blue-600 transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-900 truncate font-semibold capitalize">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square bg-white flex items-center justify-center p-10 md:p-16 overflow-hidden border border-slate-200 group transition-all">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={mainImage} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 transition-all duration-300 flex items-center justify-center border",
                    isInWishlist(product.id) ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20" : "bg-white text-slate-400 border-slate-200 hover:text-red-500"
                  )}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-20 w-20 md:h-24 md:w-24 shrink-0 border-2 transition-all flex items-center justify-center p-3 bg-white",
                      activeImage === idx ? "border-blue-600" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">Product details</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight capitalize">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-lg font-medium text-slate-300 line-through">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest">About this item</h4>
               </div>
               <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                 {product.description || "A high-performance printer solution engineered for professional and home use. Delivering consistent precision and absolute reliability for all your printing needs."}
               </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                {/* Minimal Counter */}
                <div className="h-14 border border-slate-200 flex items-center justify-between px-2 w-full sm:w-[160px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-all"><Minus size={16} /></button>
                  <span className="text-base font-bold text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-all"><Plus size={16} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 h-14 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                  {isAdded ? "Added to Cart" : "Buy It Now"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 bg-slate-50 p-6 border border-slate-100">
                {[
                  { icon: <Truck size={20} className="text-blue-600" />, label: "Fast shipping across USA" },
                  { icon: <ShieldCheck size={20} className="text-blue-600" />, label: "Secured checkout payment" },
                  { icon: <RefreshCcw size={20} className="text-blue-600" />, label: "7-day easy return policy" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Recommended Products</h2>
              <Link to="/shop" className="group flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                See all products <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 md:gap-5">
              {relatedProducts.slice(0, 8).map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 flex flex-col h-full hover:border-blue-400 transition-all group">
                  <div className="relative aspect-square w-full flex items-center justify-center p-4 bg-white border-b border-slate-100">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    <img src={getImagePath(p.images)} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[12px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 uppercase">{p.name}</h3>
                    </Link>
                    <span className="text-sm font-bold text-slate-900 mt-auto">${parseFloat(p.price).toLocaleString()}</span>
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
