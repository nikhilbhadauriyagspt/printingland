import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Package,
  Heart,
  ChevronDown,
  ShoppingBag,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
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
          const all = d.data.flatMap(parent => [
            parent,
            ...(parent.children || [])
          ]);
          
          const filtered = all.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('macbook') &&
            !cat.name.toLowerCase().includes('notebook') &&
            !cat.name.toLowerCase().includes('pc') &&
            !cat.name.toLowerCase().includes('computer') &&
            !cat.name.toLowerCase().includes('chromebook')
          );

          const unique = Array.from(new Map(filtered.map(item => [item.slug, item])).values());
          setCategories(unique);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
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
  }, [searchParams, pathCategory, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
    if(isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="Shop Inventory | Iconic Printers" 
        description="Browse our high-performance inventory of precision printers."
      />

      {/* --- PROFESSIONAL HEADER --- */}
      <section className="pt-28 md:pt-20 pb-12 md:pb-16 bg-white border-b border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-3 max-w-3xl">
             <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Full Collection</span>
             </div>
             <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-black  leading-none">
                  <span className="text-slate-900">Our</span> <span className="text-blue-600 relative">Inventory
                    <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">
                  Displaying {products.length} professional units engineered for excellence.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE FILTER TOGGLE --- */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-4 shadow-sm">
         <button 
           onClick={() => setIsMobileFilterOpen(true)}
           className="w-full h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest active:scale-[0.98] transition-transform"
         >
            <Filter size={16} />
            Filter & Sort
         </button>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-16 py-12 md:py-20 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-10">
              
              {/* Search */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-4 flex items-center gap-3">
                   Search <div className="h-[1px] flex-1 bg-slate-100" />
                </h4>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Product name..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-4 flex items-center gap-3">
                   Categories <div className="h-[1px] flex-1 bg-slate-100" />
                </h4>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all border",
                      !category ? "bg-slate-900 text-white border-slate-900" : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span>All Collections</span>
                    {!category && <ChevronRight size={14} className="text-white/70" />}
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all border",
                        category === cat.slug ? "bg-slate-900 text-white border-slate-900" : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      {category === cat.slug && <ChevronRight size={14} className="text-white/70" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-4 flex items-center gap-3">
                   Sort By <div className="h-[1px] flex-1 bg-slate-100" />
                </h4>
                <div className="relative">
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-blue-600 focus:bg-white transition-all"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Alphabetical</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

            </div>
          </aside>

          {/* --- MAIN PRODUCT AREA --- */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-4">
                    <Skeleton className="w-full aspect-square rounded-xl bg-slate-50 mb-5" />
                    <Skeleton className="h-4 w-3/4 bg-slate-50 mb-2" />
                    <Skeleton className="h-5 w-1/4 bg-slate-50 mb-4" />
                    <Skeleton className="h-11 w-full rounded-xl bg-slate-50 mt-auto" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                   <Package size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">No Matches Found</h2>
                <p className="text-slate-500 font-medium text-sm mb-8 max-w-sm mx-auto">We couldn't find any units matching your current search parameters.</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95"
                >
                  Reset Inventory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 4) * 0.05 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <Link to={`/product/${p.slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
                      
                      {/* Image Container */}
                      <div className="relative aspect-square rounded-xl bg-white flex items-center justify-center p-6 mb-5 overflow-hidden">
                        <img 
                          src={getImagePath(p.images)} 
                          alt={p.name} 
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                        />
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
                            isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500 hover:scale-110"
                          )}
                        >
                          <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-1">
                        <h4 className="text-[13px] font-bold text-slate-900 truncate mb-1 uppercase ">
                          {p.name}
                        </h4>
                        <p className="text-lg font-black text-blue-600 mb-4">
                          ${p.price}
                        </p>
                        
                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          className="mt-auto w-full h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                        >
                          <ShoppingBag size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* --- MOBILE FILTER SIDEBAR OVERLAY --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[210] lg:hidden flex flex-col shadow-2xl"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                  <h3 className="text-sm font-black uppercase tracking-[2px]">Filter & Sort</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Search Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Search Inventory</h4>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Product name..."
                        value={search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Categories Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Select Category</h4>
                    <div className="flex flex-col gap-1.5">
                      <button 
                        onClick={() => updateFilter('category', '')}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all border",
                          !category ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-600"
                        )}
                      >
                        All Collections
                        {!category && <ChevronRight size={14} className="text-white/70" />}
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.id} 
                          onClick={() => updateFilter('category', cat.slug)}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all border",
                            category === cat.slug ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-600"
                          )}
                        >
                          <span className="truncate pr-2">{cat.name}</span>
                          {category === cat.slug && <ChevronRight size={14} className="text-white/70" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Sort Display</h4>
                    <div className="grid gap-1.5">
                       {['newest', 'price_low', 'price_high', 'name_asc'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateFilter('sort', s)}
                            className={cn(
                              "px-4 py-3 rounded-xl text-[13px] font-bold text-left border transition-all",
                              sort === s ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-600"
                            )}
                          >
                             {s === 'newest' ? 'Latest Arrivals' : s === 'price_low' ? 'Price: Low to High' : s === 'price_high' ? 'Price: High to Low' : 'Alphabetical'}
                          </button>
                       ))}
                    </div>
                  </div>
               </div>

               <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <button onClick={() => setIsMobileFilterOpen(false)} className="w-full h-12 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-md hover:bg-slate-900 transition-all active:scale-95">
                     Apply Changes
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
