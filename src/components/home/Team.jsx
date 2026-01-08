import React from 'react';
import { Quote, BadgeCheck, Star, Users, Phone } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Girdhari Lal",
    role: "Senior Instructor",
    image: "team/Instructor-girdhari-lal-Roadtest-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1.webp",
    stats: "20+ Years Exp.",
    specialty: "Hill Road Specialist",
    isFounder: false,
    icon: Star
  },
  {
    id: 2,
    name: "Pushp Raj",
    role: "Founder & Owner",
    image: "team/owner-pushp-raj.webp",
    quote: "Our mission is to make you a driver who can handle any Himachal road with confidence.",
    isFounder: true,
    icon: BadgeCheck
  },
  {
    id: 3,
    name: "Tarun Bala",
    role: "Admin & Clerk",
    image: "team/tarun-bala-clerk.webp",
    stats: "Student Support",
    specialty: "Documentation",
    isFounder: false,
    icon: Users
  }
];

const Team = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Meet the <span className="text-amber-500">Experts</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mt-2">
            Learn from the most experienced professionals in Mandi & Karsog.<br className="hidden md:block" />
            We are dedicated to your safety and success on the road.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {TEAM_MEMBERS.map((member) => (
            <div 
              key={member.id}
              className={`
                group relative bg-white rounded-2xl transition-all duration-300
                flex flex-col
                ${member.isFounder 
                  ? 'shadow-xl shadow-amber-500/10 border-2 border-amber-500/20 -mt-0 md:-mt-8 z-20 hover:border-amber-500/50' 
                  : 'shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-xl'
                }
              `}
            >
              {/* Image Header */}
              <div className="p-4 pb-0">
                <div className={`
                  w-full aspect-[4/4] rounded-xl overflow-hidden relative
                  ${member.isFounder ? 'bg-amber-50' : 'bg-slate-100'}
                `}>
                  <img 
                    src={`${import.meta.env.BASE_URL}${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                    <member.icon 
                      size={20} 
                      className={member.isFounder ? "text-amber-500 fill-amber-500/20" : "text-slate-400"} 
                    />
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className={`text-sm font-medium uppercase tracking-wider mb-4 ${member.isFounder ? 'text-amber-600' : 'text-slate-500'}`}>
                  {member.role}
                </p>

                {/* Conditional Content based on Founder vs Staff */}
                {member.isFounder ? (
                  <div className="mt-auto bg-amber-50 rounded-xl p-4 relative">
                    <Quote size={20} className="text-amber-300 absolute -top-3 -left-2 fill-current" />
                    <p className="text-slate-700 text-sm italic leading-relaxed">
                      "{member.quote}"
                    </p>
                  </div>
                ) : (
                  <div className="mt-auto flex items-center justify-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                      {member.stats}
                    </span>
                    {member.specialty && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                        {member.specialty}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;