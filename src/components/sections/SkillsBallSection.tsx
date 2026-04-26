import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../../constants/styles';
import { fadeIn } from '../../utils/motion';

export type SkillItem = {
  name: string;
  icon: string;
};

type SkillsBallSectionProps = {
  subtitle?: string;
  title?: string;
  skills: SkillItem[];
  id?: string;
};

// ─── Skill categories with beautiful gradients ───
const skillCategories = [
  {
    title: 'Frontend',
    gradient: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-500/20',
    glowColor: 'rgba(59,130,246,0.15)',
    iconBg: 'bg-blue-500/10',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ['HTML 5', 'CSS 3', 'JavaScript', 'TypeScript', 'React JS', 'Redux Toolkit', 'Tailwind CSS', 'Three JS'],
  },
  {
    title: 'Backend',
    gradient: 'from-emerald-500 to-teal-400',
    borderColor: 'border-emerald-500/20',
    glowColor: 'rgba(16,185,129,0.15)',
    iconBg: 'bg-emerald-500/10',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: ['Node JS', 'MongoDB', 'Express.js', 'Socket.io', 'WebRTC', 'REST APIs'],
  },
  {
    title: 'AI / ML',
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/20',
    glowColor: 'rgba(168,85,247,0.15)',
    iconBg: 'bg-purple-500/10',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
      </svg>
    ),
    skills: ['Python', 'TensorFlow', 'Scikit-Learn', 'NLP', 'Pandas', 'RAG Pipelines', 'HuggingFace', 'Deep Learning'],
  },
  {
    title: 'Tools & DevOps',
    gradient: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/20',
    glowColor: 'rgba(245,158,11,0.15)',
    iconBg: 'bg-amber-500/10',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: ['Git', 'GitHub', 'Docker', 'Figma', 'VS Code', 'Postman', 'Vercel', 'Render'],
  },
];

// ─── Animated skill pill component ───
const SkillPill: React.FC<{
  name: string;
  icon?: string;
  index: number;
  glowColor: string;
}> = ({ name, icon, index, glowColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      className="group relative"
    >
      <div
        className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13px] font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white hover:-translate-y-0.5 hover:shadow-lg cursor-default"
        style={{ '--glow': glowColor } as React.CSSProperties}
      >
        {icon && (
          <img
            src={icon}
            alt={name}
            className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        )}
        {!icon && (
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: glowColor.replace('0.15', '0.8') }}
          />
        )}
        <span className="whitespace-nowrap">{name}</span>
      </div>
    </motion.div>
  );
};

// ─── Category Card ───
const CategoryCard: React.FC<{
  category: (typeof skillCategories)[0];
  index: number;
  allSkillIcons: SkillItem[];
}> = ({ category, index, allSkillIcons }) => {
  const getIconForSkill = (skillName: string) => {
    const found = allSkillIcons.find(
      s => s.name.toLowerCase() === skillName.toLowerCase()
    );
    return found?.icon;
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
      className={`group relative rounded-2xl border ${category.borderColor} bg-tertiary/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15`}
      style={{
        boxShadow: `0 0 0px ${category.glowColor}`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${category.glowColor}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${category.glowColor}`;
      }}
    >
      {/* Category header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.iconBg} text-white transition-transform duration-300 group-hover:scale-110`}
        >
          {category.icon}
        </div>
        <h3
          className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-[18px] font-bold text-transparent`}
        >
          {category.title}
        </h3>
      </div>

      {/* Gradient line */}
      <div className={`mb-5 h-px bg-gradient-to-r ${category.gradient} opacity-20`} />

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            name={skill}
            icon={getIconForSkill(skill)}
            index={i}
            glowColor={category.glowColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───
function SkillsBallSection({
  subtitle = 'My skills',
  title = 'Tech Stack.',
  skills,
  id = 'skills',
}: SkillsBallSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute total skill count for the center stat
  const totalSkills = useMemo(
    () => skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0),
    []
  );

  return (
    <section ref={sectionRef} id={id} className="relative overflow-hidden py-16 sm:py-20">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-purple-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className={styles.sectionSubText}>{subtitle}</p>
          <h2 className={styles.sectionHeadText}>{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/60">
            A versatile toolkit spanning{' '}
            <span className="text-white font-medium">frontend frameworks</span>,{' '}
            <span className="text-white font-medium">backend systems</span>,{' '}
            <span className="text-white font-medium">AI/ML pipelines</span>, and{' '}
            <span className="text-white font-medium">DevOps tools</span> — built through
            real-world projects and continuous learning.
          </p>
        </div>

        {/* Stats bar */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {skillCategories.map((cat, i) => (
              <div key={cat.title} className="flex items-center gap-2 text-center">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r ${cat.gradient}`}
                />
                <span className="text-[13px] font-semibold text-white/70">
                  {cat.skills.length} {cat.title}
                </span>
              </div>
            ))}
            <div className="hidden sm:block h-5 w-px bg-white/10" />
            <div className="text-center">
              <span className="text-[13px] font-bold text-[#915EFF]">{totalSkills}+ Skills</span>
            </div>
          </motion.div>
        )}

        {/* Category grid */}
        {isVisible && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {skillCategories.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                index={index}
                allSkillIcons={skills}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default SkillsBallSection;
