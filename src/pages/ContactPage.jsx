import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Car, ShieldCheck, Award } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-[#EFEDE0] min-h-screen py-14 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ===== HERO ===== */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Contact Raj Ann Raj Driving School
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Based in <b>Bhanthal, Karsog (HP-30)</b>. We provide professional hill-road driving training,
            RTO test practice and learner license support.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="tel:+919882034930" className="bg-[#0f172a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#020617] transition">
              Call Now
            </a>
            <a href="https://wa.me/919882034930" className="bg-[#fbbf24] text-[#0f172a] px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition">
              WhatsApp
            </a>
          </div>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT INFO */}
          <div className="space-y-8">

            <Info title="Training Center" icon={<MapPin />}>
              Bhanthal, Karsog<br />
              District Mandi, Himachal Pradesh – 175011
            </Info>

            <Info title="Opening Hours" icon={<Clock />}>
              <div className="space-y-1">
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d=>(
                  <div key={d} className="flex justify-between">
                    <span>{d}</span><span className="font-bold text-green-700">08:00 AM – 7:00 PM</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Sunday</span><span className="font-bold text-red-600">Closed</span>
                </div>
              </div>
            </Info>

            <Info title="Coverage Area" icon={<Car />}>
              We provide car driving training across:
              <ul className="list-disc list-inside mt-2">
                <li>Bhanthal</li>
                <li>Karsog</li>
                <li>Sanarli</li>
                <li>Baral Bypass</li>
                <li>Nearby villages in Karsog</li>
              </ul>
            </Info>

            <Info title="Why Choose Us?" icon={<ShieldCheck />}>
              • Dual-control safety cars  
              • Hill road & RTO track training  
              • Local RTO test experience  
              • High pass success rate
            </Info>

          </div>

          {/* RIGHT MAP + CONTACT */}
          <div className="space-y-8">

            <div className="bg-white rounded-2xl overflow-hidden shadow border">
              <iframe
                title="Raj Ann Raj Driving School"
                src="https://www.google.com/maps?q=Raj+Ann+Raj+Driving+Training+School+Bhanthal+Karsog&output=embed"
                className="w-full h-[350px]"
                loading="lazy"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>

              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="text-amber-600" /> +91-98820-34930
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Mail className="text-amber-600" /> rajannraj.dts@gmail.com
              </div>

              <div className="flex gap-4 pt-4">
                <a href="tel:+919882034930" className="flex-1 bg-[#0f172a] text-white py-3 rounded-lg font-bold text-center">
                  Call
                </a>
                <a href="https://wa.me/919882034930" className="flex-1 bg-[#fbbf24] text-[#0f172a] py-3 rounded-lg font-bold text-center">
                  WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* FOOT NOTE */}
        <div className="text-center mt-14 text-slate-500 text-sm">
          Raj Ann Raj Driving Training School – Trusted Driving Institute in Karsog & Mandi (HP-30)
        </div>

      </div>
    </section>
  );
}

function Info({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-amber-600">{icon}</div>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <div className="text-slate-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
