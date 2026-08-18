import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  message = 'Unable to load this content right now.',
  onRetry,
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
      {/* Brand Logo Icon */}
      <div className="w-16 h-16 mb-4 p-1 rounded-full border-2 border-amber-500 bg-[#0B1E3D] flex items-center justify-center shadow-md">
        <img
          src="/logo-icon.svg"
          alt="KAMGRID Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="font-heading font-bold text-xl text-[#0B1E3D] mb-1">
        KAMGRID TECHNOLOGY
      </h3>

      <p className="text-slate-600 text-sm max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1E3D] hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
