import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import { brandAnimation } from '../../assets/brandAnimation';

const ROLES = [
  "Creative Writer",
  "Copy Editor",
  "Photographer",
  "Graphic Designer",
  "Video Editor",
  "Web Designer",
  "Coder"
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly select next role, but avoid immediate repeat
      setRoleIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * ROLES.length);
        } while (next === prev);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="relative min-h-screen w-full flex flex-col justify-center p-6 md:p-12 overflow-hidden bg-accent-violet snap-start snap-always">

      {/* --- Comic Book Background Elements --- */}

      {/* 1. Ben-Day Dots Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 2. Red Skewed Overlay (Left Side - Expanded) */}
      <div className="absolute top-0 left-0 h-full w-[120%] md:w-[65vw] bg-accent-red transform -skew-x-12 -translate-x-20 border-r-4 border-black z-0" />

      {/* 3. Action Speed Lines (Right Side) */}
      <div className="absolute top-1/4 right-0 w-96 h-2 bg-black rotate-[-15deg] opacity-10" />
      <div className="absolute top-1/3 right-12 w-64 h-1 bg-black rotate-[-15deg] opacity-10" />
      <div className="absolute bottom-1/4 right-24 w-80 h-3 bg-black rotate-[-15deg] opacity-10" />


      {/* --- EST. 2020 Explosion Badge (Top Right) --- */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 200, delay: 1 }}
        className="absolute top-24 right-4 md:top-32 md:right-16 z-30 w-32 h-32 flex items-center justify-center pointer-events-none"
      >
        {/* SVG Explosion Shape */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path
            fill="#FACC15" // Switched to Yellow per request
            stroke="#050505"
            strokeWidth="3"
            d="M100,10 L120,60 L170,40 L150,90 L200,100 L150,110 L170,160 L120,140 L100,190 L80,140 L30,160 L50,110 L0,100 L50,90 L30,40 L80,60 Z"
          />
        </svg>
        <div className="relative z-10 text-center -rotate-12">
          <span className="block font-sans font-black text-ink-black text-sm leading-none tracking-widest drop-shadow-sm">EST.</span>
          <span className="block font-serif font-bold text-ink-black text-2xl leading-none drop-shadow-sm">2020</span>
        </div>
      </motion.div>


      {/* --- Main Content Area --- */}
      {/* Removed mt-12 from mobile to pull content up significantly */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start justify-center mt-0 md:mt-0">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* I AM Text - Adjusted margins: -mt-12 for mobile (lot up), mt-8 for desktop (slightly up from 12) */}
          <h2 className="font-serif text-5xl md:text-7xl text-ink-black font-black tracking-tighter ml-8 md:ml-32 mt-2 md:mt-8 relative z-20">
            I AM
          </h2>

          {/* Brand Animation */}
          <div className="-ml-8 md:-ml-12 -mt-100 md:-mt-24 w-[90%] max-w-3xl relative z-10">
            <Lottie animationData={brandAnimation} loop={true} />
          </div>

          {/* --- Roles & CTA Inline Container --- */}
          {/* Increased gap massively to push button far right */}
          <div className="ml-2 md:ml-12 -mt-8 md:-mt-16 flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-40 relative z-30">

            {/* Looping Roles (Superhero Style) - Fixed width container to prevent layout shifting */}
            <div className="h-20 w-[280px] md:w-[350px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ scale: 2, opacity: 0, y: -20, rotate: -6 }}
                  animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 6, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-white whitespace-nowrap"
                  style={{
                    textShadow: '4px 4px 0px #050505',
                    WebkitTextStroke: '1.5px #050505'
                  }}
                >
                  {ROLES[roleIndex]}!
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Comic Style CTA Button */}
            <motion.a
              href="#contact"
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ delay: 3.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 3, boxShadow: "8px 8px 0px #050505" }}
              whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px #050505", translateY: 4, translateX: 4 }}
              className="bg-comic-yellow text-ink-black border-4 border-black px-6 py-3 md:px-8 md:py-4 font-sans font-black text-lg md:text-xl uppercase tracking-widest shadow-[6px_6px_0px_#050505] flex items-center gap-3 whitespace-nowrap"
              data-cursor="hover"
            >
              <span>Let's Talk!</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
            </motion.a>

          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default Hero;