# Anurag Verma - 3D Portfolio

A modern developer portfolio for Anurag Verma, built to showcase full-stack engineering, AI/ML
projects, achievements, education, contact details, and an interactive 3D visual experience.

Live demo: [portfolio-anurag-verma.vercel.app](https://portfolio-anurag-verma.vercel.app/)

![Portfolio preview](./src/assets/anurag-hero.png)

## Overview

This portfolio is designed as a polished personal brand site for a Full-Stack Developer and AI
Engineer. It combines a responsive React interface with animated hero content, interactive canvas
backgrounds, 3D models, project cards, skill visuals, and a contact form.

## Features

- Responsive hero section with animated intro, CTA buttons, and illustrated portrait
- Interactive constellation background and 3D canvas sections
- About, skills, education, achievements, work, profile, and contact sections
- Project showcase for full-stack, AI, real-time, payment, and e-commerce applications
- Dark/light theme support through CSS variables
- Smooth scrolling, custom cursor, lazy-loaded heavy sections, and optimized Vite build
- Resume PDF included in the project assets

## Tech Stack

Frontend:

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Drei

Tooling:

- Vite
- ESLint
- Prettier
- PostCSS

Integrations and assets:

- EmailJS contact flow
- GLTF 3D models
- Local project images and resume PDF

## Project Structure

```text
src/
  assets/              Images, icons, resume, and project thumbnails
  components/
    atoms/             Small shared UI pieces
    canvas/            Three.js and React Three Fiber scenes
    layout/            Navbar, footer, cursor, resume button, sidebar
    sections/          Main portfolio sections
  constants/           Site content, links, projects, styles, and config
  context/             Theme context
  hoc/                 Section wrapper utilities
  utils/               Motion helpers
public/
  planet/              3D planet model files
```

## Getting Started

### Prerequisites

- Node.js 16 or newer
- npm

### Installation

```bash
git clone https://github.com/anuragverma4895/3D-Portofolio.git
cd 3D-Portofolio
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run ts:check
```

### Lint

```bash
npm run lint
```

## Customization

- Update hero, contact, and section copy in `src/constants/config.ts`
- Update navigation, skills, achievements, and project data in `src/constants/index.ts`
- Replace images and resume in `src/assets/`
- Tune global design tokens and hero styling in `src/globals.css`
- Adjust shared Tailwind utility strings in `src/constants/styles.ts`

## Deployment

The project is Vite-based, so it can be deployed easily on Vercel, Netlify, Render, or any static
hosting provider.

For Vercel:

```bash
npm run build
```

Use `dist` as the production output directory.

## Contact

- Email: `anuragverma4895@gmail.com`
- GitHub: [@anuragverma4895](https://github.com/anuragverma4895)
- Portfolio: [portfolio-anurag-verma.vercel.app](https://portfolio-anurag-verma.vercel.app/)

## License

This project is released under the MIT License. See [LICENSE](./LICENSE) for details.
