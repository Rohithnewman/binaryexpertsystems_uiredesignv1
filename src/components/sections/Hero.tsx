import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_TEXT = 'Web Engineering · Mobile Apps · Cloud Architecture · AI Integration · Design Systems · UI/UX · DevOps · ';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 2.8 });

    // Headline words clip reveal
    const words = headlineRef.current?.querySelectorAll('.hero-word');
    if (words) {
      tl.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
        }
      );
    }

    // Badge pop in
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.5'
      );
    }

    // Subtext
    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }

    // CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    }

    // Marquee
    if (marqueeRef.current) {
      tl.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-surface flex flex-col justify-between overflow-hidden"
    >
      {/* ═══════ Top Bar ═══════ */}
      <div className="px-6 md:px-12 lg:px-24 pt-28 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-px bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            Digital Agency — Est. 2018
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Open for projects
          </span>
        </div>
      </div>

      {/* ═══════ Main Content — 2 Column ═══════ */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Headline ── */}
          <div className="lg:col-span-7">
            <div ref={headlineRef} className="relative">
              {/* Line 1 */}
              <div className="overflow-hidden">
                <div className="hero-word flex items-center gap-5">
                  <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-900 tracking-tighter leading-[0.9] text-ink">
                    We build
                  </h1>
                  <div
                    ref={badgeRef}
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full shrink-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white font-600">
                      Since '18
                    </span>
                  </div>
                </div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden">
                <h1 className="hero-word font-display text-[clamp(2.8rem,7vw,6.5rem)] font-900 tracking-tighter leading-[0.9] text-ink">
                  digital products
                </h1>
              </div>

              {/* Line 3 — Outline text */}
              <div className="overflow-hidden">
                <h1
                  className="hero-word font-display text-[clamp(2.8rem,7vw,6.5rem)] font-900 tracking-tighter leading-[0.9]"
                  style={{
                    WebkitTextStroke: '2px var(--color-accent)',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  that matter.
                </h1>
              </div>
            </div>

            {/* Description + CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8">
              <div ref={subtextRef} className="max-w-sm">
                <p className="font-sans text-ink-muted text-sm leading-relaxed">
                  Binary Expert Systems is a premium technology studio.
                  We engineer high-performance web applications, mobile experiences,
                  and cloud infrastructure for forward-thinking companies.
                </p>
              </div>

              <div ref={ctaRef} className="flex items-center gap-5">
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-ink text-white font-display font-600 text-xs uppercase tracking-widest rounded-full hover:bg-accent transition-colors duration-500"
                >
                  Explore Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 font-display font-600 text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Let's Talk
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Dashboard Showcase ── */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="hero-showcase relative bg-surface-alt border border-border rounded-3xl p-6 shadow-[0_8px_60px_rgba(0,0,0,0.04)]">

              {/* Window dots */}
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 font-mono text-[9px] uppercase tracking-widest text-ink-faint">
                  BES Dashboard
                </span>
              </div>

              {/* Mini Chart */}
              <div className="bg-surface rounded-2xl p-5 mb-4 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-1">Performance</div>
                    <div className="font-display text-2xl font-800 text-ink">98.7%</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-mono text-[9px] font-600 text-accent">+12.4%</span>
                  </div>
                </div>
                <svg viewBox="0 0 300 60" className="w-full h-12">
                  <polyline
                    points="0,45 30,40 60,35 90,42 120,28 150,32 180,18 210,22 240,12 270,15 300,8"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,45 30,40 60,35 90,42 120,28 150,32 180,18 210,22 240,12 270,15 300,8 300,60 0,60"
                    fill="url(#chartGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { val: '150+', label: 'Projects', color: 'bg-accent/10 text-accent' },
                  { val: '8+', label: 'Years', color: 'bg-ink/5 text-ink' },
                  { val: '99.9%', label: 'Uptime', color: 'bg-accent/10 text-accent' },
                ].map((s, i) => (
                  <div key={i} className="bg-surface rounded-xl p-3 border border-border/50 text-center">
                    <div className={`font-display text-lg font-800 ${s.color.split(' ')[1]}`}>{s.val}</div>
                    <div className="font-mono text-[8px] uppercase tracking-widest text-ink-faint">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['React', 'Node.js', 'AWS', 'TypeScript', 'Next.js', 'PostgreSQL'].map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full border border-border text-[9px] font-mono uppercase tracking-wider text-ink-faint hover:border-accent/40 hover:text-accent transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-ink-faint">All systems operational</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-1 rounded-full bg-accent" />
                  <div className="w-4 h-1 rounded-full bg-accent" />
                  <div className="w-4 h-1 rounded-full bg-accent" />
                  <div className="w-4 h-1 rounded-full bg-border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ Bottom Marquee ═══════ */}
      <div ref={marqueeRef} className="border-t border-border py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint mx-0"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ Scroll Indicator ═══════ */}
      <div className="absolute bottom-24 left-6 md:left-12 lg:left-24 hidden lg:flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div className="w-full h-1/3 bg-accent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};
