import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Route
} from "lucide-react";
import SEO from "../SEO";

const PHONE = import.meta.env.VITE_PHONE || "+919882034930";
const WHATSAPP_TEXT =
  import.meta.env.VITE_WHATSAPP_TEXT || "I want to learn driving";

const COURSES = [
  {
    id: "beginner",
    title: "Beginner Hill Driving",
    icon: GraduationCap,
    badge: "Most Popular",
    badgeColor: "bg-yellow-100 text-yellow-800",
    description: "Perfect for first-time learners in Himachal",
    features: [
      "Vehicle controls & basics",
      "Hill starts & slopes",
      "Narrow road confidence",
      "Dual control safety"
    ],
    duration: "26 Days",
    price: "Contact for Rates",
    cta: "Book Beginner"
  },
  {
    id: "refresher",
    title: "Refresher Course",
    icon: RefreshCw,
    badge: "Confidence Booster",
    badgeColor: "bg-blue-100 text-blue-800",
    description: "For license holders who need hill practice",
    features: [
      "Advanced parking skills",
      "Traffic management",
      "Uphill/Downhill control",
      "Night driving tips"
    ],
    duration: "26 Days",
    price: "Contact for Rates",
    cta: "Book Refresher"
  },
  {
    id: "nervous",
    title: "Nervous Driver Program",
    icon: Heart,
    badge: "Anxiety Free",
    badgeColor: "bg-purple-100 text-purple-800",
    description: "Specialized calm coaching for fearful drivers",
    features: [
      "Zero-shouting policy",
      "Extra slow progression",
      "Psychology-based training",
      "Private roads first"
    ],
    duration: "Flexible",
    price: "Contact for Rates",
    cta: "Start Stress-Free"
  }
];

const COMPARISON = [
  { feature: "Dual Control Car", beginner: true, refresher: true, nervous: true },
  { feature: "Hill Start Practice", beginner: true, refresher: true, nervous: true },
  { feature: "Traffic Training", beginner: true, refresher: true, nervous: true },
  { feature: "Theory Classes", beginner: true, refresher: false, nervous: true },
  { feature: "License Assistance", beginner: true, refresher: true, nervous: true },
];

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
    <section id="courses" className="bg-slate-50 py-12 md:py-24">
      <SEO
        title="Driving Courses & Pricing | Raj Ann Raj Driving School"
        description="Structured driving programs for hill roads. Beginner, Refresher, and Nervous Driver courses in Mandi & Karsog."
        canonical="https://rajannrajdrivingschool.com/#courses"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Courses & <span className="text-amber-500">Pricing</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            Structured driving programs designed for the <span className="font-semibold text-slate-800">hill roads of Himachal Pradesh</span>.
          </p>
        </div>

        {/* 2. COURSE SELECTOR (Mobile Only) */}
        <div className="md:hidden flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar snap-x">
          {COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              className={`flex-shrink-0 snap-center px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                activeTab === course.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              {course.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* 3. COURSE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {COURSES.map((course) => (
            <div 
              key={course.id}
              className={`relative rounded-2xl border bg-white p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
                // Mobile: Show only active tab. Desktop: Show all.
                activeTab === course.id ? "block" : "hidden md:flex"
              }`}
            >
              <span className={`absolute top-4 right-4 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full ${course.badgeColor}`}>
                {course.badge}
              </span>

              <div className="mb-4 w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                <course.icon size={20} className="md:w-6 md:h-6" />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-slate-900">{course.title}</h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1 mb-4 md:mb-6">
                {course.description}
              </p>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 md:gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 pt-4 md:pt-6 mt-auto">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-900">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center mb-4 md:mb-6 text-sm">
                  <span className="text-slate-500">Price:</span>
                  <span className="font-bold text-slate-900">{course.price}</span>
                </div>

                <button 
                  onClick={() => handleWhatsApp(course.title)}
                  className="w-full rounded-xl bg-amber-400 py-3 md:py-3.5 font-bold text-slate-900 hover:bg-amber-500 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <MessageCircle size={18} />
                  {course.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. HIMACHAL CONTEXT */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center min-w-0">
            <div className="min-w-0 overflow-hidden text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 break-words min-w-0 text-left leading-tight">
                Why Our Courses Are Different in
                <span className="block sm:inline text-amber-400 ml-0 sm:ml-2">Himachal Pradesh</span>
              </h3>
              <p className="text-slate-300 mb-6 min-w-0 text-left">
                Driving in the hills requires special skills. We don't just teach you to drive; we teach you to survive and thrive on mountain roads.
              </p>
              <button 
                onClick={() => handleWhatsApp("General Inquiry")}
                className="text-amber-400 font-bold flex items-center gap-2 hover:text-amber-300 transition-colors text-left"
              >
                Chat with an Instructor <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              {[
                { icon: Mountain, text: "Training on real hill roads" },
                { icon: Route, text: "Practice on slopes & curves" },
                { icon: Users, text: "Local instructors from Mandi" },
                { icon: Shield, text: "Dual-control vehicles" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-3 min-w-0">
                  <item.icon className="text-amber-400 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium min-w-0 break-words">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. COURSE COMPARISON (Desktop Only) */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-16">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">Quick Comparison</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Feature</th>
                <th className="px-6 py-4 font-medium text-center">Beginner</th>
                <th className="px-6 py-4 font-medium text-center">Refresher</th>
                <th className="px-6 py-4 font-medium text-center">Nervous Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {row.beginner ? <CheckCircle2 size={18} className="text-green-500 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.refresher ? <CheckCircle2 size={18} className="text-green-500 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.nervous ? <CheckCircle2 size={18} className="text-green-500 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 6. WHATSAPP CTA STRIP */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Not sure which course is right for you?
          </h3>
          <p className="text-slate-600 mb-6">
            Talk to our senior instructor directly. No bots, just real advice.
          </p>
          <button 
            onClick={() => handleWhatsApp("Course Consultation")}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transform hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};

export default Courses;