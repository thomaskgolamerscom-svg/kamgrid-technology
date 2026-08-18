import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import solarEngineerImg from '../assets/images/solar_engineer_duty_1787022968614.jpg';

export const HeroSection: React.FC = () => {
  const { data, setIsQuoteModalOpen, navigate } = useCMS();

  return (
    <section id="home" className="relative bg-slate-50 overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Accent Blueprint Geometry Corner Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-200/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Engineering Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Smart Engineering • Reliable Results</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#0B1E3D] tracking-tight leading-[1.15]">
              {data.hero.headline || "Engineering Solutions That Power, Protect & Connect Your World."}
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              {data.hero.supportingText || "KAMGRID TECHNOLOGY delivers professional solar, electrical, security, lightning protection and structured cabling solutions for residential, commercial and industrial environments."}
            </p>

            {/* Key Capability Pillars List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 py-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Solar Systems</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Electrical Engineering</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>CCTV & Security</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Lightning Protection</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Structured Cabling</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Commercial & Private</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-white bg-[#0B1E3D] hover:bg-slate-900 rounded-md shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer border border-slate-800"
              >
                <span>{data.hero.primaryCtaText || "REQUEST A QUOTE"}</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-[#0B1E3D] bg-white hover:bg-slate-100 rounded-md border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{data.hero.secondaryCtaText || "EXPLORE OUR SERVICES"}</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Right */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Engineering Visual Frame */}
              <div className="relative rounded-lg overflow-hidden border-2 border-slate-300 bg-slate-900 shadow-xl group">
                <img
                  src={data.hero.heroImage || solarEngineerImg}
                  alt="KAMGRID Engineer on duty setting up and testing solar panel installation"
                  className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Engineering Blueprint Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative Subtle CAD Frame Lines */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-amber-500 pointer-events-none hidden sm:block" />
              <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-[#0B1E3D] pointer-events-none hidden sm:block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
