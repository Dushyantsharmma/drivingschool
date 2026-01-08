import React from 'react';
import { MapPin, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    // Added pt-32 to account for the fixed navbar, removed bg-[#EFEDE0]
    <section className="relative bg-[#0b1220] pt-32 pb-10 sm:pb-16 md:pb-24 lg:pb-28 overflow-hidden min-h-[90vh] flex items-center justify-center">
      
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="flex flex-col items-center text-center w-full">

          {/* LOCATION BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-white/5 border border-white/10 text-slate-300 mb-8"
          >
            <MapPin size={14} className="text-amber-500" />
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
              Karsog • Mandi • Himachal Pradesh
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bold text-amber-500 leading-tight tracking-tight w-full"
            style={{
              fontSize: 'clamp(2rem, 7vw, 4rem)',
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            Master the Art of <br className="hidden sm:block" />
            <span className="text-white">Hill Driving</span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-400 leading-relaxed max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
            }}
          >
            Learn safe and confident driving on real hill roads with
            <strong className="text-white font-semibold block sm:inline">
              {' '}Raj Ann Raj Driving School
            </strong>.
            Trusted across Himachal Pradesh since 2005.
          </motion.p>

          {/* TRUST INDICATORS GRID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl"
          >
            {/* 1. SAFETY */}
            <div className="flex flex-row sm:flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-left sm:text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base md:text-lg mb-1">
                  Safety First
                </h3>
                <p className="text-sm text-slate-400">
                  Dual-control vehicles for complete safety
                </p>
              </div>
            </div>

            {/* 2. EXPERT TEAM */}
            <div className="flex flex-row sm:flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-left sm:text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base md:text-lg mb-1">
                  Expert Team
                </h3>
                <p className="text-sm text-slate-400">
                  Certified instructors with hill experience
                </p>
              </div>
            </div>

            {/* 3. HIGH SUCCESS */}
            <div className="flex flex-row sm:flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-left sm:text-center transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base md:text-lg mb-1">
                  High Success
                </h3>
                <p className="text-sm text-slate-400">
                  98% of our students pass the test
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;