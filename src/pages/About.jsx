import React from 'react';
import { ArrowRight, Printer, ShieldCheck, Truck, Headphones, Award, Target, Zap, CheckCircle2, Globe, Box, Sparkles, Layers, FileText, Settings, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="About Our Printer Services | Lux Printers"
        description="Learn about our wide range of printers, ink, and toner solutions for home and office use across the USA."
      />

      {/* --- PURE WHITE FULL WIDTH HEADER --- */}
      <section className="pt-28 md:pt-36 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-6"
          >
            <Printer size={12} className="text-blue-600" />
            Your Dedicated Printer Resource
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900  leading-tight mb-6">
            Complete Solutions for Every Print Need.
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-4xl mx-auto">
            We focus on one thing: making sure you have the right printer for your documents, photos, and projects. From simple home setups to high-volume office machines, we provide the tools you need to get the job done.
          </p>
        </div>
      </section>

      {/* --- EXTENSIVE CONTENT SECTION --- */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            
            <div className="space-y-10">
               <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black  leading-tight">Reliable Printing Simplified.</h2>
                  <p className="text-slate-500 text-base font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6">
                    "A printer is more than just a machine; it is the final step in bringing your ideas to life on paper. We ensure that step is always smooth and consistent."
                  </p>
                  <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                    Our journey started with a simple observation: finding the right printer shouldn't be complicated. Whether you are printing school assignments, office reports, or family photos, you need a machine that works every time you press print. We have curated a selection of printers that cater to diverse requirements, ensuring that every user finds their perfect match.
                  </p>
                  <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                    We understand the frustration of blurry text, faded colors, and paper jams. That is why we focus on machines that are known for their durability and clear output. Our collection includes everything from compact inkjet models for tight spaces to robust laser printers built for speed and volume.
                  </p>
               </div>

               <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase  text-slate-900">What We Offer</h3>
                  <div className="grid gap-4">
                     {[
                        { title: "Inkjet Printers", desc: "Perfect for high-quality photo printing and everyday home documents with vibrant color reproduction." },
                        { title: "Laser Printers", desc: "The go-to choice for fast, crisp text documents and high-volume office tasks." },
                        { title: "All-in-One Units", desc: "Versatile machines that combine printing, scanning, copying, and faxing into one space-saving device." },
                        { title: "Ink & Toner Supplies", desc: "A comprehensive range of cartridges and tanks to keep your machines running without interruption." }
                     ].map((box, i) => (
                        <div key={i} className="p-6 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-xl transition-all duration-500">
                           <h4 className="text-base font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{box.title}</h4>
                           <p className="text-slate-500 text-xs md:text-sm font-bold leading-relaxed">{box.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase  text-slate-900">Why Choose Our Printers</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                    We take pride in our selection process. Every printer in our inventory is chosen based on its ability to deliver consistent results. We look for machines that offer easy connectivity, intuitive controls, and efficient ink usage. Our goal is to provide you with a printing experience that is productive and stress-free.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {[
                        "Vibrant Color Output",
                        "Crisp Black Text",
                        "Easy Wireless Setup",
                        "Fast Print Speeds",
                        "Energy Efficient Models",
                        "Quiet Operation Modes",
                        "High Paper Capacity",
                        "Reliable Scanning",
                        "Compact Designs",
                        "Durable Build Quality"
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-600">
                           <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                           {item}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 md:p-12 bg-blue-600 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                  <h3 className="text-xl md:text-2xl font-black ">Our Commitment to Support</h3>
                  <p className="text-blue-50 text-xs md:text-sm font-bold leading-relaxed opacity-90">
                    Buying a printer is just the beginning. We are committed to helping you maintain your machine for years to come. Whether you need help choosing the right ink or tips on how to keep your print heads clean, our resources are always available.
                  </p>
                  <ul className="space-y-3">
                     <li className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-blue-200 shrink-0 mt-0.5" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">Expert Guidance on Model Selection</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-blue-200 shrink-0 mt-0.5" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">Comprehensive Setup Instructions</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-blue-200 shrink-0 mt-0.5" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">Guidance on Ink & Toner Compatibility</span>
                     </li>
                  </ul>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE & PROCESS --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
         <div className="w-full px-4 md:px-10 lg:px-16">
            <div className="w-full text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-black er mb-6 text-slate-900">Our Careful Process.</h2>
               <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-3xl mx-auto">
                  We handle every order with the utmost care, ensuring that your new machine arrives in perfect condition, ready to start printing immediately.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {[
                  { icon: <Box />, title: "Secure Packaging", desc: "Every printer is protected with specialized cushioning to ensure it arrives at your doorstep without a single scratch." },
                  { icon: <Truck />, title: "Prompt Delivery", desc: "We coordinate with leading delivery services across the USA to get your printer to you as quickly as possible." },
                  { icon: <Settings />, title: "Quality Check", desc: "Before any item is listed, we ensure it meets our standards for performance and reliability." },
                  { icon: <FileText />, title: "Clear Documentation", desc: "We provide easy-to-follow guides and information for every model we carry in our store." },
                  { icon: <Globe />, title: "National Reach", desc: "Serving homes and businesses in every state with reliable printing equipment and supplies." },
                  { icon: <PenTool />, title: "Usage Tips", desc: "Learn how to optimize your printer settings for better quality and lower ink consumption." }
               ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-5 p-8 md:p-10 bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:border-blue-100 transition-all duration-500 group text-center items-center">
                     <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        {React.cloneElement(item.icon, { size: 22 })}
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-base font-black uppercase  text-slate-900">{item.title}</h4>
                        <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FINAL STATEMENT SECTION --- */}
      <section className="py-24 bg-white">
         <div className="w-full px-4 md:px-10 lg:px-16 text-center mx-auto">
            <div className="space-y-10">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-[3px]">
                  Future of Printing
               </div>
               <h2 className="text-3xl md:text-5xl font-black  leading-tight text-slate-900">Bringing Better Printing to Your Desk.</h2>
               <p className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-3xl mx-auto">
                  Whether you are a student, a creative professional, or a business owner, our printers are designed to help you succeed. Explore our range today and find the one that fits your life.
               </p>
               
               <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Link to="/shop" className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-lg">
                     Browse Printers
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact" className="px-10 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-[3px] hover:bg-slate-900 hover:text-white transition-all">
                     Get in Touch
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <div className="h-16" />
    </div>
  );
};

export default About;
