import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, ArrowRight, Eye, CheckCircle2, Layers } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProjectModal } = useCMS();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Solar Energy Systems', 'Electrical Engineering', 'CCTV & Security', 'Lightning Protection', 'Structured Cabling'];

  const filteredProjects = selectedFilter === 'ALL'
    ? data.projects
    : data.projects.filter(p => p.serviceCategory === selectedFilter);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
            <span>ENGINEERING PORTFOLIO</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B1E3D] tracking-tight">
            Selected Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Real engineering work. Practical solutions. Measurable results.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-md text-xs font-bold tracking-wider transition-all uppercase ${
                selectedFilter === cat
                  ? 'bg-[#0B1E3D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Project Banner if exists */}
        {data.projects.filter(p => p.featured).map((featProj) => (
          <div
            key={featProj.id}
            className="mb-12 rounded-xl bg-slate-900 text-white overflow-hidden border-2 border-amber-500/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Image gallery preview */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto bg-slate-950 overflow-hidden group">
              <ImageWithFallback
                src={featProj.images[0]}
                alt={featProj.title}
                aspectRatio="h-full w-full"
                className="group-hover:scale-105 transition-transform duration-500 opacity-95"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] tracking-widest px-3 py-1 rounded uppercase">
                FEATURED ENGINEERING PROJECT
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0B1E3D]">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{featProj.location} • {featProj.clientType}</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  {featProj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {featProj.description}
                </p>

                {/* Technical Specifications Callout */}
                <div className="space-y-3 bg-slate-900/90 p-4 rounded border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium uppercase text-[10px] block">SYSTEM SPECIFICATION:</span>
                    <span className="font-bold text-amber-300">{featProj.systemDetails}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium uppercase text-[10px] block">VERIFIED RESULT:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {featProj.result}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProjectModal(featProj)}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>VIEW FULL PROJECT & GALLERY</span>
              </button>
            </div>
          </div>
        ))}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProjectModal(project)}
              className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-500 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <ImageWithFallback
                  src={project.images[0]}
                  alt={project.title}
                  aspectRatio="h-52 w-full"
                  className="group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded border border-slate-700">
                  {project.clientType}
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0B1E3D]/90 text-white font-mono text-[11px] px-2.5 py-1 rounded flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    {project.serviceCategory}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-[#0B1E3D] group-hover:text-amber-700 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B1E3D] group-hover:text-amber-600 flex items-center gap-1">
                    View Specs & Gallery <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {project.images.length} Image{project.images.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-500">
            <Layers className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium">No projects listed under this category yet.</p>
            <p className="text-xs text-slate-400 mt-1">Use the CMS Admin Portal to add project records.</p>
          </div>
        )}

      </div>
    </section>
  );
};
