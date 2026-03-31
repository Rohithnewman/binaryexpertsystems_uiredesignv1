import React, { useEffect, useRef } from 'react';
import { Section } from '@/components/layout/Section';
import { BLOG_POSTS } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Blog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

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
      postsRef.current?.children || [],
      { opacity: 0, x: 50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' }
    );
  }, []);

  return (
    <Section id="blog" className="bg-dark">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.5em] text-accent">Insights</h4>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">
              Latest <span className="text-accent">Articles.</span>
            </h2>
          </div>
          <button className="brutal-btn flex items-center gap-2 group">
            Read All Posts <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
        
        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <div key={index} className="brutal-card group cursor-pointer flex flex-col h-full">
              <div className="aspect-[16/9] overflow-hidden mb-8 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-accent p-2 text-dark">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-zinc-500">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">{post.date}</span>
                </div>
                <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Digital Strategy</span>
              </div>
              
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-300 flex-grow">
                {post.title}
              </h3>
              
              <p className="text-zinc-400 font-sans leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-accent transition-colors duration-300">Read More</span>
                <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
