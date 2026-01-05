import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Heart,
  Copyright,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Safety', href: '#safety' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ];

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    el && el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50"></div>

      {/* MAIN FOOTER */}
      <div className="py-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* BRAND SECTION (Compact) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                        <img
                          src="/branding/raj-ann-raj-logo.jpeg"
                  alt="Raj Ann Raj Driving School Logo"
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-12 h-12 rounded-full border-2 border-gold/20 shadow-lg shadow-gold/10"
                />
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    RAJ ANN RAJ
                  </h3>
                  <p className="text-xs text-gold font-medium tracking-wide uppercase">
                    Driving Training School
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                20+ years of professional instruction in Mandi & Karsog. 
                Building confident drivers, one lesson at a time.
              </p>

              {/* Contact Mini-List */}
              <div className="space-y-3 pt-2">
                <a href="tel:+919882034930" className="flex items-center gap-3 text-sm text-gray-300 hover:text-gold transition-colors w-fit" aria-label="Call Raj Ann Raj Driving School">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone size={16} className="text-gold" />
                  </div>
                  +91 98820 34930
                </a>
                <a href="mailto:pushapraj.sugam@gmail.com" className="flex items-center gap-3 text-sm text-gray-300 hover:text-gold transition-colors w-fit" aria-label="Email Raj Ann Raj Driving School">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail size={16} className="text-gold" />
                  </div>
                  pushapraj.sugam@gmail.com
                </a>
              </div>
            </div>

            {/* LINKS & ADDRESS */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Navigation */}
              <div>
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">Explore</h4>
                <ul className="space-y-2.5">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1"
                      >
                         {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <h4 className="font-bold text-white mb-4">Visit Us</h4>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gold shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-200 font-medium">Head Office</p>
                      <p className="text-sm text-gray-400 mt-1">Bhanthal, Karsog, Mandi</p>
                      <p className="text-sm text-gray-400">Himachal Pradesh</p>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-gold mt-2 font-medium hover:underline"
                      >
                        Get Directions <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Row */}
                <div className="mt-6 flex gap-3">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={`${s.icon.name || 'Social'} link`}
                      className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ${s.color} hover:bg-white/10 transition-all`}
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT & CREDITS */}
      <div className="border-t border-white/5 bg-[#0a0f1d] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Copyright size={12} /> {new Date().getFullYear()} Raj Ann Raj Driving School. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <span>Designed by</span>
            <span className="text-gray-300 font-semibold flex items-center gap-1">
              Dushyant Sharma
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR (App-like) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-navy/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-2 grid grid-cols-2 gap-2 overflow-hidden">
          <button
            onClick={() => window.open('tel:+919882034930')}
            className="flex items-center justify-center gap-2 bg-white text-navy font-bold py-3 rounded-xl hover:bg-gray-100 transition active:scale-95"
          >
            <Phone size={18} fill="currentColor" className="text-navy" /> Call
          </button>
          <button
            onClick={() =>
              window.open(
                'https://wa.me/919882034930?text=Hello, I want to learn driving'
              )
            }
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition active:scale-95"
          >
            <MessageCircle size={18} fill="currentColor" /> WhatsApp
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;