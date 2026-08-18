import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { QuoteFormData } from '../types';
import { KamgridLoader } from './BrandLoader';
import { MessageSquare, Mail, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface QuoteSectionProps {
  isModalMode?: boolean;
  onCloseModal?: () => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ isModalMode = false, onCloseModal }) => {
  const { data, preselectedQuoteService } = useCMS();

  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceRequired: preselectedQuoteService || 'Solar Energy Systems',
    projectDescription: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedQuoteService) {
      setFormData((prev) => ({ ...prev, serviceRequired: preselectedQuoteService }));
    }
  }, [preselectedQuoteService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter a reachable phone number.');
      return false;
    }
    if (!formData.location.trim()) {
      setErrorMessage('Please enter your project location (e.g. Aba, Enugu, Owerri, Port Harcourt, Lagos).');
      return false;
    }
    return true;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const message = `*NEW PROJECT INQUIRY - KAMGRID TECHNOLOGY*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Location:* ${formData.location}
*Service Required:* ${formData.serviceRequired}

*Project Scope / Load Notes:*
${formData.projectDescription || 'Please provide quotation based on standard capacity.'}

_Requested via KAMGRID Official Portal._`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    }, 700);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const subject = encodeURIComponent(`Project Quote Request: ${formData.serviceRequired} - ${formData.name}`);
      const body = encodeURIComponent(`KAMGRID TECHNOLOGY QUOTE REQUEST

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Location: ${formData.location}
Service Required: ${formData.serviceRequired}

Project Description:
${formData.projectDescription || 'Standard load assessment requested.'}

Requested via KAMGRID Official Web Portal.`);

      const mailtoUrl = `mailto:${data.company.email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="quote-form" className={`${isModalMode ? 'p-0 w-full' : 'py-14 sm:py-20 bg-slate-100 border-b border-slate-200'}`}>
      <div className={`${isModalMode ? 'w-full' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        
        <div className={`bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ${isModalMode ? 'max-h-[92vh] flex flex-col' : ''}`}>
          
          {/* Form Header */}
          <div className="bg-[#0B1E3D] text-white p-5 sm:p-7 border-b-2 border-amber-500 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-400 font-mono text-xs uppercase font-bold tracking-widest block mb-1">
                  GET A PROFESSIONAL ESTIMATE
                </span>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  Request an Engineering Quote
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Talk to KAMGRID about solar power, security cameras, electrical work, or surge protection.
                </p>
              </div>
              {isModalMode && onCloseModal && (
                <button
                  onClick={onCloseModal}
                  className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  aria-label="Close quote modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Form Body */}
          <div className={`p-5 sm:p-8 ${isModalMode ? 'overflow-y-auto' : ''}`}>
            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0B1E3D]">
                  Quote Request Dispatched!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your engineering enquiry for <strong>{formData.serviceRequired}</strong> in <strong>{formData.location}</strong> has been transmitted to our technical team.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      if (onCloseModal) onCloseModal();
                    }}
                    className="px-6 py-2.5 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase rounded transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4 sm:space-y-5 text-xs">
                
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs font-semibold flex items-center gap-2 rounded-r">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name / Organisation <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Chief Emeka Obi / Prime Plaza"
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0816 517 0738"
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@example.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Project Location / City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Aba, Enugu, Owerri, Port Harcourt, Lagos"
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900"
                      required
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Required <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 font-medium"
                  >
                    <option value="Solar Energy Systems">Solar Energy Systems (Inverter, Panels, Storage)</option>
                    <option value="CCTV & Security Systems">CCTV & Security Systems (IP, NVR, Access)</option>
                    <option value="Electrical Engineering">Electrical Engineering (Wiring, Panels, Distribution)</option>
                    <option value="Lightning Protection Systems">Lightning Protection Systems (Earthing, Arrestors)</option>
                    <option value="Structured Cabling & Networking">Structured Cabling & Networking (Cat6, Fiber, Racks)</option>
                    <option value="Turnkey Commercial Project">Turnkey Commercial Multi-Service Project</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Description / Specifications
                  </label>
                  <textarea
                    name="projectDescription"
                    rows={3}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Describe building type, load requirements (e.g. 10KVA solar, 16-channel CCTV), or specific timeline..."
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* WhatsApp Primary */}
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <KamgridLoader size="xs" showRing={true} />
                        <span>PREPARING DISPATCH...</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </>
                    )}
                  </button>

                  {/* Email Secondary */}
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-800 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <KamgridLoader size="xs" showRing={true} />
                        <span>DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-amber-400" />
                        <span>Send via Direct Email</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Prefer direct phone discussion? Reach engineering team at <a href={`tel:${data.company.phone1}`} className="font-bold text-[#0B1E3D] underline">{data.company.phone1}</a>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

