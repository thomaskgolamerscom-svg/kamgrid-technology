import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Building, MapPin, Users, CheckCircle } from 'lucide-react';

export const EngineeringCapacitySection: React.FC = () => {
  const { data, setIsQuoteModalOpen } = useCMS();

  return (
    <section className="py-16 bg-slate-100 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1E3D] text-white rounded-xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-slate-800">
          
          {/* Subtle Technical Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded border border-amber-500/30">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>OPERATIONAL & TECHNICAL CAPACITY</span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                {data.capacityHeadline}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.capacityText}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Full Field Safety Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Multi-Site Engineering Supervision</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Residential & Heavy Industrial</span>
                </div>
              </div>
            </div>

            {/* Right Capacity Highlight Box */}
            <div className="lg:col-span-4 bg-slate-900/90 border-2 border-amber-500/80 p-6 rounded-lg text-center space-y-3 shadow-lg">
              <div className="text-amber-400 font-extrabold text-4xl font-heading tracking-tight">
                3 PROJECTS
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
                {data.capacityHighlight}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Demonstrates proven operational capacity to mobilize personnel and equipment across concurrent project sites.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                DISCUSS COMMERCIAL PROJECT
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
