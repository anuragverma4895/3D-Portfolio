import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

import { styles } from "../../constants/styles";
import { config } from "../../constants/config";
import { anuragHero } from "../../assets";

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
function useTypingEffect(texts: string[], speed = 50, _pause = 2000) {
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

    timeout = setTimeout(type, 1500);
    return () => clearTimeout(timeout);
  }, [texts, speed, _pause]);

  return { displayText, isTyping };
}

// ─── Constellation / Network Background Canvas ───
const ConstellationCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<
    { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const NODE_COUNT = 80;
    const CONNECTION_DIST = 160;
    const MOUSE_RADIUS = 200;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    // Initialize nodes
    if (nodesRef.current.length === 0) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction — glow lines
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS) {
          const alpha = (1 - mDist / MOUSE_RADIUS) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        // Check distance to mouse for glow
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const isNearMouse = mDist < MOUSE_RADIUS;
        const glowAlpha = isNearMouse ? 0.6 + (1 - mDist / MOUSE_RADIUS) * 0.4 : node.opacity;
        const glowRadius = isNearMouse ? node.radius * 1.5 : node.radius;

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse
          ? `rgba(0, 240, 255, ${glowAlpha})`
          : `rgba(100, 180, 255, ${node.opacity})`;
        ctx.fill();

        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${(1 - mDist / MOUSE_RADIUS) * 0.15})`;
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1]"
      style={{ pointerEvents: "auto" }}
    />
  );
};

const Hero = () => {
  const name = config.hero.name;
  const nameLetters = name.split("");
  const { displayText, isTyping } = useTypingEffect(config.hero.p, 35);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-500, 500], [-6, 6]);
  const imgY = useTransform(mouseY, [-500, 500], [-4, 4]);

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
      {/* Interactive constellation background */}
      <ConstellationCanvas />

      {/* Subtle gradient overlays */}
      <div className="hero-gradient-overlay" />

      {/* Hero content — split layout */}
      <div
        className={`absolute inset-0 top-[80px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-center gap-5 z-10`}
      >
        {/* Left side — text content */}
        <div className="flex flex-row items-start gap-5 flex-1 pointer-events-none">
          {/* Animated line indicator */}
          <div className="mt-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="h-5 w-5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00F0FF, #FF006E)",
                boxShadow:
                  "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)",
              }}
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="w-1 sm:h-80 h-40 origin-top"
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
                <span
                  className="absolute inset-0 -z-10 blur-2xl opacity-40"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0, 240, 255, 0.4), rgba(255, 0, 110, 0.3), rgba(145, 94, 255, 0.3))",
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

            {/* Role title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="hero-role-title mt-3"
            >
              Full-Stack Developer & AI Engineer
            </motion.p>

            {/* Typing effect subtitle */}
            <p className={`${styles.heroSubText} mt-4 hero-subtitle max-w-[540px]`}>
              <span>{displayText}</span>
              <span
                className={`inline-block w-[2px] h-[1em] bg-accent-cyan ml-1 align-middle ${
                  isTyping ? "animate-pulse" : "opacity-0"
                }`}
              />
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto"
            >
              <a href="#work" className="hero-cta-primary">
                <span className="relative z-10">View My Work</span>
              </a>
              <a href="#contact" className="hero-cta-secondary">
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right side — Illustrated Avatar */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 1.4,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="hero-avatar-container hidden lg:flex flex-1 items-center justify-end relative"
        >
          {/* Glow behind avatar */}
          <div className="hero-avatar-glow" />

          {/* Avatar image */}
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="hero-avatar-wrapper"
          >
            <img
              src={anuragHero}
              alt="Anurag Verma - Full Stack Developer & AI Engineer"
              className="hero-avatar-img"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center z-10">
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
              animate={{ y: [0, 24, 0] }}
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
