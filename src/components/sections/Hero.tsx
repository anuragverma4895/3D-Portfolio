import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";

// Letter stagger animation for the name
const letterVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 40, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + i * 0.05,
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

// Typing effect hook
function useTypingEffect(texts: string[], speed = 50, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = texts.join(" ");
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a delay for the name animation to finish
    timeout = setTimeout(type, 1500);

    return () => clearTimeout(timeout);
  }, [texts, speed, pause]);

  return { displayText, isTyping };
}

const Hero = () => {
  const name = config.hero.name;
  const nameLetters = name.split("");
  const { displayText, isTyping } = useTypingEffect(config.hero.p, 35);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for orbs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX1 = useTransform(mouseX, [-500, 500], [-30, 30]);
  const orbY1 = useTransform(mouseY, [-500, 500], [-20, 20]);
  const orbX2 = useTransform(mouseX, [-500, 500], [20, -20]);
  const orbY2 = useTransform(mouseY, [-500, 500], [15, -15]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto h-screen w-full overflow-hidden"
    >
      {/* Floating gradient orbs with parallax */}
      <motion.div
        style={{ x: orbX1, y: orbY1 }}
        className="orb orb-cyan absolute -top-20 -left-20 h-[500px] w-[500px] animate-float"
      />
      <motion.div
        style={{ x: orbX2, y: orbY2 }}
        className="orb orb-magenta absolute top-1/3 -right-20 h-[400px] w-[400px] animate-float-delayed"
      />
      <div className="orb orb-purple absolute bottom-20 left-1/3 h-[300px] w-[300px] animate-float" />

      {/* Hero content */}
      <div
        className={`absolute inset-0 top-[80px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        {/* Animated line indicator */}
        <div className="mt-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="h-5 w-5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #00F0FF, #FF006E)",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)",
            }}
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="w-1 sm:h-80 h-40"
            style={{
              background: "linear-gradient(180deg, #00F0FF, transparent)",
            }}
          />
        </div>

        <div>
          {/* "Available for work" badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
          >
            <span className="status-dot" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Available for work
            </span>
          </motion.div>

          {/* Animated name with letter stagger */}
          <h1 className={`${styles.heroHeadText} text-white`}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block"
              style={{
                textShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
              }}
            >
              Hi, I&apos;m{" "}
            </motion.span>
            <span className="relative inline-flex">
              {/* Glow aura behind the name */}
              <span
                className="absolute inset-0 -z-10 blur-2xl opacity-40"
                style={{
                  background: "linear-gradient(90deg, rgba(0, 240, 255, 0.4), rgba(255, 0, 110, 0.3), rgba(145, 94, 255, 0.3))",
                }}
                aria-hidden="true"
              />
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block hero-name-gradient"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Typing effect subtitle */}
          <p className={`${styles.heroSubText} mt-4 hero-subtitle`}>
            <span>{displayText}</span>
            <span
              className={`inline-block w-[2px] h-[1em] bg-accent-cyan ml-1 align-middle ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      {/* Scroll indicator */}
      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-2 p-2"
            style={{
              borderColor: "rgba(0, 240, 255, 0.3)",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.1)",
            }}
          >
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00F0FF, #FF006E)",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
              }}
            />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
