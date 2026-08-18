import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { LogoSpinner } from '../components/BrandLoader';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { data } = useCMS();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    service: 'Solar Energy Systems',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const text = encodeURIComponent(
        `*NEW QUOTE REQUEST - KAMGRID TECHNOLOGY*\n\n` +
        `👤 *Name:* ${formData.fullName}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `✉️ *Email:* ${formData.email || 'N/A'}\n` +
        `📍 *Location:* ${formData.location || 'N/A'}\n` +
        `⚙️ *Service Required:* ${formData.service}\n` +
        `📝 *Project Scope:* ${formData.description || 'General enquiry'}`
      );
      const url = `https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsSubmitted(true);
    }, 600);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B1E3D] text-white py-14 sm:py-18 relative overflow-hidden border-b-2 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold font-mono uppercase tracking-widest border border-amber-500/30">
              <span>DIRECT CONTACT & QUOTES</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Contact KAMGRID Engineering
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Reach our engineering desk for site evaluations, project quotations, technical consultations, or nationwide project deployments.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="font-heading font-bold text-xl text-[#0B1E3D] border-b border-slate-100 pb-3">
                Corporate Headquarters & Contacts
              </h2>

              <div className="space-y-5 text-sm text-slate-700">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700 border border-amber-200 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Headquarters Address</h3>
                    <p className="text-slate-800 font-medium text-sm mt-0.5">{data.company.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700 border border-amber-200 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Direct Telephone Lines</h3>
                    <div className="flex flex-col sm:flex-row sm:gap-4 text-slate-800 font-mono font-bold text-sm mt-0.5">
                      <a href={`tel:${data.company.phone1}`} className="hover:text-amber-600 underline">
                        {data.company.phone1}
                      </a>
                      <a href={`tel:${data.company.phone2}`} className="hover:text-amber-600 underline">
                        {data.company.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200 flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Official WhatsApp Desk</h3>
                    <a
                      href={`https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-mono font-bold text-sm mt-0.5 block hover:underline"
                    >
                      {data.company.whatsapp} (Instant Chat)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700 border border-amber-200 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Engineering Enquiries Email</h3>
                    <a href={`mailto:${data.company.email}`} className="text-slate-800 font-medium text-sm mt-0.5 block hover:text-amber-600 underline">
                      {data.company.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700 border border-slate-200 flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Operational Hours</h3>
                    <p className="text-slate-800 text-xs mt-0.5">
                      Monday – Saturday: <strong>8:00 AM – 6:00 PM</strong><br />
                      <span className="text-slate-500 italic">24/7 On-Call Support for Critical Commercial SLAs</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nationwide Deployment Coverage Note */}
            <div className="bg-[#0B1E3D] text-white p-6 rounded-xl border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>NATIONWIDE MOBILIZATION</span>
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Operating Across South-East & Nigeria
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                While headquartered in Aba, Abia State, our technical teams regularly deploy across Enugu, Imo, Rivers, Anambra, Delta, and other states for commercial and residential installations.
              </p>
            </div>

          </div>

          {/* Lead / Quote Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 mb-2">
                  <span>ONLINE INTAKE</span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#0B1E3D]">
                  Request an Engineering Quote
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Fill out your project requirements below to receive a swift technical assessment.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-emerald-900">
                    Request Received Successfully!
                  </h3>
                  <p className="text-emerald-800 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to KAMGRID TECHNOLOGY. An engineering project manager will review your specs and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        location: '',
                        service: 'Solar Energy Systems',
                        description: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDirectSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name / Company Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Chief Emeka Obi / Apex Logistics"
                        className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 0816 517 0738"
                        className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. client@example.com"
                        className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Project Location / City *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Aba, Enugu, Owerri, Port Harcourt"
                        className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Engineering Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs font-medium"
                    >
                      {data.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Multi-Service / Turnkey Project">Multi-Service / Turnkey Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Description & Load Requirements
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your property type, load requirements (e.g. ACs, pumps, server rooms, CCTV camera count), or timeline..."
                      className="w-full px-3.5 py-2.5 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-slate-900 text-xs"
                    />
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-5 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <LogoSpinner size="xs" />
                          <span>SENDING REQUEST...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>SUBMIT DIRECT REQUEST</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      disabled={isSubmitting}
                      className="sm:w-auto py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-60"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>SEND VIA WHATSAPP</span>
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
