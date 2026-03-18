import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ArrowRight } from 'lucide-react';
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
            .slice(0, 6);
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
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#FBFBFA] text-black pt-24 pb-12 font-jakarta border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block transition-opacity hover:opacity-80">
              <img src="/logo/logo.png" alt="Mike's Printer" className="h-10 md:h-15 w-auto object-contain" />
            </Link>
            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
              Premium printers and high-quality hardware for every need. Providing reliable printing solutions for homes and businesses across the country.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="text-black shrink-0 mt-1" strokeWidth={1.5} />
                <p className="text-sm font-medium text-gray-600 leading-tight">4100 University Ave, West Des Moines, <br />IA 50266, USA</p>
              </div>
              <div className="flex items-center gap-4 group">
                <Mail size={18} className="text-black shrink-0" strokeWidth={1.5} />
                <p className="text-sm font-medium text-gray-600">info@mikesprinter.shop</p>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Collections</h4>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-gray-500 hover:text-black transition-colors text-[13px] font-medium">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Support</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Track Orders', path: '/orders' },
                  { name: 'FAQs', path: '/faq' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-gray-500 hover:text-black transition-colors text-[13px] font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Policies</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Return Policy', path: '/return-policy' },
                  { name: 'Shipping Policy', path: '/shipping-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-gray-500 hover:text-black transition-colors text-[13px] font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Stay Updated</h4>
              <p className="text-xs text-gray-400 font-medium tracking-wide">Subscribe to receive the latest updates and exclusive offers.</p>
              <form onSubmit={handleSubscribe} className="relative group">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-gray-200 py-4 pr-12 text-[11px] font-bold tracking-[0.2em] text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                />
                <button
                  disabled={loading}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-end text-black hover:scale-110 transition-transform"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={20} strokeWidth={1.2} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
            © 2026 Mike's Printer. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-10 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em] leading-loose">
          Disclaimer - For Informational only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}
