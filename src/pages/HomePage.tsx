import React from 'react';
import { useCMS } from '../context/CMSContext';
import { HeroSection } from '../components/HeroSection';
import { TrustStatsSection } from '../components/TrustStatsSection';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, CheckCircle2, ShieldCheck, Sun, Zap, Network, ShieldAlert, Award, MapPin, Eye } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data, navigate, setIsQuoteModalOpen, setSelectedProjectModal, setPreselectedQuoteService } = useCMS();

  // Helper for service icon
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

  const featuredProject = data.projects.find(p => p.featured) || data.projects[0];

  const getServiceSlug = (serviceId: string) => {
    if (serviceId.includes('solar')) return '/services/solar';
    if (serviceId.includes('cctv')) return '/services/cctv';
    if (serviceId.includes('electrical')) return '/services/electrical';
    if (serviceId.includes('lightning')) return '/services/lightning';
    if (serviceId.includes('cabling')) return '/services/structured-cabling';
    return `/services/${serviceId}`;
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Key Statistics Bar */}
      <TrustStatsSection />

      {/* 3. Short Company Introduction Summary */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                <span>ESTABLISHED 2024 • CAC REGISTERED</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight leading-tight">
                Engineering Practical Solutions for Power, Security & Infrastructure
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {data.aboutStory}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0B1E3D] hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>Read Full Company Story</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-heading font-bold text-base text-[#0B1E3D] uppercase tracking-wider">
                Core Engineering Discipline
              </h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Quality Workmanship & Attention to Detail</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Strict High-Voltage Electrical Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>After-Sales Engineering Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Multi-Site Simultaneous Mobilization</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/capability')}
                className="w-full py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider text-white bg-[#0B1E3D] hover:bg-slate-900 rounded transition-colors"
              >
                View Operational Capacity
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Overview (Concise 5-card grid) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
                <span>WHAT WE ENGINEER</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
                Our Core Services
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Reliable engineering solutions designed around safety, performance, and long-term durability.
              </p>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#0B1E3D] hover:text-amber-600 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(getServiceSlug(service.id))}
                className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-500 transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    aspectRatio="h-44 w-full"
                    className="group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 p-2 bg-[#0B1E3D]/90 rounded border border-amber-500/40">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-heading font-bold text-base text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B1E3D] group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                      Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreselectedQuoteService(service.title);
                        setIsQuoteModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 rounded"
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

      {/* 5. Featured Project Callout (33KVA Solar Setup in Enugu) */}
      {featuredProject && (
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
                  <span>FEATURED CASE STUDY</span>
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
                  Featured Engineering Project
                </h2>
              </div>
              <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#0B1E3D] hover:text-amber-600 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <span>View All Projects ({data.projects.length})</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            <div className="rounded-xl bg-[#0B1E3D] text-white overflow-hidden border-2 border-amber-500/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto bg-slate-950 overflow-hidden group">
                <ImageWithFallback
                  src={featuredProject.images[0] || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'}
                  alt={featuredProject.title}
                  aspectRatio="h-full w-full"
                  className="group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] tracking-widest px-3 py-1 rounded uppercase">
                  VERIFIED INSTALLATION
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{featuredProject.location} • {featuredProject.clientType}</span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                    {featuredProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {featuredProject.description}
                  </p>

                  <div className="space-y-2.5 bg-slate-900/90 p-3.5 rounded border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">SYSTEM SPECIFICATION:</span>
                      <span className="font-bold text-amber-300 font-mono">{featuredProject.systemDetails}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">VERIFIED OUTCOME:</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {featuredProject.result}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/projects/${featuredProject.id}`)}
                    className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Project Specs</span>
                  </button>
                  <button
                    onClick={() => {
                      setPreselectedQuoteService(featuredProject.serviceCategory);
                      setIsQuoteModalOpen(true);
                    }}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors text-center border border-slate-700 cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Why Choose KAMGRID (Summary of Core Strengths) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
              <span>ENGINEERING STANDARDS</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0B1E3D] tracking-tight">
              Why Property Owners & Businesses Trust KAMGRID
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Our commitment to technical rigor, verified components, and after-sales support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.strengths.slice(0, 3).map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-lg bg-white border border-slate-200 shadow-2xs hover:border-amber-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-extrabold text-amber-600">
                    {item.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#0B1E3D] uppercase tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-md font-bold text-xs uppercase tracking-wider text-[#0B1E3D] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Explore All 9 Engineering Strengths</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Final High-Conversion Quote Banner */}
      <section className="py-14 sm:py-20 bg-[#0B1E3D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded border border-amber-500/30">
            <span>GET IN TOUCH WITH ENGINEERING</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Ready to Engineer Your Power, Security, or Infrastructure Project?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Talk to KAMGRID TECHNOLOGY today for site load assessments, quotation requests, and multi-site project mobilization across Abia State, Enugu, and nationwide.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REQUEST A QUOTE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-md border border-slate-700 transition-colors cursor-pointer"
            >
              <span>VIEW CONTACT DIRECTORY</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
