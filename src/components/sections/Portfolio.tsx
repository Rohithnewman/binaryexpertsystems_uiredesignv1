import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header reveal
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Each project: clip-path reveal + image parallax
    projectRefs.current.forEach((project, i) => {
      if (!project) return;

      const image = imageRefs.current[i];
      const overlay = project.querySelector('.project-overlay');
      const meta = project.querySelector('.project-meta');

      // Image reveal with clip-path
      gsap.fromTo(
        project.querySelector('.project-image-wrap'),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: project,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax on scroll
      if (image) {
        gsap.to(image, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Meta text reveal
      if (meta) {
        gsap.fromTo(
          meta.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ═══════ Header ═══════ */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">Selected Work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-800 tracking-tight text-ink leading-[1.05]">
              Our Portfolio.
            </h2>
            <p className="font-sans text-ink-muted text-base leading-relaxed max-w-sm md:text-right">
              A selection of projects we're most proud of — each one a unique challenge, engineered to perfection.
            </p>
          </div>
        </div>

        {/* ═══════ Projects ═══════ */}
        <div className="space-y-24 md:space-y-32">
          {PORTFOLIO.map((project, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { projectRefs.current[i] = el; }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* ── Layout: Alternating sides ── */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'direction-rtl'
                }`}>

                  {/* Image Side */}
                  <div className={`${isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:col-start-6'} relative`}>
                    <div
                      className="project-image-wrap relative overflow-hidden rounded-2xl"
                      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    >
                      {/* Aspect ratio container */}
                      <div className="aspect-[16/10] overflow-hidden bg-surface-dim">
                        <img
                          ref={(el) => { imageRefs.current[i] = el; }}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="project-overlay absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Floating number */}
                    <div className={`absolute -bottom-6 ${isEven ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} font-display text-[100px] md:text-[140px] font-900 text-ink/[0.04] leading-none select-none pointer-events-none -z-10`}>
                      0{i + 1}
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className={`${isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:col-start-1 lg:row-start-1'} project-meta`}>
                    {/* Category & Year */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{project.category}</span>
                      <div className="w-6 h-px bg-border" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-3xl md:text-4xl font-800 tracking-tight text-ink mb-4 group-hover:text-accent transition-colors duration-500">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-ink-muted text-sm leading-relaxed mb-8 max-w-sm">
                      {project.description}
                    </p>

                    {/* Explore link */}
                    <div className="flex items-center gap-3">
                      <span className="font-display font-600 text-sm uppercase tracking-widest text-ink group-hover:text-accent transition-colors duration-300">
                        View Project
                      </span>
                      <div className="relative w-10 h-px bg-ink/20">
                        <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                      </div>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        className="text-ink-faint group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                      >
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {(project.category === 'Enterprise SaaS' ? ['React', 'Node.js', 'PostgreSQL'] :
                        project.category === 'iOS & Android' ? ['React Native', 'Firebase', 'Swift'] :
                        project.category === 'Design System' ? ['Figma', 'Storybook', 'Tokens'] :
                        project.category === 'Cloud Infrastructure' ? ['AWS', 'Terraform', 'K8s'] :
                        ['Next.js', 'Stripe', 'Vercel']
                      ).map((tag, t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full border border-border text-[10px] font-mono uppercase tracking-wider text-ink-faint group-hover:border-accent/30 group-hover:text-accent transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════ Bottom CTA ═══════ */}
        <div className="mt-32 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="font-sans text-ink-muted text-sm">
              Want to see more of our work?
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-ink text-white font-display font-600 text-sm uppercase tracking-widest rounded-full hover:bg-accent transition-colors duration-500"
            >
              Start Your Project
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
