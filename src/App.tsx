import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Feedbacks from './components/sections/Feedbacks';
import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Navbar from './components/layout/Navbar';
import SocialSidebar from './components/layout/SocialSidebar';
import ResumeButton from './components/layout/ResumeButton';
import Footer from './components/layout/Footer';
import { config } from './constants/config';
import { technologies } from './constants';

const SkillsBallSection = lazy(() => import('./components/sections/SkillsBallSection'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Suspense fallback={<div className="min-h-[32rem]" />}>
          <SkillsBallSection skills={technologies} />
        </Suspense>
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
          <Contact />
          <Footer />
        </div>
        <SocialSidebar />
        <ResumeButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
