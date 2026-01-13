import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Lottie from 'lottie-react';
import blobAnimation from '../../src/data/Blob.json';

interface InkDrop {
  id: number;
  x: number;
  y: number;
  scale: number;
  life: number;
  borderRadius: string; // Add specific shape for each drop
  rotation: number;
}

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [inkDrops, setInkDrops] = useState<InkDrop[]>([]);
  const dropIdCounter = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });

  // Helper to generate a random "blob" shape
  const getRandomBorderRadius = () => {
    const r = () => Math.floor(Math.random() * 40) + 30; // 30-70%
    return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Update position immediately to avoid lag/trailing on the main blob
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Calculate distance moved for spatter generation
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);

      // Add ink drop if moved enough distance
      if (dist > 30) {
        dropIdCounter.current += 1;

        // Random scatter offset (-15px to +15px)
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        const newDrop: InkDrop = {
          id: dropIdCounter.current,
          x: e.clientX + offsetX, // Splatter is offset from actual cursor path
          y: e.clientY + offsetY,
          scale: Math.random() * 0.5 + 0.3,
          life: 1.0,
          borderRadius: getRandomBorderRadius(), // Random organic shape
          rotation: Math.random() * 360,
        };

        setInkDrops((prev) => [...prev.slice(-20), newDrop]);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.dataset.cursor === 'hover';

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation loop for fading ink drops
    const cleanupInterval = setInterval(() => {
      setInkDrops((prev) =>
        prev.map(drop => ({ ...drop, life: drop.life - 0.05 }))
          .filter(drop => drop.life > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(cleanupInterval);
    };
  }, [cursorX, cursorY]);

  // Hide on touch-only devices (where hover is not supported)
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    // We only want to hide the cursor if the device CANNOT hover (e.g. phones/tablets)
    // Touch laptops support hover via trackpad/mouse, so they should still see the cursor.
    if (window.matchMedia("(hover: none)").matches) {
      setIsHidden(true);
    }
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Trailing Ink Drops (Splatter) */}
      {inkDrops.map((drop) => (
        <div
          key={drop.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference bg-white"
          style={{
            left: drop.x,
            top: drop.y,
            width: 16,
            height: 16,
            transform: `translate(-50%, -50%) scale(${drop.scale * drop.life}) rotate(${drop.rotation}deg)`,
            opacity: drop.life,
            borderRadius: drop.borderRadius,
          }}
        />
      ))}

      {/* Main Organic Blob (Lottie) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 64, // 20% smaller than previous 80px
          height: 64,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1, // Simple scale for hover
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Lottie
          animationData={blobAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;