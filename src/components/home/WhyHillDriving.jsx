import React from 'react';
import { Mountain, TrendingUp, AlertTriangle } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center group">
    <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
      <Icon size={32} className="text-slate-600 group-hover:text-amber-600 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const WhyHillDriving = () => {
  return (
    <section className="py-10 md:py-16 bg-[#0B1222] rounded-3xl mx-2 md:mx-0">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Heading and Description */}
        <div className="flex-1 min-w-[280px]">
          <div className="mb-6">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 text-center md:text-left leading-none">Himachal</span>
              <span className="text-4xl md:text-5xl font-extrabold text-amber-400 text-left leading-none">Pradesh</span>
            </div>
            <p className="mt-6 text-slate-100 text-base md:text-lg max-w-md">
              Driving in the hills requires special skills. We don't just teach you to drive; we teach you to survive and thrive on mountain roads.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center text-amber-400 font-bold text-base md:text-lg hover:underline transition-all">
              Chat with an Instructor
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
        {/* Right: Features Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          <div className="bg-[#181F32] rounded-xl p-6 flex flex-col gap-2 text-slate-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12" /></svg>
              <span className="font-semibold">Training on real hill roads</span>
            </div>
          </div>
          <div className="bg-[#181F32] rounded-xl p-6 flex flex-col gap-2 text-slate-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4 4 4" /></svg>
              <span className="font-semibold">Practice on slopes & curves</span>
            </div>
          </div>
          <div className="bg-[#181F32] rounded-xl p-6 flex flex-col gap-2 text-slate-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3v2a1 1 0 001 1h2a1 1 0 001-1v-2h3a1 1 0 001-1V7" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>
              <span className="font-semibold">Local instructors from Mandi</span>
            </div>
          </div>
          <div className="bg-[#181F32] rounded-xl p-6 flex flex-col gap-2 text-slate-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2" /></svg>
              <span className="font-semibold">Dual-control vehicles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHillDriving;
