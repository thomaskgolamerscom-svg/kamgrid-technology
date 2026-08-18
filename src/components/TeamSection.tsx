import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Users, HardHat, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const { data } = useCMS();

  return (
    <section id="team" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
            <span>ENGINEERING PERSONNEL</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight">
            Engineers & Technical Professionals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            KAMGRID TECHNOLOGY is supported by engineers and technicians capable of deploying across multiple project locations while maintaining professional installation standards.
          </p>
        </div>

        {/* Technical Capacity Showcase Banner */}
        <div className="bg-[#0B1E3D] text-white rounded-lg p-8 sm:p-10 shadow-lg border border-slate-800 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 flex-shrink-0">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Multi-Disciplinary Expertise</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Specialized technicians in high-capacity solar PV arrays, electrical distribution, CCTV network NVRs, and grounding ears.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Strict Safety Standards</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Field personnel follow strict electrical safety guidelines, proper insulation procedures, and safety gear protocols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Simultaneous Deployment</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Structured field management capable of handling 3 commercial projects simultaneously across different state locations.
              </p>
            </div>
          </div>
        </div>

        {/* Render CMS Team Members if available */}
        {data.team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.team.map((member) => (
              <div key={member.id} className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-amber-500"
                  />
                )}
                <h4 className="font-heading font-bold text-lg text-[#0B1E3D] text-center">{member.name}</h4>
                <p className="text-xs font-bold text-amber-600 text-center uppercase tracking-wider">{member.position}</p>
                <p className="text-xs text-slate-500 text-center mt-1 font-mono">{member.qualification}</p>
                <p className="text-xs text-slate-600 mt-3 text-center leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg border border-slate-200 text-center max-w-xl mx-auto shadow-2xs">
            <p className="text-xs text-slate-600 font-medium">
              Specific engineering personnel profiles can be added through the CMS Admin Portal as verified credentials are updated.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
