import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt
    glareEnable
    glareMaxOpacity={0.12}
    glareColor="#00F0FF"
    glarePosition="all"
    tiltEnable
    tiltMaxAngleX={20}
    tiltMaxAngleY={20}
    perspective={1000}
    className="w-full h-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="w-full h-full rounded-[20px] p-[1px] relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 110, 0.2))',
      }}
      whileHover={{
        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.5), rgba(255, 0, 110, 0.5))',
      }}
    >
      <div
        className="service-card-inner flex h-full min-h-[220px] sm:min-h-[240px] flex-col items-center justify-center gap-4 rounded-[20px] px-6 py-6 relative overflow-hidden"
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08), transparent 60%)',
          }}
        />

        <motion.img
          src={icon}
          alt={title}
          className="h-14 w-14 object-contain relative z-10"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.3))',
          }}
          loading="lazy"
        />

        <h3 className="text-center text-[16px] sm:text-[18px] font-bold text-white relative z-10 leading-snug">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-8 w-full relative"
      >
        {/* Open layout with left accent border */}
        <div className="about-open-section relative pl-6 sm:pl-8">
          {/* Left gradient accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
            style={{
              background: "linear-gradient(180deg, #00F0FF, #a78bfa, #FF006E)",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)",
            }}
          />

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide"
          >
            I don&apos;t just write code{" "}
            <span className="gradient-text-cyan font-semibold">—</span>{" "}
            I{" "}
            <span className="font-bold" style={{
              background: "linear-gradient(90deg, #00F0FF, #60e1ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>engineer experiences</span>.
            {" "}As a{" "}
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #a78bfa, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Full-Stack Software Engineer</span>
            {" "}specializing in the{" "}
            <span className="font-bold" style={{
              background: "linear-gradient(90deg, #00F0FF, #FF006E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
            }}>MERN stack</span>,
            {" "}I build production-grade applications that are{" "}
            <span className="text-white font-semibold">fast</span>,{" "}
            <span className="text-white font-semibold">secure</span>, and{" "}
            <span className="text-white font-semibold">built to scale</span>.
          </p>

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide mt-5"
          >
            From real-time communication platforms powered by{" "}
            <span className="about-tech-tag">WebRTC</span>
            {" "}&{" "}
            <span className="about-tech-tag">Socket.io</span>,
            {" "}to{" "}
            <span className="about-tech-tag">AI-integrated</span>
            {" "}web apps and robust payment systems{" "}
            <span className="gradient-text-cyan font-semibold">—</span>{" "}
            I turn complex ideas into{" "}
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #22c55e, #60e1ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>elegant, high-performance solutions</span>.
          </p>

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide mt-5"
          >
            Proficient in{" "}
            <span className="about-tech-tag">JavaScript</span>{" "}
            <span className="about-tech-tag">TypeScript</span>{" "}
            <span className="about-tech-tag">React</span>{" "}
            <span className="about-tech-tag">Node.js</span>
            {" "}and modern cloud architectures, I bring a{" "}
            <span className="text-white font-semibold">builder&apos;s mindset</span>
            {" "}and a{" "}
            <span className="text-white font-semibold">designer&apos;s eye</span>
            {" "}to every project.
          </p>

          <p className="mt-6 text-[18px] sm:text-[19px] font-semibold" style={{
            background: "linear-gradient(90deg, #00F0FF, #a78bfa, #FF006E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Let&apos;s create something extraordinary together. ✦
          </p>
        </div>

        {/* Bottom decorative gradient line */}
        <div className="mt-8 w-full h-[1px]" style={{
          background: "linear-gradient(90deg, #00F0FF, rgba(167, 139, 250, 0.5) 50%, transparent)",
          opacity: 0.3,
        }} />
      </motion.div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <div key={service.title} className={index === services.length - 1 ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""}>
            <ServiceCard index={index} {...service} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
