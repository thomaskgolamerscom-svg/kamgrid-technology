import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, navigate, setIsQuoteModalOpen } = useCMS();

  return (
    <footer className="bg-[#071328] text-slate-300 pt-16 pb-8 border-t-2 border-amber-500 relative overflow-hidden">
      {/* CAD Grid Background Overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info Left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0B1E3D] rounded-full p-1 border border-amber-500 flex-shrink-0">
                <img src="/logo-icon.svg" alt="KAMGRID Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-white tracking-tight block leading-none">
                  KAMGRID
                </span>
                <span className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase leading-tight">
                  TECHNOLOGY
                </span>
              </div>
            </div>

            <p className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
              "{data.company.tagline}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Professional engineering solutions for solar power, electrical infrastructure, CCTV security networks, and lightning surge protection across residential, commercial, and industrial facilities.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Engineering Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'HOME', path: '/' },
                { name: 'ABOUT KAMGRID', path: '/about' },
                { name: 'OUR SERVICES', path: '/services' },
                { name: 'PROJECT PORTFOLIO', path: '/projects' },
                { name: 'OPERATIONAL CAPABILITY', path: '/capability' },
                { name: 'CONTACT & QUOTES', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-500">›</span>
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Headquarters & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{data.company.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div className="flex gap-2 font-mono">
                  <a href={`tel:${data.company.phone1}`} className="hover:text-amber-400 underline">{data.company.phone1}</a>
                  <span>/</span>
                  <a href={`tel:${data.company.phone2}`} className="hover:text-amber-400 underline">{data.company.phone2}</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 underline font-mono font-bold"
                >
                  WhatsApp: {data.company.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`mailto:${data.company.email}`} className="hover:text-amber-400 underline">{data.company.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Discreet Parent Company Note & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} KAMGRID TECHNOLOGY. All Rights Reserved.</p>
            <p className="text-slate-400 text-[10px] mt-0.5 italic">
              {data.company.parentCompany}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-mono">CAC REG: VERIFIED</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

