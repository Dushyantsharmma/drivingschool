import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  ChevronRight,
  Award,
  ShieldCheck,
  Users,
  Star,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import SEO from './SEO';

const Home = () => {
  const slides = [
    {
      id: 1,
      image: '/banners/driving-school-karsog-mandi-hp.webp',
      badge: 'Dual Control Safety',
      badgeIcon: ShieldCheck
    },
    {
      id: 2,
      image: '/symbols/Symbol-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1indian-road-signs.webp',
      badge: 'RTO Test Prep',
      badgeIcon: Award
    },
    {
      id: 3,
      image: '/cars/car-02.webp',
      badge: 'Certified Instructors',
      badgeIcon: Users
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1120] pt-20 lg:pt-0"
    >
      <SEO
        title="Raj Ann Raj Driving Training School | Car Driving Lessons in Mandi"
        description="Professional car driving training in Mandi & Karsog. Government approved, dual-control cars, and 100% license test success rate."
      />

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Full-screen slideshow background */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/90 via-[#0B1120]/75 to-[#0B1120]/90" />

        {/* Animated Gradient Blobs */}
        <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8 text-center lg:text-left pt-8 lg:pt-0">

            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-4 py-1.5 rounded-full backdrop-blur-md mx-auto lg:mx-0 shadow-lg shadow-black/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">Government Approved School</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                <span className="block">Master the Roads</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600">
                  With Confidence
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Join <span className="text-white font-semibold">5,000+</span> successful learners in Mandi & Karsog.
              We don't just help you pass the test; we train you for a lifetime of safe driving with dual-control cars and patient instructors.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 border-t border-slate-800 pt-8 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <h4 className="text-3xl font-bold text-white">20+</h4>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Years Exp.</p>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <h4 className="text-3xl font-bold text-white">5k+</h4>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Students</p>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <h4 className="text-3xl font-bold text-white">100%</h4>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Safety</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="flex items-center justify-center gap-2 relative z-10">
                  Book Free Demo <ChevronRight size={18} />
                </div>
              </button>

              <a
                href="https://wa.me/919882034930?text=Hello, I want to learn driving"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="text-green-500" /> WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* RIGHT VISUALS (Floating Card Slider) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-slate-800 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-slate-700 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

            {/* Main Image Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[520px]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-[6px] border-slate-800 bg-slate-900">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={slides[currentSlide].image}
                      alt="Driving School Training"
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                  </motion.div>
                </AnimatePresence>

                {/* Slide Content (Text on Image) */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 shadow-lg shrink-0">
                        {React.createElement(slides[currentSlide].badgeIcon, { size: 24 })}
                      </div>
                      <div>
                        <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">Featured Highlight</p>
                        <p className="text-white font-bold text-lg leading-tight">{slides[currentSlide].badge}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                    <motion.div
                      key={currentSlide}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge: 5 Star */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-16 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-30"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white text-xs font-bold">5.0 Google Rating</p>
              </motion.div>

              {/* Floating Badge: Verified */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-12 bottom-32 bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-700 z-30 flex items-center gap-3"
              >
                <div className="bg-green-500/20 p-2.5 rounded-full text-green-500">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">RTO Verified</p>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                    <MapPin size={10} /> Mandi & Karsog
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Home;