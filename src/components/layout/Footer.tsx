import { motion } from "framer-motion";
import { styles } from "../../constants/styles";


const contactInfo = {
  email: "anuragverma4895@gmail.com",
  phone: "+91 8874096365",
  education: "B.Tech in CSE (AI) — NIET, Greater Noida",
};

const socialLinks = [
  {
    name: "Github",
    url: "https://github.com/anuragverma4895",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/anuragverma4895/",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/AnuragVerma2035/",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/anuragverma203",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-primary border-t border-white/5">
      <div className={`${styles.paddingX} mx-auto max-w-7xl py-16`}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-black text-[28px] sm:text-[34px] mb-8 tracking-tight">
              CONTACT
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-secondary text-[13px] uppercase tracking-[0.15em] mb-1.5">
                  Email
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white text-[15px] hover:text-[#915EFF] transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div>
                <p className="text-secondary text-[13px] uppercase tracking-[0.15em] mb-1.5">
                  Mobile
                </p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="text-white text-[15px] hover:text-[#915EFF] transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div>
                <p className="text-secondary text-[13px] uppercase tracking-[0.15em] mb-1.5">
                  Education
                </p>
                <p className="text-white text-[15px]">
                  {contactInfo.education}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-secondary text-[13px] uppercase tracking-[0.15em] mb-6">
              Social
            </h4>

            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white text-[16px] font-medium hover:text-[#915EFF] transition-all duration-300 w-fit"
                >
                  <span className="hover-link border-b border-white/30 group-hover:border-[#915EFF] pb-0.5">
                    <span className="hover-in">
                      {link.name}
                      <div className="text-[#915EFF]">{link.name}</div>
                    </span>
                  </span>
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
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div>
              <p className="text-secondary text-[14px]">
                Designed and Developed
              </p>
              <p className="text-secondary text-[14px]">
                by{" "}
                <span className="text-[#915EFF] font-semibold">
                  Anurag Verma
                </span>
              </p>

              <p className="text-secondary text-[14px] mt-4">
                &copy; {currentYear}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
