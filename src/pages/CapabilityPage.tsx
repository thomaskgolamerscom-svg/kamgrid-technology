import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, HardHat, Users, Building2, CheckCircle2, Layers, ArrowRight, Zap, Award, Wrench } from 'lucide-react';

export const CapabilityPage: React.FC = () => {
  const { data, setIsQuoteModalOpen } = useCMS();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-14 sm:py-18 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest border border-amber-500/30">
              <span>OPERATIONAL CAPACITY</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Built to Deliver — From Private Projects to Commercial Infrastructure
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our engineering and technical teams possess the capacity to execute multiple large-scale commercial and industrial deployments simultaneously without sacrificing residential quality.
            </p>
          </div>
        </div>
      </div>

      {/* Key Numbers Banner */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-600 block">20+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1E3D] mt-1 block">Projects Completed</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Across multiple state regions</span>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-600 block">50+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1E3D] mt-1 block">Installations Managed</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Solar, CCTV, earthing, cabling</span>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-600 block">100+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1E3D] mt-1 block">Satisfied Clients</span>
              <span className="text-[11px] text-slate-500 mt-1 block">Residential & commercial estates</span>
            </div>

            <div className="p-6 rounded-xl bg-[#0B1E3D] text-white border border-slate-800 shadow-md">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-400 block">3</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 mt-1 block">Simultaneous Commercial Sites</span>
              <span className="text-[11px] text-slate-300 mt-1 block">Multi-team mobilization capacity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Capability Narrative */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
              <span>SCALE & MOBILIZATION</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
              {data.capacityHeadline}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
              {data.capacityText}
            </p>
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 text-xs sm:text-sm font-semibold text-[#0B1E3D]">
              {data.capacityHighlight}
            </div>
          </div>

          {/* Pillars of Execution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-lg w-fit">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1E3D]">
                Multi-Disciplinary Field Engineers
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our technicians hold hands-on qualifications in high-voltage solar configurations, commercial three-phase distribution, structured network racks, and deep soil earthing resistance calibration.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Licensed electrical specialists</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Experienced solar PV installers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Network and CCTV network architects</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-lg w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1E3D]">
                Rigorous Safety & Quality Control
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Zero compromises on personal protective equipment (PPE), high-current DC circuit breakers, thermal imaging checks, proper cable sizing, and verified earthing rods.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Pre-installation load calculations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Thermal and voltage drop testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Standardized conduit trunking</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-lg w-fit">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0B1E3D]">
                After-Sales Maintenance & SLA
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Commissioning is never the end of our relationship. We provide proactive battery cell balancing, inverter firmware updates, solar panel cleaning protocols, and on-demand maintenance visits.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Rapid response field team</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Manufacturer warranty processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Scheduled preventative audits</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Commercial Project Mobilization Banner */}
      <section className="py-14 sm:py-20 bg-[#0B1E3D] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl">
            Planning a Commercial, Industrial, or Multi-Site Project?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our engineering coordinators can review your architectural diagrams, electrical bills of quantities (BOQ), or site locations to prepare a comprehensive capacity proposal.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>SUBMIT COMMERCIAL PROJECT ENQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
