import { styles } from '../../constants/styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-0 overflow-hidden border-t border-white/5 bg-primary pb-6 pt-6">
      <div className={`${styles.paddingX} mx-auto max-w-7xl`}>
        <div className="flex flex-col items-center justify-between gap-4 text-[14px] text-secondary md:flex-row">
          <p>Copyright {currentYear}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors duration-200 hover:text-white">Privacy Policy</span>
            <span className="cursor-default transition-colors duration-200 hover:text-white">
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
