import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Loader2,
  ShoppingCart,
  SlidersHorizontal,
  Package,
  Eye,
  Heart,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-black">
      <SEO 
        title="Shop Collections | Mike's Printer" 
        description="Browse our curated selection of high-performance printers and professional hardware."
      />
      
      {/* --- PREMIUM HERO HEADER --- */}
      <section className="bg-[#FBFBFA] border-b border-gray-100 py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 block"
          >
            Curated Performance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light uppercase tracking-tight"
          >
            Printers & <span className="font-semibold italic">Hardware</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 h-[1px] bg-black mx-auto mt-8"
          />
        </div>
      </section>

      {/* --- MINIMALIST TOOLBAR --- */}
      <div className="bg-white border-b border-gray-50 sticky top-[136px] z-40 px-6 lg:px-12">
         <div className="max-w-[1920px] mx-auto flex items-center justify-between h-20">
            {/* Search Input */}
            <div className="hidden md:flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-xs group">
                <input 
                  type="text" 
                  placeholder="SEARCH PRODUCTS..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-10 pl-0 pr-8 bg-transparent border-b border-gray-100 text-[11px] font-bold tracking-widest focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
              </div>
            </div>

            {/* Center: Unit Count (Mobile/Small Desktop) */}
            <div className="flex-1 flex justify-center">
               <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                 Items: <span className="text-black">{products.length}</span>
               </span>
            </div>

            {/* Right: Controls */}
            <div className="flex-1 flex items-center justify-end gap-8">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest"
               >
                 <SlidersHorizontal size={16} strokeWidth={1.5} /> Filters
               </button>

               <div className="relative group">
                 <select 
                   value={sort} 
                   onChange={(e) => updateFilter('sort', e.target.value)}
                   className="appearance-none h-10 pl-4 pr-10 bg-transparent text-[11px] font-bold uppercase tracking-widest cursor-pointer focus:outline-none border border-gray-100 rounded-sm hover:border-black transition-colors"
                 >
                   <option value="newest">Latest Arrivals</option>
                   <option value="price_low">Price: Low to High</option>
                   <option value="price_high">Price: High to Low</option>
                   <option value="name_asc">A - Z</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
               </div>
            </div>
         </div>
      </div>

      {/* --- MAIN SHOP CONTENT --- */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* CLEAN SIDEBAR */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-16">
              <div className="space-y-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Categories</h4>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left text-[13px] font-medium transition-colors hover:text-black",
                      !category ? "text-black font-bold" : "text-gray-400"
                    )}
                  >
                    All Collections
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left text-[13px] font-medium transition-colors hover:text-black",
                        category === cat.slug ? "text-black font-bold" : "text-gray-400"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Manufacturers</h4>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => updateFilter('brand', '')}
                    className={cn(
                      "w-full text-left text-[13px] font-medium transition-colors hover:text-black",
                      !brand ? "text-black font-bold" : "text-gray-400"
                    )}
                  >
                    All Brands
                  </button>
                  {availableBrands.map(b => (
                    <button 
                      key={b.id} 
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={cn(
                        "w-full text-left text-[13px] font-medium transition-colors hover:text-black",
                        brand === b.name ? "text-black font-bold" : "text-gray-400"
                      )}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <Loader2 className="animate-spin h-8 w-8 text-gray-200 mb-6" strokeWidth={1.5} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Curating Catalog...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-32 bg-[#FBFBFA] rounded-sm border border-gray-50">
                  <Package size={48} strokeWidth={1} className="mx-auto text-gray-200 mb-6" />
                  <h2 className="text-lg font-light uppercase tracking-widest">No results found</h2>
                  <button 
                    onClick={() => navigate('/shop')} 
                    className="mt-10 bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-gray-800"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-16">
                  {products.map((p) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex flex-col h-full bg-white"
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image Container with Hover Actions */}
                      <div className="relative aspect-[4/5] w-full bg-[#FBFBFA] flex items-center justify-center p-8 overflow-hidden rounded-sm transition-all duration-700 group-hover:bg-[#F5F5F3]">
                        <motion.img 
                          src={getImagePath(p.images)} 
                          alt={p.name} 
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                          animate={hoveredId === p.id ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Quick Action Buttons - Sliding Up on Hover */}
                        <div className="absolute bottom-6 left-0 right-0 px-6 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.22, 1, 0.36, 1]">
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-11 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-xl"
                          >
                            <ShoppingCart size={14} /> Add to Cart
                          </button>
                          <div className="grid grid-cols-2 gap-2">
                            <Link 
                              to={`/product/${p.slug}`}
                              className="h-11 bg-white text-black border border-gray-100 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
                            >
                              <Eye size={14} /> View
                            </Link>
                            <button 
                              onClick={() => toggleWishlist(p)}
                              className={cn(
                                "h-11 bg-white border border-gray-100 flex items-center justify-center transition-all shadow-lg",
                                isInWishlist(p.id) ? "text-red-500 bg-red-50 border-red-100" : "text-black hover:bg-black hover:text-white hover:border-black"
                              )}
                            >
                              <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="pt-6 pb-2 text-center">
                        <Link to={`/product/${p.slug}`} className="block mb-2 group/title">
                          <h3 className="text-[13px] font-semibold text-black uppercase tracking-wide line-clamp-1 group-hover/title:text-gray-500 transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-bold text-black">${p.price}</span>
                          <div className="w-8 h-[1px] bg-gray-100 mt-2 transition-all duration-500 group-hover:w-16 group-hover:bg-black" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-white z-[110] lg:hidden flex flex-col p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-[14px] font-bold uppercase tracking-[0.3em]">Filter By</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} strokeWidth={1.2} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Collections</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-4 py-3 text-[13px] font-medium rounded-sm", !category ? "bg-black text-white" : "bg-gray-50")}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[13px] font-medium rounded-sm", category === cat.slug ? "bg-black text-white" : "bg-gray-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
