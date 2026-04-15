import { motion } from 'framer-motion';
import resumePDF from '../../assets/Anurag_Verma_Resume.pdf';

const ResumeButton = () => {
  const handleResumeClick = () => {
    // Open in new tab and trigger download
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Anurag_Verma_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also open in new tab for viewing
    window.open(resumePDF, '_blank');
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      className="fixed right-4 bottom-8 z-30 hidden md:flex"
    >
      <motion.button
        onClick={handleResumeClick}
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-tertiary/90 backdrop-blur-md border border-white/20 text-secondary hover:text-white hover:border-[#915EFF]/70 hover:bg-[#915EFF]/30 hover:shadow-[0_0_35px_rgba(145,94,255,0.5),0_0_70px_rgba(145,94,255,0.2)] transition-all duration-300 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="text-sm font-bold tracking-[0.2em] uppercase relative z-10">Resume</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-y-0.5 transition-transform duration-300"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 18 15 15" />
        </svg>
      </motion.button>

      {/* Vertical line above button */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '6rem' }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute right-1/2 translate-x-1/2 bottom-full mb-4 w-[2px] bg-gradient-to-t from-[#915EFF]/60 via-secondary/40 to-transparent shadow-[0_0_10px_rgba(145,94,255,0.3)]"
      />
    </motion.div>
  );
};

export default ResumeButton;
