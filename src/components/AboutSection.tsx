import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, Award, Target, CheckCircle2, Clock, Wrench } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = useCMS();

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
            <span>ABOUT KAMGRID TECHNOLOGY</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight leading-tight">
            Practical Engineering Solutions for Critical Power & Infrastructure
          </h2>
        </div>

        {/* Story & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed">
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-amber-500 shadow-2xs">
              <p className="font-medium text-[#0B1E3D]">
                {data.aboutStory}
              </p>
            </div>

            <p>
              {data.aboutSolveText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1E3D]">CAC Registered Company</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Operating under corporate standards with full legal accountability.</p>
                </div>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
                <Target className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#0B1E3D]">Engineering Precision</h4>
                  <p className="text-xs text-slate-600 mt-0.5">No shortcuts. Load-calculated electrical and solar design.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pillars Right */}
          <div className="lg:col-span-5 bg-[#0B1E3D] text-white p-8 rounded-lg shadow-lg relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Award className="w-48 h-48 text-amber-500" />
            </div>

            <h3 className="font-heading text-xl font-bold text-amber-400 mb-6 uppercase tracking-wider border-b border-slate-800 pb-3">
              Our Commitment To Quality
            </h3>

            <ul className="space-y-4 relative z-10 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>Safety First Culture:</strong> Strict adherence to electrical isolation protocols and high-voltage compliance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>Reliable Equipment:</strong> We source original, manufacturer-backed inverters, panels, cameras, and copper wiring.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong>After-Sales Support:</strong> Maintenance services, warranty assistance, and rapid engineering response.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Clients Choose KAMGRID - 9 Core Strengths */}
        <div id="why-choose" className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-heading font-bold text-2xl text-[#0B1E3D] tracking-tight">
              Why Clients Choose KAMGRID
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Our foundational pillars for delivering serious engineering craftsmanship on every single project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.strengths.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-lg bg-slate-50 border border-slate-200 hover:border-amber-500/80 hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-extrabold text-amber-600 group-hover:text-amber-700">
                    {item.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B1E3D] uppercase tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
