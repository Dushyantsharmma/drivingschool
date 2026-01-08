import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  Image,
  X,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleTranslate from "../common/GoogleTranslate";

/* ================= NAV ITEMS ================= */
const NAV_ITEMS = [
  { name: "Home", to: "/", icon: Home },
  { name: "Courses", to: "/courses", icon: BookOpen },
  { name: "Student Corner", to: "/student-corner", icon: GraduationCap },
  { name: "Gallery", to: "/gallery", icon: Image },
  { name: "Contact", to: "/contact", icon: Phone },
];

/* ================= COMPONENT ================= */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  // Theme effect
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const navigate = useNavigate();
  const location = useLocation();

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Spacer for fixed nav bar */}
      <div className="hidden lg:block" style={{ height: 86 }} />
      {/* ================= DESKTOP NAV ================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 inset-x-0 z-50 hidden lg:flex justify-center ${
          scrolled ? "pt-2" : "pt-6"
        }`}
      >
        <nav
          className={`flex items-center justify-between w-full max-w-7xl px-6 py-3
          rounded-full backdrop-blur-xl border border-white/10 shadow-2xl
          bg-[#232a36]`}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
              className="w-14 h-14 rounded-full border border-white/20"
              alt="Raj Ann Raj"
            />
            <div>
              <span className="block text-white font-bold">Raj Ann Raj</span>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest">
                Driving School
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-full">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-sm transition ${
                    isActive
                      ? "bg-white text-[#0b1220] font-bold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <GoogleTranslate />
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-amber-500 hover:text-[#0b1220] transition text-white dark:text-yellow-400"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ================= MOBILE HEADER ================= */}
      <header
        className={`lg:hidden fixed top-0 inset-x-0 z-50 flex justify-between
        items-center px-4 py-3 ${
          scrolled ? "bg-[#0b1220]/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
            className="w-9 h-9 rounded-full border border-white/20"
            alt="Raj Ann Raj"
          />
          <span className="text-white font-bold">Raj Ann Raj</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-white/10 text-white"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[85vw] max-w-sm
              bg-[#0f172a] border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10">
                <span className="text-white font-bold">Menu</span>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="flex justify-between items-center p-4 rounded-xl
                    text-slate-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className="text-amber-400" />
                      {item.name}
                    </div>
                    <ChevronRight size={16} className="opacity-60" />
                  </NavLink>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;