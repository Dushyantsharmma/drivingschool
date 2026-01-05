import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Navigation,
  ExternalLink,
} from "lucide-react";
import SEO from "./SEO";

/* =====================
   ENV VARIABLES
===================== */
const PHONE = import.meta.env.VITE_PHONE || "+919882034930";
const EMAIL = import.meta.env.VITE_EMAIL || "pushapraj.sugam@gmail.com";
const WHATSAPP_TEXT =
  import.meta.env.VITE_WHATSAPP_TEXT || "Hello, I want to learn driving";

/* =====================
   HELPERS
===================== */
const callNow = () => (window.location.href = `tel:${PHONE}`);
const emailNow = () => (window.location.href = `mailto:${EMAIL}`);
const whatsappNow = () =>
  window.open(
    `https://wa.me/${PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      WHATSAPP_TEXT
    )}`,
    "_blank"
  );

/* =====================
   DATA
===================== */
const CONTACT_ACTIONS = [
  {
    icon: Phone,
    title: "Call Now",
    subtitle: "Speak to Instructor",
    onClick: callNow,
    className: "bg-slate-900 text-white hover:bg-slate-800",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Instant Chat",
    onClick: whatsappNow,
    className: "bg-green-600 text-white hover:bg-green-700",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "Send Enquiry",
    onClick: emailNow,
    className: "bg-white text-slate-900 border border-slate-200 hover:border-amber-400",
  },
];

const SERVICE_AREAS = [
  "Bhanthal",
  "Karsog",
  "Sanarali",
  "Nearby Villages",
  "Mandi",
  "Himachal Pradesh",
];

const BUSINESS_HOURS = [
  { day: "Mon – Sat", hours: "08:00 AM – 07:00 PM", open: true },
  { day: "Sunday", hours: "Closed", open: false },
];

/* =====================
   COMPONENT
===================== */
const Contact = () => {
  return (
    <section id="contact" className="bg-slate-50 py-16">
      <SEO
        title="Contact Raj Ann Raj Driving Training School | Mandi"
        description="Call, WhatsApp or visit Raj Ann Raj Driving Training School in Bhanthal, Karsog, Mandi."
        canonical="https://rajannrajdrivingschool.com/#contact"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            {/* Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Get in <span className="text-amber-500">Touch</span>
              </h2>
              <p className="mt-3 text-slate-600 max-w-md">
                Ready to start driving with confidence? Contact us today or visit
                our training center.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CONTACT_ACTIONS.map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.onClick}
                  className={`${item.className} rounded-xl p-4 flex flex-col items-center gap-2 transition-all shadow-sm`}
                >
                  <item.icon size={22} />
                  <div className="text-center">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs opacity-80">{item.subtitle}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Business Hours */}
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-amber-500" />
                  <h3 className="font-semibold text-slate-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  {BUSINESS_HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-slate-500">{h.day}</span>
                      <span
                        className={`font-medium ${
                          h.open ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Areas */}
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation size={18} className="text-amber-500" />
                  <h3 className="font-semibold text-slate-900">
                    Training Areas
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((area) => (
                    <span
                      key={area}
                      className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – MAP */}
          <div className="relative h-[360px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-900/10 shadow-lg">
            <iframe
              title="Raj Ann Raj Driving School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.09819130904!2d77.21160931131276!3d31.404292552760307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905a08da5cd688b%3A0x13721873736c3e1b!2sRaj%20%22Ann%22%20Raj%20Driving%20Training%20School%20Bhanthal!5e1!3m2!1sen!2sin!4v1767541680561!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Subtle bottom fade for overlay readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />

            {/* Map Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl ring-1 ring-slate-900/10 shadow-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                  <MapPin size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Bhanthal, Mandi
                  </p>
                  <p className="text-xs text-slate-500">
                    Himachal Pradesh
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Raj%20%22Ann%22%20Raj%20Driving%20Training%20School%20Bhanthal"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Open Map <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;