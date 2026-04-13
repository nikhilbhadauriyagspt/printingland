import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Phone } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

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
    <div className="min-h-screen font-['Poppins'] text-slate-900 bg-white flex items-center justify-center p-4 relative overflow-hidden py-12">
      <SEO title="Create Account | Print Ease" />

      {/* Blue Background Gradient */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-slate-200 p-8 md:p-12 relative z-10 shadow-2xl shadow-blue-900/5"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo/logo.png" alt="Logo" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Join us for the best printer deals and support.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold border border-red-100 mb-2 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  required
                  type="tel"
                  placeholder="+1 (000) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-12 pl-11 pr-12 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">Confirm Password</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 focus:border-blue-600 outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1 py-2">
            <input
              type="checkbox"
              id="showPass"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 rounded-none border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer transition-all"
            />
            <label htmlFor="showPass" className="text-xs font-medium text-slate-500 cursor-pointer select-none">Show Passwords</label>
          </div>

          <button
            disabled={loading}
            className="w-full h-12 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                Create Account <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-8">
          <p className="text-slate-500 font-medium text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:text-slate-900 transition-colors">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
