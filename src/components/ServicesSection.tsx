import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sun, ShieldCheck, Zap, ShieldAlert, Network, ArrowRight, Check } from 'lucide-react';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { data, setSelectedServiceModal, setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-500" />;
      case 'Network':
      default:
        return <Network className="w-6 h-6 text-amber-500" />;
    }
  };

  const handleRequestQuote = (serviceTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreselectedQuoteService(serviceTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
            <span>ENGINEERING SERVICES</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight">
            Our Engineering Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From residential installations to commercial and industrial infrastructure, KAMGRID TECHNOLOGY provides practical engineering solutions designed around reliability, safety and performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedServiceModal(service)}
              className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-500/80 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-transparent to-transparent opacity-80" />
                
                {/* Category Icon Badge */}
                <div className="absolute top-4 left-4 p-2.5 bg-[#0B1E3D]/90 backdrop-blur-xs rounded-md border border-amber-500/40">
                  {getServiceIcon(service.iconName)}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Capabilities Preview List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-[#0B1E3D] uppercase tracking-wider mb-2">
                    Key Capabilities:
                  </p>
                  {service.capabilities.slice(0, 4).map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                  {service.capabilities.length > 4 && (
                    <p className="text-[11px] text-amber-700 font-semibold pt-1">
                      +{service.capabilities.length - 4} more capabilities
                    </p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0B1E3D] group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                    Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => handleRequestQuote(service.title, e)}
                    className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
