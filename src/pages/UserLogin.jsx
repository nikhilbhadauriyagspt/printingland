import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen font-jakarta text-slate-900 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <SEO title="Sign In | Iconic Printers" />

      {/* Subtle Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

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
          <h1 className="text-3xl font-black text-slate-900 ">Welcome Back</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Sign in to manage your professional printing setup.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-6 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 outline-none text-sm font-bold transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end px-1">
            <Link to="#" className="text-xs font-black text-blue-600 hover:text-slate-900 transition-colors">Forgot Password?</Link>
          </div>

          <button
            disabled={loading}
            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[12px] uppercase tracking-wider hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-8 group"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                Sign In
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:text-slate-900 transition-colors">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
