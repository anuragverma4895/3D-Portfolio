import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="theme-toggle-track">
        {/* Stars (visible in dark mode) */}
        <div className={`theme-toggle-stars ${isDark ? "opacity-100" : "opacity-0"}`}>
          <span className="star star-1" />
          <span className="star star-2" />
          <span className="star star-3" />
        </div>

        {/* Clouds (visible in light mode) */}
        <div className={`theme-toggle-clouds ${!isDark ? "opacity-100" : "opacity-0"}`}>
          <span className="cloud cloud-1" />
          <span className="cloud cloud-2" />
        </div>

        {/* The sun/moon circle */}
        <motion.div
          className="theme-toggle-thumb"
          animate={{
            x: isDark ? 0 : 22,
            rotate: isDark ? 0 : 180,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {/* Moon craters (dark mode) */}
          <div className={`moon-craters ${isDark ? "opacity-100" : "opacity-0"}`}>
            <span className="crater crater-1" />
            <span className="crater crater-2" />
          </div>

          {/* Sun rays (light mode) */}
          <div className={`sun-rays ${!isDark ? "opacity-100" : "opacity-0"}`}>
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="ray"
                style={{ transform: `rotate(${i * 45}deg)` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </button>
  );
};

export default ThemeToggle;
