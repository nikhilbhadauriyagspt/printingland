import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Printer, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      type: 'user',
      identifier: email.trim(),
      email: email.trim(),
      user_email: email.trim(),
      guest_email: email.trim(),
      username: email.trim(),
      password: password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === 'success') {
        const userData = data.data || data.user || data;
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Could not connect to the authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-hidden flex flex-col lg:flex-row">
      <SEO title="Sign In | Lux Printers" />

      {/* --- LEFT: CONTENT SIDE --- */}
      <div className="w-full lg:w-[45%] bg-slate-900 p-8 md:p-16 lg:p-24 flex flex-col justify-between relative overflow-hidden shrink-0">
         {/* Decorative Blurs */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

         <div className="relative z-10">
            <Link to="/" className="inline-block mb-20">
               <img src="/logo/logo.png" alt="Logo" className="h-10 brightness-0 invert" />
            </Link>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 pt-20"
            >
               <div className="inline-flex items-center  gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
                  <Sparkles size={14} className="fill-current" />
                  Welcome Back
               </div>
               <h1 className="text-5xl md:text-6xl font-black text-white leading-[1] ">
                  Sign In to  <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Account.</span>
               </h1>
               <p className="text-slate-400 text-lg md:text-xl font-bold leading-relaxed max-w-md">
                  Access your machine inventory, track orders, and manage your printing supplies in one place.
               </p>
            </motion.div>
         </div>

         
      </div>

      {/* --- RIGHT: FORM SIDE --- */}
      <div className="flex-1 bg-white p-8 md:p-16 lg:p-24 flex items-center justify-center relative">
         <div className="w-full max-w-md space-y-12">
            <div className="lg:hidden text-center mb-12">
               <h2 className="text-3xl font-black text-slate-900 ">Sign In</h2>
               <p className="text-slate-400 font-bold mt-2">Enter your credentials below</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-red-50 text-red-600 text-[13px] font-bold rounded-2xl border border-red-100 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-600 shrink-0 animate-pulse" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px]">Password</label>
                  <Link to="#" className="text-[10px] font-black text-blue-600 uppercase tracking-[1px] hover:text-slate-900 transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mt-10 group"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : (
                  <>
                    Sign In Account
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-bold text-sm">
                New to Lux Printers?{' '}
                <Link to="/signup" className="text-blue-600 font-black hover:text-slate-900 transition-colors">Create Account</Link>
              </p>
            </div>
         </div>
      </div>
    </div>
  );
}
