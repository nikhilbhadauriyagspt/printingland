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
  Mail
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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }, 
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 font-['Poppins']",
        isScrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.1)]" : "border-b border-slate-100"
      )}>
        {/* --- ROW 1: BRAND, SEARCH & ACTIONS --- */}
        <div className="bg-white py-2 md:py-4">
          <div className="max-w-[1920px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4 md:gap-12">
            
            {/* LOGO AREA */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-2 text-slate-900 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="shrink-0 flex items-center group">
                <img 
                  src="/logo/logo.png" 
                  alt="Print Ease" 
                  className="h-7 md:h-12 transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* SEARCH BAR (CENTERED - DESKTOP) */}
            <div className="hidden lg:block flex-1 max-w-2xl relative">
              <form onSubmit={handleSearch} className="relative group">
                <input 
                  type="text" 
                  placeholder="What are you looking for today?" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-full pl-6 pr-14 py-3 text-[14px] font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                  <Search size={18} strokeWidth={2.5} />
                </button>
                
                {isSearching && (
                   <Loader2 size={16} className="absolute right-14 top-1/2 -translate-y-1/2 text-blue-600 animate-spin" />
                )}
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+12px)] left-0 w-full bg-white shadow-2xl rounded-2xl overflow-hidden z-[110] border border-slate-100 p-2"
                  >
                    {suggestions.products.length > 0 ? (
                      <div className="grid gap-1">
                        {suggestions.products.map(p => (
                          <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-all group">
                             <div className="h-12 w-12 bg-white rounded-lg border border-slate-100 flex items-center justify-center p-1.5 shadow-sm group-hover:border-blue-200">
                                <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} alt="" className="max-h-full max-w-full object-contain" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                                <p className="text-[13px] font-bold text-blue-600">${p.price}</p>
                             </div>
                             <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-sm text-slate-400 font-medium">No products found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTION ICONS */}
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              <button 
                onClick={() => setIsMobileSearchOpen(true)} 
                className="lg:hidden h-10 w-10 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
              >
                <Search size={22} />
              </button>

              <Link to={user ? "/profile" : "/login"} className="hidden sm:flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors group">
                <div className="h-10 w-10 flex items-center justify-center bg-slate-50 group-hover:bg-blue-50 rounded-full transition-all border border-transparent group-hover:border-blue-100">
                  <User size={20} />
                </div>
                <div className="hidden xl:block leading-none">
                  <p className="text-[10px] text-slate-400 mb-0.5 font-medium">Account</p>
                  <p className="text-[13px] font-semibold text-slate-900">{user ? user.name.split(' ')[0] : 'Sign In'}</p>
                </div>
              </Link>

              <Link to="/wishlist" className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors group relative">
                <div className="h-10 w-10 flex items-center justify-center bg-slate-50 group-hover:bg-blue-50 rounded-full transition-all border border-transparent group-hover:border-blue-100">
                  <Heart size={20} className={cn(wishlistCount > 0 && "fill-blue-600 text-blue-600")} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:block leading-none">
                  <p className="text-[10px] text-slate-400 mb-0.5 font-medium">Favorites</p>
                  <p className="text-[13px] font-semibold text-slate-900">Wishlist</p>
                </div>
              </Link>

              <button 
                onClick={openCartDrawer} 
                className="h-[46px] md:h-[50px] px-4 md:px-7 bg-blue-600 hover:bg-slate-900 text-white rounded-full transition-all flex items-center gap-3 shadow-lg shadow-blue-100 active:scale-95 group"
              >
                <div className="relative">
                  <ShoppingCart size={20} strokeWidth={2.5} />
                  <span className="absolute -top-3 -right-3 h-5 w-5 bg-white text-blue-600 text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                </div>
                <span className="text-[14px] font-semibold hidden sm:block">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- ROW 2: NAVIGATION & CATEGORIES --- */}
        <div className="hidden lg:block bg-blue-600">
          <div className="max-w-[1920px] mx-auto px-10 h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-2 h-full">
              {/* Categories Trigger */}
              <div className="relative h-full" ref={dropdownRef}>
                 <button 
                   onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                   className={cn(
                     "flex items-center gap-3 px-6 h-full text-[14px] font-semibold transition-all",
                     isAllDropdownOpen ? "bg-white text-blue-600" : "bg-blue-700 text-white hover:bg-blue-800"
                   )}
                 >
                   <LayoutGrid size={18} />
                   <span>Categories</span>
                   <ChevronDown size={14} className={cn("transition-transform duration-300", isAllDropdownOpen && "rotate-180")} />
                 </button>

                 <AnimatePresence>
                   {isAllDropdownOpen && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }} 
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute top-full left-0 w-[280px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-b-2xl overflow-hidden"
                     >
                        <div className="py-2">
                          {categories.slice(0, 10).map(cat => (
                            <Link 
                              key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                              className="flex items-center justify-between px-6 py-3.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium text-[14px] transition-all"
                            >
                              <span>{cat.name}</span>
                              <ChevronRight size={14} className="text-slate-200" />
                            </Link>
                          ))}
                          <div className="p-4 bg-slate-50 mt-1 border-t border-slate-100">
                             <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-[12px] font-semibold hover:bg-slate-900 transition-all">
                                View Catalog <ArrowRight size={14} />
                             </Link>
                          </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {/* Main Nav Links */}
              <nav className="flex items-center h-full ml-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "px-6 h-full flex items-center text-[14px] font-medium transition-all relative group text-white/95 hover:text-white",
                    )}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div layoutId="nav-active-pill" className="absolute bottom-2 left-6 right-6 h-[2px] bg-white rounded-full" />
                    )}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-8 text-white/95">
               <div className="flex items-center gap-2 text-[13px] font-medium">
                  <Mail size={16} strokeWidth={2} />
                  <span>info@printease.shop</span>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-white z-[200] p-4 shadow-2xl border-b-2 border-blue-600"
            >
              <div className="flex items-center gap-3">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-full px-5 h-12">
                  <Search size={20} className="text-blue-600" />
                  <input 
                    autoFocus type="text" placeholder="Search products..." 
                    className="flex-1 bg-transparent px-3 text-sm font-medium outline-none text-slate-900"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button onClick={() => setIsMobileSearchOpen(false)} className="h-12 w-12 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full transition-colors active:bg-blue-50 active:text-blue-600"><X size={24} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-md" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[210] flex flex-col shadow-2xl font-['Poppins']"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                 <img src="/logo/logo.png" alt="" className="h-8" />
                 <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 no-scrollbar">
                <div className="mb-10">
                  <p className="text-[12px] font-bold text-slate-400 mb-4 pl-4 border-l-4 border-blue-600">Explore</p>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} 
                        className={cn(
                          "py-4 px-4 rounded-xl font-semibold text-[15px] transition-all",
                          location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-slate-700 active:bg-slate-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold text-slate-400 mb-4 pl-4 border-l-4 border-slate-200">Categories</p>
                  <div className="grid gap-1">
                    {categories.slice(0, 10).map(cat => (
                       <Link 
                        key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} 
                        className="py-4 px-4 text-slate-700 active:text-blue-600 font-medium text-[15px] transition-all flex items-center justify-between hover:bg-slate-50 rounded-xl"
                       >
                         <span>{cat.name}</span>
                         <ChevronRight size={16} className="text-slate-300" />
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex flex-col gap-3">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2">
                     <LogOut size={18} /> Logout
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block w-full py-4 bg-blue-600 text-white text-center rounded-xl font-semibold text-[14px] shadow-lg shadow-blue-100">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-[60px] md:h-[130px]" />
    </>
  );
}
