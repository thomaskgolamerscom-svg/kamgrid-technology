import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { MapPin, CheckCircle2, ArrowRight, Eye, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { data, navigate, setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Categories list
  const categories = ['ALL', 'SOLAR', 'CCTV', 'ELECTRICAL', 'LIGHTNING'];

  const filteredProjects = activeFilter === 'ALL'
    ? data.projects
    : data.projects.filter(p => p.serviceCategory.toUpperCase().includes(activeFilter));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-14 sm:py-18 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest border border-amber-500/30">
              <span>PROVEN TRACK RECORD</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Engineering Projects & Installations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our portfolio of verified solar power installations, commercial security systems, electrical distribution projects, and surge protection deployments.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-[#0B1E3D] text-amber-400 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL PROJECTS' : `${cat} SYSTEMS`}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-500">
              Showing <strong className="text-[#0B1E3D]">{filteredProjects.length}</strong> verified project{filteredProjects.length === 1 ? '' : 's'}
            </div>

          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-500 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-56 bg-slate-950 overflow-hidden">
                    <ImageWithFallback
                      src={project.images[0]}
                      alt={project.title}
                      aspectRatio="h-56 w-full"
                      className="group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/90 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 bg-[#0B1E3D]/90 backdrop-blur-xs text-amber-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded border border-amber-500/40">
                      {project.clientType}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span className="flex items-center gap-1 text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {project.location}
                      </span>
                      <span className="bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {project.serviceCategory}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#0B1E3D] group-hover:text-amber-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">CONFIGURATION:</span>
                          <span className="font-bold text-slate-800 font-mono">{project.systemDetails}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">VERIFIED RESULT:</span>
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {project.result}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0B1E3D] group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                        View Project Specs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreselectedQuoteService(project.serviceCategory);
                          setIsQuoteModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-[10px] uppercase tracking-wider rounded"
                      >
                        Request Similar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 max-w-md mx-auto p-8">
              <p className="text-slate-600 text-sm">No projects found in this category.</p>
              <button
                onClick={() => setActiveFilter('ALL')}
                className="mt-4 px-4 py-2 bg-[#0B1E3D] text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Show All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-14 bg-[#0B1E3D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl">
            Have a Specific Project in Mind?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our engineering team handles customized residential setups, commercial multi-site power plants, and industrial installations.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-lg cursor-pointer"
          >
            REQUEST A PROJECT ESTIMATE
          </button>
        </div>
      </section>
    </div>
  );
};
