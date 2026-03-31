import React, { useState, useRef, useEffect } from 'react';
import { SOLUTIONS } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Solutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      itemsRef.current.filter(Boolean),
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-surface-alt overflow-hidden"
    >
      {/* Background accent shape */}
      <div
        className="absolute -right-40 top-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: activeIndex !== null
            ? `radial-gradient(circle, ${SOLUTIONS[activeIndex].color}08, transparent 70%)`
            : 'transparent',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">What We Do</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-800 tracking-tight text-ink mb-20">
          Digital Solutions.
        </h2>

        {/* Interactive Index — NO CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 lg:gap-16">
          {/* Left: The Index */}
          <div className="space-y-0">
            {SOLUTIONS.map((solution, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="group cursor-pointer border-t border-border last:border-b"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="py-8 flex items-center justify-between transition-all duration-500">
                  <div className="flex items-baseline gap-6">
                    <span
                      className="font-mono text-[11px] tracking-wider transition-colors duration-300"
                      style={{ color: activeIndex === i ? solution.color : 'var(--color-ink-faint)' }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className="font-display text-2xl md:text-3xl font-700 tracking-tight transition-colors duration-300"
                        style={{ color: activeIndex === i ? solution.color : 'var(--color-ink)' }}
                      >
                        {solution.title}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mt-1">
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    className="transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: activeIndex === i ? solution.color : 'var(--color-ink)' }}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Expandable description (appears on hover) */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: activeIndex === i ? '120px' : '0px',
                    opacity: activeIndex === i ? 1 : 0,
                  }}
                >
                  <p className="pb-8 text-ink-muted font-sans text-sm leading-relaxed max-w-lg pl-16">
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Dynamic Preview */}
          <div
            ref={previewRef}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full aspect-square max-w-[400px]">
              {/* Dynamic SVG Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Base circle */}
                <circle
                  cx="200" cy="200" r="150"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Active ring */}
                <circle
                  cx="200" cy="200" r="150"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${activeIndex !== null ? (activeIndex + 1) * 188 : 0} 942`}
                  className="transition-all duration-700"
                  style={{ stroke: activeIndex !== null ? SOLUTIONS[activeIndex].color : 'transparent' }}
                />
                {/* Center content */}
                <text
                  x="200" y="190"
                  textAnchor="middle"
                  className="font-display text-5xl font-800 transition-all duration-300"
                  style={{ fill: activeIndex !== null ? SOLUTIONS[activeIndex].color : 'var(--color-border)' }}
                >
                  {activeIndex !== null ? `0${activeIndex + 1}` : '—'}
                </text>
                <text
                  x="200" y="220"
                  textAnchor="middle"
                  className="font-mono text-[11px] uppercase tracking-widest"
                  fill="var(--color-ink-muted)"
                >
                  {activeIndex !== null ? SOLUTIONS[activeIndex].title : 'Hover to explore'}
                </text>

                {/* Animated dots around the ring */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <circle
                    key={i}
                    cx={200 + 150 * Math.cos((angle * Math.PI) / 180)}
                    cy={200 + 150 * Math.sin((angle * Math.PI) / 180)}
                    r={activeIndex === i ? 6 : 3}
                    className="transition-all duration-500"
                    style={{
                      fill: activeIndex === i
                        ? SOLUTIONS[i]?.color || 'var(--color-ink-faint)'
                        : 'var(--color-ink-faint)',
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
