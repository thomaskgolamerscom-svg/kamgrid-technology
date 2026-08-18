import React from 'react';
import { useCMS } from '../context/CMSContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { data } = useCMS();

  const handleWhatsAppClick = () => {
    const defaultText = encodeURIComponent(
      'Hello KAMGRID TECHNOLOGY, I would like to make an enquiry about your engineering services.'
    );
    const whatsappUrl = `https://wa.me/234${data.company.whatsapp.replace(/^0/, '')}?text=${defaultText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip Hover Label */}
      <div className="hidden md:block mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-800">
        Chat with KAMGRID Engineering
      </div>

      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none border-2 border-white cursor-pointer"
        aria-label="Contact KAMGRID TECHNOLOGY via WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-emerald-600" />
      </button>
    </div>
  );
};
