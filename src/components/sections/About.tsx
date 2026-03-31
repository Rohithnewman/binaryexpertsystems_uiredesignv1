import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_LIST = [
  { name: 'Web Applications', tag: 'React · Next.js · Vue' },
  { name: 'Mobile Development', tag: 'React Native · Flutter' },
  { name: 'Cloud & DevOps', tag: 'AWS · Azure · Docker' },
  { name: 'UI/UX Design', tag: 'Figma · Design Systems' },
  { name: 'AI Integration', tag: 'LLMs · ML Pipelines' },
  { name: 'System Architecture', tag: 'Microservices · APIs' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'We listen deeply, research your market, and define the problem before touching a single pixel.' },
  { num: '02', title: 'Strategy', desc: 'Architecture decisions, tech stack selection, and a detailed roadmap — all validated before build.' },
  { num: '03', title: 'Design & Build', desc: 'Iterative design sprints followed by clean, tested, production-grade engineering.' },
  { num: '04', title: 'Launch & Scale', desc: 'Deployment, performance monitoring, and continuous improvement as your users grow.' },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      revealRefs.current.filter(Boolean),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
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
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* ═══════ ROW 1: Header ═══════ */}
        <div
          ref={(el) => { revealRefs.current[0] = el; }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">Who We Are</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-800 tracking-tight text-ink leading-[1.05]">
              About Us
            </h2>
          </div>
          <p className="font-sans text-ink-muted text-base leading-relaxed max-w-md md:text-right">
            We are Binary Expert Systems — a premium technology studio that transforms ambitious ideas into high-performance digital products.
          </p>
        </div>

        {/* ═══════ ROW 2: Main Bento Grid ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

          {/* ── Large Brand Card (5 cols) ── */}
          <div
            ref={(el) => { revealRefs.current[1] = el; }}
            className="lg:col-span-5 bg-ink rounded-2xl p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group"
          >
            {/* Decorative accent arcs */}
            <svg className="absolute -bottom-16 -right-16 w-64 h-64 opacity-10" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" />
            </svg>

            <div>
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-display font-800 text-white text-lg mb-8">
                B
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-800 text-white leading-[1.1] mb-4">
                Building digital<br />excellence since<br />
                <span className="text-accent">2018.</span>
              </h3>
            </div>

            <div className="flex items-center gap-6 mt-8">
              {[
                { val: '8+', label: 'Years' },
                { val: '150+', label: 'Projects' },
                { val: '85+', label: 'Clients' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl font-800 text-accent">{s.val}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Services Index (7 cols) ── */}
          <div
            ref={(el) => { revealRefs.current[2] = el; }}
            className="lg:col-span-7 bg-surface-alt rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-display text-lg font-700 text-ink">What We Do</h4>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Services</span>
            </div>

            <div className="space-y-0">
              {SERVICES_LIST.map((service, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between py-4 border-b border-border last:border-b-0 cursor-default"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px] text-ink-faint w-5">0{i + 1}</span>
                    <span className="font-display text-base md:text-lg font-600 text-ink group-hover:text-accent transition-colors duration-300">
                      {service.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">
                    {service.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ ROW 3: Process + Experience ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

          {/* ── How We Work (8 cols) ── */}
          <div
            ref={(el) => { revealRefs.current[3] = el; }}
            className="lg:col-span-8 bg-surface-alt rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-10">
              <h4 className="font-display text-lg font-700 text-ink">How We Work</h4>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Process</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="group relative pl-12">
                  {/* Number */}
                  <span className="absolute left-0 top-0 font-display text-3xl font-800 text-accent/20 group-hover:text-accent/50 transition-colors duration-500">
                    {step.num}
                  </span>
                  <h5 className="font-display text-base font-700 text-ink mb-2">{step.title}</h5>
                  <p className="font-sans text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Experience Card (4 cols) ── */}
          <div
            ref={(el) => { revealRefs.current[4] = el; }}
            className="lg:col-span-4 bg-accent rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-4">Our Expertise</span>
              <h4 className="font-display text-2xl font-700 text-white leading-snug mb-6">
                We don't just write code — we architect solutions.
              </h4>
            </div>

            <div className="space-y-3">
              {['Enterprise SaaS', 'Fintech Platforms', 'E-Commerce', 'Healthcare Tech', 'EdTech'].map((domain, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <span className="font-sans text-sm text-white/80">{domain}</span>
                </div>
              ))}
            </div>

            {/* Decorative number */}
            <div className="absolute -bottom-4 -right-2 font-display text-[120px] font-900 text-white/[0.06] leading-none select-none pointer-events-none">
              8+
            </div>
          </div>
        </div>

        {/* ═══════ ROW 4: Bottom Info Strip ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: '99.9% Uptime',
              desc: 'Mission-critical systems built for reliability and zero-downtime deployments.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--color-accent)" strokeWidth="2"/>
                  <path d="M2 12H22" stroke="var(--color-accent)" strokeWidth="2"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="var(--color-accent)" strokeWidth="2"/>
                </svg>
              ),
              title: 'Global Delivery',
              desc: 'Teams across time zones, delivering 24/7 for clients in 12+ countries.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Award-Winning',
              desc: '12+ industry recognitions for design excellence and engineering innovation.',
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => { revealRefs.current[5 + i] = el; }}
              className="bg-surface-alt rounded-2xl p-6 flex items-start gap-5 group hover:bg-surface-dim transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors duration-500">
                {item.icon}
              </div>
              <div>
                <h5 className="font-display text-sm font-700 text-ink mb-1">{item.title}</h5>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
