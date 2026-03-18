import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBFBFA] font-jakarta px-6 py-20 text-black">
      <SEO title="Create Account | Mike's Printer" />
      
      <div className="max-w-[480px] w-full">
        {/* --- PREMIUM HEADER --- */}
        <div className="text-center mb-12 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 block"
          >
            Join The Network
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light uppercase tracking-tight"
          >
            Create <span className="font-semibold italic">Account</span>
          </motion.h1>
        </div>

        {/* --- FORM PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] rounded-sm"
        >
          <form onSubmit={handleSignup} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest text-center border border-red-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type="text" placeholder="YOUR NAME" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 pl-8 pr-4 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[12px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type="email" placeholder="YOUR EMAIL" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 pl-8 pr-4 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[12px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type="tel" placeholder="OPTIONAL" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-12 pl-8 pr-4 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[12px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-12 pl-8 pr-10 bg-transparent border-b border-gray-100 focus:border-black outline-none text-[12px] font-medium transition-all placeholder:text-gray-200 uppercase tracking-wider"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center gap-4 bg-black text-white h-14 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                  {loading ? "Processing..." : "Create Account"}
                </span>
                {!loading && <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />}
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Already a member?
              <Link to="/login" className="text-black border-b border-black pb-0.5 ml-3 hover:text-gray-600 hover:border-gray-600 transition-colors">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
