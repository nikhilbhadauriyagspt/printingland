import { Link } from 'react-router-dom';
import { Mail, MapPin, Loader2, Globe, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 5);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Track Order', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="w-full bg-white text-gray-900 pt-20 pb-10 border-t border-gray-100 font-['Poppins']">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* --- Main Multi-Column Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Newsletter (Span 4) */}
          <div className="lg:col-span-4 pr-0 lg:pr-16">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo/logo.png" alt="Printing Land" className="h-10 md:h-12 object-contain" />
            </Link>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-10 max-w-sm">
              Your professional destination for world-class printing technology. We provide high-performance hardware and comprehensive support for your home and office needs.
            </p>
            
            <div className="mb-10">
              <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-4">Stay Connected</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 border border-gray-200 focus-within:border-black transition-colors">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for updates"
                  className="flex-1 bg-gray-50/50 px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                />
                <button
                  disabled={loading}
                  className="bg-gray-900 text-white px-6 py-3 text-[12px] font-bold hover:bg-black transition-all uppercase tracking-widest whitespace-nowrap"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Join"}
                </button>
              </form>
            </div>

            
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-black text-[14px] font-medium transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-8">Products</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-500 hover:text-black text-[14px] font-medium transition-colors block capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Contact (Span 4) */}
          <div className="lg:col-span-4 lg:pl-10">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-900 mb-8">Contact Support</h4>
            <ul className="space-y-8">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                  <a href="mailto:info@printingland.shop" className="text-[14px] font-bold text-gray-900 hover:text-black transition-colors">
                    info@printingland.shop
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Office</p>
                  <p className="text-[14px] font-medium text-gray-900 leading-relaxed">
                    5 SE 1st St, Miami, FL 33131, USA
                  </p>
                </div>
              </li>
             
            </ul>
          </div>
        </div>

        {/* --- Bottom Utility Row --- */}
        <div className="pt-8 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">© {new Date().getFullYear()} Printing Land. All rights reserved.</p>
            {legalLinks.map((link) => (
               <Link key={link.name} to={link.path} className="text-[12px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
                 {link.name}
               </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <div className="w-px h-3 bg-gray-300" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Payments</span>
             </div>
          </div>
        </div>

        {/* --- Professional Disclaimer --- */}
        <div className="mt-8 text-center md:text-left">
           <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em] leading-loose max-w-4xl">
             Disclaimer: For informational purposes only.No unauthorized software distribution.
           </p>
        </div>

      </div>
    </footer>
  );
}