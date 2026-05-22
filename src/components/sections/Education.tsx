import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';

const educationData = {
  degree: 'B.Tech in Computer Science & Engineering',
  specialization: 'Artificial Intelligence',
  university: 'Noida Institute of Engineering and Technology (NIET)',
  location: 'Greater Noida, Uttar Pradesh',
  duration: '2021 – 2025',
  status: 'Pursuing',
  coursework: [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Deep Learning & Neural Networks',
    'Natural Language Processing',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Object-Oriented Programming',
  ],
};

const Education = () => {
  return (
    <>
      <Header useMotion={true} p="My academic journey" h2="Education." />

      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-10">
        {/* Main education card */}
        <motion.div
          variants={fadeIn('right', 'spring', 0.1, 0.75)}
          className="glass-card card-lift relative flex-1 overflow-hidden rounded-3xl p-8 sm:p-10 group"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 240, 255, 0.06), transparent 60%)',
            }}
          />

          <div className="relative z-10">
            {/* Duration badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cyan mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {educationData.duration} · {educationData.status}
            </span>

            {/* Degree icon + title */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(145, 94, 255, 0.15))',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  boxShadow: '0 0 25px rgba(0, 240, 255, 0.1)',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-[22px] sm:text-[26px] font-bold text-white leading-tight">
                  {educationData.degree}
                </h3>
                <p className="mt-1 text-[16px] font-semibold gradient-text-cyan">
                  Specialization in {educationData.specialization}
                </p>
              </div>
            </div>

            {/* University info */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-4" />
                  <path d="M9 9h1" />
                  <path d="M9 13h1" />
                  <path d="M9 17h1" />
                </svg>
                <span className="text-[15px] text-white font-medium">{educationData.university}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[14px] text-secondary">{educationData.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coursework card */}
        <motion.div
          variants={fadeIn('left', 'spring', 0.3, 0.75)}
          className="glass-card card-lift relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:w-[42%] group"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 70% 80%, rgba(255, 0, 110, 0.05), transparent 60%)',
            }}
          />

          <div className="relative z-10">
            <h4 className="flex items-center gap-3 text-[18px] font-bold mb-6">
              <span className="h-[2px] w-6" style={{ background: 'linear-gradient(90deg, #FF006E, transparent)' }} />
              <span className="gradient-text-magenta">RELEVANT COURSEWORK</span>
            </h4>

            <div className="flex flex-wrap gap-2.5">
              {educationData.coursework.map((course, i) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-white/75 transition-all duration-300 hover:border-accent-cyan/20 hover:bg-accent-cyan/[0.05] hover:text-white cursor-default"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, 'education');
