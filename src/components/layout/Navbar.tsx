import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/hooks/useAppStore';
import { NAV_LINKS } from '@/data/content';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const { activeSection, isNavbarVisible, setNavbarVisible } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, setNavbarVisible]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled ? 'glass-navbar' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center font-display font-800 text-white text-sm transition-transform duration-300 group-hover:scale-110">
            B
          </div>
          <span className="font-display font-700 text-lg tracking-tight text-ink hidden sm:inline">
            BES
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                'px-4 py-2 rounded-full font-sans text-[13px] font-500 transition-all duration-300',
                activeSection === link.href.replace('#', '')
                  ? 'text-accent bg-accent/8'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-dim'
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-display font-600 text-xs uppercase tracking-wider rounded-full hover:opacity-90 transition-all duration-300"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Start Project
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            'block w-5 h-[1.5px] bg-ink transition-all duration-300',
            isMobileMenuOpen && 'rotate-45 translate-y-[4px]'
          )} />
          <span className={cn(
            'block w-5 h-[1.5px] bg-ink transition-all duration-300',
            isMobileMenuOpen && '-rotate-45 -translate-y-[3px]'
          )} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            className={cn(
              'font-display text-2xl font-600 tracking-tight transition-all duration-300',
              activeSection === link.href.replace('#', '') ? 'text-accent' : 'text-ink-muted'
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
