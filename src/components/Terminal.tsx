import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function Terminal() {
  const sshCommand = "ssh user@yourapp.example.com";
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(sshCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg z-10 mb-12 px-4">
      <motion.div
        className="rounded-2xl border border-base-300 bg-base-200 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-base-300 bg-base-300/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-xs text-base-content/50 ml-2 font-mono uppercase tracking-widest font-bold">terminal</span>
        </div>

        {/* Terminal Content */}
        <div className="flex items-center justify-between px-6 py-6">
          <code className="text-base-content text-sm md:text-base font-mono flex items-center">
            <span className="text-success font-bold mr-2">$</span>
            {sshCommand}
            <motion.span
              className="inline-block w-2.5 h-5 ml-1 bg-success/80"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
            />
          </code>

          <div className="relative ml-4 flex-shrink-0">
            <AnimatePresence>
              {copied && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-success rounded-full"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 80,
                        y: (Math.random() - 0.5) * 80,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleCopy}
              className="p-2.5 rounded-xl text-base-content/40 hover:text-success hover:bg-success/10 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Copy SSH command"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div 
                    key="check" 
                    initial={{ scale: 0, rotate: -45 }} 
                    animate={{ scale: 1, rotate: 0 }} 
                    exit={{ scale: 0 }}
                  >
                    <Check className="w-5 h-5 text-success" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="copy" 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    exit={{ scale: 0 }}
                  >
                    <Copy className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <p className="text-center mt-4 text-base-content/40 text-sm italic">
        Run this in your terminal to explore my portfolio via SSH 🚀
      </p>
    </div>
  );
}
