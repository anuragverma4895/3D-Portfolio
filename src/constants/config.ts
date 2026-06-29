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
      'I build production-ready full-stack applications,',
      'scalable system designs, and useful AI-powered products.',
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
      content:
        "I don't just write code - I engineer experiences. As a Full-Stack Software Engineer specializing in the MERN stack, I build production-grade applications that are fast, secure, and built to scale. From real-time communication platforms powered by WebRTC and Socket.io to AI-integrated web apps and robust payment systems, I turn complex ideas into elegant, high-performance solutions. Proficient in JavaScript, TypeScript, React, Node.js, and modern cloud architectures, I bring a builder's mindset and a designer's eye to every project. Let's create something extraordinary together.",
    },
    works: {
      p: 'My work',
      h2: 'My Work.',
      content:
        'I build across the full spectrum of software engineering - from production-grade full-stack web applications to intelligent AI and Machine Learning systems. Below are projects that showcase my versatility, problem-solving ability, and passion for building impactful solutions across both domains.',
    },
  },
};
