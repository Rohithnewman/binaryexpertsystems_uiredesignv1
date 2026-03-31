import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/hooks/useAppStore';

export const Preloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const setPreloaderFinished = useAppStore((state) => state.setPreloaderFinished);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderFinished(true);
      },
    });

    // Counter animation
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}`;
        }
      },
    });

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      0.3
    );

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      0.6
    );

    // Fade everything out
    tl.to([logoRef.current, textRef.current, counterRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power3.in',
      stagger: 0.05,
    }, '+=0.3');

    // Slide the preloader up
    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });
  }, [setPreloaderFinished]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-6">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center font-display font-800 text-white text-2xl shadow-lg shadow-accent/20">
          B
        </div>
      </div>

      {/* Text */}
      <div ref={textRef} className="text-center">
        <h1 className="font-display text-2xl font-700 tracking-tight text-ink">
          Binary Expert Systems
        </h1>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-faint">
          Loading Experience
        </p>
      </div>

      {/* Counter */}
      <div className="absolute bottom-12 right-12 font-mono text-7xl font-300 text-ink/5 tabular-nums">
        <span ref={counterRef}>0</span>
      </div>

      {/* Minimal progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
        <div className="h-full bg-accent origin-left" style={{ animation: 'progress-fill 2s power2.inOut forwards' }} />
      </div>

      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};
