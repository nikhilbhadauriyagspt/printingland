import React from 'react';
import {
  Printer,
  Shield,
  Wifi,
  ArrowRight,
  Layers3,
  CheckCircle2,
  Users,
  Target,
  Trophy,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import aboutImg from '@/assets/bannerr/about.png';

const processCards = [
  {
    title: 'Secure Packaging',
    desc: 'Every printer is protected with specialized cushioning to ensure it arrives at your doorstep in perfect condition.',
  },
  {
    title: 'Fast Delivery',
    desc: 'We work with top shipping companies across the USA to deliver your printer as fast as possible.',
  },
  {
    title: 'Quality Checked',
    desc: 'We test every model to make sure it meets our high standards for speed, quality, and reliability.',
  },
  {
    title: 'Helpful Guides',
    desc: 'We provide easy setup instructions and tips so you can start printing right away without any trouble.',
  },
];

const whyChooseUs = [
  {
    icon: Trophy,
    title: 'Premium Quality',
    desc: 'We handpick every product to ensure you get only the most reliable and high-performance machines available.'
  },
  {
    icon: Users,
    title: 'Expert Support',
    desc: 'Our team of specialists is always ready to help you with setup, troubleshooting, or picking the right supplies.'
  },
  {
    icon: Shield,
    title: 'Secure Shopping',
    desc: 'Your safety is our priority. We use industry-leading encryption to keep your data and payments 100% secure.'
  },
  {
    icon: History,
    title: 'Long-term Value',
    desc: 'We focus on durability and efficiency, providing solutions that save you time and money for years to come.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Poppins']">
      <SEO
        title="About Us | Print Ease"
        description="Learn about our commitment to providing the best printing solutions for homes and businesses."
      />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 border-b border-slate-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[2px] w-8 bg-blue-600" />
                <span className="text-[13px] font-bold text-blue-600 tracking-wider">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Quality Printers <br />
                <span className="text-blue-600">For Your Every Need</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-2xl">
                We help you find the right printer for your home or work. Our goal is to make sure every document you print looks perfect.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="absolute inset-0 -m-4 opacity-10"
                style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
              />
              <img src={aboutImg} alt="About Print Ease" className="relative z-10 w-full h-[400px] md:h-[550px] object-cover shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Print Ease?</h2>
            <p className="text-slate-500 text-lg font-medium">We go beyond just selling machines. We provide a complete experience built on trust and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="p-8 border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="h-14 w-14 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div 
              className="p-10 md:p-16 text-white"
              style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
            >
              <Target size={48} className="mb-8 opacity-50" />
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-blue-50/80 text-lg font-medium leading-relaxed">
                To simplify the printing process for everyone by providing high-quality equipment, genuine supplies, and expert guidance that people can trust without any hesitation.
              </p>
            </div>
            <div className="bg-white p-10 md:p-16 border border-slate-100">
              <Layers3 size={48} className="mb-8 text-blue-600 opacity-50" />
              <h3 className="text-3xl font-bold mb-6 text-slate-900">Our Vision</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                To become the leading destination for printing solutions in the USA, known for our commitment to quality, customer satisfaction, and making technology easy for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS --- */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Careful Process</h2>
            <p className="text-slate-500 max-w-2xl text-lg font-medium">We make sure everything is perfect from the moment you order until your printer is ready to use.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processCards.map((item, idx) => (
              <div key={idx} className="bg-white p-8 border border-slate-200 shadow-sm transition-all hover:border-blue-400">
                <span className="text-4xl font-bold text-blue-100 block mb-6">0{idx + 1}</span>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
          <div 
            className="p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Need a Better Way to Print?</h2>
              <p className="text-blue-50/80 text-lg md:text-xl font-medium mb-12">
                Join thousands of happy customers who trust Print Ease for their home and business needs. Explore our catalog today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/shop" className="px-10 py-4 bg-white text-blue-600 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                  Browse Catalog
                </Link>
                <Link to="/contact" className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
