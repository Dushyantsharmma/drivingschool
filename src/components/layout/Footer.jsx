import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Facebook, 
  Instagram, 
  Youtube, 
  Github, 
  Car,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

/* ================= CONFIGURATION ================= */
const FOOTER_CONFIG = {
  brand: {
    name: "Raj Ann Raj",
    subtitle: "Driving Training School",
    logo: "branding/raj-ann-raj-logo.jpeg",
    description: "Empowering drivers with confidence since 2005. We specialize in defensive driving and hill terrain mastery.",
    socials: [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Youtube, href: "#", label: "YouTube" },
    ]
  },
  contact: {
    phone: "+91 98820 34930",
    whatsapp: "+919882034930", // Add whatsapp number here
    email: "pushpraj.sugam@gmail.com",
    address: {
      line1: "Bhanthal, Karsog",
      line2: "Mandi, Himachal Pradesh - 175011",
    },
    mapLink: "https://maps.app.goo.gl/qWVbQqygU2NrrrV2A",
  },
  developer: {
    name: "Dushyant Sharma",
    github: "https://github.com/Dushyantsharmma",
    role: "Full Stack Engineer",
    status: "Open for Work"
  },
  // Organized Links based on your image
  mainLinks: [
    { name: "Home", path: "/" },
    { name: "Courses & Pricing", path: "/courses" },
    { name: "Student Corner", path: "/student-corner" }, // Added from image
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ]
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 relative overflow-hidden font-sans border-t border-white/5">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* COL 1: BRANDING (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                  alt="Raj Ann Raj Logo"
                  className="w-full h-full object-cover rounded-full scale-125 transition-transform duration-300"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/64?text=R"; }} 
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight notranslate" translate="no">
                  {FOOTER_CONFIG.brand.name}
                </h3>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                  {FOOTER_CONFIG.brand.subtitle}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {FOOTER_CONFIG.brand.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {FOOTER_CONFIG.brand.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: NAVIGATION LINKS (From Image) (Span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.mainLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-slate-400 hover:text-amber-400 flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: CONTACT & ACTIONS (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                <Car className="text-amber-500" size={20} />
                Contact Us
              </h4>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <MapPin className="text-amber-500 shrink-0 mt-1" size={16} />
                  <div>
                    <p>{FOOTER_CONFIG.contact.address.line1}</p>
                    <p>{FOOTER_CONFIG.contact.address.line2}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="text-amber-500 shrink-0" size={16} />
                  <a href={`mailto:${FOOTER_CONFIG.contact.email}`} className="hover:text-white">
                    {FOOTER_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* === NEW BUTTONS FROM IMAGE === */}
              <div className="grid grid-cols-2 gap-3">
                {/* Call Button (White) */}
                <a 
                  href={`tel:${FOOTER_CONFIG.contact.phone}`}
                  className="flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <Phone size={18} className="text-slate-900" />
                  Call
                </a>

                {/* WhatsApp Button (Green) */}
                <a 
                  href={`https://wa.me/${FOOTER_CONFIG.contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={18} fill="white" className="text-white" />
                  WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10 bg-[#0b1220]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Raj Ann Raj Driving School.</p>
          
          <div className="flex items-center gap-2">
            <span>Built by</span>
            <a 
              href={FOOTER_CONFIG.developer.github}
              target="_blank"
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Github size={12} />
              <span className="font-medium">{FOOTER_CONFIG.developer.name}</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;