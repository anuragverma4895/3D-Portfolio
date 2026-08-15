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
      'I build production-grade full-stack applications,',
      'intelligent AI systems, and scalable real-time platforms.',
    ],
  },
  contact: {
    p: 'Get in touch',
    h2: 'Contact.',
    form: {
      name: {
        span: 'Your Name',
        placeholder: 'Your full name',
      },
      email: { span: 'Your Email', placeholder: 'you@example.com' },
      message: {
        span: 'Your Message',
        placeholder: 'Tell me about your project or opportunity...',
      },
    },
  },
  sections: {
    about: {
      p: 'Introduction',
      h2: 'Overview.',
      content:
        "I don't just write code — I engineer experiences. As a Full-Stack Software Engineer specializing in the MERN stack, I build production-grade applications that are fast, secure, and built to scale. From real-time communication platforms powered by WebRTC and Socket.io to AI-integrated web apps and robust payment systems, I turn complex ideas into elegant, high-performance solutions. Proficient in JavaScript, TypeScript, React, Node.js, and modern cloud architectures, I bring a builder's mindset and a designer's eye to every project. Let's create something extraordinary together.",
    },
    works: {
      p: 'My work',
      h2: 'My Work.',
      content:
        'I build across the full spectrum of software engineering — from production-grade full-stack web applications to intelligent AI and Machine Learning systems. Each project below demonstrates real-world problem-solving and production-ready engineering.',
    },
  },
};
