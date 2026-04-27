import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Loader2,
  ChevronDown,
  ChevronRight,
  LogOut,
  Mail,
  Truck,
  HelpCircle,
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
  const [categories, setCategories] = useState([]);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState({ name: 'All', slug: '' });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap((parent) => parent.children || []);
          setCategories(allCats.filter((cat) => !cat.name.toLowerCase().includes('laptop')));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsCategoryDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          let url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`;
          if (selectedCategory.slug) {
            url += `&category=${encodeURIComponent(selectedCategory.slug)}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions({ products: data.data || [] });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (selectedCategory.slug) {
        params.set('category', selectedCategory.slug);
      }
      navigate(`/shop?${params.toString()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setSuggestions({ products: [] });
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.role !== 'admin' ? parsed : null);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasMegaMenu: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="w-full bg-black border-b border-gray-200 h-10 flex items-center overflow-hidden">
        <div className="max-w-[1040px] mx-auto w-full px-4 md:px-8 flex justify-between items-center text-[12px] font-medium text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex text-white items-center gap-2">
              <Truck size={14} className="text-white" />
              Free Shipping on All Orders
            </span>
            <Link to="/orders" className="text-white  transition-colors">
              Track Order
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="flex items-center gap-2 text-white transition-colors">
              <HelpCircle size={14} className="text-white" />
              Support
            </Link>
            <a href="mailto:info@printingland.shop" className="flex items-center gap-2 text-white  transition-colors">
              <Mail size={14} className="text-white" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      <header className="w-full bg-blue-800 border-b border-gray-100 sticky top-0 z-[120] shadow-sm">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-white hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <img src="/logo/logo.png" alt="Printing Land" className="h-8 md:h-10 object-contain opacity-0" />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center h-full px-8">
            <ul className="flex items-center gap-8 h-full">
              {navLinks.map((link) => (
                <li 
                  key={link.name} 
                  className="h-full"
                  onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu('shop')}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center h-full px-2 text-[15px] font-semibold transition-colors border-b-4 border-transparent",
                      location.pathname === link.path 
                        ? "text-white border-white" 
                        : "text-white hover:text-white"
                    )}
                  >
                    {link.name}
                    {link.hasMegaMenu && <ChevronDown size={14} className="ml-1 opacity-50" />}
                  </Link>

                  {/* Mega Menu for Shop */}
                  <AnimatePresence>
                    {activeMegaMenu === 'shop' && link.hasMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-[80px] w-full bg-white border-t border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] py-10 z-[130]"
                      >
                        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-4 gap-12">
                          <div className="col-span-3">
                            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Printer Categories</p>
                            <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                              {categories.slice(0, 9).map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={`/shop?category=${cat.slug}`}
                                  className="text-[14px] font-medium text-gray-700 hover:text-black flex items-center gap-2 group"
                                  onClick={() => setActiveMegaMenu(null)}
                                >
                                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 transition-all" />
                                  {cat.name}
                                </Link>
                              ))}
                              <Link
                                to="/shop"
                                className="text-[14px] font-bold text-black hover:underline mt-4 inline-block"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                View All Printers
                              </Link>
                            </div>
                          </div>
                          <div className="col-span-1 bg-gray-50 p-8 rounded-2xl">
                            <h4 className="text-[18px] font-bold text-gray-900 mb-2">Ink & Toner</h4>
                            <p className="text-[13px] text-gray-500 mb-6">Find the right supplies for your printer models.</p>
                            <Link 
                              to="/shop" 
                              className="px-6 py-3 bg-black text-white rounded-full font-bold text-[13px] hover:bg-blue-700 transition-colors inline-block"
                            >
                              Shop Supplies
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Search Toggle */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-white hover:bg-white rounded-full transition-colors flex items-center"
              >
                {isSearchOpen ? <X size={22} /> : <Search size={22} />}
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 520 }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 mr-12 bg-white border border-gray-200 shadow-lg overflow-visible flex items-center pr-2"
                    style={{ borderRadius: '0px' }}
                  >
                    {/* Category Dropdown */}
                    <div className="relative h-full shrink-0 border-r border-gray-100" ref={categoryRef}>
                      <button
                        type="button"
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="h-12 px-4 flex items-center gap-2 text-[13px] font-bold text-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                      >
                        <span className="max-w-[80px] truncate">{selectedCategory.name}</span>
                        <ChevronDown size={14} className={cn("transition-transform duration-300", isCategoryDropdownOpen && "rotate-180")} />
                      </button>

                      <AnimatePresence>
                        {isCategoryDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 w-[200px] bg-white border border-gray-100 shadow-xl py-2 z-[200]"
                            style={{ borderRadius: '0px' }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory({ name: 'All', slug: '' });
                                setIsCategoryDropdownOpen(false);
                              }}
                              className="w-full text-left px-5 py-2.5 text-[13px] font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors uppercase"
                            >
                              All Categories
                            </button>
                            {categories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory({ name: cat.name, slug: cat.slug });
                                  setIsCategoryDropdownOpen(false);
                                }}
                                className="w-full text-left px-5 py-2.5 text-[13px] font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors uppercase truncate"
                              >
                                {cat.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center h-12 px-4">
                      <input
                        autoFocus
                        type="text"
                        placeholder="search products..."
                        className="w-full bg-transparent outline-none text-[14px] text-gray-800 placeholder:text-gray-400 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {isSearching && <Loader2 size={16} className="animate-spin text-black ml-2" />}
                    </form>
                    
                    {/* Suggestions Popover */}
                    <AnimatePresence>
                      {searchQuery.length > 1 && suggestions.products.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-[calc(100%+10px)] right-0 w-[450px] bg-white border border-gray-100 shadow-2xl p-3"
                          style={{ borderRadius: '0px' }}
                        >
                          {suggestions.products.map((p) => {
                            let imageSrc = '';
                            try {
                              imageSrc = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                            } catch { imageSrc = ''; }

                            return (
                              <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                onClick={() => {
                                  setSearchQuery('');
                                  setIsSearchOpen(false);
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="h-12 w-12 bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                  {imageSrc && <img src={imageSrc} alt="" className="max-h-full max-w-full object-contain" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[14px] font-semibold text-gray-900 truncate">{p.name}</p>
                                  <p className="text-[13px] text-black font-bold">${p.price}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Account */}
            <div
              className="p-2.5 text-white hover:bg-whiterounded-full transition-colors relative group cursor-pointer"
            >
              <User size={22} onClick={() => navigate(user ? '/profile' : '/login')} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[150]" style={{ borderRadius: '0px' }}>
                {user ? (
                  <>
                    <p className="px-4 py-2 text-[10px] font-bold text-gray-900 uppercase tracking-widest">My Account</p>
                    <Link to="/profile" className="block px-4 py-2 text-[13px] text-gray-900 hover:bg-gray-50 font-medium">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-[13px] text-gray-900 hover:bg-gray-50 font-medium">My Orders</Link>
                    <button 
                      onClick={() => { localStorage.clear(); window.location.reload(); }}
                      className="w-full text-left px-4 py-2 text-[13px] text-white hover:bg-red-50 flex items-center gap-2 mt-1 border-t border-gray-50 font-bold"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-[12px] text-gray-900 mb-4 font-medium">Sign in to manage your orders and profile.</p>
                    <Link to="/login" className="block w-full py-2 bg-black text-white text-center font-bold text-[12px] hover:bg-blue-700 transition-colors">Sign In</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2.5 text-white hover:bg-white rounded-full transition-colors relative"
            >
              <Heart size={22} className={cn(wishlistCount > 0 && "fill-white")} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-[16px] h-[16px] bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={openCartDrawer}
              className="p-2.5 text-white hover:bg-white rounded-full transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-[16px] h-[16px] bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <img src="/logo/logo.png" alt="" className="h-8" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <X size={22} />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                <div className="mb-8">
                  <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</p>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="py-3 px-4 rounded-xl font-semibold text-[15px] text-gray-700 hover:bg-gray-50 hover:text-black transition-all flex items-center justify-between"
                      >
                        {link.name}
                        <ChevronRight size={16} className="opacity-30" />
                      </Link>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Shop Categories</p>
                  <div className="flex flex-col gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="py-3 px-4 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={() => { localStorage.clear(); window.location.reload(); }}
                    className="w-full py-4 bg-gray-100 text-whiterounded-xl font-bold text-[14px] flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full py-4 bg-black text-white text-center rounded-xl font-bold text-[14px]"
                  >
                    Sign In
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