import React, { useEffect, useRef } from 'react';
import { Section } from '@/components/layout/Section';
import { STATS } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      statsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );

    // Count up animation
    const counters = statsRef.current?.querySelectorAll('.counter');
    if (counters) {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 90%',
            },
          }
        );
      });
    }
  }, []);

  return (
    <Section id="stats" className="bg-zinc-950 border-y border-zinc-900">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center space-y-4 group">
              <div className="relative inline-block">
                <h3 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none flex items-center justify-center">
                  <span className="counter" data-target={stat.value}>0</span>
                  <span className="text-accent">+</span>
                </h3>
                <div className="absolute -inset-4 border-2 border-accent/0 group-hover:border-accent/20 transition-all duration-500 scale-110 group-hover:scale-100" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-bold uppercase tracking-widest text-sm text-zinc-400 group-hover:text-brutal-white transition-colors duration-300">
                  {stat.label}
                </p>
                <div className="w-12 h-[1px] bg-accent/30 mx-auto group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
