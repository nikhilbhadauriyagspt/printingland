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
  ShoppingCart,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
    <div className="bg-white min-h-screen font-['Poppins'] text-slate-900">
      <SEO 
        title="Shop Inventory | Print Ease" 
        description="Browse our high-performance inventory of precision printers."
      />

      {/* --- PAGE HEADER --- */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[2px] w-8 bg-blue-600 rounded-full" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Our Collections</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Shop <span className="text-blue-600">Inventory</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md">
              Browse through our complete range of professional printers and accessories. 
              Found {products.length} items for you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- SIDEBAR FILTERS --- */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              
              {/* Search */}
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4">Search</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Product name..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 text-sm outline-none focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4">Categories</h4>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "text-left px-3 py-2 text-sm font-medium transition-all",
                      !category ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600" : "text-slate-500 hover:text-blue-600"
                    )}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "text-left px-3 py-2 text-sm font-medium transition-all capitalize",
                        category === cat.slug ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600" : "text-slate-500 hover:text-blue-600"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4">Sort By</h4>
                <div className="relative">
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-11 pl-4 pr-10 bg-white border border-slate-200 text-sm outline-none appearance-none cursor-pointer focus:border-blue-600 transition-all"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Alphabetical</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

            </div>
          </aside>

          {/* --- MOBILE FILTER TOGGLE --- */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
             <button 
               onClick={() => setIsMobileFilterOpen(true)}
               className="flex-1 h-12 bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
             >
                <Filter size={18} /> Filter & Sort
             </button>
          </div>

          {/* --- PRODUCT GRID --- */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-slate-50 animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-100">
                <Package size={48} className="mx-auto text-slate-200 mb-4" />
                <h2 className="text-xl font-bold text-slate-900">No products found</h2>
                <p className="text-slate-500 mb-6">Try changing your filters or search terms.</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="bg-blue-600 text-white px-8 py-3 font-bold text-sm hover:bg-slate-900 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index % 8) * 0.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white border border-slate-200 overflow-hidden flex flex-col h-full">
                      <Link to={`/product/${p.slug}`} className="relative block aspect-square bg-white overflow-hidden p-4 border-b border-slate-100">
                        <img 
                          src={getImagePath(p.images)} 
                          alt={p.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                        />
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(p);
                          }}
                          className="absolute top-2 right-2 h-8 w-8 bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Heart size={14} className={isInWishlist(p.id) ? "fill-red-500 text-red-500" : ""} />
                        </button>
                      </Link>

                      <div className="p-3 flex flex-col flex-1">
                        <div className="flex-1">
                          <Link to={`/product/${p.slug}`} className="text-[12px] md:text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors mb-2">
                            {p.name}
                          </Link>
                        </div>
                        
                        <div className="mt-auto pt-3 flex flex-col gap-3">
                          <p className="text-[15px] md:text-[16px] font-bold text-slate-900 text-left">
                            ${p.price}
                          </p>
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full py-2.5 bg-blue-600 text-white text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95"
                          >
                            <ShoppingCart size={14} strokeWidth={2.5} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
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
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[210] lg:hidden flex flex-col"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
                  <h3 className="text-sm font-bold uppercase tracking-widest">Filter & Sort</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 flex items-center justify-center">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Search Mobile */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Search</h4>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Product name..."
                        value={search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-100 text-sm outline-none focus:border-blue-600 transition-all"
                      />
                    </div>
                  </div>

                  {/* Categories Mobile */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Categories</h4>
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => updateFilter('category', '')}
                        className={cn(
                          "text-left px-4 py-3 text-sm font-medium transition-all",
                          !category ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600" : "text-slate-600 bg-slate-50"
                        )}
                      >
                        All Products
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.id} 
                          onClick={() => updateFilter('category', cat.slug)}
                          className={cn(
                            "text-left px-4 py-3 text-sm font-medium transition-all capitalize",
                            category === cat.slug ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600" : "text-slate-600 bg-slate-50"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Mobile */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Sort By</h4>
                    <div className="grid gap-1">
                       {['newest', 'price_low', 'price_high', 'name_asc'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateFilter('sort', s)}
                            className={cn(
                              "px-4 py-3 text-sm font-medium text-left transition-all",
                              sort === s ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600" : "text-slate-600 bg-slate-50"
                            )}
                          >
                             {s === 'newest' ? 'Latest Arrivals' : s === 'price_low' ? 'Price: Low to High' : s === 'price_high' ? 'Price: High to Low' : 'Alphabetical'}
                          </button>
                       ))}
                    </div>
                  </div>
               </div>

               <div className="p-6 border-t border-slate-100">
                  <button onClick={() => setIsMobileFilterOpen(false)} className="w-full h-12 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest transition-all active:scale-95">
                     Apply
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
