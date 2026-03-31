import React, { useEffect, useRef } from 'react';
import { PRODUCT_FEATURES } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProductDetails: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current) return;

    const leftCol = leftColRef.current;
    const features = leftCol.querySelectorAll('.feature-block');
    const totalScrollHeight = leftCol.scrollHeight - window.innerHeight;

    // Pin the entire section and scroll the left column internally
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalScrollHeight}`,
      pin: pinWrapRef.current!,
      anticipatePin: 1,
      scrub: false,
    });

    // Scroll the left column content using GSAP
    gsap.to(leftCol, {
      y: -totalScrollHeight,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
      },
    });

    // Animate each feature based on its scroll position
    features.forEach((feature, i) => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => `top+=${(i / features.length) * totalScrollHeight} top`,
        end: () => `top+=${((i + 1) / features.length) * totalScrollHeight} top`,
        onEnter: () => activateFeature(i),
        onEnterBack: () => activateFeature(i),
      });
    });

    function activateFeature(index: number) {
      // Highlight the active feature, dim others
      features.forEach((f, i) => {
        gsap.to(f, {
          opacity: i === index ? 1 : 0.2,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      // Rotate the graphic
      if (graphicRef.current) {
        gsap.to(graphicRef.current, {
          rotation: index * 90,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Update progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleY: (index + 1) / PRODUCT_FEATURES.length,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Update center text
      if (numberRef.current) {
        numberRef.current.textContent = `0${index + 1}`;
      }
      if (labelRef.current) {
        labelRef.current.textContent = PRODUCT_FEATURES[index].title;
      }
    }

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-surface-alt"
    >
      {/* This container gets pinned by GSAP */}
      <div ref={pinWrapRef} className="h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full">

            {/* ── LEFT: This moves via GSAP y transform ── */}
            <div className="relative overflow-hidden">
              <div ref={leftColRef} className="pt-28 pb-16">
                {/* Section Header */}
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">Product</span>
                  </div>
                  <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-800 tracking-tight text-ink mb-4">
                    Built for Scale.
                  </h2>
                  <p className="text-ink-muted font-sans text-base leading-relaxed max-w-md">
                    Our platform is engineered from the ground up to handle the world's most
                    demanding workloads without breaking a sweat.
                  </p>
                </div>

                {/* Feature blocks */}
                <div className="space-y-24">
                  {PRODUCT_FEATURES.map((feature, i) => (
                    <div key={i} className="feature-block relative" style={{ opacity: i === 0 ? 1 : 0.2 }}>
                      <div className="flex gap-6">
                        {/* Dot & connector */}
                        <div className="relative flex flex-col items-center pt-2 shrink-0">
                          <div className="w-3 h-3 rounded-full border-2 border-accent bg-surface-alt z-10" />
                          {i < PRODUCT_FEATURES.length - 1 && (
                            <div className="w-px flex-1 bg-border mt-3" />
                          )}
                        </div>

                        <div className="pb-4">
                          <div className="flex items-baseline gap-4 mb-3">
                            <span className="font-mono text-[11px] text-accent tracking-wider">0{i + 1}</span>
                            <h3 className="font-display text-2xl font-700 tracking-tight text-ink">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-ink-muted font-sans text-sm leading-relaxed mb-6 max-w-sm">
                            {feature.description}
                          </p>
                          <div className="flex items-baseline gap-3">
                            <span className="font-display text-5xl font-800 text-accent">{feature.metric}</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                              {feature.metricLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Stays perfectly still (it's inside the pinned container) ── */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[380px] aspect-square">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-[40px]" />

                {/* Rotating SVG graphic */}
                <svg
                  ref={graphicRef}
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  style={{ transformOrigin: 'center' }}
                >
                  <circle cx="200" cy="200" r="160" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="8 4" />
                  <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.3" />
                  <line x1="200" y1="40" x2="200" y2="360" stroke="var(--color-border)" strokeWidth="0.5" />
                  <line x1="40" y1="200" x2="360" y2="200" stroke="var(--color-border)" strokeWidth="0.5" />
                  <path d="M 200 40 A 160 160 0 0 1 360 200" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="200" cy="40" r="5" fill="var(--color-accent)" />
                  <circle cx="360" cy="200" r="5" fill="var(--color-accent)" />
                  <circle cx="200" cy="360" r="3" fill="var(--color-ink-faint)" />
                  <circle cx="40" cy="200" r="3" fill="var(--color-ink-faint)" />
                </svg>

                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div ref={numberRef} className="font-display text-4xl font-800 text-accent leading-none">
                    01
                  </div>
                  <div ref={labelRef} className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-2">
                    {PRODUCT_FEATURES[0].title}
                  </div>
                  <div className="font-display text-[9px] uppercase tracking-[0.4em] text-ink-faint mt-1">
                    BES Platform
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute right-0 top-12 bottom-12 w-1 bg-border rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="w-full h-full bg-accent rounded-full origin-top"
                    style={{ transform: 'scaleY(0.25)' }}
                  />
                </div>

                {/* Corner labels */}
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                  Architecture
                </div>
                <div className="absolute bottom-4 right-8 font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                  Performance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
