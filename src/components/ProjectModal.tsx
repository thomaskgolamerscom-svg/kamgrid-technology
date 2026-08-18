import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { useCMS } from '../context/CMSContext';
import { X, MapPin, CheckCircle2, ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { setIsQuoteModalOpen, setPreselectedQuoteService } = useCMS();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
    onClose();
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0B1E3D] text-white p-4 sm:p-6 border-b border-amber-500 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location} • {project.clientType} Project</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Photo Gallery Slider */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-contain object-center"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 font-mono text-xs px-2.5 py-1 rounded border border-slate-700">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SERVICE CATEGORY:</span>
              <p className="font-bold text-[#0B1E3D] text-sm">{project.serviceCategory}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SYSTEM CONFIGURATION:</span>
              <p className="font-bold text-amber-700 text-sm font-mono">{project.systemDetails}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">VERIFIED RESULT:</span>
              <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{project.result}</span>
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">PROJECT LOCATION:</span>
              <p className="font-bold text-slate-800 text-sm">{project.location}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Detailed Project Description</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-slate-600 font-medium">
            Interested in a similar high-capacity setup in your region?
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
            >
              Close
            </button>
            <button
              onClick={handleRequestSimilar}
              className="w-1/2 sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>Request Similar Installation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
