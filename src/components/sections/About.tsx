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
    glareMaxOpacity={0.1}
    glareColor="#00F0FF"
    glarePosition="all"
    tiltEnable
    tiltMaxAngleX={25}
    tiltMaxAngleY={25}
    perspective={1000}
  >
    <div className="max-w-[250px] w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full rounded-[20px] p-[1px] relative group"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 110, 0.2))',
        }}
        whileHover={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.5), rgba(255, 0, 110, 0.5))',
        }}
      >
        <div
          className="service-card-inner flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5 relative overflow-hidden"
        >
          {/* Background glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08), transparent 60%)',
            }}
          />

          <motion.img
            src={icon}
            alt={title}
            className="h-16 w-16 object-contain relative z-10"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.3))',
            }}
          />

          <h3 className="text-center text-[20px] font-bold text-white relative z-10">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-8 max-w-4xl relative"
      >
        {/* Glassmorphism container */}
        <div
          className="about-intro-card rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle top-left glow */}
          <div
            className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0, 240, 255, 0.06), transparent 70%)",
            }}
          />

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide relative z-10"
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

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide mt-4 relative z-10"
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

          <p className="about-intro-text text-[17px] sm:text-[18px] leading-[30px] sm:leading-[34px] tracking-wide mt-4 relative z-10"
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

          <p className="mt-5 text-[18px] sm:text-[19px] font-semibold relative z-10" style={{
            background: "linear-gradient(90deg, #00F0FF, #a78bfa, #FF006E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Let&apos;s create something extraordinary together. ✦
          </p>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{
            background: "linear-gradient(90deg, transparent, #00F0FF, #FF006E, transparent)",
            opacity: 0.4,
          }} />
        </div>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
