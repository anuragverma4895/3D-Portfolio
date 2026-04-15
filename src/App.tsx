import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  // Experience,
  Feedbacks,
  Hero,
  Navbar,
  SkillsBallSection,
  Works,
  StarsCanvas,
  SocialSidebar,
  ResumeButton,
  Footer,
} from './components';
import { useEffect } from 'react';
import { config } from './constants/config';
import { technologies } from './constants';

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
        {/* <Experience /> */}
        <SkillsBallSection skills={technologies} />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
        <SocialSidebar />
        <ResumeButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
