import { motion } from "framer-motion";
import resumePDF from "../../assets/Anurag_Verma_Resume.pdf";

const ResumeButton = () => {
  const handleResumeClick = () => {
    // Open in new tab and trigger download
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Anurag_Verma_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also open in new tab for viewing
    window.open(resumePDF, "_blank");
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      className="fixed right-4 bottom-8 z-30 hidden md:flex"
    >
      <motion.button
        onClick={handleResumeClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-tertiary/80 backdrop-blur-sm border border-white/10 text-secondary hover:text-white hover:border-[#915EFF]/50 hover:bg-[#915EFF]/20 hover:shadow-[0_0_25px_rgba(145,94,255,0.3)] transition-all duration-300 cursor-pointer"
      >
        <span className="text-sm font-semibold tracking-[0.2em] uppercase">Resume</span>
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
        animate={{ height: "5rem" }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute right-1/2 translate-x-1/2 bottom-full mb-3 w-[1px] bg-gradient-to-t from-secondary/50 to-transparent"
      />
    </motion.div>
  );
};

export default ResumeButton;
