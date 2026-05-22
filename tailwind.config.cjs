/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: {
          cyan: "#00F0FF",
          magenta: "#FF006E",
          purple: "#915EFF",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        "glow-cyan": "0 0 20px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)",
        "glow-magenta": "0 0 20px rgba(255, 0, 110, 0.3), 0 0 60px rgba(255, 0, 110, 0.1)",
        "glow-purple": "0 0 20px rgba(145, 94, 255, 0.3), 0 0 60px rgba(145, 94, 255, 0.1)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, #030014 0%, #0a0a2e 40%, #120d28 70%, #030014 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-rotate": "gradient-rotate 3s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "slide-up": "slide-up 0.6s ease-out",
        "text-reveal": "text-reveal 0.8s ease-out forwards",
        "border-flow": "border-flow 4s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "gradient-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "text-reveal": {
          "0%": { opacity: "0", transform: "translateY(20px) rotateX(20deg)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0) rotateX(0deg)", filter: "blur(0)" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0, 240, 255, 0.15), 0 0 30px rgba(0, 240, 255, 0.05)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 240, 255, 0.3), 0 0 50px rgba(0, 240, 255, 0.1)" },
        },
      },
    },
  },
  plugins: [],
};
