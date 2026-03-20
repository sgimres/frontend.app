import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

const letters = [
  { char: "P", color: "text-primary" },
  { char: "O", color: "text-secondary" },
  { char: "R", color: "text-accent" },
  { char: "T", color: "text-warning" },
  { char: "F", color: "text-error" },
  { char: "O", color: "text-info" },
  { char: "L", color: "text-success" },
  { char: "I", color: "text-primary" },
  { char: "O", color: "text-secondary" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="text-center z-10 mb-16 relative w-full">
      <div className="absolute top-[-40px] right-0 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <h1 className="text-7xl md:text-9xl font-black flex justify-center tracking-tighter uppercase cursor-default select-none">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className={`${l.color} inline-block`}
            whileHover={{ 
              scale: 1.2, 
              rotate: [0, -10, 10, 0],
              y: -10,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.8, rotate: 0, y: 0 }}
          >
            {l.char}
          </motion.span>
        ))}
      </h1>
      <p className="mt-8 text-xl md:text-2xl text-slate-400 font-medium">
        My portfolio, but make it <span className="text-accent font-mono">terminal</span>.
      </p>
    </div>
  );
}
