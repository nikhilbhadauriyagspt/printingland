import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Phone } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-jakarta text-slate-900 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden py-12">
      <SEO title="Create Account | Iconic Printers" />

      {/* Subtle Background Accents */}
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 sm:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <img src="/logo/logo.png" alt="Logo" className="h-8 mx-auto" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 ">Create Account</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Join us for premium printing solutions.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 mb-2 text-center">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-14 pl-12 pr-6 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-14 pl-12 pr-6 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-14 pl-12 pr-6 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-14 pl-12 pr-12 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full h-14 pl-12 pr-12 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              id="showPass"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer transition-all"
            />
            <label htmlFor="showPass" className="text-xs font-medium text-slate-500 cursor-pointer select-none">Show Passwords</label>
          </div>

          <button
            disabled={loading}
            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-8 group"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                Create Account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:text-slate-900 transition-colors">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
