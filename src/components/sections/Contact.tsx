import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.contact-reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log('Form Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-surface overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-accent/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="contact-reveal flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">Get in Touch</span>
        </div>
        <h2 className="contact-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-800 tracking-tight text-ink mb-4">
          Let's Build Together.
        </h2>
        <p className="contact-reveal text-ink-muted font-sans text-base md:text-lg leading-relaxed max-w-xl mb-16">
          Have a project in mind? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <div className="contact-reveal space-y-10">
            {[
              { label: 'Email', value: 'hello@binaryexpert.systems', icon: '✉' },
              { label: 'Phone', value: '+1 (555) 000-1234', icon: '☎' },
              { label: 'Location', value: 'Silicon Valley, CA', icon: '◎' },
            ].map((item, i) => (
              <div key={i} className="group flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-accent/8 flex items-center justify-center text-accent text-sm shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-1">{item.label}</p>
                  <p className="font-display text-lg font-600 text-ink">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Availability status */}
            <div className="flex items-center gap-3 pt-8 border-t border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                Currently accepting new projects
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-700 text-ink">Message Sent!</h3>
                <p className="font-sans text-sm text-ink-muted max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="font-mono text-[11px] uppercase tracking-widest text-accent hover:underline mt-4"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-2 block">Name</label>
                    <input
                      {...register('name')}
                      className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-ink focus:border-accent outline-none transition-colors placeholder:text-ink-faint"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-mono mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-2 block">Email</label>
                    <input
                      {...register('email')}
                      className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-ink focus:border-accent outline-none transition-colors placeholder:text-ink-faint"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-mono mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-2 block">Subject</label>
                  <input
                    {...register('subject')}
                    className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-ink focus:border-accent outline-none transition-colors placeholder:text-ink-faint"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-xs text-red-500 font-mono mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-2 block">Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-border py-3 font-sans text-ink focus:border-accent outline-none transition-colors resize-none placeholder:text-ink-faint"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-xs text-red-500 font-mono mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-display font-600 text-sm uppercase tracking-widest rounded-full hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
