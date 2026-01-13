import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';

// Typewriter Text Component
const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slower typing
        delayChildren: delay
      }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-2 relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showComic, setShowComic] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Trigger switch at 50%
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.4 && !showComic) {
      setShowComic(true);
    } else if (latest <= 0.4 && showComic) {
      setShowComic(false);
    }
  });

  // Animation Variants for Paragraphs
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.8, delayChildren: 0.5 } // Much slower stagger between paragraphs
    }
  };

  const punchIn = {
    hidden: { scale: 0.8, opacity: 0, x: -20, rotate: -5 }, // Start more rotated
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      rotate: 0, // Settle to parent rotation
      transition: {
        type: "spring",
        bounce: 0.7, // More bounce
        duration: 1.5 // Slower duration
      }
    }
  };

  return (
    <div ref={containerRef} id="about" className="relative min-h-screen lg:h-[200vh] h-auto bg-neutral-900 snap-start snap-always">

      {/* Sticky Viewport - Only on Desktop */}
      <div className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row pt-20 md:pt-24 lg:pt-0">

        {/* --- LEFT SIDE: BIO PANEL --- */}
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-6 md:p-12 z-20">

          {/* Slanted Black Background Block */}
          <div className="absolute inset-y-0 -left-[50%] right-0 bg-black border-r-4 border-white transform -skew-x-12 z-0 hidden lg:block origin-bottom-right" />

          {/* Mobile bg (no skew) */}
          <div className="absolute inset-0 bg-black border-b-4 border-white lg:hidden z-0" />

          {/* Text Content - ROTATED CONTAINER RESTORED */}
          <div className="relative z-10 max-w-xl p-4 lg:p-8 -rotate-2 transform mt-8 lg:mt-0">

            {/* Header - Typewriter */}
            <div className="mb-8">
              <h2 className="font-sans font-black text-4xl md:text-7xl text-white tracking-widest uppercase"
                style={{
                  textShadow: '4px 4px 0px #FACC15',
                  WebkitTextStroke: '2px black'
                }}>
                <TypewriterText text="About Me" delay={0.5} />
              </h2>
            </div>

            {/* Bio Body - Staggered Punch Animation */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-sans text-lg md:text-2xl text-white leading-relaxed space-y-6 md:space-y-8 font-bold tracking-wide drop-shadow-md"
            >
              <motion.p variants={punchIn}>
                I don’t just build; I calculate the physics of creativity. With a background in astrophysics and engineering, my work is grounded in precision but fueled by a writer’s soul and an artist’s eye.
              </motion.p>
              <motion.p variants={punchIn}>
                From hundreds of successful design deployments to a vast archive of published technical and creative manuscripts, I’ve spent years mastering the intersection of logic and beauty.
              </motion.p>
              <motion.p variants={punchIn} className="text-comic-yellow drop-shadow-[2px_2px_0px_#000]">
                I don't believe in 'good enough.' I believe in the relentless pursuit of the extraordinary. Whether you need a digital universe built from scratch or a story told through a lens, I am here to turn your vision into a reality that defies gravity.
              </motion.p>
            </motion.div>

          </div>
        </div>

        {/* --- RIGHT SIDE: VISUALS --- */}
        {/* Sticky, Lowest Z-Index, Layout Logic */}
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full z-0 flex items-center justify-center">

          {/* Image Container - Static sticking */}
          <div className="w-full h-[70vh] lg:h-full relative">

            {/* Comic Elements Overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div className="absolute inset-0 bg-halftone opacity-20 mix-blend-multiply" />
            </div>

            {/* Image Switcher Container */}
            <div className="relative w-full h-full overflow-hidden">

              {/* 1. REAL PHOTO (Initial State) */}
              <AnimatePresence mode="wait">
                {!showComic && (
                  <motion.div
                    key="real"
                    className="absolute inset-0 z-10"
                    initial={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                    exit={{
                      clipPath: ["inset(0 0 0 0)", "inset(50% 0 50% 0)", "inset(100% 0 0 0)"],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="assets/OriginalFinal2.png"
                      alt="Real Portrait"
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. COMIC PHOTO (Revealed State) */}
              <AnimatePresence>
                {showComic && (
                  <motion.div
                    key="comic"
                    className="absolute inset-0 z-20 bg-accent-violet"
                    initial={{ opacity: 0, filter: "hue-rotate(-90deg)" }}
                    animate={{
                      opacity: 1,
                      filter: ["hue-rotate(-90deg)", "hue-rotate(0deg)"],
                      // Glitch/Ink-bleed shake on entry
                      x: [0, -10, 10, -5, 5, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      filter: { duration: 0.8 },
                      type: "spring",
                      bounce: 0
                    }}
                  >
                    <img
                      src="/assets/ComicFinal1.png"
                      alt="Comic Portrait"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-violet/50 to-transparent mix-blend-overlay" />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Floating Label Badge */}
            <motion.div
              className="absolute bottom-20 right-8 z-40 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#050505]"
              initial={{ rotate: -5 }}
              animate={{
                rotate: showComic ? 5 : -5,
                scale: showComic ? 1.1 : 1
              }}
              transition={{ type: "spring" }}
            >
              <span className="font-sans font-black text-sm md:text-base tracking-widest text-ink-black uppercase">
                {showComic ? "The Origin Story" : "The Architect"}
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;