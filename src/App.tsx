import { lazy, Suspense, useEffect, useCallback, useState } from 'react';

import About from './components/sections/About';
import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { config } from './constants/config';
import { technologies } from './constants';
import SectionDivider from './components/atoms/SectionDivider';

// Lazy load heavy components
const SkillsBallSection = lazy(() => import('./components/sections/SkillsBallSection'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));
const ProfileSection = lazy(() => import('./components/sections/ProfileSection'));
const Contact = lazy(() => import('./components/sections/Contact'));
const SocialSidebar = lazy(() => import('./components/layout/SocialSidebar'));
const ResumeButton = lazy(() => import('./components/layout/ResumeButton'));
const WhatsAppButton = lazy(() => import('./components/layout/WhatsAppButton'));
const CustomCursor = lazy(() => import('./components/layout/CustomCursor'));

// Lightweight placeholder for lazy sections
const SectionFallback = ({ height = '20rem' }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

/** Scroll to the first real content inside a section, accounting for the fixed navbar. */
function smoothScrollToElement(element: HTMLElement) {
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
  const scrollAnchor =
    element.querySelector<HTMLElement>(':scope > .hash-span + *') ?? element;
  const elementTop =
    scrollAnchor.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

  window.scrollTo({ top: Math.max(0, elementTop), behavior: 'smooth' });
}

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = useCallback(() => {
    setIsContactOpen(true);
    if (window.location.hash !== '#contact') {
      window.history.pushState(null, '', '#contact');
    }
  }, []);

  const closeContact = useCallback(() => {
    setIsContactOpen(false);
    if (window.location.hash === '#contact') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  useEffect(() => {
    const syncContactFromHash = () => {
      setIsContactOpen(window.location.hash === '#contact');
    };

    syncContactFromHash();
    window.addEventListener('popstate', syncContactFromHash);

    return () => {
      window.removeEventListener('popstate', syncContactFromHash);
    };
  }, []);

  useEffect(() => {
    if (!isContactOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContact();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeContact, isContactOpen]);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    if (href === '#contact') {
      e.preventDefault();
      openContact();
      return;
    }

    const sectionId = href.slice(1);
    const element = document.getElementById(sectionId);
    if (!element) return;

    e.preventDefault();

    if (isContactOpen) {
      closeContact();
      window.setTimeout(() => smoothScrollToElement(element), 0);
    } else {
      smoothScrollToElement(element);
    }

    window.history.pushState(null, '', href);
  }, [closeContact, isContactOpen, openContact]);

  useEffect(() => {
    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, [handleSmoothScroll]);

  return (
    <div
      className={`relative z-0 noise-bg theme-transition`}
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Custom cursor (desktop only) */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar contactOpen={isContactOpen} />
        <Hero />
      </div>

      <About />

      <SectionDivider />

      <Suspense fallback={<SectionFallback height="32rem" />}>
        <SkillsBallSection skills={technologies} />
      </Suspense>

      <SectionDivider />

      <Education />

      <SectionDivider />

      <Achievements />

      <SectionDivider />

      <Works />

      <SectionDivider />

      <div className="relative z-0">
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        {/* Profile section (contact info, profiles, CTA) */}
        <Suspense fallback={<SectionFallback height="28rem" />}>
          <ProfileSection />
        </Suspense>
        <Footer />
      </div>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-[80] overflow-hidden theme-transition"
          style={{ background: 'var(--bg-primary)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>

          <Navbar contactOpen={isContactOpen} />

          <Suspense fallback={null}>
            <SocialSidebar />
            <WhatsAppButton onClick={openContact} />
            <ResumeButton />
          </Suspense>

          <div className="relative z-10 flex h-screen translate-y-8 items-center justify-center px-0 py-0">
            <Suspense fallback={<SectionFallback height="28rem" />}>
              <Contact />
            </Suspense>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <SocialSidebar />
        <WhatsAppButton onClick={openContact} />
        <ResumeButton />
      </Suspense>
    </div>
  );
};

export default App;