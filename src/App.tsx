/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Preloader } from '@/components/layout/Preloader';
import { useAppStore } from '@/hooks/useAppStore';

// Lazy load sections
const Hero = lazy(() => import('@/components/sections/Hero').then(m => ({ default: m.Hero })));
const About = lazy(() => import('@/components/sections/About').then(m => ({ default: m.About })));
const Solutions = lazy(() => import('@/components/sections/Services').then(m => ({ default: m.Solutions })));
const Portfolio = lazy(() => import('@/components/sections/Portfolio').then(m => ({ default: m.Portfolio })));
const ProductDetails = lazy(() => import('@/components/sections/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Pricing = lazy(() => import('@/components/sections/Pricing').then(m => ({ default: m.Pricing })));
const Contact = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('@/components/sections/Footer').then(m => ({ default: m.Footer })));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-surface">
    <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
  </div>
);

// Custom cursor component
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Lerp for smooth following
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const handleMouseEnter = () => cursor.classList.add('hovering');
    const handleMouseLeave = () => cursor.classList.remove('hovering');

    const hoverables = document.querySelectorAll('a, button, [data-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden lg:block" />;
};

export default function App() {
  const isPreloaderFinished = useAppStore((state) => state.isPreloaderFinished);

  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-surface overflow-x-hidden">
        <Helmet>
          <title>Binary Expert Systems | Premium Digital Agency</title>
          <meta name="description" content="Binary Expert Systems is a premium technology studio building high-performance web apps, mobile experiences, and cloud infrastructure." />
          <meta name="keywords" content="digital agency, web development, UI/UX design, React, cloud architecture, mobile apps" />
          <meta property="og:title" content="Binary Expert Systems | Premium Digital Agency" />
          <meta property="og:description" content="Engineering digital excellence through modern design and scalable technology." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Binary Expert Systems | Premium Digital Agency" />
          <meta name="twitter:description" content="Engineering digital excellence through modern design and scalable technology." />
        </Helmet>

        {!isPreloaderFinished && <Preloader />}

        <CustomCursor />
        <Navbar />

        <main className={isPreloaderFinished ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
            <Solutions />
            <Portfolio />
            <ProductDetails />
            <Pricing />
            <About />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </div>
    </HelmetProvider>
  );
}
