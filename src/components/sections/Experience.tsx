import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { SectionWrapper } from '../../hoc';
import { experiences } from '../../constants';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import { TExperience } from '../../types';

const ExperienceCard: React.FC<{ experience: TExperience; index: number }> = ({
  experience,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [index % 2 === 0 ? -60 : 60, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x, scale }}
      className="relative flex w-full items-start gap-6 md:gap-10"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Glowing icon circle */}
        <div
          className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] shadow-lg"
          style={{
            background: experience.iconBg,
            boxShadow: `0 0 25px ${experience.iconBg}60, 0 4px 20px rgba(0,0,0,0.3)`,
          }}
        >
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>

        {/* Vertical connecting line */}
        <div
          className="h-full w-[2px] mt-2"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 240, 255, 0.3), rgba(255, 0, 110, 0.15), transparent)',
          }}
        />
      </div>

      {/* Card content */}
      <div className="glass-card card-lift mb-8 flex-1 rounded-2xl p-6 sm:p-8 group relative overflow-hidden">
        {/* Subtle top glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10">
          {/* Date badge */}
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {experience.date}
          </span>

          {/* Title */}
          <h3 className="text-[22px] sm:text-[24px] font-bold text-white leading-tight">
            {experience.title}
          </h3>

          {/* Company */}
          <p className="mt-1 text-[15px] font-semibold text-secondary">
            {experience.companyName}
          </p>

          {/* Points */}
          <ul className="ml-4 mt-5 flex list-none flex-col gap-3">
            {experience.points.map((point, i) => (
              <li
                key={`experience-point-${i}`}
                className="flex gap-3 text-[14px] leading-[24px] text-white/70"
              >
                <span
                  className="mt-2 h-[6px] w-[6px] shrink-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, #00F0FF, #FF006E)',
                    boxShadow: '0 0 8px rgba(0, 240, 255, 0.4)',
                  }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-16 flex flex-col">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'experience');
