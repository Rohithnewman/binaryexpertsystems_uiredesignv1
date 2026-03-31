import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/hooks/useAppStore';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, children, className, fullHeight = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const setActiveSection = useAppStore((state) => state.setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, setActiveSection]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden section-padding',
        fullHeight ? 'min-h-screen flex flex-col justify-center' : 'min-h-fit',
        className
      )}
    >
      {children}
    </section>
  );
};
