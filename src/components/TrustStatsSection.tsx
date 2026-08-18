import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Layers, Users } from 'lucide-react';

interface StatItemConfig {
  id: string;
  targetValue: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const STATS_DATA: StatItemConfig[] = [
  {
    id: 'projects',
    targetValue: 20,
    label: 'PROJECTS',
    description: 'Engineered & delivered across residential, commercial and industrial sectors',
    icon: <CheckCircle className="w-5 h-5 text-amber-400" />,
    ariaLabel: '20+ Projects',
  },
  {
    id: 'installations',
    targetValue: 50,
    label: 'INSTALLATIONS',
    description: 'High-voltage solar, electrical, CCTV and cabling systems deployed',
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    ariaLabel: '50+ Installations',
  },
  {
    id: 'clients',
    targetValue: 100,
    label: 'CLIENTS',
    description: 'Satisfied private property owners, commercial firms and facilities',
    icon: <Users className="w-5 h-5 text-amber-400" />,
    ariaLabel: '100+ Clients',
  },
];

/**
 * Animated Counter Component
 * - Smooth easing animation from 0 to target value
 * - Duration: ~1.8s
 * - Keeps the "+" symbol visually attached throughout
 * - Handles prefers-reduced-motion gracefully
 */
const AnimatedStatValue: React.FC<{
  targetValue: number;
  shouldStart: boolean;
}> = ({ targetValue, shouldStart }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Check accessibility preference: prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCount(targetValue);
      return;
    }

    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1800; // ~1.8 seconds smooth curve

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth cubic ease-out: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * targetValue);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, shouldStart]);

  return (
    <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-400 tracking-tight tabular-nums inline-flex items-baseline">
      <span>{count}</span>
      <span className="text-amber-300 ml-0.5 font-bold select-none">+</span>
    </span>
  );
};

export const TrustStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldStartAnimation, setShouldStartAnimation] = useState<boolean>(false);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if user has reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShouldStartAnimation(true);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger once when the section enters view (threshold 0.20)
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setShouldStartAnimation(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Company Statistics and Track Record"
      className="bg-[#0B1E3D] text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-y-2 border-amber-500 relative overflow-hidden"
    >
      {/* Background CAD Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />

      {/* Engineering Corner Coordinates */}
      <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-400 tracking-widest hidden sm:block pointer-events-none">
        METRICS // VERIFIED_OPS_RECORD
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/70 px-3 py-1 rounded border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>PROVEN EXPERIENCE</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Our Engineering Track Record
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Experience built through real projects, professional installations and clients served across residential, commercial and industrial environments.
          </p>
        </div>

        {/* 3 Core Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={stat.id}
              className="relative p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              aria-label={stat.ariaLabel}
            >
              {/* Subtle Engineering Card Top Number Index */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 tracking-widest">
                  STAGE // 0{idx + 1}
                </span>
                <div className="p-2 bg-[#0B1E3D] rounded border border-slate-700/80 shadow-xs">
                  {stat.icon}
                </div>
              </div>

              {/* Numerical Counter */}
              <div className="mb-2">
                <AnimatedStatValue
                  targetValue={stat.targetValue}
                  shouldStart={shouldStartAnimation}
                />
              </div>

              {/* Statistic Label */}
              <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider text-white uppercase mb-1.5">
                {stat.label}
              </h3>

              {/* Supporting Description */}
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                {stat.description}
              </p>

              {/* Bottom Subtle Gold Accent Line */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>VERIFIED METRIC</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
