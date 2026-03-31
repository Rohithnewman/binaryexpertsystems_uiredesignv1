import React from 'react';
import { NAV_LINKS } from '@/data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-display font-800 text-white text-lg">
                B
              </div>
              <span className="font-display font-700 text-xl tracking-tight">
                Binary Expert Systems
              </span>
            </div>
            <p className="font-sans text-white/50 leading-relaxed max-w-md text-sm">
              Engineering digital excellence since 2018. We build high-performance
              web applications, mobile experiences, and cloud infrastructure for
              forward-thinking companies worldwide.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {['GitHub', 'Twitter', 'LinkedIn'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300 text-xs font-mono"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-600 text-sm uppercase tracking-widest text-white/30 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-sans text-sm text-white/50 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-600 text-sm uppercase tracking-widest text-white/30 mb-6">Stay Updated</h4>
            <p className="font-sans text-sm text-white/40 mb-4">
              Subscribe for digital insights and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-full px-4 py-3 text-sm font-sans text-white placeholder:text-white/30 focus:border-accent outline-none transition-colors"
              />
              <button className="bg-accent text-white px-5 py-3 rounded-r-full font-display font-600 text-xs uppercase tracking-widest hover:bg-accent-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">
            © 2026 Binary Expert Systems. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-accent transition-colors"
          >
            Back to Top
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              className="transition-transform group-hover:-translate-y-1"
            >
              <path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
