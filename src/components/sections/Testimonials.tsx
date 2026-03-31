import React, { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { TESTIMONIALS } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      contentRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
  }, []);

  const nextTestimonial = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        );
      },
    });
  };

  const prevTestimonial = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        );
      },
    });
  };

  return (
    <Section id="testimonials" className="bg-dark">
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        <div className="mb-16 space-y-4 text-center">
          <h4 className="font-mono text-xs uppercase tracking-[0.5em] text-accent">Client Feedback</h4>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
            Trusted by <span className="text-accent">Industry Leaders.</span>
          </h2>
        </div>
        
        <div className="relative bg-zinc-900 border-2 border-zinc-800 p-12 md:p-24 overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-accent/5 flex items-center justify-center text-accent/20">
            <Quote size={64} />
          </div>
          
          <div ref={contentRef} className="relative z-10 text-center">
            <p className="text-2xl md:text-4xl font-display font-medium italic leading-tight mb-12">
              "{TESTIMONIALS[currentIndex].content}"
            </p>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-display font-bold uppercase tracking-tight text-accent">
                {TESTIMONIALS[currentIndex].name}
              </h4>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {TESTIMONIALS[currentIndex].role}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-accent hover:text-dark hover:border-accent transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-accent' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-accent hover:text-dark hover:border-accent transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
