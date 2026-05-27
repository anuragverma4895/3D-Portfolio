import { styles } from '../../constants/styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-0 overflow-hidden border-t border-white/[0.04] pb-6 pt-6" style={{ background: 'var(--bg-primary)' }}>
      <div className={`${styles.paddingX} mx-auto max-w-7xl`}>
        <div className="flex flex-col items-center justify-between gap-4 text-[14px] text-secondary md:flex-row">
          <p>
            © {currentYear} <span className="text-white font-medium">Anurag Verma</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors duration-200 hover:text-accent-cyan">Privacy Policy</span>
            <span className="cursor-default transition-colors duration-200 hover:text-accent-cyan">
              Terms of Service
            </span>
          </div>
        </div>

        {/* Built with love */}
        <div className="mt-4 flex justify-center">
          <span className="text-[12px] text-white/30">
            Crafted with <span className="text-accent-magenta animate-pulse">♥</span> and lots of ☕
          </span>
        </div>
      </div>

      {/* Animated gradient line */}
      <div
        className="absolute bottom-0 left-1/2 h-[2px] w-[60%] -translate-x-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F0FF, #FF006E, #915EFF, transparent)',
          opacity: 0.5,
          filter: 'blur(1px)',
        }}
      />
    </footer>
  );
};

export default Footer;
