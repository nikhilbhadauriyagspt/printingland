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
  LogOut
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
    { name: 'Orders', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full border-b py-3 md:py-4 bg-white/95 backdrop-blur-md",
        isScrolled ? "shadow-md border-slate-100" : "border-transparent"
      )}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between gap-6">
            
            {/* --- LEFT: LOGO & MOBILE MENU --- */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-2 -ml-2 text-slate-900"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="shrink-0">
                <img 
                  src="/logo/logo.png" 
                  alt="Iconic Printers" 
                  className="h-5 md:h-12 transition-all duration-300 object-contain"
                />
              </Link>
            </div>

            {/* --- CENTER: NAVIGATION LINKS (DESKTOP) --- */}
            <nav className="hidden lg:flex items-center gap-2">
              {/* Category Dropdown */}
              <div className="relative" ref={dropdownRef}>
                 <button 
                   onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                   className="flex items-center gap-2 px-4 py-2 text-[13px] font-black uppercase tracking-wider text-slate-900 hover:text-blue-600 transition-colors"
                 >
                   <LayoutGrid size={18} className="text-blue-600" />
                   <span>Categories</span>
                   <ChevronDown size={14} className={cn("transition-transform duration-200", isAllDropdownOpen && "rotate-180")} />
                 </button>

                 <AnimatePresence>
                   {isAllDropdownOpen && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }} 
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute top-full left-0 w-[260px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-xl overflow-hidden mt-2"
                     >
                        <div className="py-2">
                          {categories.slice(0, 10).map(cat => (
                            <Link 
                              key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                              className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 text-slate-700 font-bold text-[13px] transition-colors"
                            >
                              <span>{cat.name}</span>
                              <ChevronRight size={14} className="text-slate-300" />
                            </Link>
                          ))}
                          <div className="p-3 bg-slate-50 mt-1">
                             <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                                View All <ArrowRight size={14} />
                             </Link>
                          </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link 
                  key={link.name} to={link.path} 
                  className={cn(
                    "px-4 py-2 text-[13px] font-black uppercase tracking-wider transition-colors",
                    location.pathname === link.path ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* --- RIGHT: SEARCH & ACTIONS --- */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search Bar (Desktop) */}
              <div className="hidden lg:block relative w-[280px] xl:w-[350px]">
                <form onSubmit={handleSearch} className="relative">
                  <input 
                    type="text" 
                    placeholder="Search printers..." 
                    className="w-full bg-slate-100 border-none rounded-lg px-10 py-2.5 text-[13px] font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </form>

                {/* Suggestions */}
                <AnimatePresence>
                  {searchQuery.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl overflow-hidden z-[110] border border-slate-100 mt-2 p-1"
                    >
                      {suggestions.products.length > 0 ? (
                        suggestions.products.map(p => (
                          <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                             <div className="h-10 w-10 bg-white rounded border border-slate-100 flex items-center justify-center p-1">
                                <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} alt="" className="max-h-full max-w-full object-contain" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-bold text-slate-800 truncate">{p.name}</p>
                                <p className="text-[11px] font-black text-blue-600">${p.price}</p>
                             </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-400 font-bold">No results found</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button 
                  onClick={() => setIsMobileSearchOpen(true)} 
                  className="lg:hidden h-10 w-10 flex items-center justify-center text-slate-700"
                >
                  <Search size={20} />
                </button>

                <Link to={user ? "/profile" : "/login"} className="h-10 w-10 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors relative group">
                  <User size={20} />
                </Link>

                <Link to="/wishlist" className="h-10 w-10 flex items-center justify-center text-slate-700 hover:text-red-500 transition-colors relative group">
                  <Heart size={20} className={cn(wishlistCount > 0 && "fill-current text-red-500")} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button 
                  onClick={openCartDrawer} 
                  className="flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-slate-900 text-white rounded-lg transition-colors ml-1 shadow-lg shadow-blue-100"
                >
                  <ShoppingCart size={18} />
                  <span className="text-[11px] font-black uppercase tracking-wider hidden sm:block">Cart ({cartCount})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-white z-[200] p-4 shadow-xl border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-100 rounded-lg px-4 h-12">
                  <Search size={20} className="text-slate-400" />
                  <input 
                    autoFocus type="text" placeholder="Search products..." 
                    className="flex-1 bg-transparent px-3 text-sm font-bold outline-none"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button onClick={() => setIsMobileSearchOpen(false)} className="h-12 w-12 flex items-center justify-center text-slate-500"><X size={24} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-slate-900/60" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className=" text-white p-6 flex justify-between items-center">
                 <img src="/logo/logo.png" alt="" className="h-8 " />
                 <button className="text-black" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <div className="mb-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="py-3 text-slate-700 font-bold border-b border-slate-50">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Categories</p>
                  <div className="grid gap-1">
                    {categories.slice(0, 10).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="py-3 text-slate-700 font-bold border-b border-slate-50">
                         {cat.name}
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-4 bg-red-50 text-red-600 rounded-lg font-black uppercase text-[11px]">Logout</button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg font-black uppercase text-[11px]">Member Login</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="h-16 md:h-20" />
    </>
  );
}
