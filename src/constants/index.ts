import type { TNavLink, TService, TTechnology, TProject } from '../types';

import {
  backend,
  mobile,
  creator,
  web,
  aiml,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  aiVideoAds,
  videoInterview,
  paymentSystem,
  socialMedia,
  techStore,
  threejs,
  aimlTextDetection,
  aimlChurnPrediction,
  aimlSalesAnalysis,
  aimlRagPipeline,
  aimlImageGenerator,
} from '../assets';

export const navLinks: TNavLink[] = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  {
    id: 'education',
    title: 'Education',
  },
  {
    id: 'achievements',
    title: 'Achievements',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services: TService[] = [
  {
    title: 'Full Stack Developer',
    icon: web,
  },
  {
    title: 'MERN Stack Expert',
    icon: reactjs,
  },
  {
    title: 'Backend Architect',
    icon: backend,
  },
  {
    title: 'AI / ML Engineer',
    icon: aiml,
  },
  {
    title: 'API & System Design',
    icon: mobile,
  },
  {
    title: 'DevOps & Cloud',
    icon: docker,
  },
  {
    title: 'Creative Problem Solver',
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },

  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const projects: TProject[] = [
  {
    name: 'AI Short Video Ads Generator',
    description:
      'AI-powered platform to generate high-quality short video advertisements using product and model images with customizable outputs.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'nodejs',
        color: 'green-text-gradient',
      },
      {
        name: 'ai',
        color: 'pink-text-gradient',
      },
    ],
    image: aiVideoAds,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Short-Video-Ads-Generator',
    deployLink: 'https://ai-short-video-ads-generator.onrender.com/',
  },
  {
    name: 'Video Calling Interview Platform',
    description:
      'A full-stack real-time interview platform enabling seamless 1-on-1 technical interviews with integrated video calling, live code editor, real-time chat, and automated code evaluation.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'webrtc',
        color: 'green-text-gradient',
      },
      {
        name: 'socketio',
        color: 'pink-text-gradient',
      },
    ],
    image: videoInterview,
    sourceCodeLink: 'https://github.com/anuragverma4895/Video-Calling-Interview-Platform',
    deployLink: 'https://video-calling-interview-platform-pjna.onrender.com/',
  },
  {
    name: 'Payment Processing System',
    description:
      'Production-grade full-stack payment gateway system inspired by Razorpay with idempotent transactions, retry mechanisms, webhook simulation, and secure payment processing.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'nodejs',
        color: 'green-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'pink-text-gradient',
      },
    ],
    image: paymentSystem,
    sourceCodeLink: 'https://github.com/anuragverma4895/payment-processing-system',
    deployLink: 'https://payment-processing-system-theta.vercel.app/',
  },
  {
    name: 'Social Media Platform',
    description:
      'A full-stack MERN social media platform with AI-powered post generation, authentication, real-time interactions, and modern UI.',
    tags: [
      {
        name: 'mern',
        color: 'blue-text-gradient',
      },
      {
        name: 'ai',
        color: 'green-text-gradient',
      },
      {
        name: 'socketio',
        color: 'pink-text-gradient',
      },
    ],
    image: socialMedia,
    sourceCodeLink: 'https://github.com/anuragverma4895/Social-Media-Platform',
    deployLink: 'https://social-media-platform-six-taupe.vercel.app/',
  },
  {
    name: 'Ecommerce Tech Store',
    description: 'Full-stack tech e-commerce website built with React, Node.js, Express & MongoDB.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'express',
        color: 'green-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'pink-text-gradient',
      },
    ],
    image: techStore,
    sourceCodeLink: 'https://github.com/anuragverma4895/Ecommerce-Tech-Store',
    deployLink: 'https://ecommerce-tech-store-seven.vercel.app/',
  },
];

export type TAimlProject = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink: string;
};

const aimlProjects: TAimlProject[] = [
  {
    name: 'AI-Generated Text Detection',
    description:
      'A deep learning-powered browser extension and pipeline that detects AI-generated text using transformer-based NLP models. Performs real-time analysis on web pages, PDFs, and pasted text with confidence scoring and detailed reporting.',
    tags: [
      { name: 'NLP', color: 'blue-text-gradient' },
      { name: 'transformers', color: 'green-text-gradient' },
      { name: 'deep-learning', color: 'pink-text-gradient' },
    ],
    image: aimlTextDetection,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-generated-text-detection',
  },
  {
    name: 'Customer Churn Prediction',
    description:
      'An end-to-end machine learning system that predicts customer churn using classification algorithms. Features comprehensive EDA, feature engineering, model comparison, and hyperparameter tuning to identify at-risk customers before they leave.',
    tags: [
      { name: 'scikit-learn', color: 'blue-text-gradient' },
      { name: 'pandas', color: 'green-text-gradient' },
      { name: 'classification', color: 'pink-text-gradient' },
    ],
    image: aimlChurnPrediction,
    sourceCodeLink: 'https://github.com/anuragverma4895/Customer-Churn-Prediction',
  },
  {
    name: 'Sales Data Analysis & Business Insights',
    description:
      'A comprehensive data analytics project extracting actionable business insights from large-scale sales datasets. Includes trend analysis, revenue forecasting, customer segmentation, and interactive visualization dashboards.',
    tags: [
      { name: 'data-analysis', color: 'blue-text-gradient' },
      { name: 'visualization', color: 'green-text-gradient' },
      { name: 'python', color: 'pink-text-gradient' },
    ],
    image: aimlSalesAnalysis,
    sourceCodeLink: 'https://github.com/anuragverma4895/Sales-Data-Analysis-Business-Insights',
  },
  {
    name: 'RAG Pipeline with Answer Evaluation',
    description:
      'An advanced Retrieval-Augmented Generation pipeline combining vector search with LLM-powered answer generation. Features automated evaluation metrics to benchmark answer quality, relevance, and factual accuracy against ground truth.',
    tags: [
      { name: 'LLM', color: 'blue-text-gradient' },
      { name: 'RAG', color: 'green-text-gradient' },
      { name: 'vector-db', color: 'pink-text-gradient' },
    ],
    image: aimlRagPipeline,
    sourceCodeLink:
      'https://github.com/anuragverma4895/RAG-Pipeline-with-Automated-Answer-Evaluation',
  },
  {
    name: 'AI Image Generator',
    description:
      'A generative AI application that creates high-quality images from text prompts using state-of-the-art diffusion models. Features an intuitive interface for prompt engineering, style customization, and batch image generation.',
    tags: [
      { name: 'generative-AI', color: 'blue-text-gradient' },
      { name: 'diffusion', color: 'green-text-gradient' },
      { name: 'python', color: 'pink-text-gradient' },
    ],
    image: aimlImageGenerator,
    sourceCodeLink: 'https://github.com/anuragverma4895/Image-generator',
  },
];

export { services, technologies, projects, aimlProjects };
