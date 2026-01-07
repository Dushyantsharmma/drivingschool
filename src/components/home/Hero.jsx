import React from 'react';
import { MapPin, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-[#0b1220] py-16 md:py-24 lg:py-28 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">

          {/* LOCATION BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-white/5 border border-white/10 text-slate-300 mb-8"
          >
            <MapPin size={14} className="text-gold" />
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
            className="font-bold text-amber-500 leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              maxWidth: '90vw',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              margin: '0 auto',
            }}
          >
            Master the Art of <br className="hidden md:block" />
            <span className="text-white">Hill Driving</span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-400 leading-relaxed px-2"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              maxWidth: '95vw',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              margin: '0 auto',
            }}
          >
            Learn safe and confident driving on real hill roads with
            <strong className="text-white font-semibold">
              {' '}Raj Ann Raj Driving School
            </strong>.
            Trusted across Himachal Pradesh since 2005.
          </motion.p>

          {/* TRUST INDICATORS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 
                       w-full max-w-4xl"
          >

            {/* SAFETY */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 
                            p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 
                            text-left sm:text-center">
              <div className="w-11 h-11 rounded-full bg-white/10 
                              flex items-center justify-center text-gold shrink-0">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base">
                  Safety First
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
                  Dual-control vehicles for complete safety
                </p>
              </div>
            </div>

            {/* EXPERT TEAM */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 
                            p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 
                            text-left sm:text-center">
              <div className="w-11 h-15 rounded-full bg-white/10 
                              flex items-center justify-center text-gold shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base">
                  Expert Team
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
                  Certified instructors with hill experience
                </p>
              </div>
            </div>

            {/* SUCCESS */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 
                            p-5 rounded-2xl bg-white/5 border border-white/10 
                            text-left sm:text-center">
              <div className="w-11 h-11 rounded-full bg-white/10 
                              flex items-center justify-center text-gold shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base">
                  High Success
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
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