import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const subNavCategories = [
    { name: 'All-in-One', img: '/category/all-in-one-printers.jpg', slug: 'all-in-one-printers' },
    { name: 'Laser', img: '/category/laser-printers.jpg', slug: 'laser-printers' },
    { name: 'Inkjet', img: '/category/inkjet-printers.jpg', slug: 'inkjet-printers' },
    { name: 'Thermal', img: '/category/thermal-printers.jpg', slug: 'thermal-printers' },
    { name: 'Dot Matrix', img: '/category/dot-matrix-printers.jpg', slug: 'dot-matrix-printers' },
    { name: 'Large Format', img: '/category/large-format-printers.jpg', slug: 'large-format-printers' },
    { name: 'Photo', img: '/category/photo-printers.jpg', slug: 'photo-printers' },
    { name: 'LED', img: '/category/led-printers.jpg', slug: 'led-printers' },
    { name: 'Accessories', img: '/category/printer-accessories.jpg', slug: 'printer-accessories' },
    { name: 'Supertank', img: '/category/supertank-printers.jpg', slug: 'supertank-printers' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#ffffff] border-b border-gray-100 font-jakarta">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Left: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={cn(
                    "text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 relative group py-2",
                    location.pathname === link.path ? "text-black" : "text-gray-600 hover:text-black"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full",
                    location.pathname === link.path && "w-full"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <div className="flex-none lg:flex-1 flex justify-center">
              <Link to="/" className="transition-opacity hover:opacity-80 duration-300">
                <img src="/logo/logo.png" alt="Mike's Printer" className="h-8 md:h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* Right: Icons with Labels */}
            <div className="flex items-center justify-end gap-6 md:gap-8 flex-1">
              <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2.5 text-black hover:text-gray-500 transition-colors group">
                <Search size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden xl:inline text-[11px] font-bold tracking-[0.1em] uppercase">Search</span>
              </button>

              <Link to={user ? "/profile" : "/login"} className="flex items-center gap-2.5 text-black hover:text-gray-500 transition-colors group">
                <User size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden xl:inline text-[11px] font-bold tracking-[0.1em] uppercase">{user ? "Profile" : "Login"}</span>
              </Link>

              <Link to="/wishlist" className="flex items-center gap-2.5 text-black hover:text-gray-500 transition-colors group relative">
                <div className="relative">
                  <Heart size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-black rounded-full ring-2 ring-white" />}
                </div>
                <span className="hidden xl:inline text-[11px] font-bold tracking-[0.1em] uppercase">Wishlist</span>
              </Link>

              <button onClick={openCartDrawer} className="flex items-center gap-2.5 text-black hover:text-gray-500 transition-colors group relative">
                <div className="relative">
                  <ShoppingCart size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-black rounded-full ring-2 ring-white" />}
                </div>
                <span className="hidden xl:inline text-[11px] font-bold tracking-[0.1em] uppercase">Cart</span>
              </button>

              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-black p-1 ml-2"><Menu size={24} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>

        {/* --- THIN SUB-HEADER MARQUEE --- */}
        <div className="hidden md:block bg-gray-100 border-b border-gray-100 py-1.5 overflow-hidden">
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative group/marquee">
            <div className="flex animate-marquee whitespace-nowrap gap-12 pause-on-hover">
              {[...subNavCategories, ...subNavCategories].map((cat, idx) => (
                <Link key={idx} to={`/shop?category=${cat.slug}`} className="flex items-center gap-3 transition-all hover:scale-105">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-gray-100 shadow-sm shrink-0">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/70">{cat.name} Printers</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- PREMIUM SEARCH OVERLAY --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-white flex flex-col"
            >
              {/* Search Top Bar */}
              <div className="h-32 border-b border-gray-50 flex items-center px-6 lg:px-12">
                <div className="max-w-[1920px] mx-auto w-full flex items-center gap-8">
                  <Search size={24} className="text-black shrink-0" strokeWidth={1.5} />
                  <form onSubmit={handleSearch} className="flex-1">
                    <input 
                      type="text" autoFocus
                      placeholder="ENTER SEARCH TERMS..." 
                      className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-light tracking-tight uppercase placeholder:text-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-50 hover:bg-black hover:text-white transition-all duration-500"
                  >
                    <X size={24} strokeWidth={1.2} />
                  </button>
                </div>
              </div>

              {/* Search Content */}
              <div className="flex-1 overflow-y-auto bg-[#FBFBFA]">
                <div className="max-w-6xl mx-auto py-20 px-6">
                  {searchQuery.length === 0 ? (
                    <div className="space-y-12">
                      <div className="space-y-6 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Quick Finder</span>
                        <h3 className="text-xl font-light uppercase tracking-widest text-black">Popular Categories</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subNavCategories.slice(0, 4).map(cat => (
                          <Link 
                            key={cat.slug} to={`/shop?category=${cat.slug}`} onClick={() => setIsSearchOpen(false)}
                            className="bg-white p-8 border border-gray-100 rounded-sm text-center hover:shadow-xl transition-all group"
                          >
                            <img src={cat.img} alt="" className="h-12 w-12 object-contain mx-auto mb-4 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] font-bold uppercase tracking-widest">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-12">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Search Results</span>
                        {isSearching && <Loader2 size={16} className="animate-spin text-gray-300" />}
                      </div>

                      {suggestions.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                          {suggestions.products.map(p => {
                            const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                            const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                            return (
                              <Link 
                                key={p.id} to={`/product/${p.slug}`} onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-8 group bg-white p-4 rounded-sm border border-transparent hover:border-gray-100 hover:shadow-sm transition-all"
                              >
                                <div className="h-24 w-24 bg-[#FBFBFA] flex items-center justify-center p-4 rounded-sm shrink-0 overflow-hidden">
                                  <img src={imageSrc} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt="" />
                                </div>
                                <div className="space-y-1 flex-1">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{p.brand_name || 'Premium'}</span>
                                  <h4 className="text-[15px] font-medium uppercase tracking-tight line-clamp-1">{p.name}</h4>
                                  <p className="text-[13px] font-light text-black">${p.price}</p>
                                </div>
                                <ArrowRight size={18} className="text-gray-200 group-hover:text-black transition-all" />
                              </Link>
                            );
                          })}
                        </div>
                      ) : !isSearching && (
                        <div className="text-center py-20 space-y-4">
                          <Package size={48} className="mx-auto text-gray-100" strokeWidth={1} />
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-300">No products found for your query</p>
                        </div>
                      )}
                      
                      {suggestions.products.length > 0 && (
                        <div className="text-center pt-8">
                          <button onClick={handleSearch} className="text-[11px] font-bold uppercase tracking-[0.4em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-200 transition-all">View All Results</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-[136px]"></div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-black/10 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-50">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-black"><X size={24} strokeWidth={1.2} /></button>
              </div>
              <nav className="flex flex-col p-8 gap-8">
                {navLinks.map(link => (
                  <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="text-[14px] font-semibold tracking-[0.2em] uppercase text-black hover:text-gray-400 transition-colors">{link.name}</Link>
                ))}
              </nav>
              <div className="mt-auto p-8 border-t border-gray-50 grid gap-4">
                <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">My Account</Link>
                <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">Wishlist</Link>
                <Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">Support</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
