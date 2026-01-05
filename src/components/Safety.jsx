import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Car, 
  Heart, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck, 
  Thermometer,
  Zap,
  Navigation,
  Cross
} from 'lucide-react';
import SEO from './SEO';

const Safety = () => {
  const carSpecs = [
    { label: "Control", value: "Dual-Pedal System", icon: Zap },
    { label: "Comfort", value: "Air Conditioned", icon: Thermometer },
    { label: "Steering", value: "Power Assisted", icon: Navigation },
    { label: "Emergency", value: "First Aid & Fire Ext.", icon: Cross }
  ];

  const curriculum = [
    {
      step: "01",
      title: "Control Mastery",
      desc: "Mastering clutch, brake, and accelerator in a controlled environment before hitting public roads.",
    },
    {
      step: "02",
      title: "Traffic Psychology",
      desc: "Learning to predict other drivers' behaviors and maintaining safe following distances.",
    },
    {
      step: "03",
      title: "Defensive Maneuvers",
      desc: "Emergency braking, blind-spot management, and hazard perception training.",
    },
  ];

  return (
    <section id="safety" className="py-16 bg-white overflow-hidden">
      <SEO
        title="Safety Features & Training Vehicle | Raj Ann Raj Driving School"
        description="Learn on safe, dual-control AC cars. Our defensive driving curriculum covers emergency braking, blind spots, and traffic psychology."
        canonical="https://rajannrajdrivingschool.com/#safety"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full text-green-700 font-bold text-xs uppercase tracking-wider mb-4"
          >
            <ShieldCheck size={14} /> Safety First Guarantee
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-4">
            Uncompromised <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Safety Standards</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We don't just teach you how to drive; we teach you how to survive. 
            Our multi-layered safety approach ensures you are protected at every turn.
          </p>
        </div>

        {/* SPLIT SECTION: VEHICLE & FEATURES */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: THE CAR CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="absolute inset-0 bg-gold/20 rounded-[2.5rem] transform rotate-3 blur-sm"></div>
             <div className="relative bg-navy rounded-[2rem] p-8 overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Training Vehicle</h3>
                        <p className="text-gold text-sm font-medium uppercase tracking-wide">Modern Hatchback Fleet</p>
                      </div>
                      <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
                        <Car className="text-white" size={24} />
                      </div>
                   </div>

                   {/* Car Image Area */}
                   <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border-2 border-white/10 group">
                      <img 
                        src="/cars/car-02.webp" 
                        alt="Dual Control Training Car" 
                        width="800"
                        height="602"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-white text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-400" /> Insured & Certified
                      </div>
                   </div>

                   {/* Specs Grid */}
                   <div className="grid grid-cols-2 gap-3">
                      {carSpecs.map((spec, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                           <div className="flex items-center gap-2 mb-1">
                             <spec.icon size={14} className="text-gold" />
                             <span className="text-gray-400 text-xs uppercase font-bold">{spec.label}</span>
                           </div>
                           <p className="text-white text-sm font-semibold">{spec.value}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* RIGHT: SAFETY PILLARS */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="flex gap-5"
            >
               <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                 <AlertTriangle size={24} />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-navy mb-2">Dual-Control Intervention</h4>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Our cars are equipped with an instructor-side brake system. 
                   If you make a critical error, <span className="font-semibold text-navy">we can stop the car instantly</span> to prevent accidents.
                 </p>
               </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="flex gap-5"
            >
               <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                 <Eye size={24} />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-navy mb-2">360° Vision Training</h4>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   We install auxiliary mirrors to eliminate blind spots. You learn how to scan intersections and use mirrors effectively before every maneuver.
                 </p>
               </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="flex gap-5"
            >
               <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                 <Heart size={24} />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-navy mb-2">Stress-Free Environment</h4>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Panic causes accidents. Our "Calm Coaching" method ensures you never feel yelled at or pressured, allowing your brain to learn faster.
                 </p>
               </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="flex gap-5"
            >
               <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                 <UserCheck size={24} />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-navy mb-2">Verified Instructor</h4>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Pushp Raj isn't just experienced; he is background-verified and government-certified, ensuring a safe personal environment for all students.
                 </p>
               </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: CURRICULUM STRIP */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-navy">Defensive Driving Curriculum</h3>
            <p className="text-sm text-gray-500">How we build your skills layer by layer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

            {curriculum.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center font-bold mb-4 shadow-lg shadow-navy/20 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="inline-flex items-center gap-2 text-navy font-bold border-b-2 border-gold hover:text-gold transition-colors"
            >
              Book a Safety Demo Class <Navigation size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Safety;