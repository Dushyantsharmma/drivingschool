import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'home', 'about', 'courses', 'safety',
        'mock-test', 'driving-symbols', 'gallery', 'reviews', 'contact'
      ];

      // Find the section currently in view
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        // Section is active if it's within the top 30% of the screen
        return rect.top <= 300 && rect.bottom >= 300;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    setActiveSection(id);

    // Smooth scroll with offset for fixed header
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = window.innerWidth < 1024 ? 112 : 96; // height of nav (mobile vs desktop)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 10);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Courses', id: 'courses' },
    { name: 'Mock Test', id: 'mock-test' },
    { name: 'Symbols', id: 'driving-symbols' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${isScrolled || isOpen
            ? 'bg-[#0f172a]/95 backdrop-blur-xl shadow-lg border-b border-white/5 py-4 sm:py-3'
            : 'bg-transparent py-7 sm:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo Area */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
              aria-label="Go to home section"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gold rounded-full opacity-0 group-hover:opacity-75 blur transition duration-200"></div>
                <div className="relative rounded-full p-1.5 sm:p-1 bg-white/10 ring-1 ring-white/15 shadow-sm transition group-hover:ring-gold/60">
                  <img
                    src="/branding/raj-ann-raj-logo.jpeg"
                    alt="Raj Ann Raj Driving School"
                    width="48"
                    height="48"
                    className="w-12 h-12 sm:w-11 sm:h-11 rounded-full object-cover bg-white"
                  />
                </div>
              </div>
              <div className="text-left leading-none">
                <span className="block font-bold text-white text-2xl sm:text-xl tracking-tight">Raj Ann Raj</span>
                <span className="block text-sm sm:text-xs text-gold font-medium uppercase tracking-wider">Driving School</span>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-3 py-2 border border-white/5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2 text-base font-medium rounded-full transition-colors ${activeSection === item.id
                      ? 'text-navy'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {activeSection === item.id ? (
                    <span className="absolute inset-0 bg-gold rounded-full" aria-hidden="true" />
                  ) : null}
                  <span className="relative z-10">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919882034930"
                className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-gold hover:text-navy text-white transition-all border border-white/10"
                title="Call Now"
                aria-label="Call Raj Ann Raj Driving School"
              >
                <Phone size={20} />
              </a>

              <a
                href="https://wa.me/919882034930?text=Hello, I want to learn driving"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white text-base font-bold transition-all shadow-lg shadow-green-900/20"
                aria-label="Chat on WhatsApp with Raj Ann Raj Driving School"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-white hover:text-gold transition-colors"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={36} /> : <Menu size={36} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[90] lg:hidden bg-[#0f172a] pt-24 px-6 overflow-y-auto"
          onClick={() => setIsOpen(false)}
          aria-label="Mobile navigation menu"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col space-y-4" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-2xl font-bold py-2 border-b border-white/5 transition-colors ${activeSection === item.id ? 'text-gold' : 'text-white'
                  }`}
              >
                {item.name}
              </button>
            ))}

            <div className="pt-8 grid grid-cols-2 gap-4">
              <a
                href="tel:+919882034930"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-navy font-bold"
                aria-label="Call Raj Ann Raj Driving School"
              >
                <Phone size={20} /> Call Now
              </a>
              <a
                href="https://wa.me/919882034930?text=Hello"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 text-white font-bold"
                aria-label="Chat on WhatsApp with Raj Ann Raj Driving School"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navigation;