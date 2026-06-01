import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/anuragverma4895',
    hoverColor: '#00F0FF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anuragverma4895/',
    hoverColor: '#60a5fa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/AnuragVerma2035/',
    hoverColor: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/anuragverma203',
    hoverColor: '#fb923c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.003 0c-3.111 0-5.836 1.956-6.85 4.869-2.853.511-5.15 3.036-5.15 6.012 0 3.398 2.76 6.16 6.16 6.16.518 0 1.022-.066 1.51-.192C8.618 19.349 10.16 21 12.002 21c1.844 0 3.385-1.651 4.331-4.152.487.126.99.192 1.508.192 3.4 0 6.16-2.762 6.16-6.16 0-2.977-2.298-5.502-5.152-6.013A7.26 7.26 0 0 0 12.003 0zm0 1.875c2.316 0 4.321 1.48 5.011 3.633.286-.01.577-.021.87-.021 2.361 0 4.28 1.92 4.28 4.28 0 2.362-1.919 4.282-4.28 4.282a4.256 4.256 0 0 1-.87-.09c-.84 2.106-2.023 3.39-3.411 3.39-1.387 0-2.57-1.284-3.41-3.39a4.255 4.255 0 0 1-.871.09c-2.36 0-4.28-1.92-4.28-4.282 0-2.36 1.92-4.28 4.28-4.28.293 0 .584.011.87.021a5.395 5.395 0 0 1 5.012-3.633zm-.001 3.525c-1.353 0-2.45 1.097-2.45 2.45s1.097 2.45 2.45 2.45 2.45-1.097 2.45-2.45-1.097-2.45-2.45-2.45zm0 1.676c.428 0 .775.346.775.774 0 .427-.347.773-.775.773a.774.774 0 1 1 0-1.547z" />
      </svg>
    ),
  },
];

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      className="fixed left-5 bottom-6 z-30 hidden md:flex flex-col items-center gap-4"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] text-secondary hover:text-white transition-all duration-300"
          style={{
            background: 'rgba(12, 10, 30, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${social.hoverColor}50`;
            e.currentTarget.style.boxShadow = `0 0 25px ${social.hoverColor}30, 0 0 50px ${social.hoverColor}10`;
            e.currentTarget.style.color = social.hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.color = '';
          }}
        >
          {social.icon}
          <span
            className="absolute left-[3.8rem] px-3 py-1.5 rounded-lg text-white text-[12px] font-semibold whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none tracking-wide"
            style={{
              background: social.hoverColor,
              boxShadow: `0 4px 20px ${social.hoverColor}40`,
            }}
          >
            {social.name}
          </span>
        </motion.a>
      ))}

      {/* Connecting line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '3rem' }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="w-[1px]"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.3), transparent)',
        }}
      />
    </motion.div>
  );
};

export default SocialSidebar;
