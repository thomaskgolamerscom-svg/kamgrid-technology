import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Navbar: React.FC = () => {
  const { data, currentPath, navigate, setIsQuoteModalOpen } = useCMS();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'CAPABILITY', path: '/capability' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/') return currentPath === '/';
    return currentPath.startsWith(itemPath);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-xs transition-all duration-200">
      {/* Top Engineering Contact Bar */}
      <div className="bg-[#0B1E3D] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`tel:${data.company.phone1}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono font-medium">{data.company.phone1}</span>
            </a>
            <a
              href={`tel:${data.company.phone2}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono font-medium">{data.company.phone2}</span>
            </a>
            <a
              href={`mailto:${data.company.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{data.company.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Aba, Abia State • Enugu • Nationwide Mobilization</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-16' : 'h-18 sm:h-20'}`}>
          
          {/* Logo Section */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer select-none group"
          >
            {/* On Mobile: LOGO ICON ONLY */}
            <div className="flex md:hidden items-center">
              <div className="w-10 h-10 flex-shrink-0 p-0.5 rounded-full border border-amber-500/50 bg-[#0B1E3D] shadow-xs">
                <img
                  src="/logo-icon.svg"
                  alt="KAMGRID Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* On Desktop/Tablet (md and above): Full Logo with text */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0 p-0.5 rounded-full border border-amber-500/60 bg-[#0B1E3D] shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src="/logo-icon.svg"
                  alt="KAMGRID Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#0B1E3D] tracking-tight leading-none group-hover:text-blue-900 transition-colors">
                  KAMGRID
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 tracking-[0.25em] leading-tight">
                  TECHNOLOGY
                </span>
                <span className="text-[9px] text-amber-600 font-medium tracking-wider leading-none mt-0.5">
                  SMART ENGINEERING
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-3.5 py-2 text-xs font-bold tracking-wider transition-all duration-200 rounded-md cursor-pointer group ${
                    active
                      ? 'text-[#0B1E3D] font-extrabold bg-slate-100/80 shadow-2xs'
                      : 'text-slate-600 hover:text-[#0B1E3D] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {/* Subtle Expanding Gold Underline Micro-interaction */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 rounded-full transition-all duration-250 ease-out ${
                      active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-[#0B1E3D] rounded-md shadow-sm hover:bg-slate-900 hover:shadow transition-all focus:outline-hidden group cursor-pointer border border-slate-800"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: [QUOTE] [HAMBURGER MENU] */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="sm:hidden px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded shadow-xs cursor-pointer uppercase"
            >
              QUOTE
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-800 hover:text-[#0B1E3D] hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide/Fade Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-3.5 py-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-slate-100 text-[#0B1E3D] border-l-4 border-amber-500 pl-4 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="w-full py-3 px-4 text-center font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            {/* Quick Contact Links in Mobile Menu */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Call: <a href={`tel:${data.company.phone1}`} className="font-bold text-[#0B1E3D] underline">{data.company.phone1}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp: <a href={`https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}`} className="font-bold text-emerald-700 underline">{data.company.whatsapp}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Email: <a href={`mailto:${data.company.email}`} className="text-slate-800 underline">{data.company.email}</a></span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-slate-200 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{data.company.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

