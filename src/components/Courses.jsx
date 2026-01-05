import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  RefreshCw,
  Heart,
  Route,
  ClipboardCheck,
  ChevronRight,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import SEO from "./SEO";

const PHONE = import.meta.env.VITE_PHONE || "+919882034930";
const WHATSAPP_TEXT =
  import.meta.env.VITE_WHATSAPP_TEXT || "I want to learn driving";

const COURSES = [
  {
    id: 1,
    title: "Beginner Car Driving",
    icon: GraduationCap,
    badge: "First-time learners",
    includes: [
      "Vehicle controls & basics",
      "Steering & braking mastery",
      "Traffic rules education",
      "Confidence building sessions",
    ],
    outcome: "Ready for real-road driving",
  },
  {
    id: 2,
    title: "Refresher Course",
    icon: RefreshCw,
    badge: "Returning drivers",
    includes: [
      "Confidence rebuilding",
      "Updated traffic rules",
      "Advanced parking practice",
    ],
    outcome: "Smooth & confident driving",
  },
  {
    id: 3,
    title: "Nervous Driver",
    icon: Heart,
    badge: "Anxious learners",
    includes: [
      "Calm, patient training",
      "Step-by-step progression",
      "Stress-free environment",
    ],
    outcome: "Fear-free confidence",
  },
  {
    id: 4,
    title: "Advanced Road",
    icon: Route,
    badge: "Real-road readiness",
    includes: [
      "City & highway driving",
      "Night driving basics",
      "Emergency handling",
    ],
    outcome: "Road-ready driver",
  },
  {
    id: 5,
    title: "RTO Test Prep",
    icon: ClipboardCheck,
    badge: "License applicants",
    includes: [
      "Test track simulations",
      "Precision parking drills",
      "Common mistake correction",
    ],
    outcome: "High first-attempt success",
  },
];

const Courses = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="courses" className="bg-white py-16">
      <SEO
        title="Driving Courses in Mandi | Raj Ann Raj Driving School"
        description="Beginner, refresher, nervous driver, advanced road and RTO test preparation courses in Mandi & Karsog."
        canonical="https://rajannrajdrivingschool.com/#courses"
      />

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our <span className="text-amber-500">Courses</span>
            </h2>
            <p className="mt-2 text-slate-600 max-w-lg">
              Professionally structured driving programs for every skill level.
            </p>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-semibold text-slate-900 hover:text-amber-500 flex items-center gap-1"
          >
            Not sure which course? Get free consultation
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(course)}
              className="group cursor-pointer bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center">
                  <course.icon size={20} />
                </div>
                <span className="text-[10px] font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                  {course.badge}
                </span>
              </div>

              <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-amber-500">
                {course.title}
              </h3>

              <ul className="space-y-1.5 mb-4 text-sm text-slate-500">
                {course.includes.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    {item}
                  </li>
                ))}
                {course.includes.length > 2 && (
                  <li className="text-amber-500 font-medium text-xs">
                    + {course.includes.length - 2} more topics
                  </li>
                )}
              </ul>

              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">
                  View details
                </span>
                <ChevronRight
                  size={16}
                  className="text-slate-400 group-hover:text-amber-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.96, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 bg-slate-900 text-white relative">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900">
                      <selected.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selected.title}</h3>
                      <p className="text-xs text-amber-400 mt-1">
                        Best for: {selected.badge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    What you will learn
                  </h4>

                  <ul className="space-y-3 mb-6">
                    {selected.includes.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-600">
                        <CheckCircle2
                          size={16}
                          className="text-green-500 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                    <p className="text-xs font-bold uppercase text-amber-700">
                      Outcome
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      {selected.outcome}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${PHONE.replace(
                          /[^0-9]/g,
                          ""
                        )}?text=${encodeURIComponent(
                          `${WHATSAPP_TEXT} – Interested in ${selected.title}`
                        )}`,
                        "_blank"
                      )
                    }
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <MessageCircle size={18} />
                    Book via WhatsApp
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Courses;