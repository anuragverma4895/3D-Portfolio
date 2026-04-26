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
  image,
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
          
          {/* Image area - full screen project screenshot */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Subtle purple overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0520]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

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
