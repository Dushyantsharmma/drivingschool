import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import GoogleTranslate from '../common/GoogleTranslate';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Courses & Pricing', to: '/courses' },
  { name: 'Student Corner', to: '/student-corner' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Contact', to: '/contact' }
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0f172a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">

          {/* LOGO + TRANSLATE TOGGLE */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3"
            >
              {/* Logo Container with Zoom */}
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                  alt="Raj Ann Raj Driving School"
                  className="w-full h-full object-cover scale-150"
                />
              </div>
              <div className="leading-tight text-left">
                <span className="block text-amber-500 font-bold text-lg">
                  Raj Ann Raj
                </span>
                <span className="block text-white text-xs uppercase tracking-wider">
                  Driving School
                </span>
              </div>
            </button>
            {/* Translate toggle next to logo */}
            <div className="ml-2">
              <GoogleTranslate />
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition
                   ${isActive ? 'text-gold' : 'text-gray-300 hover:text-white'}`
                }
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-2 h-[2px] w-full bg-gold transition
                    ${window.location.pathname === item.to ? 'opacity-100' : 'opacity-0'}`}
                />
              </NavLink>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
             {/* Translate toggle is now next to logo above */}

            {/* WhatsApp button removed as requested */}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#0f172a] px-6 pt-24">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={28} />
          </button>

          <div className="space-y-6 flex flex-col items-center">
             <GoogleTranslate /> 

            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block text-xl font-semibold text-white"
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-8 grid grid-cols-2 gap-4">
              <a
                href="tel:+919882034930"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-[#0f172a] font-bold"
              >
                <Phone size={18} /> Call
              </a>
              <a
                href="https://wa.me/919882034930"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SPACER SO PAGE STARTS AFTER NAV */}
      <div className="h-[72px]" />
    </>
  );
};

export default Navigation;