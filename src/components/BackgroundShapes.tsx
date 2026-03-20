import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundShapes() {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  const generatePositions = () => Array.from({ length: 3 }).map(() => ({
    top: `${Math.floor(Math.random() * 70) + 10}%`, // 10% to 80%
    left: `${Math.floor(Math.random() * 70) + 10}%`, // 10% to 80%
  }));

  useEffect(() => {
    // Initial positions
    setPositions(generatePositions());

    // Update positions every 10 seconds for dynamic movement
    const intervalId = setInterval(() => {
      setPositions(generatePositions());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const drawAnimation = {
    pathLength: [0, 1, 1, 0],
    pathOffset: [0, 0, 1, 1],
    opacity: [0, 1, 1, 0],
  };

  const transition = (duration: number, delay: number) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  });

  if (positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Circle - Info (Teal/Blue) */}
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="absolute blur-[1px]"
        animate={{
          top: positions[0].top,
          left: positions[0].left,
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          top: { duration: 8, ease: "easeInOut" },
          left: { duration: 8, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          className="stroke-info fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          animate={drawAnimation}
          transition={transition(8, 0)}
        />
      </motion.svg>

      {/* Rounded Square - Secondary (Pink/Purple) */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="absolute blur-[1px]"
        animate={{
          top: positions[1].top,
          left: positions[1].left,
          y: [0, -30, 0],
          rotate: [15, 25, 15],
        }}
        transition={{
          top: { duration: 9, ease: "easeInOut" },
          left: { duration: 9, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.rect
          x="10"
          y="10"
          width="100"
          height="100"
          rx="20"
          className="stroke-secondary fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          animate={drawAnimation}
          transition={transition(10, 2)}
        />
      </motion.svg>

      {/* Triangle - Primary (Indigo/Purple) */}
      <motion.svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        className="absolute blur-[1px]"
        animate={{
          top: positions[2].top,
          left: positions[2].left,
          rotate: [-10, 10, -10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          top: { duration: 10, ease: "easeInOut" },
          left: { duration: 10, ease: "easeInOut" },
          rotate: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.path
          d="M 55 10 L 100 95 L 10 95 Z"
          className="stroke-primary fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          animate={drawAnimation}
          transition={transition(12, 4)}
        />
      </motion.svg>
    </div>
  );
}
