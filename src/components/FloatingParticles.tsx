import { motion } from "framer-motion";

const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-info", "bg-success", "bg-warning", "bg-error"];

const particles = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  color: colors[Math.floor(Math.random() * colors.length)],
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full opacity-20 ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
