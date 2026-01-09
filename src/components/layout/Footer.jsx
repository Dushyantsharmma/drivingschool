import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0B1220] text-slate-300">
      {/* ===== TOP ===== */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* BRAND */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img
                src={"/branding/raj-ann-raj-logo.jpeg"}
                alt={t("Raj Ann Raj")}
                className="w-20 h-20 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: '#E57E33' }}>{t("Raj Ann Raj")}</h3>
              <p className="text-xs font-bold tracking-widest text-white">
                Driving Training School
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Professional hill driving training in Himachal Pradesh. 
            Learn to drive safely, confidently, and independently.
          </p>
          <div className="flex gap-4">
            <a className="p-2 bg-white/5 rounded-full hover:bg-amber-500 transition" href="#">
              <Facebook size={16} />
            </a>
            <a className="p-2 bg-white/5 rounded-full hover:bg-amber-500 transition" href="#">
              <Instagram size={16} />
            </a>
            <a className="p-2 bg-white/5 rounded-full hover:bg-amber-500 transition" href="#">
              <Youtube size={16} />
            </a>
          </div>
        </div>
        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
            <li><Link to="/courses" className="hover:text-amber-500">Courses</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-500">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
          </ul>
        </div>
        {/* CONTACT */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin className="text-amber-500" size={16} />
              <span>Bhanthal, Karsog, Mandi (HP)</span>
            </div>
            <div className="flex gap-3">
              <Mail className="text-amber-500" size={16} />
              <span>rajannraj.dts@gmail.com</span>
            </div>
            <div className="flex gap-3">
              <Phone className="text-amber-500" size={16} />
              <span>+91 98820 34930</span>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="space-y-6">
          <h4 className="text-white font-bold">Get in Touch</h4>
          <p className="text-sm text-slate-400">
            Want to start learning driving in Himachal hills? 
            Contact us today.
          </p>
          <div className="flex gap-4">
            <a
              href="tel:+919882034930"
              className="flex-1 bg-white text-[#0B1220] font-bold py-3 rounded-xl text-center"
            >
              Call
            </a>
            <a
              href="https://wa.me/919882034930"
              className="flex-1 bg-[#25D366] text-white font-bold py-3 rounded-xl text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {t("Raj Ann Raj")} Driving School</p>
          <p className="flex items-center gap-2">
            Built by
            <a href="https://github.com/Dushyantsharmma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-amber-500">
              <Github size={12} /> Dushyant Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
