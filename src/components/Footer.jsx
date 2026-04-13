import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ShieldCheck, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

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
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Orders', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-white text-slate-900 pt-16 pb-10 font-['Poppins'] border-t border-slate-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        
        {/* --- TOP SECTION: NEWSLETTER --- */}
        <div className="mb-16 p-8 md:p-12 bg-blue-50 border border-blue-100 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Join Our Newsletter</h3>
            <p className="text-slate-500 text-sm md:text-base font-medium">Get the latest deals and printer news delivered to your inbox every week.</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 w-full max-w-lg border-2 border-blue-600">
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="flex-1 bg-white px-6 py-4 text-sm font-medium outline-none placeholder:text-slate-400"
            />
            <button
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shrink-0 uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Subscribe <Send size={16} /></>}
            </button>
          </form>
        </div>

        {/* --- MAIN LINKS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/">
              <img src="/logo/logo.png" alt="Print Ease" className="h-10 md:h-12" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              We provide the best printers and accessories for your home and office. Trust us for high quality and great service.
            </p>
            <div className="space-y-4 pt-2">
               <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 mt-0.5" />
                  <span className="text-sm text-slate-600">1901 S Woodrow St, Little Rock, AR 72204, USA</span>
               </div>
               <div className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600" />
                  <a href="mailto:info@printease.shop" className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">info@printease.shop</a>
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-all inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-all inline-block capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-all inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 Print Ease. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-blue-600" />
               <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">SSL Secure Checkout</span>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 " />
          </div>
        </div>

        <div className="mt-8 text-center border-t border-slate-50 pt-6">
           <p className="text-slate-600 text-[10px] font-medium italic">
              Disclaimer - For Informational only. No software installation or distribution.
           </p>
        </div>
      </div>
    </footer>
  );
}
