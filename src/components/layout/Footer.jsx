import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Courses & Pricing', path: '/courses' },
    { name: 'Student Corner', path: '/student-corner' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-[#0b1220] text-slate-300">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
              <img
                src={`${import.meta.env.BASE_URL}branding/raj-ann-raj-logo.jpeg`}
                alt="Raj Ann Raj Driving School"
                className="w-full h-full object-cover scale-150"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-500">Raj Ann Raj</h3>
              <p className="text-sm text-white uppercase tracking-wide">
                Driving Training School
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            20+ years of professional driving instruction in Mandi & Karsog.
            Specialized in real hill road training across Himachal Pradesh.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-xs text-yellow-400">
            ⛰️ Hill Driving Specialists
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            {links.map(link => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-white transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* VISIT US */}
        <div>
          <h4 className="text-white font-semibold mb-4">Visit Us</h4>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-yellow-400 mt-1" size={18} />
              <p className="text-sm">
                Bhanthal, Karsog, Mandi<br />
                Himachal Pradesh
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/qWVbQqygU2NrrrV2A"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-yellow-400 text-sm mt-3 hover:underline"
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>

          {/* CONTACT */}
          <div className="mt-5 space-y-3 text-sm">
            <a href="tel:+919882034930" className="flex items-center gap-2 hover:text-white">
              <Phone size={16} /> +91 98820 34930
            </a>
            <a href="mailto:pushpraj.sugam@gmail.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={16} /> pushpraj.sugam@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-slate-400">

          <span>
            © 2026 Raj Ann Raj Driving School. All rights reserved.
          </span>

          <span className="flex items-center gap-1">
            Designed by
            <strong className="text-white">Dushyant Sharma</strong>
          </span>

        </div>
      </div>

    </footer>
  );
};

export default Footer;