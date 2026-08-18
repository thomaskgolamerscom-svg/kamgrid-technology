import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ErrorFallback } from '../components/ErrorFallback';
import { ArrowLeft, MapPin, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

interface ProjectDetailPageProps {
  projectId?: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId }) => {
  const { data, currentPath, navigate, setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract ID from pathname if not provided
  const effectiveId = projectId || currentPath.replace('/projects/', '').replace('/projects', '');

  const project = data.projects.find(p => p.id === effectiveId) || data.projects[0];

  if (!project) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4">
        <ErrorFallback
          message="The requested engineering project was not found."
          onRetry={() => navigate('/projects')}
        />
      </div>
    );
  }

  const images = project.images.length > 0
    ? project.images
    : ['https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleRequestSimilar = () => {
    setPreselectedQuoteService(project.serviceCategory);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-10 sm:py-14 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL PROJECTS</span>
          </button>

          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location} • {project.clientType} Project</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
              {project.serviceCategory} • Verified Installation Performance
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column (Gallery + Description) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-72 sm:h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                <img
                  src={images[activeImageIndex]}
                  alt={`${project.title} photo ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover sm:object-contain object-center transition-all duration-300"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-105"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-105"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 font-mono text-xs px-3 py-1 rounded border border-slate-700">
                  Photo {activeImageIndex + 1} of {images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-24 h-18 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-amber-500 scale-105 shadow-md ring-2 ring-amber-400/30'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-depth Project Narrative */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#0B1E3D] border-b border-slate-100 pb-3">
                Project Overview & Execution Scope
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our technical team conducted a comprehensive site inspection and load analysis before installation. The installation was executed with certified copper cabling, neat industrial trunking, surge protection devices (SPDs), high-current DC circuit breakers, and calibrated earthing grounding rods to safeguard against power anomalies.
              </p>
            </div>

          </div>

          {/* Sidebar Specifications Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* System Specs Box */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-lg text-[#0B1E3D] uppercase tracking-wider border-b border-slate-100 pb-2">
                Engineering Specifications
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SERVICE CATEGORY:</span>
                  <p className="font-bold text-[#0B1E3D] text-sm">{project.serviceCategory}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SYSTEM CONFIGURATION:</span>
                  <p className="font-bold text-amber-700 text-sm font-mono bg-amber-50 p-2.5 rounded border border-amber-200">
                    {project.systemDetails}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">VERIFIED RESULT:</span>
                  <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{project.result}</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">LOCATION & CLIENT:</span>
                  <p className="font-bold text-slate-800 text-sm">{project.location} ({project.clientType})</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button
                  onClick={handleRequestSimilar}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Similar Installation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quality Standard Guarantee */}
            <div className="bg-[#0B1E3D] text-white p-6 rounded-xl shadow-md border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>KAMGRID QUALITY STANDARD</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                All systems commissioned by KAMGRID TECHNOLOGY include comprehensive handover documentation, component warranties, and after-sales support.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
