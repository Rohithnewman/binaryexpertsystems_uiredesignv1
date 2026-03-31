import React, { useState, useRef, useEffect } from 'react';
import { PRICING_TIERS } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Pricing: React.FC = () => {
  const [activeTier, setActiveTier] = useState(1); // Default to "Growth"
  const sectionRef = useRef<HTMLElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.pricing-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
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

  const activePlan = PRICING_TIERS[activeTier];

  // Interpolate background color based on tier
  const bgColors = ['#f7f7f5', '#f0faf6', '#faf5f0'];
  const accentColors = ['#6b6b6b', '#0d7c66', '#ea580c'];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bgColors[activeTier] }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pricing-reveal flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">Investment</span>
        </div>
        <h2 className="pricing-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-800 tracking-tight text-ink mb-6">
          Transparent Pricing.
        </h2>
        <p className="pricing-reveal text-ink-muted font-sans text-base md:text-lg leading-relaxed max-w-xl mb-16">
          No hidden fees. No surprise invoices. Choose what fits your stage.
        </p>

        {/* Tier Selector — Interactive Dial/Tabs */}
        <div className="pricing-reveal" ref={tiersRef}>
          {/* Tab-style selector (not cards!) */}
          <div className="flex items-stretch border border-border rounded-full overflow-hidden mb-16 max-w-xl">
            {PRICING_TIERS.map((tier, i) => (
              <button
                key={i}
                onClick={() => setActiveTier(i)}
                className="flex-1 py-4 px-6 text-center transition-all duration-500 relative"
                style={{
                  backgroundColor: activeTier === i ? accentColors[i] : 'transparent',
                  color: activeTier === i ? '#ffffff' : 'var(--color-ink-muted)',
                }}
              >
                <span className="font-display font-600 text-sm uppercase tracking-wider">
                  {tier.name}
                </span>
                {tier.popular && activeTier !== i && (
                  <span className="absolute -top-2 right-4 font-mono text-[8px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Plan Display — NOT a card grid */}
        <div className="pricing-reveal grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-16">
          {/* Left: Price & Description */}
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-[clamp(3rem,6vw,5rem)] font-900 tracking-tight transition-colors duration-500"
                  style={{ color: accentColors[activeTier] }}
                >
                  ${activePlan.price.toLocaleString()}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">/project</span>
              </div>
              <p className="font-sans text-ink-muted text-base leading-relaxed mt-4 max-w-sm">
                {activePlan.description}
              </p>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 font-display font-600 text-sm uppercase tracking-widest text-white rounded-full transition-all duration-500 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: accentColors[activeTier] }}
            >
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              * Custom quotes available for larger engagements
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right: Features List */}
          <div className="space-y-6">
            <h4 className="font-display font-600 text-lg text-ink mb-4">What's included</h4>
            <div className="space-y-4">
              {activePlan.features.map((feature, i) => (
                <div
                  key={`${activeTier}-${i}`}
                  className="flex items-start gap-4 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-colors duration-500"
                    style={{ backgroundColor: `${accentColors[activeTier]}15` }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke={accentColors[activeTier]}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-sans text-sm text-ink leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
