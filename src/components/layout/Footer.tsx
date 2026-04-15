import { motion } from 'framer-motion';
import { StarsCanvas } from '../canvas';
import { styles } from '../../constants/styles';

const contactInfo = {
  email: 'anuragverma4895@gmail.com',
  phone: '+91 8874096365',
  education: 'B.Tech in CSE (AI) — NIET, Greater Noida',
};

const socialLinks = [
  {
    name: 'Github',
    url: 'https://github.com/anuragverma4895',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/anuragverma4895/',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/AnuragVerma2035/',
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/anuragverma203',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-0 bg-primary pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* 3D Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarsCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary" />
      </div>

      <div className={`${styles.paddingX} mx-auto max-w-7xl`}>
        {/* Top Branding Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-secondary text-[18px] max-w-lg italic"
          >
            Built with Passion, Driven by Innovation. Let's create something extraordinary together.
          </motion.p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-tertiary/20 backdrop-blur-xl border border-white/10 hover:border-[#915EFF]/50 transition-all shadow-2xl group"
          >
            <h4 className="text-[#915EFF] font-bold text-[20px] mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#915EFF]"></span>
              CONTACT ME
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-white text-[16px] hover:text-[#915EFF] transition-colors truncate"
              >
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-white text-[16px] hover:text-[#915EFF] transition-colors"
              >
                {contactInfo.phone}
              </a>
              <p className="text-secondary text-[14px] mt-2 border-t border-white/5 pt-4">
                {contactInfo.education}
              </p>
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-tertiary/20 backdrop-blur-xl border border-white/10 hover:border-[#915EFF]/50 transition-all shadow-2xl"
          >
            <h4 className="text-[#915EFF] font-bold text-[20px] mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#915EFF]"></span>
              FOLLOW ME
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-link group"
                >
                  <span className="hover-in text-white text-[16px]">
                    {link.name}
                    <div className="text-[#915EFF]">{link.name}</div>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-3xl bg-[#915EFF]/10 backdrop-blur-xl border border-[#915EFF]/20 hover:border-[#915EFF]/50 transition-all shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#915EFF]/20 blur-3xl rounded-full -mr-10 -mt-10" />
            <h4 className="text-white font-bold text-[22px] mb-4">Ready to start a project?</h4>
            <a
              href="#contact"
              className="px-6 py-3 bg-[#915EFF] text-white rounded-xl font-bold hover:bg-[#804dee] transition-all hover:shadow-[0_0_20px_rgba(145,94,255,0.5)] active:scale-95"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-secondary text-[14px] gap-4">
          <p>© {currentYear}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-default">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-default">
              Terms of Service
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-[#915EFF] blur-lg opacity-50" />
    </footer>
  );
};

export default Footer;
