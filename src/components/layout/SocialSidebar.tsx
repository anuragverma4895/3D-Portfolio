import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/anuragverma4895",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anuragverma4895/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/AnuragVerma2035/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/anuragverma203",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
        <path d="M8.057 0c-.297.004-.594.056-.879.156-1.126.396-1.879 1.166-2.213 2.352-.206.731-.164 1.477.041 2.204.114.404.283.789.471 1.164.285.57.622 1.109.985 1.63.117.167.239.33.368.49-.053.047-.1.098-.152.142-.594.494-1.118 1.057-1.544 1.705-.69 1.051-1.07 2.201-1.113 3.451-.024.7.056 1.387.212 2.065.224.973.592 1.897 1.087 2.774.567 1.004 1.261 1.917 2.06 2.748 1.108 1.152 2.361 2.13 3.737 2.95 1.013.603 2.073 1.114 3.198 1.476.605.195 1.221.341 1.845.424.408.054.819.079 1.231.075.546-.005 1.087-.067 1.619-.19a8.601 8.601 0 001.592-.543c1.01-.449 1.933-1.032 2.788-1.72 1.143-.921 2.139-1.98 2.975-3.185.646-.929 1.152-1.923 1.487-2.993.2-.636.336-1.288.395-1.955.058-.661.035-1.317-.085-1.968a5.851 5.851 0 00-.584-1.637c-.381-.66-.86-1.232-1.415-1.738a7.285 7.285 0 00-.445-.38c.09-.113.176-.228.259-.346.382-.546.727-1.115 1.002-1.72.165-.361.31-.731.41-1.115.194-.741.22-1.489.003-2.231C25.5 1.14 24.719.377 23.562.019A2.794 2.794 0 0022.69-.1c-.496.01-.953.15-1.381.394-.523.298-.967.696-1.367 1.139-.289.32-.553.662-.798 1.017-.07.102-.136.207-.202.312-.114-.088-.226-.178-.342-.264a7.766 7.766 0 00-1.698-1.002A4.463 4.463 0 0016-.004h-.002a4.463 4.463 0 00-.903.492 7.766 7.766 0 00-1.698 1.002c-.116.086-.228.176-.342.264-.066-.105-.132-.21-.202-.312a8.544 8.544 0 00-.798-1.017C11.655.982 11.211.584 10.688.286 10.26.042 9.803-.098 9.307-.108c-.147-.003-.294-.001-.441.003L8.057 0z"/>
      </svg>
    ),
  },
];

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      className="fixed left-5 bottom-6 z-30 hidden md:flex flex-col gap-5"
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
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-tertiary/80 backdrop-blur-sm border border-white/10 text-secondary hover:text-white hover:border-[#915EFF]/50 hover:bg-[#915EFF]/20 hover:shadow-[0_0_25px_rgba(145,94,255,0.4)] transition-all duration-300"
        >
          {social.icon}
          <span className="absolute left-[4.2rem] px-4 py-2 rounded-lg bg-[#915EFF] text-white text-sm font-semibold whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-lg">
            {social.name}
          </span>
        </motion.a>
      ))}

    </motion.div>
  );
};

export default SocialSidebar;
