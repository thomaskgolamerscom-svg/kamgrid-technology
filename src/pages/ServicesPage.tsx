import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, Check, Sun, ShieldCheck, Zap, ShieldAlert, Network, ArrowUpRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { data, navigate, setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Network':
      default:
        return <Network className="w-5 h-5 text-amber-500" />;
    }
  };

  const getServiceSlug = (serviceId: string) => {
    if (serviceId.includes('solar')) return '/services/solar';
    if (serviceId.includes('cctv')) return '/services/cctv';
    if (serviceId.includes('electrical')) return '/services/electrical';
    if (serviceId.includes('lightning')) return '/services/lightning';
    if (serviceId.includes('cabling')) return '/services/structured-cabling';
    return `/services/${serviceId}`;
  };

  return (
    <div className="bg-slate-50">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-14 sm:py-18 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest border border-amber-500/30">
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Engineering Services & Solutions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Precision engineering for high-demand power systems, enterprise security networks, commercial electrical infrastructure, and environmental surge protection.
            </p>
          </div>
        </div>
      </div>

      {/* Services List Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {data.services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-500 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Image Section */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[260px] bg-slate-950 overflow-hidden group">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    aspectRatio="h-full w-full"
                    className="group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4 p-2.5 bg-[#0B1E3D]/95 rounded border border-amber-500/50 shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-xs p-2 rounded text-white text-xs font-mono">
                    <span className="text-amber-400 font-bold">CATEGORY 0{index + 1}:</span> {service.title}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-[#0B1E3D] mb-3">
                      {service.title}
                    </h2>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                        Key Capabilities & Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.capabilities.map((cap, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs font-medium text-slate-800 bg-white p-2.5 rounded border border-slate-200"
                          >
                            <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => navigate(getServiceSlug(service.id))}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>View Technical Details</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                    <button
                      onClick={() => {
                        setPreselectedQuoteService(service.title);
                        setIsQuoteModalOpen(true);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer shadow-xs"
                    >
                      <span>Request Quote for this Service</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Process Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
              <span>HOW WE OPERATE</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
              Our 5-Stage Engineering Execution Process
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From site survey to commissioning, every step follows strict quality and safety procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Consultation & Site Survey', desc: 'Understanding requirements, assessing site topology, and inspecting existing power feeds.' },
              { step: '02', title: 'Load Assessment & Design', desc: 'Accurate engineering calculation of electrical loads, surges, solar irradiance, or camera blindspots.' },
              { step: '03', title: 'Component Procurement', desc: 'Sourcing genuine, certified inverters, batteries, Tier-1 panels, cables, and copper rods.' },
              { step: '04', title: 'Certified Installation', desc: 'Precision mounting, proper gauge wiring, neat trunking, and grounding in accordance with safety codes.' },
              { step: '05', title: 'Testing & Support', desc: 'Thermal imaging, load tests, client handover, documentation, and continuous warranty support.' },
            ].map((st) => (
              <div key={st.step} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="font-mono text-2xl font-extrabold text-amber-600 block mb-2">{st.step}</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B1E3D] mb-1.5">{st.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Quote Banner */}
      <section className="py-14 bg-[#0B1E3D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-3">
            Need a Custom Engineering Quotation?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-xl mx-auto">
            Our engineering team will assess your site requirements and provide a transparent, itemized proposal.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-lg cursor-pointer"
          >
            REQUEST A DETAILED QUOTE
          </button>
        </div>
      </section>
    </div>
  );
};
