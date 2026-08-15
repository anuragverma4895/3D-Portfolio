import { lazy, Suspense, useEffect, useCallback } from 'react';

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
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

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
    smoothScrollToElement(element);
    window.history.pushState(null, '', href);
  }, []);

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
