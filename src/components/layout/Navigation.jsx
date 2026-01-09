import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ❌ Removed useLocation
import {
  Phone,
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  X,
  ChevronRight,
  Compass, 
  Clock,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleTranslate from "../common/GoogleTranslate";

const NAV_ITEMS = [
  { name: "Home", to: "/", icon: Home },
  { name: "Courses & Pricing", to: "/courses", icon: BookOpen },
  { name: "Student Corner", to: "/student-corner", icon: GraduationCap },
  { name: "Gallery", to: "/gallery", icon: ImageIcon },
  { name: "Contact", to: "/contact", icon: Phone },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  // ❌ Removed const location = useLocation(); (Fixed ESLint Error)

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isHindi = useMemo(
    () => typeof document !== "undefined" && document.cookie.includes("googtrans=/en/hi"),
    []
  );

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className={`fixed top-0 inset-x-0 z-50 hidden lg:block transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1220]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg"
            : "bg-gradient-to-b from-[#0B1220]/80 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            className="flex items-center gap-3 cursor-pointer group min-w-max"
            onClick={() => navigate("/")}
          >
            <div className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all duration-300 ${scrolled ? 'border-white/10' : 'border-white/20 group-hover:border-amber-500'}`}>
              <img
                src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                className="w-full h-full object-cover scale-110"
                alt="Logo"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg leading-none tracking-tight group-hover:text-amber-400 transition-colors">
                {isHindi ? "राज एन राज" : "Raj Ann Raj"}
              </span>
              <span className="text-[10px] text-amber-500 font-bold tracking-[0.2em] uppercase mt-1">
                Driving School
              </span>
            </div>
          </div>

          {/* NAV PILL */}
          <nav className="flex items-center gap-1 bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/5 mx-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive ? "text-[#0B1220]" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-bg"
                        className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,179,1,0.4)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {isActive && <item.icon size={14} />} 
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 min-w-max">
            <div className="opacity-80 hover:opacity-100 transition-opacity">
               <GoogleTranslate />
            </div>
            <a
              href="tel:+919882034930"
              className="group relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0B1220] font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                 <Phone size={16} className="fill-current text-amber-600" />
                 <span>Call Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE HEADER ================= */}
      <header
        className={`lg:hidden fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1220]/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-2"
            : "bg-gradient-to-b from-[#0B1220] to-transparent py-4"
        }`}
      >
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-3" onClick={() => navigate("/")}>
             <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shadow-lg">
                <img 
                  src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                  className="w-full h-full object-cover scale-110"
                  alt="Logo"
                />
             </div>
             <div>
                <div className="font-bold text-[#e57e33] text-base leading-none">RAJ ANN RAJ</div>
                <div className="text-[10px] text-white font-bold tracking-wider mt-0.5">Driving Training School</div>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <GoogleTranslate />
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 rounded-full bg-white/10 text-white border border-white/5 active:bg-amber-500 active:text-black transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-sm z-[9990]"
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[9999] w-[85vw] max-w-sm bg-[#0B1220] border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* 1. BRAND HEADER */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0F172A]">
                <div className="flex items-center gap-3">
                   <img 
                      src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                      className="w-10 h-10 rounded-full border border-white/10" 
                      alt="Logo"
                   />
                   <div>
                      <h2 className="text-amber-500 font-bold text-lg leading-none">Raj Ann Raj</h2>
                      <p className="text-xs text-white font-bold tracking-wider mt-0.5">EST. 2005</p>
                   </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* 2. DASHBOARD STATS */}
              <div className="grid grid-cols-2 gap-3 p-4">
                 <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
                    <Clock size={20} className="text-amber-500 mb-2" />
                    <span className="text-xs text-slate-400 uppercase font-bold">Open Daily</span>
                    <span className="text-white font-bold">7AM - 8PM</span>
                 </div>
                 <a 
                   href="https://maps.google.com/?q=Raj+Ann+Raj+Driving+School+Karsog"
                   target="_blank"
                   rel="noreferrer"
                   className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5 active:bg-white/10"
                 >
                    <Compass size={20} className="text-blue-400 mb-2" />
                    <span className="text-xs text-slate-400 uppercase font-bold">Navigate</span>
                    <span className="text-white font-bold">Get Directions</span>
                 </a>
              </div>

              {/* 3. NAVIGATION LINKS */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border ${
                          isActive
                            ? "bg-amber-500 border-amber-500 text-[#0B1220] font-bold shadow-lg"
                            : "bg-transparent border-transparent text-slate-300 hover:bg-white/5"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon 
                            size={22} 
                            className={isActive ? "text-[#0B1220]" : "text-amber-500"} 
                          />
                          <span className="text-lg">{item.name}</span>
                          <ChevronRight 
                            size={18} 
                            className={`ml-auto transition-transform ${isActive ? "opacity-100" : "opacity-30"}`} 
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* 4. DUAL ACTION FOOTER */}
              <div className="p-4 border-t border-white/10 bg-[#0F172A] grid grid-cols-5 gap-3 pb-8">
                 <a 
                    href="https://wa.me/919882034930"
                    className="col-span-1 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                    aria-label="WhatsApp"
                 >
                    <MessageCircle size={28} className="fill-current" />
                 </a>
                 <a
                  href="tel:+919882034930"
                  className="col-span-4 flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
                 >
                   <Phone size={22} className="fill-current" />
                   <span>Call Now</span>
                 </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;