import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Phone, Mail, MapPin, MessageSquare, Clock, Building2, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, setIsQuoteModalOpen } = useCMS();

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-3">
                <span>TALK TO AN ENGINEER</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0B1E3D] tracking-tight">
                Let's Engineer Your Next Project.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Whether you need a solar energy system, electrical installation, security solution or infrastructure upgrade, talk to KAMGRID TECHNOLOGY about your project.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              {/* Phone Numbers */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-md flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Direct Phone Lines</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href={`tel:${data.company.phone1}`}
                      className="font-mono font-bold text-sm text-[#0B1E3D] hover:text-amber-600 underline transition-colors"
                    >
                      {data.company.phone1}
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={`tel:${data.company.phone2}`}
                      className="font-mono font-bold text-sm text-[#0B1E3D] hover:text-amber-600 underline transition-colors"
                    >
                      {data.company.phone2}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-emerald-600 text-white rounded-md flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">WhatsApp Instant Desk</h4>
                  <a
                    href={`https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono font-bold text-sm text-emerald-700 hover:text-emerald-800 underline transition-colors mt-1"
                  >
                    <span>{data.company.whatsapp}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-md flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Official Email</h4>
                  <a
                    href={`mailto:${data.company.email}`}
                    className="font-bold text-sm text-[#0B1E3D] hover:text-amber-600 underline transition-colors mt-1 block"
                  >
                    {data.company.email}
                  </a>
                </div>
              </div>

              {/* Physical Office Address */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 bg-[#0B1E3D] text-amber-400 rounded-md flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Headquarters Address</h4>
                  <p className="font-medium text-xs sm:text-sm text-slate-800 mt-1 leading-snug">
                    {data.company.address}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Action Callout / Interactive Map Box */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-xl p-8 border-2 border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-amber-400 font-mono text-xs uppercase font-bold tracking-widest block mb-1">
                NATIONAL DEPLOYMENT CAPABILITY
              </span>
              <h3 className="font-heading font-bold text-2xl text-white">
                Serving Abia State, Enugu, and Nationwide
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Headquartered in Aba, Abia State, KAMGRID TECHNOLOGY deploys engineered solar systems, electrical infrastructure, CCTV security and cabling teams across South-East and South-South Nigeria.
              </p>
            </div>

            {/* Coverage Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-200">
              <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                <span className="text-amber-400 font-bold block">ABA / ABIA</span>
                <span className="text-[11px] text-slate-400">Headquarters Hub</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                <span className="text-amber-400 font-bold block">ENUGU STATE</span>
                <span className="text-[11px] text-slate-400">Active High-KVA Hub</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                <span className="text-amber-400 font-bold block">NATIONWIDE</span>
                <span className="text-[11px] text-slate-400">Commercial Mobilization</span>
              </div>
            </div>

            {/* Trigger Quote Modal Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition-colors text-center"
              >
                CLICK HERE TO REQUEST FORMAL QUOTE
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
