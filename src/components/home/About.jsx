import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  ShieldCheck,
  Sparkles,
  Quote,
  Building2,
  Award
} from "lucide-react";
import SEO from "../SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const About = ({ variant = "full" }) => {
  const stats = [
    { label: "Years Experience", value: "20+", icon: Clock },
    { label: "Students Trained", value: "5k+", icon: Users },
    { label: "Google Rating", value: "5.0", icon: Star },
  ];

  const values = [
    { title: "Govt. Approved Institute", icon: Building2 },
    { title: "Dual Control Safety Cars", icon: ShieldCheck },
    { title: "ISO Certified Training", icon: Award },
    { title: "Lady Friendly Environment", icon: Sparkles },
  ];

  if (variant === "brief") {
    return (
      <section id="about" className="relative bg-[#EFEDE0] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-6 items-start"
          >
            <div className="lg:col-span-6">
              <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold tracking-wide text-amber-600 bg-amber-100 rounded-full">
                About Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Trusted Driving School in <span className="text-amber-500">Mandi & Karsog</span>
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                We focus on calm, structured training with safety-first habits — especially for first-time and nervous learners.
                Dual-control cars and patient instructors help you learn with confidence.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {values.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs sm:text-sm font-medium text-slate-700"
                                  className="flex items-center gap-2 px-3 py-1.5 bg-[#EFEDE0] rounded-full border border-slate-200 text-xs sm:text-sm font-medium text-slate-700"
                  >
                    <v.icon size={16} className="text-amber-500" />
                    {v.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-slate-100"
                                  className="bg-[#EFEDE0] rounded-2xl p-4 border border-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-slate-900">
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                      <stat.icon className="text-amber-500" size={22} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-[#0B1120] rounded-3xl p-6 text-white overflow-hidden">
                <Quote className="text-amber-500/30 mb-3" />
                <p className="text-slate-200 leading-relaxed">
                  “Safety over speed. We teach you to respect the road — not just pass the test.”
                </p>
                <p className="mt-3 text-amber-400 text-sm font-semibold">
                  Pushp Raj • Founder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative bg-[#EFEDE0] py-10 sm:py-12">
      <SEO
        title="About Raj Ann Raj Driving School"
        description="20+ years of trusted driving education in Himachal Pradesh."
        canonical="https://rajannrajdrivingschool.com/#about"
      />

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-6 md:mb-8"
        >
          <span className="inline-block mb-3 px-4 py-1 text-xs font-semibold tracking-wide text-amber-600 bg-amber-100 rounded-full">
            Since 2005
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Driving Education{" "}
            <span className="text-amber-500">Reimagined</span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Confident drivers, structured training, safety first.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Founder Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-8 bg-[#0B1120] rounded-3xl overflow-hidden flex flex-col sm:flex-row"
          >
            {/* Text */}
            <div className="p-6 sm:p-7 flex-1 text-white">
              <Quote className="text-amber-500/30 mb-4" />
              <h3 className="text-2xl font-bold">Pushp Raj</h3>
              <p className="text-amber-400 text-sm font-semibold mb-4">
                Founder & Managing Director
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">
                My mission is simple: to build a generation of drivers who value safety over speed. At Raj Ann Raj, we don't just teach you to operate a machine; we teach you to respect the road.
              </p>
              <span className="inline-block text-xs px-3 py-1 rounded-lg bg-white/10 border border-white/10">
                Master Instructor • 20+ Years Experience
              </span>
            </div>
            {/* Image */}
            <div className="sm:w-2/5 h-52 sm:h-auto relative">
              {/* Mobile gradient overlay */}
              <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-[#0B1120] to-transparent z-10" />
              <img
                src={`${import.meta.env.BASE_URL}team/owner-pushp-raj.webp`}
                alt="Pushp Raj"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-1">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="min-w-[150px] flex items-center justify-between bg-[#EFEDE0] rounded-2xl p-3.5 border border-slate-100 border-l-4 border-l-amber-400"
                >
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                  <stat.icon className="text-amber-500" size={22} />
                </div>
              ))}
            </div>
          </div>

          {/* Team Member – Tarun */}
              <div className="lg:col-span-6 bg-[#EFEDE0] rounded-2xl p-4 flex gap-4 items-center border border-slate-100 hover-lift">
            <img
              src={`${import.meta.env.BASE_URL}team/tarun-bala-clerk.webp`}
              alt="Tarun Bala"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Tarun Bala</h4>
              <p className="text-xs text-amber-600 font-semibold uppercase mt-0.5">
                Clerk & Student Coordinator
              </p>
              <p className="text-sm text-slate-500 mt-1 leading-snug">
                Documentation, RTO processes, student coordination.
              </p>
            </div>
          </div>

          {/* Team Member – Girdhari */}
          <div className="lg:col-span-6 bg-[#EFEDE0] rounded-2xl p-4 flex gap-4 items-center border border-slate-100 hover-lift">
            <img
              src={`${import.meta.env.BASE_URL}team/Instructor-girdhari-lal-Roadtest-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1.webp`}
              alt="Girdhari Lal"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-semibold text-slate-900">Girdhari Lal</h4>
              <p className="text-xs text-amber-600 font-semibold uppercase mt-0.5">
                Senior Instructor
              </p>
              <p className="text-sm text-slate-500 mt-1 leading-snug">
                Hill driving, heavy traffic, and parking techniques.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="lg:col-span-12 flex flex-wrap gap-2 justify-center mt-2">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#EFEDE0] rounded-full border border-slate-200 text-xs sm:text-sm font-medium text-slate-700"
              >
                <v.icon size={16} className="text-amber-500" />
                {v.title}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
