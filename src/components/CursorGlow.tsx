import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        background: `radial-gradient(circle 150px at var(--x) var(--y), rgba(168, 85, 247, 0.15), transparent 80%)`,
      }}
    >
      <motion.div
        className="absolute w-1 h-1"
        style={{
          x: springX,
          y: springY,
          "--x": `${springX}px`,
          "--y": `${springY}px`,
        } as any}
      />
    </motion.div>
  );
}
