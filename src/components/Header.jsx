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
  ChevronDown,
  LayoutGrid,
  ChevronRight,
  LogOut,
  PhoneCall,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    setIsMobileSearchOpen(false);
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap(parent => parent.children || []);
          const printerCats = allCats.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(printerCats);
        }
      } catch (err) {
        console.error('Category Fetch Error:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
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
      setIsMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') {
          setUser(null);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop'},
    { name: 'Track Order', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header className="w-full z-[100] relative bg-white">
      

        {/* Row 1: Logo, Search, Actions - Full Width */}
        <div className={cn(
          "w-full transition-all duration-300 border-b border-slate-100 bg-white",
          isScrolled ? "py-2" : "py-4 md:py-2"
        )}>
          <div className="w-full px-4 md:px-8 flex items-center justify-between gap-4 lg:gap-12">
            
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="shrink-0">
                <img 
                  src="/logo/logo.png" 
                  alt="Logo" 
                  className={cn("transition-all duration-300", isScrolled ? "h-7 md:h-8" : "h-8 md:h-12")}
                />
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-3xl relative">
              <form onSubmit={handleSearch} className="w-full flex items-center bg-slate-100 rounded-xl border border-transparent focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden h-12">
                <Search size={20} className="ml-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search for printers, ink, or accessories..." 
                  className="flex-1 bg-transparent px-4 py-2 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-8 h-full font-bold text-sm hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl overflow-hidden z-[110] border border-slate-100 mt-2"
                  >
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8 gap-3">
                        <Loader2 size={20} className="animate-spin text-blue-600" />
                        <span className="text-sm text-slate-500 font-bold">Searching...</span>
                      </div>
                    ) : suggestions.products.length > 0 ? (
                      <div className="p-2">
                        {suggestions.products.map(p => {
                          const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                          const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                          return (
                            <Link 
                              key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                              className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-all border-b border-slate-50 last:border-0 group"
                            >
                              <div className="h-12 w-12 bg-white rounded border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                <img src={imageSrc} className="max-h-full max-w-full object-contain p-1 group-hover:scale-110 transition-transform" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                                <p className="text-[12px] font-black text-blue-600">${p.price}</p>
                              </div>
                              <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-sm text-slate-400 font-bold">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-5 shrink-0">
              <button 
                onClick={() => setIsMobileSearchOpen(true)} 
                className="lg:hidden p-2.5 text-slate-700 hover:bg-slate-50 rounded-full transition-all"
              >
                <Search size={22} />
              </button>

              <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 transition-all">
                <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-50">
                  <User size={22} md:size={24} />
                </div>
                <span className="hidden sm:block text-[10px] md:text-[11px] font-bold uppercase er">{user ? 'Profile' : 'Login'}</span>
              </Link>

              <Link to="/wishlist" className="hidden sm:flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-500 transition-all relative group">
                <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-red-50">
                  <Heart size={24} className={cn(wishlistCount > 0 && "fill-current text-red-500")} />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-[11px] font-bold uppercase er group-hover:text-red-500">Wishlist</span>
              </Link>

              <button 
                onClick={openCartDrawer} 
                className="flex flex-col items-center gap-0.5 text-slate-700 hover:text-blue-600 transition-all relative group"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50">
                  <ShoppingCart size={22} md:size={24} />
                </div>
                <span className="hidden sm:block text-[11px] font-bold uppercase er">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 md:h-5 w-4 md:w-5 bg-blue-600 text-white text-[9px] md:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Categories & Main Nav - Full Width */}
        <div className={cn(
          "hidden lg:block w-full border-b border-slate-100 transition-all duration-300",
          isScrolled ? " bg-white shadow-xl py-1" : "bg-white"
        )}>
          <div className="w-full px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Categories Dropdown */}
              <div className="relative py-1" ref={dropdownRef}>
                <button 
                  onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                  className="flex items-center gap-3 py-2 px-6 bg-blue-600 text-white text-[14px] font-bold  hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <LayoutGrid size={18} />
                  <span>Shop Categories</span>
                  <ChevronDown size={16} className={cn("transition-transform duration-200", isAllDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isAllDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                      className="absolute top-full left-0 w-[280px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-xl overflow-hidden mt-1"
                    >
                      <div className="py-2">
                        {categories.map(cat => (
                          <Link 
                            key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                            className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] transition-all group border-b border-slate-50 last:border-0"
                          >
                            <span className="group-hover:text-blue-600 transition-colors">{cat.name}</span>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                        <div className="p-3 bg-slate-50 mt-1">
                          <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-blue-600 transition-all active:scale-95">
                             View All Inventory <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "py-2.5 px-4 text-[14px] font-bold rounded-lg transition-all relative group",
                      location.pathname === link.path ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 transition-all duration-300",
                      location.pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side Row 2 */}
            <div className="flex items-center gap-6">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                  <span className="text-sm font-bold text-slate-800 ">info@luxprinters.shop</span>
               </div>
              
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-white z-[110] p-4 shadow-2xl border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-100 rounded-full px-4 h-12">
                  <Search size={18} className="text-slate-400 shrink-0" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search products..." 
                    className="flex-1 bg-transparent px-3 text-[14px] outline-none font-bold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button 
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="h-12 w-12 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full active:scale-95 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="flex justify-between items-center mb-8 relative z-10">
                   <img src="/logo/logo.png" alt="" className="h-8 brightness-0 invert" />
                   <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                      <X size={20} />
                   </button>
                </div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                      <User size={28} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Account</p>
                      <h2 className="text-lg font-black ">{user ? user.name : 'Sign In'}</h2>
                   </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-4">
                <div className="mb-10">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-5 px-2">Main Navigation</h3>
                  <div className="grid gap-2">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-all group">
                        <span className="group-hover:text-blue-600 transition-colors">{link.name}</span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-5 px-2">Top Categories</h3>
                  <div className="grid gap-2">
                    {categories.slice(0, 6).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 text-slate-700 font-bold transition-all group">
                         {cat.name} 
                         <div className="h-6 w-6 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                            <ChevronRight size={14} />
                         </div>
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-red-100 transition-all">
                     <LogOut size={18} />
                     Logout Session
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]">
                    <User size={18} />
                    Member Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
