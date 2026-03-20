import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export function Footer() {
  const [liked, setLiked] = useState(false);

  return (
    <footer className="text-center z-10 space-y-4 mb-20 w-full flex flex-col items-center">
      <div className="flex justify-center mb-4">
        <motion.button
          onClick={() => setLiked(!liked)}
          className="relative p-4 rounded-full hover:bg-error/5 transition-colors group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={liked ? "liked" : "unliked"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart 
                className={`w-10 h-10 transition-colors duration-300 ${
                  liked ? "fill-error text-error" : "text-base-content/40 group-hover:text-error"
                }`} 
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating mini hearts on click */}
          <AnimatePresence>
            {liked && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 0 }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 100, 
                      y: (Math.random() - 0.5) * -150, 
                      opacity: 0,
                      scale: Math.random() + 0.5,
                      rotate: Math.random() * 90 - 45
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <Heart className="w-4 h-4 fill-error text-error" />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <h3 className="text-4xl font-bold tracking-tight">
        Thanks for <span className="text-success">visiting</span>
      </h3>
      
      <motion.p 
        className="text-base-content/50 max-w-md mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Whether you browsed here or SSH'd in, I appreciate you stopping by.
        <br />
        <span className="text-success font-mono mt-4 block text-sm">// more projects coming soon</span>
      </motion.p>

      <div className="flex justify-center items-center gap-6 mt-16 text-sm text-base-content/40 font-medium">
        <motion.p whileHover={{ color: "var(--color-info)" }} className="cursor-default transition-colors">
          Built with <span className="text-info">(Go + Wish) | (Bun + React)</span>
        </motion.p>
        <span className="w-1.5 h-1.5 bg-base-300 rounded-full"></span>
        <motion.a 
          href="https://www.github.com/sgimres/teminal.app" 
          className="flex items-center gap-2 hover:text-base-content transition-colors group"
          whileHover={{ x: 5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          GitHub
        </motion.a>
      </div>
    </footer>
  );
}
