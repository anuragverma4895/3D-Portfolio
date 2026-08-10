import { lazy, Suspense, useEffect, useCallback, useRef } from 'react';

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
const CustomCursor = lazy(() => import('./components/layout/CustomCursor'));

// Lightweight placeholder for lazy sections
const SectionFallback = ({ height = '20rem' }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

const navEntranceVariants = ['left', 'right', 'up', 'center', 'right', 'left'] as const;
const navEntranceClasses = navEntranceVariants.map((variant) => `section-open-${variant}`);

const App = () => {
  const navEntranceIndex = useRef(0);
  const entranceTimers = useRef<number[]>([]);

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  const clearEntranceTimers = useCallback(() => {
    entranceTimers.current.forEach((timer) => window.clearTimeout(timer));
    entranceTimers.current = [];
  }, []);

  const playSectionEntrance = useCallback((element: HTMLElement) => {
    clearEntranceTimers();

    const variant = navEntranceVariants[
      navEntranceIndex.current % navEntranceVariants.length
    ];
    navEntranceIndex.current += 1;

    element.classList.remove('section-open-active', ...navEntranceClasses);
    void element.offsetWidth;
    element.classList.add('section-open-active', `section-open-${variant}`);

    const cleanupTimer = window.setTimeout(() => {
      element.classList.remove('section-open-active', `section-open-${variant}`);
    }, 1650);

    entranceTimers.current.push(cleanupTimer);
  }, [clearEntranceTimers]);

  const armSectionEntrance = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const isAlreadyInView =
      rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.18;

    if (isAlreadyInView) {
      playSectionEntrance(element);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let hasPlayed = false;

    const playOnce = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      observer?.disconnect();

      const timer = window.setTimeout(() => playSectionEntrance(element), 120);
      entranceTimers.current.push(timer);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playOnce();
        }
      },
      { threshold: 0.22, rootMargin: '-84px 0px -24% 0px' }
    );

    observer.observe(element);

    const fallbackTimer = window.setTimeout(playOnce, 1300);
    entranceTimers.current.push(fallbackTimer);
  }, [playSectionEntrance]);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const sectionId = href.slice(1);
    const element = document.getElementById(sectionId);
    if (!element) return;

    e.preventDefault();

    if (anchor.dataset.navLink === 'true') {
      armSectionEntrance(element);
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', href);
  }, [armSectionEntrance]);

  useEffect(() => {
    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      clearEntranceTimers();
    };
  }, [clearEntranceTimers, handleSmoothScroll]);

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
        <Navbar />
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

        <SectionDivider />

        {/* Get in Touch form */}
        <Suspense fallback={<SectionFallback height="28rem" />}>
          <Contact />
        </Suspense>
        <Footer />
      </div>

      <Suspense fallback={null}>
        <SocialSidebar />
        <ResumeButton />
      </Suspense>
    </div>
  );
};

export default App;

