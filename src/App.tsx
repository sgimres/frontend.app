import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./index.css";
import { BackgroundShapes } from "./components/BackgroundShapes";
import { Header } from "./components/Header";
import { Terminal } from "./components/Terminal";
import { Guestbook } from "./components/Guestbook";
import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";
import { FloatingParticles } from "./components/FloatingParticles";
import { ThemeProvider } from "./components/ThemeContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export function App() {
  const [showFullGuestbook, setShowFullGuestbook] = useState(false);

  return (
    <ThemeProvider>
      <div className="h-screen w-full relative bg-base-100 text-base-content transition-colors duration-500 overflow-hidden">
        {/* Fixed Background Elements */}
        <BackgroundShapes />
        <FloatingParticles />
        <CursorGlow />

        <AnimatePresence mode="wait">
          {!showFullGuestbook ? (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative z-10 scroll-smooth"
            >
              <div className="max-w-6xl mx-auto px-4 md:px-8">
                {/* Header & Terminal - Hero Section */}
                <motion.section 
                  className="h-screen flex flex-col items-center justify-center w-full snap-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                >
                  <Header />
                  <Terminal />
                  <motion.div 
                    className="mt-12 text-base-content/40 animate-bounce"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
                  </motion.div>
                </motion.section>

                {/* Guestbook Section */}
                <motion.section 
                  className="h-screen flex flex-col items-center justify-center w-full snap-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionVariants}
                >
                  <Guestbook onViewAll={() => setShowFullGuestbook(true)} />
                </motion.section>
                
                {/* Footer Section */}
                <motion.section 
                  className="h-screen flex flex-col items-center justify-center w-full snap-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={sectionVariants}
                >
                  <Footer />
                </motion.section>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="guestbook-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="h-full w-full overflow-y-auto relative z-10"
            >
              <Guestbook isFullPage onViewAll={() => setShowFullGuestbook(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
