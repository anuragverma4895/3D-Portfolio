import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplayValue(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: 'easeOut' });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// ─── Data ───
const codingStats = [
  {
    platform: 'LeetCode',
    stat: '300+',
    label: 'Problems Solved',
    accent: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    platform: 'CodeChef',
    stat: '3★',
    label: 'Rating',
    accent: '#fb923c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648z" />
      </svg>
    ),
  },
  {
    platform: 'GitHub',
    stat: '40+',
    label: 'Repositories',
    accent: '#00F0FF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    platform: 'Projects',
    stat: '10+',
    label: 'Built & Deployed',
    accent: '#FF006E',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 11 2-2-2-2" />
        <path d="M11 13h4" />
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      </svg>
    ),
  },
];

const achievements = [
  {
    title: 'AI-Generated Text Detection',
    description: 'Built a deep learning browser extension for real-time AI text detection using transformer-based NLP models.',
    type: 'Project',
    icon: '🧠',
  },
  {
    title: 'Real-Time Interview Platform',
    description: 'Engineered a WebRTC-based 1-on-1 video calling interview platform with live code evaluation.',
    type: 'Project',
    icon: '🎥',
  },
  {
    title: 'Payment Processing System',
    description: 'Built a production-grade payment gateway with idempotent transactions and webhook simulation.',
    type: 'Project',
    icon: '💳',
  },
  {
    title: 'Full Stack Development',
    description: 'Proficient in MERN stack with 10+ deployed full-stack applications solving real-world problems.',
    type: 'Skill',
    icon: '⚡',
  },
  {
    title: 'Competitive Programming',
    description: '300+ problems solved on LeetCode, 3-star rated on CodeChef with strong DSA fundamentals.',
    type: 'Achievement',
    icon: '🏆',
  },
  {
    title: 'AI / ML Engineering',
    description: 'Built RAG pipelines, churn prediction models, and generative AI applications using deep learning.',
    type: 'Skill',
    icon: '🤖',
  },
];

const Achievements = () => {
  return (
    <>
      <Header useMotion={true} p="What I've accomplished" h2="Achievements & Stats." />

      {/* ─── Coding Stats Row ─── */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {codingStats.map((stat, i) => (
          <motion.div
            key={stat.platform}
            variants={fadeIn('up', 'spring', i * 0.1, 0.6)}
            className="glass-card card-lift group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-center"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${stat.accent}10, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${stat.accent}15`,
                  border: `1px solid ${stat.accent}25`,
                  color: stat.accent,
                }}
              >
                {stat.icon}
              </div>

              {/* Stat value */}
              <p
                className="text-[28px] sm:text-[32px] font-black"
                style={{ color: stat.accent }}
              >
                {stat.stat}
              </p>

              {/* Label */}
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.15em] text-secondary">
                {stat.label}
              </p>

              {/* Platform name */}
              <p className="mt-2 text-[13px] font-medium text-white/50">
                {stat.platform}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Achievements Grid ─── */}
      <div className="mt-14">
        <motion.h4
          variants={fadeIn('right', 'spring', 0.2, 0.75)}
          className="flex items-center gap-3 text-[18px] font-bold mb-8"
        >
          <span className="h-[2px] w-8" style={{ background: 'linear-gradient(90deg, #00F0FF, transparent)' }} />
          <span className="gradient-text-cyan">KEY HIGHLIGHTS</span>
        </motion.h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeIn('up', 'spring', 0.1 + i * 0.08, 0.6)}
              className="glass-card card-lift group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Top glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 240, 255, 0.05), transparent 60%)',
                }}
              />

              <div className="relative z-10">
                {/* Type badge + emoji */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[28px]">{item.icon}</span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      background: item.type === 'Achievement'
                        ? 'rgba(0, 240, 255, 0.1)'
                        : item.type === 'Project'
                          ? 'rgba(255, 0, 110, 0.1)'
                          : 'rgba(145, 94, 255, 0.1)',
                      color: item.type === 'Achievement'
                        ? '#00F0FF'
                        : item.type === 'Project'
                          ? '#FF006E'
                          : '#915EFF',
                      border: `1px solid ${
                        item.type === 'Achievement'
                          ? 'rgba(0, 240, 255, 0.2)'
                          : item.type === 'Project'
                            ? 'rgba(255, 0, 110, 0.2)'
                            : 'rgba(145, 94, 255, 0.2)'
                      }`,
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                <h5 className="text-[16px] font-bold text-white group-hover:text-accent-cyan transition-colors duration-300">
                  {item.title}
                </h5>
                <p className="mt-2 text-[13px] leading-[20px] text-white/55">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Bottom stat bar ─── */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.4, 0.8)}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] px-6 py-5"
      >
        <div className="text-center">
          <p className="text-[28px] font-black gradient-text-cyan">
            <AnimatedCounter target={10} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Projects Deployed</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black gradient-text-magenta">
            <AnimatedCounter target={300} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">DSA Problems</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black text-accent-purple">
            <AnimatedCounter target={15} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Technologies</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black text-green-400">
            <AnimatedCounter target={40} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">GitHub Repos</p>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Achievements, 'achievements');
