import { motion } from 'framer-motion';

import { StarsCanvas } from '../canvas';
import { styles } from '../../constants/styles';

const contactInfo = {
  email: 'anuragverma4895@gmail.com',
  phone: '+91 8874096365',
  education: 'B.Tech in CSE (AI) - NIET, Greater Noida',
  location: 'Greater Noida, India',
  responseTime: 'Usually within 24 hours',
};

const contactHighlights = [
  { label: 'Location', value: contactInfo.location },
  { label: 'Availability', value: 'Open to freelance and full-time roles' },
  { label: 'Response', value: contactInfo.responseTime },
];

const ctaHighlights = ['Web Apps', 'Realtime Systems', 'AI Integrations', 'MERN Stack'];

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/anuragverma4895',
    accent: '#c084fc',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anuragverma4895/',
    accent: '#60a5fa',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/AnuragVerma2035/',
    accent: '#f59e0b',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/anuragverma203',
    accent: '#fb923c',
    icon: (
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#5b3419] text-[10px] font-black text-white">
        CC
      </span>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-0 overflow-hidden border-t border-white/5 bg-primary pb-10 pt-20">
      <div className="absolute inset-0 z-[-1]">
        <StarsCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary" />
      </div>

      <div className={`${styles.paddingX} mx-auto max-w-7xl`}>
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-lg text-[18px] italic text-secondary"
          >
            Built with passion, driven by innovation. Let&apos;s create something extraordinary
            together.
          </motion.p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-tertiary/20 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-[#915EFF]/50"
          >
            <h4 className="mb-6 flex items-center gap-2 text-[20px] font-bold text-[#915EFF]">
              <span className="h-[2px] w-8 bg-[#915EFF]"></span>
              CONTACT ME
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="truncate text-[16px] text-white transition-colors hover:text-[#915EFF]"
              >
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-[16px] text-white transition-colors hover:text-[#915EFF]"
              >
                {contactInfo.phone}
              </a>
              <p className="mt-2 border-t border-white/5 pt-4 text-[14px] text-secondary">
                {contactInfo.education}
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {contactHighlights.map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#915EFF]/80">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[14px] text-white/85">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-tertiary/20 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-[#915EFF]/50"
          >
            <h4 className="mb-6 flex items-center gap-2 text-[20px] font-bold text-[#915EFF]">
              <span className="h-[2px] w-8 bg-[#915EFF]"></span>
              PROFILES
            </h4>
            <p className="mb-6 text-[14px] text-secondary">
              Explore my coding profiles and professional platforms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-black/25 text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ boxShadow: `0 0 24px ${link.accent}22` }}
                  >
                    {link.icon}
                  </span>
                  <span className="block max-w-full truncate text-[15px] font-semibold text-white sm:text-[16px]">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#915EFF]/20 bg-[#915EFF]/10 p-8 text-center shadow-2xl backdrop-blur-xl transition-all hover:border-[#915EFF]/50"
          >
            <div className="absolute right-0 top-0 -mr-10 -mt-10 h-20 w-20 rounded-full bg-[#915EFF]/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-6 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
            <h4 className="mb-4 text-[22px] font-bold text-white">Ready to start a project?</h4>
            <p className="mb-5 max-w-xs text-[15px] leading-7 text-white/70">
              From polished frontend experiences to scalable backend systems, let&apos;s build
              something sharp and reliable.
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {ctaHighlights.map(item => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="rounded-xl bg-[#915EFF] px-6 py-3 font-bold text-white transition-all hover:bg-[#804dee] hover:shadow-[0_0_20px_rgba(145,94,255,0.5)] active:scale-95"
            >
              Get in Touch
            </a>
            <p className="mt-4 text-[13px] text-white/60">Fast replies. Clear communication.</p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[14px] text-secondary md:flex-row">
          <p>Copyright {currentYear}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors hover:text-white">Privacy Policy</span>
            <span className="cursor-default transition-colors hover:text-white">
              Terms of Service
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 h-1 w-[60%] -translate-x-1/2 bg-[#915EFF] opacity-50 blur-lg" />
    </footer>
  );
};

export default Footer;
