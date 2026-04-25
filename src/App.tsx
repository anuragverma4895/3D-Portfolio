import { lazy, Suspense, useEffect, useCallback } from 'react';

import About from './components/sections/About';
import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { config } from './constants/config';
import { technologies } from './constants';

// Lazy load heavy components
const SkillsBallSection = lazy(() => import('./components/sections/SkillsBallSection'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Feedbacks = lazy(() => import('./components/sections/Feedbacks'));
const SocialSidebar = lazy(() => import('./components/layout/SocialSidebar'));
const ResumeButton = lazy(() => import('./components/layout/ResumeButton'));

// Lightweight placeholder for lazy sections
const SectionFallback = ({ height = '20rem' }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    
    const element = document.querySelector(href);
    if (!element) return;
    
    e.preventDefault();
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, [handleSmoothScroll]);

  return (
    <div className="bg-primary relative z-0">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Suspense fallback={<SectionFallback height="32rem" />}>
        <SkillsBallSection skills={technologies} />
      </Suspense>
      <Works />
      <Suspense fallback={<SectionFallback />}>
        <Feedbacks />
      </Suspense>
      <div className="relative z-0">
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
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
