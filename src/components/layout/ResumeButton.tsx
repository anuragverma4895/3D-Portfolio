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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.08] text-secondary hover:text-white transition-all duration-300 cursor-pointer relative overflow-hidden animate-glow-pulse"
        style={{
          background: 'rgba(12, 10, 30, 0.7)',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(255, 0, 110, 0.05))',
          }}
        />
        <span className="text-[13px] font-bold tracking-[0.2em] uppercase relative z-10">Resume</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-y-0.5 transition-transform duration-300 relative z-10"
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
        animate={{ height: '4rem' }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute right-1/2 translate-x-1/2 bottom-full mb-3 w-[1px]"
        style={{
          background: 'linear-gradient(to top, rgba(0, 240, 255, 0.3), transparent)',
        }}
      />
    </motion.div>
  );
};

export default ResumeButton;
