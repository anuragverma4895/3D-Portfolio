import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { styles } from "../constants/styles";

interface Props {
  Component: React.ElementType;
  idName: string;
}

type SectionEntrance = "left" | "right" | "up" | "down" | "center";

const sectionEntranceById: Record<string, SectionEntrance> = {
  about: "left",
  education: "right",
  achievements: "up",
  work: "left",
  contact: "center",
};

const getSectionReveal = (idName: string): Variants => {
  const entrance = sectionEntranceById[idName] ?? "center";

  return {
    hidden: {
      opacity: 0,
      x: entrance === "left" ? -90 : entrance === "right" ? 90 : 0,
      y: entrance === "up" ? 80 : entrance === "down" ? -80 : 0,
      scale: entrance === "center" ? 0.92 : 0.98,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 48,
        damping: 20,
        mass: 0.95,
        staggerChildren: 0.12,
        delayChildren: 0.14,
      },
    },
  };
};

const SectionWrapper = (
  Component: Props["Component"],
  idName: Props["idName"]
) =>
  function HOC() {
    return (
      <motion.section
        variants={getSectionReveal(idName)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className={`${styles.padding} scroll-showcase-section relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;

