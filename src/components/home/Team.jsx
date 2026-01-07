import React from 'react';
import { Quote } from 'lucide-react';

const Team = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50 relative z-10 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
          
          {/* 1. Senior Instructor */}
          <div className="flex flex-col items-center text-center group h-full">
            <div className="w-full aspect-square rounded-2xl overflow-hidden glow-card mb-4 group-hover:scale-105 transition-all duration-300 bg-white">
              <img 
                src={`${import.meta.env.BASE_URL}team/Instructor-girdhari-lal-Roadtest-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1.webp`}
                alt="Girdhari Lal" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Girdhari Lal</h3>
            <p className="text-sm text-slate-500 font-medium">Senior Instructor</p>
            <p className="text-xs text-slate-400 mt-1">20+ Years Exp.</p>
          </div>

          {/* 2. Founder (Highlighted - Center) */}
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-full aspect-square rounded-2xl overflow-hidden glow-card-gold mb-4 transition-all duration-300 bg-white">
              <img 
                src={`${import.meta.env.BASE_URL}team/owner-pushp-raj.webp`}
                alt="Pushp Raj" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900">Pushp Raj</h3>
            <p className="text-gold font-bold text-sm uppercase tracking-wide mb-3">Founder & Owner</p>
            
            <div className="relative">
              <Quote size={16} className="text-slate-300 absolute -top-2 -left-4 rotate-180" />
              <p className="text-slate-600 text-sm italic leading-relaxed px-2">
                "Our mission is to make you a driver who can handle any Himachal road with confidence."
              </p>
            </div>
          </div>

          {/* 3. Admin */}
          <div className="flex flex-col items-center text-center group h-full">
            <div className="w-full aspect-square rounded-2xl overflow-hidden glow-card mb-4 group-hover:scale-105 transition-all duration-300 bg-white">
              <img 
                src={`${import.meta.env.BASE_URL}team/tarun-bala-clerk.webp`}
                alt="Tarun Bala" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tarun Bala</h3>
            <p className="text-sm text-slate-500 font-medium">Clerk</p>
            <p className="text-xs text-slate-400 mt-1">Student Support</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
