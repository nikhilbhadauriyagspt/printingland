import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.jpg";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Mike's Printer | Quality Printers & Hardware"
        description="Your trusted source for high-quality printers and printing hardware. Delivering excellence across the USA."
      />

      
      <Hero />


      <Features />      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
       <Collections />
      <CategorySlider 
        title="Professional Printers"  
        products={data.printers} 
      />
       
     {/* --- PREMIUM CONTACT CTA SECTION --- */}
<section className="py-20 bg-white font-jakarta">
  <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
    <div className="relative rounded-sm p-12 md:p-20 text-center overflow-hidden min-h-[400px] flex items-center justify-center border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] group">
      
      {/* Immersive Background Image */}
      <img 
        src={bannerImg}
        alt="" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />

      <div className="max-w-2xl mx-auto space-y-10 relative z-10">
        <div className="space-y-4">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Expert Consultation</span>
          <h2 className="text-3xl md:text-5xl font-light text-black leading-tight uppercase tracking-tight">
            Elevate Your <br /> 
            <span className="font-semibold italic">Business Workflow</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
            Connect with our printing specialists for a tailored solution that meets your professional demands.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/contact"
            className="bg-black text-white px-10 h-14 flex items-center justify-center rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-800 hover:shadow-xl active:scale-95"
          >
            Connect Now
          </Link>
          <Link
            to="/faq"
            className="bg-white border border-gray-100 text-black px-10 h-14 flex items-center justify-center rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white active:scale-95 shadow-sm"
          >
            Resources
          </Link>
        </div>
      </div>
      
      {/* Subtle Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50/50 rounded-full -ml-12 -mb-12" />
    </div>
  </div>
</section>
    </div>
    
  );
  
}
