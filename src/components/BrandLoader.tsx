import React, { useState, useEffect } from 'react';

interface KamgridLoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  className?: string;
  alt?: string;
}

/**
 * KAMGRID Technical Calibration Ring
 * Engineering instrumentation graphic that surrounds the rotating emblem.
 */
const CalibrationRing: React.FC<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ size }) => {
  if (size === 'xs' || size === 'sm') {
    return (
      <svg
        className="absolute inset-0 w-full h-full kamgrid-ring-spin pointer-events-none"
        viewBox="0 0 40 40"
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#C5A059"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeOpacity="0.8"
        />
      </svg>
    );
  }

  return (
    <div className="absolute inset-[-14%] w-[128%] h-[128%] pointer-events-none flex items-center justify-center">
      {/* Precision Circular Trace */}
      <svg className="w-full h-full kamgrid-ring-spin" viewBox="0 0 100 100" fill="none">
        {/* Outer subtle guide track */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#0B1E3D"
          strokeWidth="0.75"
          strokeOpacity="0.15"
        />
        {/* Active Golden Engineering Arc */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#C5A059"
          strokeWidth="1.5"
          strokeDasharray="24 12 8 12"
          strokeLinecap="round"
          className="kamgrid-ring-dash"
        />
        {/* Precision Cardinal Coordinate Ticks */}
        <line x1="50" y1="2" x2="50" y2="6" stroke="#C5A059" strokeWidth="1.5" />
        <line x1="50" y1="94" x2="50" y2="98" stroke="#C5A059" strokeWidth="1.5" />
        <line x1="2" y1="50" x2="6" y2="50" stroke="#C5A059" strokeWidth="1.5" />
        <line x1="94" y1="50" x2="98" y2="50" stroke="#C5A059" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

/**
 * Safe, non-blocking KAMGRID Branded Logo Loader
 * - Centerpiece: Official KAMGRID Logo Emblem
 * - Animation: Smooth deliberate 360-degree rotation (1.3s)
 * - Engineering Signal: Precision calibration ring with gold accents
 * - Non-blocking: pointer-events-none
 */
export const KamgridLoader: React.FC<KamgridLoaderProps> = ({
  size = 'md',
  showRing = false,
  className = '',
  alt = 'KAMGRID Loading',
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${sizeClasses[size]} ${className}`}>
      {showRing && <CalibrationRing size={size} />}
      <img
        src="/logo-icon.svg"
        alt={alt}
        className="w-full h-full object-contain kamgrid-loader-logo select-none"
      />
    </div>
  );
};

// Backwards compatibility alias
export const LogoSpinner = KamgridLoader;

/**
 * Premium KAMGRID Brand Transition Overlay
 * - Never blocks the underlying application or interaction
 * - Activates briefly on route change (~600ms total visual sequence)
 * - Incorporates Engineering Drafting Grid, Precision Calibration Ring, and Brand Identity
 * - Failsafe auto-dismiss guarantees no stuck state
 */
export const KamgridBrandTransition: React.FC<{ activePath: string }> = ({ activePath }) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only trigger transition if path is defined
    if (!activePath) return;

    setVisible(true);
    setFading(false);

    // Phase 1-3: Display sequence for 400ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 400);

    // Phase 4: Resolution and complete fade-out by 650ms
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setFading(false);
    }, 650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [activePath]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-30 flex items-center justify-center bg-white/92 backdrop-blur-2xs bg-drafting-grid select-none pointer-events-none transition-opacity duration-250 ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Drafting Corner Accents */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-slate-600 tracking-widest hidden sm:block">
        SYS.ACT // 01-GRID
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-600 tracking-widest hidden sm:block">
        KAMGRID TECHNOLOGY // PRECISION RUNTIME
      </div>

      {/* Central Engineering Activation Module */}
      <div className="flex flex-col items-center justify-center p-6 text-center kamgrid-appear">
        {/* Emblem with Precision Calibration Ring */}
        <div className="relative mb-5">
          <KamgridLoader size="lg" showRing={true} />
        </div>

        {/* Brand Typography */}
        <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0B1E3D] tracking-wider uppercase leading-none">
          KAMGRID TECHNOLOGY
        </h2>

        {/* Engineering Status Readout */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 tracking-[0.2em] uppercase">
            Engineering solutions in progress
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Local non-blocking button / action loader
 */
export const KamgridButtonLoader: React.FC<{ text?: string; size?: 'xs' | 'sm' }> = ({
  text = 'PROCESSING...',
  size = 'xs',
}) => {
  return (
    <span className="inline-flex items-center justify-center gap-2.5 font-bold tracking-wider pointer-events-none select-none">
      <KamgridLoader size={size} showRing={true} />
      <span>{text}</span>
    </span>
  );
};

/**
 * Local non-blocking card or section loader
 */
export const KamgridSectionLoader: React.FC<{ message?: string; minHeight?: string }> = ({
  message = 'Loading data...',
  minHeight = 'min-h-[160px]',
}) => {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-6 bg-white/80 rounded-xl border border-slate-200/80 bg-drafting-grid-dense pointer-events-none select-none`}
    >
      <KamgridLoader size="md" showRing={true} />
      <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-widest mt-3">
        {message}
      </span>
    </div>
  );
};

// Safe stub for legacy calls
export const PageLoadingOverlay: React.FC<{ message?: string; isVisible?: boolean }> = () => {
  return null;
};
export const SectionLoader = KamgridSectionLoader;
