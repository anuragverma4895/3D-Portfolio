type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: 'Anurag Verma',
    fullName: 'Anurag Verma',
    email: 'anuragverma4895@gmail.com',
  },
  hero: {
    name: 'Anurag Verma',
    p: [
      'I engineer robust full-stack web applications,',
      'scalable architectures, and intelligent AI solutions.',
    ],
  },
  contact: {
    p: 'Get in touch',
    h2: 'Contact.',
    form: {
      name: {
        span: 'Your Name',
        placeholder: "What's your name?",
      },
      email: { span: 'Your Email', placeholder: "What's your email?" },
      message: {
        span: 'Your Message',
        placeholder: 'What do you want to say?',
      },
    },
  },
  sections: {
    about: {
      p: 'Introduction',
      h2: 'Overview.',
      content: `I am a passionate Full-Stack Software Engineer with specialized expertise in the MERN stack (MongoDB, Express, React, Node.js). I thrive on building highly scalable applications, ranging from real-time communication platforms using WebRTC and Socket.io, to robust payment processing systems and AI-integrated web applications. With a strong foundation in JavaScript, TypeScript, and modern web architectures, I am dedicated to architecting secure, efficient, and user-centric solutions that tackle complex, real-world challenges. Let's collaborate to build something remarkable.`,
    },
    experience: {
      p: 'What I have done so far',
      h2: 'Work Experience.',
    },
    feedbacks: {
      p: 'What others say',
      h2: 'Testimonials.',
    },
    works: {
      p: 'My work',
      h2: 'My Work.',
      content: `I build across the full spectrum of software engineering — from production-grade full-stack web applications to intelligent AI & Machine Learning systems. Below are projects that showcase my versatility, problem-solving ability, and passion for building impactful solutions across both domains.`,
    },
  },
};
