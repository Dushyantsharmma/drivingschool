import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  RefreshCw,
  Heart,
  CheckCircle2,
  MessageCircle,
  Shield,
  Mountain,
  Users,
  ChevronRight,
  Route,
  Zap,
  Star
} from "lucide-react";
import SEO from "../SEO";

const PHONE = import.meta.env.VITE_PHONE || "+919882034930";
const WHATSAPP_TEXT = import.meta.env.VITE_WHATSAPP_TEXT || "I want to learn driving";

const COURSES = [
  {
    id: "beginner",
    title: "Beginner Hill Driving",
    icon: GraduationCap,
    badge: "Most Popular",
    description: "Start your journey with confidence. Comprehensive training for first-time learners.",
    features: [
      "Master vehicle controls",
      "Hill starts made easy",
      "Narrow road navigation",
      "Dual control safety"
    ],
    duration: "26 Days",
    price: "Contact for Rates",
    cta: "Start Learning",
    highlight: true,
    color: "amber"
  },
  {
    id: "refresher",
    title: "Refresher Course",
    icon: RefreshCw,
    badge: "Skill Booster",
    description: "Polish your skills and conquer hill driving fears. For license holders.",
    features: [
      "Advanced parking techniques",
      "Traffic management skills",
      "Uphill/Downhill mastery",
      "Night driving confidence"
    ],
    duration: "26 Days",
    price: "Contact for Rates",
    cta: "Boost Skills",
    highlight: false,
    color: "blue"
  },
  {
    id: "nervous",
    title: "Nervous Driver",
    icon: Heart,
    badge: "Stress Free",
    description: "Gentle, patient coaching designed specifically for anxious drivers.",
    features: [
      "Calm, zero-shouting environment",
      "Learn at your own pace",
      "Psychology-based approach",
      "Quiet roads first"
    ],
    duration: "Flexible",
    price: "Contact for Rates",
    cta: "Drive Calmly",
    highlight: false,
    color: "purple"
  }
];

const COMPARISON = [
  { feature: "Dual Control Car", beginner: true, refresher: true, nervous: true },
  { feature: "Hill Start Practice", beginner: true, refresher: true, nervous: true },
  { feature: "Traffic Training", beginner: true, refresher: true, nervous: true },
  { feature: "Theory Classes", beginner: true, refresher: false, nervous: true },
  { feature: "License Assistance", beginner: true, refresher: true, nervous: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Courses = () => {
  const [activeTab, setActiveTab] = useState("beginner");

  const handleWhatsApp = (courseTitle) => {
    window.open(
      `https://wa.me/${PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `${WHATSAPP_TEXT} – Interested in ${courseTitle}`
      )}`,
      "_blank"
    );
  };

  return (
    <section id="courses" className="relative py-20 lg:py-28 bg-[#F8F9FA] overflow-hidden">
      <SEO
        title="Driving Courses & Pricing | Raj Ann Raj Driving School"
        description="Structured driving programs for hill roads. Beginner, Refresher, and Nervous Driver courses in Mandi & Karsog."
        canonical="https://rajannrajdrivingschool.com/#courses"
      />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-amber-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-amber-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Zap size={14} className="fill-current" />
            Pricing & Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Master the <span className="text-amber-600">Mountain Roads</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Expert-designed courses tailored for Himachal's unique terrain. 
            <br className="hidden sm:block" /> Choose the path that fits your experience level.
          </p>
        </motion.div>

        {/* 2. MOBILE TABS */}
        <div className="md:hidden flex justify-center mb-8">
          <div className="flex p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
            {COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(course.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeTab === course.id
                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {course.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 3. PRICING CARDS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-24"
        >
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className={`relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-500 ${
                activeTab === course.id ? "block" : "hidden md:flex"
              } ${
                course.highlight
                  ? "bg-white border-2 border-amber-400 shadow-2xl shadow-amber-500/10 scale-100 md:scale-105 z-10"
                  : "bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-2"
              }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                  course.highlight ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                }`}>
                  <course.icon size={28} strokeWidth={1.5} />
                </div>
                {course.highlight && (
                  <span className="px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wide shadow-md shadow-amber-500/20">
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed min-h-[48px]">
                {course.description}
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10 flex-1">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Footer info */}
              <div className="pt-8 border-t border-slate-100">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-xl font-extrabold text-slate-900">{course.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Training</p>
                    <p className="text-sm font-bold text-slate-700">Practical + Theory</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleWhatsApp(course.title)}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                    course.highlight
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-slate-900/20"
                      : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <MessageCircle size={18} />
                  {course.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. WHY HIMACHAL (Feature Section) */}
        <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl mb-24">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-wider mb-4">
                <Mountain size={16} />
                Terrain Mastery
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Why Learn in the <br/><span className="text-amber-600">Hills?</span>
              </h3>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                Driving on flat roads is easy. Himachal's terrain requires specific skills: clutch control on steep slopes, judging narrow passes, and managing blind curves safely.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Route, text: "Steep Slope Starts" },
                  { icon: Shield, text: "Blind Curve Safety" },
                  { icon: Users, text: "Defensive Driving" },
                  { icon: Star, text: "Traffic Patience" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <item.icon className="text-amber-600" size={20} />
                    <span className="text-sm font-bold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-80 md:h-auto min-h-[400px]">
               <img 
                 // FIXED: Changed .jpg to .png to match your file structure
                 src={`${import.meta.env.BASE_URL}courses/hill-driving-collage.png`}
                 alt="Hill Driving Training Collage"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-10">
                 <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <p className="text-white font-bold text-xl mb-1">Real World Training</p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                      <Route size={14} />
                      Karsog Valley, HP
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* 5. COMPARISON TABLE */}
        <div className="hidden md:block mb-24">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900">Compare Programs</h3>
            <p className="text-slate-500 mt-2">Find the perfect fit for your skill level</p>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-6 px-8 text-left text-sm font-bold text-slate-900 w-1/3">Features</th>
                  <th className="py-6 px-8 text-center text-sm font-bold text-slate-900 w-1/5">Beginner</th>
                  <th className="py-6 px-8 text-center text-sm font-bold text-slate-900 w-1/5">Refresher</th>
                  <th className="py-6 px-8 text-center text-sm font-bold text-slate-900 w-1/5">Nervous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-8 text-sm font-medium text-slate-700">{row.feature}</td>
                    <td className="py-5 px-8 text-center">{row.beginner ? <div className="mx-auto w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="text-green-600" size={18} /></div> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-5 px-8 text-center">{row.refresher ? <div className="mx-auto w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="text-green-600" size={18} /></div> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-5 px-8 text-center">{row.nervous ? <div className="mx-auto w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="text-green-600" size={18} /></div> : <span className="text-slate-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. FINAL CTA */}
        <div className="relative rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-20" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start?
            </h3>
            <p className="text-slate-400 text-lg mb-10">
              Join thousands of safe drivers in Himachal. <br className="hidden sm:block"/>
              Contact us today for a free consultation.
            </p>
            <button 
              onClick={() => handleWhatsApp("Consultation")}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all hover:-translate-y-1"
            >
              <MessageCircle size={24} className="fill-current" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Courses;