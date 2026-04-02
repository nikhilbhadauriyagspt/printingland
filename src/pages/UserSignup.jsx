import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles, Zap, Package } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
 
export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-hidden flex flex-col lg:flex-row">
      <SEO title="Create Your Account | Lux Printers" />

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
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
                  <Sparkles size={14} className="fill-current" />
                  Join the Community
               </div>
               <h1 className="text-5xl md:text-6xl font-black text-white leading-[1] ">
                  Start Your  <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Journey.</span>
               </h1>
               <p className="text-slate-400 text-lg md:text-xl font-bold leading-relaxed max-w-md">
                  Create an account to unlock exclusive access to the United States' premier source for professional-grade printing solutions.
               </p>
            </motion.div>
         </div>

         
      </div>

      {/* --- RIGHT: FORM SIDE --- */}
      <div className="flex-1 bg-white p-8 md:p-16 lg:p-24 flex items-center justify-center relative overflow-y-auto">
         <div className="w-full max-w-md space-y-10 my-auto">
            <div className="lg:hidden text-center mb-12">
               <h2 className="text-3xl font-black text-slate-900 ">Create Account</h2>
               <p className="text-slate-400 font-bold mt-2">Join us today</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-red-50 text-red-600 text-[13px] font-bold rounded-2xl border border-red-100 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-600 shrink-0 animate-pulse" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-14 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Confirm</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-14 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1 pt-2">
                <input
                  type="checkbox"
                  id="showPass"
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-600 cursor-pointer transition-all"
                />
                <label htmlFor="showPass" className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">Show Passwords</label>
              </div>

              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mt-6 group"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : (
                  <>
                    Create Account
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-bold text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-black hover:text-slate-900 transition-colors">Sign In</Link>
              </p>
            </div>
         </div>
      </div>
    </div>
  );
}
