import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Award, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  const { data } = useCMS();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
            <span>REGISTRATION & CREDIBILITY</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
            Corporate Credentials & Engineering Compliance
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Operating as a legitimate, registered engineering business entity committed to professional standards.
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
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
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

      </div>
    </section>
  );
};
