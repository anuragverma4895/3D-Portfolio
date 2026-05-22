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
          className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0c0a1a, #100d25)',
          }}
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

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.about.content}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
