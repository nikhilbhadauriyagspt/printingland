import React from 'react';
import {
  ArrowRight,
  Printer,
  Truck,
  Globe,
  Box,
  CheckCircle2,
  Settings,
  FileText,
  PenTool,
  Sparkles,
  ShieldCheck,
  Layers,
  Headphones,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const offerings = [
  {
    title: 'Inkjet Printers',
    desc: 'Perfect for high-quality photo printing and everyday home documents with vibrant color reproduction.'
  },
  {
    title: 'Laser Printers',
    desc: 'The go-to choice for fast, crisp text documents and high-volume office tasks.'
  },
  {
    title: 'All-in-One Units',
    desc: 'Versatile machines that combine printing, scanning, copying, and faxing into one space-saving device.'
  },
  {
    title: 'Ink & Toner Supplies',
    desc: 'A comprehensive range of cartridges and tanks to keep your machines running without interruption.'
  }
];

const features = [
  'Vibrant Color Output',
  'Crisp Black Text',
  'Easy Wireless Setup',
  'Fast Print Speeds',
  'Energy Efficient Models',
  'Quiet Operation Modes',
  'High Paper Capacity',
  'Reliable Scanning',
  'Compact Designs',
  'Durable Build Quality'
];

const processCards = [
  {
    icon: Box,
    title: 'Secure Packaging',
    desc: 'Every printer is protected with specialized cushioning to ensure it arrives at your doorstep without a single scratch.'
  },
  {
    icon: Truck,
    title: 'Prompt Delivery',
    desc: 'We coordinate with leading delivery services across the USA to get your printer to you as quickly as possible.'
  },
  {
    icon: Settings,
    title: 'Quality Check',
    desc: 'Before any item is listed, we ensure it meets our standards for performance and reliability.'
  },
  {
    icon: FileText,
    title: 'Clear Documentation',
    desc: 'We provide easy-to-follow guides and information for every model we carry in our store.'
  },
  {
    icon: Globe,
    title: 'National Reach',
    desc: 'Serving homes and businesses in every state with reliable printing equipment and supplies.'
  },
  {
    icon: PenTool,
    title: 'Usage Tips',
    desc: 'Learn how to optimize your printer settings for better quality and lower ink consumption.'
  }
];

const supportPoints = [
  'Expert Guidance on Model Selection',
  'Comprehensive Setup Instructions',
  'Guidance on Ink & Toner Compatibility'
];

const stats = [
  { number: 'Wide', label: 'Printer Range' },
  { number: 'Home + Office', label: 'Use Cases Covered' },
  { number: 'Clear', label: 'Buying Guidance' },
  { number: 'Reliable', label: 'Long-Term Support' }
];

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO
        title="About Us | Iconic Printers"
        description="Learn about our wide range of printers, ink, and toner solutions for home and office use across the USA."
      />

      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />
        </div>

        <div className="relative w-full px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 mb-6">
                <Printer size={14} className="text-blue-600" />
                Your Dedicated Printer Resource
              </div>

              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-[1.05]  text-slate-900 max-w-5xl">
                Complete Solutions
                <span className="block text-blue-600">for Every Print Need.</span>
              </h1>

              <p className="mt-6 max-w-3xl text-slate-600 text-base md:text-lg font-semibold leading-8">
                We focus on one thing: making sure you have the right printer for your documents,
                photos, and projects. From simple home setups to high-volume office machines, we
                provide the tools you need to get the job done.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  Browse Printers
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] hover:border-blue-200 hover:text-blue-600 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[2rem] border border-blue-100 bg-white/90 backdrop-blur shadow-[0_20px_80px_rgba(15,23,42,0.08)] p-6 md:p-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-blue-600 p-5 text-white">
                    <ShieldCheck className="mb-6" size={28} />
                    <h3 className="text-sm font-black uppercase tracking-[0.18em] mb-2">
                      Trusted Selection
                    </h3>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-blue-50">
                      Carefully chosen machines for dependable everyday performance.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                    <Layers className="mb-6 text-blue-600" size={28} />
                    <h3 className="text-sm font-black uppercase tracking-[0.18em] mb-2 text-slate-900">
                      Multiple Categories
                    </h3>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-slate-600">
                      Home, office, creative, and high-volume printing options.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                    <Headphones className="mb-6 text-blue-600" size={28} />
                    <h3 className="text-sm font-black uppercase tracking-[0.18em] mb-2 text-slate-900">
                      Ongoing Guidance
                    </h3>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-slate-600">
                      Support beyond purchase with resources and helpful direction.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white p-5 border border-blue-100">
                    <Award className="mb-6 text-blue-600" size={28} />
                    <h3 className="text-sm font-black uppercase tracking-[0.18em] mb-2 text-slate-900">
                      Better Experience
                    </h3>
                    <p className="text-xs md:text-sm font-semibold leading-6 text-slate-600">
                      Designed to make printer buying feel simpler and smarter.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="pb-8 md:pb-12">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] border border-slate-100 bg-white shadow-sm px-6 py-5 text-center hover:shadow-md transition-all"
              >
                <div className="text-lg md:text-2xl font-black text-blue-600">{item.number}</div>
                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.18em] text-slate-500 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + OFFERINGS */}
      <section className="py-16 md:py-20">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-5">
                    <Sparkles size={14} className="text-blue-300" />
                    Reliable Printing Simplified
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black leading-tight">
                    Better layout,
                    <span className="block text-blue-400">same strong content.</span>
                  </h2>

                  <p className="mt-6 text-slate-300 text-base font-medium leading-8 italic border-l-4 border-blue-500 pl-5">
                    "A printer is more than just a machine; it is the final step in bringing your
                    ideas to life on paper. We ensure that step is always smooth and consistent."
                  </p>

                  <p className="mt-6 text-slate-300 text-sm md:text-base font-medium leading-8">
                    Our journey started with a simple observation: finding the right printer
                    shouldn't be complicated. Whether you are printing school assignments, office
                    reports, or family photos, you need a machine that works every time you press
                    print. We have curated a selection of printers that cater to diverse
                    requirements, ensuring that every user finds their perfect match.
                  </p>

                  <p className="mt-5 text-slate-300 text-sm md:text-base font-medium leading-8">
                    We understand the frustration of blurry text, faded colors, and paper jams.
                    That is why we focus on machines that are known for their durability and clear
                    output. Our collection includes everything from compact inkjet models for tight
                    spaces to robust laser printers built for speed and volume.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  What We Offer
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                  Printer categories built for different needs.
                </h3>
                <p className="mt-4 text-slate-600 text-base md:text-lg font-semibold leading-8 max-w-3xl">
                  From home use to professional workloads, our range is organized to help buyers
                  choose more confidently and faster.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {offerings.map((item, i) => (
                  <div
                    key={i}
                    className="group relative rounded-[1.75rem] border border-slate-100 bg-white p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Printer size={20} />
                    </div>

                    <h4 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-slate-600 text-sm md:text-base font-medium leading-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 text-white shadow-xl shadow-blue-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight">
                      Why Choose Our Printers
                    </h3>
                    <p className="mt-4 text-blue-50 text-sm md:text-base font-semibold leading-8 opacity-95">
                      We take pride in our selection process. Every printer in our inventory is
                      chosen based on its ability to deliver consistent results. We look for
                      machines that offer easy connectivity, intuitive controls, and efficient ink
                      usage. Our goal is to provide you with a printing experience that is
                      productive and stress-free.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white"
                      >
                        <div className="h-2 w-2 rounded-full bg-white shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 mb-4">
                  <ShieldCheck size={14} className="text-blue-600" />
                  Our Commitment to Support
                </div>

                <h2 className="text-3xl md:text-4xl font-black leading-tight text-slate-900">
                  Buying a printer is only the beginning.
                </h2>

                <p className="mt-5 text-slate-600 text-base md:text-lg font-semibold leading-8">
                  We are committed to helping you maintain your machine for years to come. Whether
                  you need help choosing the right ink or tips on how to keep your print heads
                  clean, our resources are always available.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid md:grid-cols-3 gap-4">
                {supportPoints.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[1.5rem] bg-white border border-slate-100 p-6 md:p-7 shadow-sm hover:shadow-lg transition-all"
                  >
                    <CheckCircle2 size={22} className="text-blue-600 mb-4" />
                    <p className="text-sm font-black uppercase tracking-[0.16em] leading-6 text-slate-900">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-24 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Our Careful Process
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Thoughtful handling at every step.
            </h2>
            <p className="mt-5 text-slate-600 text-base md:text-lg font-semibold leading-8">
              We handle every order with care, making sure your machine arrives in excellent
              condition and is backed by clear information and practical guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {processCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-[1.75rem] border border-slate-100 bg-white p-7 md:p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon size={24} />
                    </div>
                    <span className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-7">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-24">
        <div className="w-full px-4 md:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-14 md:px-12 md:py-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_24%)]" />

            <div className="relative max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-5">
                Future of Printing
              </div>

              <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
                Bringing Better Printing
                <span className="block text-blue-400">to Your Desk.</span>
              </h2>

              <p className="mt-6 text-slate-300 text-base md:text-lg font-semibold leading-8 max-w-3xl mx-auto">
                Whether you are a student, a creative professional, or a business owner, our
                printers are designed to help you succeed. Explore our range today and find the one
                that fits your life.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
                >
                  Browse Printers
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all"
                >
                  Get in Touch
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