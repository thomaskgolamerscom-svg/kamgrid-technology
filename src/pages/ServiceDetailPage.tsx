import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ErrorFallback } from '../components/ErrorFallback';
import { ArrowLeft, Check, ShieldCheck, ArrowRight, CheckCircle2, Phone, MessageSquare, Sun, Zap, Network, ShieldAlert } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId?: string;
  slug?: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, slug }) => {
  const { data, currentPath, navigate, setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();

  // Determine current service based on prop or pathname
  const effectiveSlug = serviceId || slug || currentPath.replace('/services/', '').replace('/services', '');

  const service = data.services.find(s => {
    const sId = s.id.toLowerCase();
    const target = effectiveSlug.toLowerCase();
    if (sId === target) return true;
    if (target.includes('solar') && sId.includes('solar')) return true;
    if (target.includes('cctv') && sId.includes('cctv')) return true;
    if (target.includes('electrical') && sId.includes('electrical')) return true;
    if (target.includes('lightning') && sId.includes('lightning')) return true;
    if ((target.includes('cabling') || target.includes('network')) && sId.includes('cabling')) return true;
    return false;
  }) || data.services[0];

  if (!service) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4">
        <ErrorFallback
          message="The requested engineering service was not found."
          onRetry={() => navigate('/services')}
        />
      </div>
    );
  }

  // Related projects
  const relatedProjects = data.projects.filter(
    p => p.serviceCategory.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())
  );

  const handleRequestQuote = () => {
    setPreselectedQuoteService(service.title);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb & Navigation Header */}
      <div className="bg-[#0B1E3D] text-white py-10 sm:py-14 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL SERVICES</span>
          </button>

          <div className="max-w-3xl space-y-2">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest block">
              ENGINEERING SERVICE SPECIFICATION
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Service Hero Image */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                aspectRatio="aspect-16/9"
                className="w-full h-full object-cover"
              />
            </div>

            {/* In-depth Scope Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                <span>SERVICE OVERVIEW & SCOPE</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-[#0B1E3D]">
                Comprehensive Technical Execution
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {service.fullDescription || service.shortDescription}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                KAMGRID TECHNOLOGY approaches every {service.title} project with engineering calculations and quality hardware. We assess the physical site, evaluate voltage drops, test earthing resistance, and ensure every conduit, breaker, and connection meets stringent safety standards.
              </p>
            </div>

            {/* Technical Capabilities & Deliverables */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-xl text-[#0B1E3D] border-b border-slate-100 pb-3">
                Full Technical Capabilities & Offerings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800"
                  >
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typical Applications */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-xl text-[#0B1E3D] border-b border-slate-100 pb-3">
                Typical Applications & Sectors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-[#0B1E3D] text-sm">Residential & Private Estates</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Custom domestic configurations with silent inverters, neat battery racks, perimeter CCTV surveillance, and clean wiring.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-[#0B1E3D] text-sm">Commercial & Retail Properties</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Three-phase balancing, commercial backup power, multi-channel NVR recording, and structured office network drops.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-[#0B1E3D] text-sm">Industrial & Warehousing</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Heavy-duty surge suppressors, Copper grounding grids, motor protection circuits, and high-bay lighting installations.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-[#0B1E3D] text-sm">Hospitals & Schools</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Zero-transfer-time power systems for sensitive medical gear, high-resolution surveillance, and campus network backbones.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <h3 className="font-heading font-bold text-xl text-[#0B1E3D] border-b border-slate-100 pb-3">
                  Verified Project Examples
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/projects/${p.id}`)}
                      className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-amber-500 transition-colors cursor-pointer group space-y-2"
                    >
                      <div className="h-32 bg-slate-900 rounded overflow-hidden">
                        <ImageWithFallback
                          src={p.images[0]}
                          alt={p.title}
                          aspectRatio="h-32 w-full"
                          className="group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1E3D] group-hover:text-amber-600 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">{p.location} • {p.systemDetails}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar CTA Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Action Box */}
            <div className="bg-[#0B1E3D] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-800 space-y-6 sticky top-24">
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block">
                PROJECT CONSULTATION
              </span>
              <h3 className="font-heading text-xl font-bold text-white">
                Request a Quote for {service.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contact our engineering team directly for a free site assessment, technical load review, and verified itemized quote.
              </p>

              <button
                onClick={handleRequestQuote}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Call: <strong className="text-white font-mono">{data.company.phone1}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>WhatsApp: <strong className="text-white font-mono">{data.company.whatsapp}</strong></span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-bold text-slate-200">✓ Certified Technicians</div>
                <div className="font-bold text-slate-200">✓ Genuine Manufacturer Warranty</div>
                <div className="font-bold text-slate-200">✓ After-Sales Maintenance Plan</div>
              </div>
            </div>

            {/* Other Services Navigation */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500">
                Explore Other Services
              </h4>
              <div className="space-y-2">
                {data.services
                  .filter((s) => s.id !== service.id)
                  .map((other) => (
                    <button
                      key={other.id}
                      onClick={() => {
                        if (other.id.includes('solar')) navigate('/services/solar');
                        else if (other.id.includes('cctv')) navigate('/services/cctv');
                        else if (other.id.includes('electrical')) navigate('/services/electrical');
                        else if (other.id.includes('lightning')) navigate('/services/lightning');
                        else if (other.id.includes('cabling')) navigate('/services/structured-cabling');
                        else navigate(`/services/${other.id}`);
                      }}
                      className="w-full text-left p-2.5 rounded hover:bg-slate-100 transition-colors flex items-center justify-between text-xs font-semibold text-[#0B1E3D] cursor-pointer"
                    >
                      <span>{other.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
