import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { github } from '../../assets';
import { SectionWrapper } from '../../hoc';
import { projects, aimlProjects } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import { TProject } from '../../types';
import { TAimlProject } from '../../constants';

// SVG Icons for AI/ML projects
const AimlIcons: Record<string, React.ReactNode> = {
  brain: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path d="M32 8c-6 0-11 3-14 8-4 1-7 5-7 10 0 3 1 6 3 8-1 2-2 4-2 7 0 5 3 9 7 11 2 4 6 7 11 7h4c5 0 9-3 11-7 4-2 7-6 7-11 0-3-1-5-2-7 2-2 3-5 3-8 0-5-3-9-7-10-3-5-8-8-14-8z" fill="url(#brainGrad)" opacity="0.2"/>
      <path d="M32 14v36M24 20c-4 2-6 6-6 10s2 8 6 10M40 20c4 2 6 6 6 10s-2 8-6 10M26 32h12" stroke="url(#brainGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="14" r="3" fill="#a855f7"/>
      <circle cx="24" cy="20" r="2.5" fill="#818cf8"/>
      <circle cx="40" cy="20" r="2.5" fill="#818cf8"/>
      <circle cx="24" cy="40" r="2.5" fill="#818cf8"/>
      <circle cx="40" cy="40" r="2.5" fill="#818cf8"/>
      <circle cx="32" cy="50" r="3" fill="#a855f7"/>
      <circle cx="26" cy="32" r="2" fill="#c084fc"/>
      <circle cx="38" cy="32" r="2" fill="#c084fc"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect x="8" y="40" width="8" height="16" rx="2" fill="url(#chartGrad)" opacity="0.7"/>
      <rect x="20" y="28" width="8" height="28" rx="2" fill="url(#chartGrad)" opacity="0.85"/>
      <rect x="32" y="16" width="8" height="40" rx="2" fill="url(#chartGrad)"/>
      <rect x="44" y="22" width="8" height="34" rx="2" fill="url(#chartGrad)" opacity="0.9"/>
      <path d="M10 36l12-8 12 4 12-16" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="36" r="3" fill="#34d399"/>
      <circle cx="22" cy="28" r="3" fill="#34d399"/>
      <circle cx="34" cy="32" r="3" fill="#34d399"/>
      <circle cx="46" cy="16" r="3" fill="#34d399"/>
      <path d="M43 16l3 0 0 3" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="20" stroke="url(#analyticsGrad)" strokeWidth="2" opacity="0.3"/>
      <path d="M32 12a20 20 0 0 1 17.3 10L32 32V12z" fill="#f59e0b" opacity="0.9"/>
      <path d="M49.3 22A20 20 0 0 1 42 49.3L32 32l17.3-10z" fill="#ef4444" opacity="0.8"/>
      <path d="M42 49.3A20 20 0 0 1 12 32l20 0 10 17.3z" fill="#f97316" opacity="0.7"/>
      <path d="M12 32a20 20 0 0 1 20-20v20H12z" fill="#fbbf24" opacity="0.6"/>
      <circle cx="32" cy="32" r="8" fill="#1d1836" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M28 32h8M32 28v8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  rag: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ragGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="20" height="26" rx="3" stroke="url(#ragGrad)" strokeWidth="2" opacity="0.6"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="21" x2="22" y2="21" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="26" x2="18" y2="26" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="31" x2="20" y2="31" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M26 24h8" stroke="url(#ragGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2"/>
      <circle cx="44" cy="24" r="12" stroke="url(#ragGrad)" strokeWidth="2" opacity="0.5"/>
      <path d="M44 16v16M36 24h16" stroke="url(#ragGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <circle cx="44" cy="24" r="5" fill="url(#ragGrad)" opacity="0.3"/>
      <circle cx="44" cy="24" r="2" fill="#818cf8"/>
      <path d="M34 42l-6 6h8l-6 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="42" y="40" width="16" height="14" rx="3" stroke="url(#ragGrad)" strokeWidth="2" opacity="0.6"/>
      <line x1="46" y1="45" x2="54" y2="45" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="46" y1="50" x2="52" y2="50" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  image: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="imageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="url(#imageGrad)" strokeWidth="2.5" opacity="0.5"/>
      <circle cx="22" cy="26" r="6" fill="url(#imageGrad)" opacity="0.6"/>
      <circle cx="22" cy="26" r="3" fill="#f9a8d4"/>
      <path d="M8 42l14-14 10 10 8-8 12 12" stroke="url(#imageGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 42l14-14 10 10 8-8 12 12v2a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-2z" fill="url(#imageGrad)" opacity="0.2"/>
      <path d="M46 12v-4M50 16h4M46 8l3-3M50 12l3-3" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
  deployLink,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="w-full sm:w-[calc(50%-14px)]"
    >
      <Tilt
        glareEnable={false}
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        className="w-full"
      >
        <div className="bg-tertiary group w-full rounded-2xl p-5">
          <div className="relative aspect-video w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover object-top"
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {deployLink && (
                <div
                  onClick={() => window.open(deployLink, '_blank')}
                  className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                  title="Live Deployment"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[50%] w-[50%] text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              )}
              <div
                onClick={() => window.open(sourceCodeLink, '_blank')}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                title="Source Code"
              >
                <img src={github} alt="github" className="h-1/2 w-1/2 object-contain" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{name}</h3>
            <p className="text-secondary mt-2 text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map(tag => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const AimlProjectCard: React.FC<{ index: number } & TAimlProject> = ({
  index,
  name,
  description,
  tags,
  icon,
  sourceCodeLink,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="w-full sm:w-[calc(50%-14px)]"
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.15}
        glareColor="#915EFF"
        glarePosition="all"
        tiltEnable
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        className="w-full"
      >
        <div className="aiml-card group w-full rounded-2xl p-5 relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
               style={{
                 background: 'radial-gradient(circle at 50% 50%, rgba(145, 94, 255, 0.08) 0%, transparent 70%)',
               }}
          />
          
          {/* Icon area */}
          <div className="relative aspect-video w-full rounded-2xl flex items-center justify-center overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(17, 12, 41, 0.95) 0%, rgba(30, 20, 60, 0.95) 50%, rgba(17, 12, 41, 0.95) 100%)',
               }}
          >
            {/* Animated grid pattern background */}
            <div className="absolute inset-0 opacity-[0.04]"
                 style={{
                   backgroundImage: `linear-gradient(rgba(145, 94, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 94, 255, 0.5) 1px, transparent 1px)`,
                   backgroundSize: '20px 20px',
                 }}
            />
            
            {/* Floating particles effect */}
            <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse" />
            <div className="absolute top-8 right-10 w-1.5 h-1.5 rounded-full bg-blue-400/25 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-6 left-12 w-1 h-1 rounded-full bg-pink-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-10 right-8 w-2 h-2 rounded-full bg-cyan-400/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
            
            {/* Icon container with glow */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                   style={{ background: 'radial-gradient(circle, rgba(145, 94, 255, 0.6) 0%, transparent 70%)' }}
              />
              {AimlIcons[icon]}
            </div>

            {/* GitHub button overlay */}
            <div className="absolute inset-0 m-3 flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                onClick={() => window.open(sourceCodeLink, '_blank')}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 hover:border-purple-400/50 transition-colors duration-300"
                title="View Source Code"
              >
                <img src={github} alt="github" className="h-1/2 w-1/2 object-contain" />
              </div>
            </div>
          </div>

          <div className="mt-5 relative z-10">
            <h3 className="text-[22px] sm:text-[24px] font-bold text-white group-hover:text-purple-200 transition-colors duration-300">{name}</h3>
            <p className="text-secondary mt-2 text-[14px] leading-[22px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 relative z-10">
            {tags.map(tag => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// Category label component
const CategoryBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}> = ({ icon, title, subtitle, gradientFrom, gradientTo, delay = 0 }) => (
  <motion.div
    variants={fadeIn('right', 'spring', delay, 0.75)}
    className="flex items-center gap-4 mb-4"
  >
    <div
      className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 4px 20px ${gradientFrom}40`,
      }}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-white text-[22px] sm:text-[26px] font-bold tracking-tight">{title}</h3>
      <p className="text-secondary text-[13px] sm:text-[14px]">{subtitle}</p>
    </div>
  </motion.div>
);

const Works = () => {
  return (
    <>
      <Header useMotion={true} p="" h2={config.sections.works.h2} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          I build across the full spectrum of software engineering — from{' '}
          <span className="text-white font-medium">production-grade full-stack web applications</span>{' '}
          to{' '}
          <span className="text-white font-medium">intelligent AI & Machine Learning systems</span>.
          Below are projects that showcase my versatility, problem-solving ability, and passion for building
          impactful solutions across both domains.
        </motion.p>
      </div>

      {/* ─── Full-Stack Development Section ─── */}
      <div className="mt-20">
        <CategoryBadge
          icon={
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
          }
          title="Full-Stack Development"
          subtitle="Production-grade web applications & scalable architectures"
          gradientFrom="#3b82f6"
          gradientTo="#06b6d4"
        />
        <div className="h-px w-full bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent mb-10" />
        
        <div className="flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>

      {/* ─── AI / ML Section ─── */}
      <div className="mt-24">
        <CategoryBadge
          icon={
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
            </svg>
          }
          title="AI / ML & Data Science"
          subtitle="Intelligent systems, deep learning models & data-driven insights"
          gradientFrom="#a855f7"
          gradientTo="#ec4899"
          delay={0.2}
        />
        <div className="h-px w-full bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-transparent mb-10" />

        <div className="flex flex-wrap gap-7">
          {aimlProjects.map((project, index) => (
            <AimlProjectCard key={`aiml-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'work');
