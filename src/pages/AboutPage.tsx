import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, Target, Award, CheckCircle2, Building, Wrench, HardHat, Compass, FileCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { data, setIsQuoteModalOpen } = useCMS();

  return (
    <div className="bg-slate-50">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-14 sm:py-18 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest border border-amber-500/30">
              <span>ABOUT KAMGRID TECHNOLOGY</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Practical Engineering Solutions For Critical Infrastructure
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Established in 2024 to provide robust power, security, electrical, and networking engineering with integrity, safety, and long-term reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Company Story & Founding Origin */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Story Left */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                <span>OUR BACKGROUND & STORY</span>
              </div>
              
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
                Solving Power & Infrastructure Vulnerabilities
              </h2>

              <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-amber-500 shadow-2xs space-y-3">
                <p className="font-semibold text-[#0B1E3D] text-base">
                  {data.aboutStory}
                </p>
                <p className="text-slate-600 text-sm">
                  {data.aboutSolveText}
                </p>
              </div>

              <p>
                Too often, property owners and commercial facilities suffer from sub-standard wiring, poorly calculated solar inverter loads, insecure surveillance setups, or complete lack of lightning grounding. KAMGRID TECHNOLOGY was formed to raise the engineering benchmark in Nigeria.
              </p>

              <p>
                Every project we undertake undergoes proper engineering load calculation, site topology assessment, quality equipment sourcing, and meticulous execution according to industry safety codes.
              </p>

              {/* Corporate Standing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 shadow-2xs flex items-start gap-3">
                  <FileCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1E3D]">CAC Registered Entity</h4>
                    <p className="text-xs text-slate-600 mt-1">Duly registered under Nigerian corporate company regulations.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 shadow-2xs flex items-start gap-3">
                  <Compass className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B1E3D]">Engineered Precision</h4>
                    <p className="text-xs text-slate-600 mt-1">No guesswork. Load calculations, thermal checks, and neat conduit routing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision Pillars Right */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0B1E3D] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-800 space-y-6">
                <div>
                  <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                    OUR MISSION
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    Delivering Reliable, Practical Engineering
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To engineer and implement reliable solar, electrical, security, and structured infrastructure solutions that eliminate downtime, protect assets, and enable our residential, commercial, and industrial clients to thrive.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                    OUR VISION
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    The Benchmark for Technical Integrity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To be the most trusted engineering partner across South-East Nigeria and nationwide, recognized for flawless execution, honest technical guidance, and unmatched after-sales support.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                    ENGINEERING PHILOSOPHY
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "Every installation should be completed properly, safely, and durably — not simply completed quickly."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9 Core Engineering Strengths */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
              <span>OUR 9 CORE PILLARS</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight">
              Why Clients Choose KAMGRID TECHNOLOGY
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Our 9 core strengths guide every project we design, install, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.strengths.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-lg bg-white border border-slate-200 shadow-2xs hover:border-amber-500 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-extrabold text-amber-600 group-hover:text-amber-700">
                    {item.number}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-amber-500 transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B1E3D] uppercase tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Credentials */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
              <span>COMPLIANCE & STANDARDS</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
              Corporate Credentials & Verification
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Operating with full corporate compliance, trained personnel, and strict safety guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-2xs hover:border-amber-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-[#0B1E3D] text-amber-400 rounded-md">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    {cert.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        VERIFIED
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#0B1E3D] mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                  <span>Compliance Standard • Active Status</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-colors cursor-pointer border border-slate-800"
            >
              REQUEST A PROJECT QUOTE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
