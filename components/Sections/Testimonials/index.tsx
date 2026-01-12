import React, { useRef } from 'react';
import SectionWrapper from '../../UI/SectionWrapper';
import { TESTIMONIALS } from '../../../constants';
import Background from './Background';
import Intro from './Intro';
import Panel from './Panel';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);

    // Desktop Horizontal Scroll Logic
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"] // Track scrolling of the tall container
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // Map vertical scroll (0 to 1) to horizontal translation
    // V4: PARTIAL WINDOW SCROLL
    // Start at -25% (Already scrolled in a bit)
    // End at -60% (Scrolls past a few items but leaves some at the end)
    const x = useTransform(smoothProgress, [0, 1], ["-25%", "-60%"]);

    // Create a larger dataset for the illusion of endless content
    const tripleTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

    return (
        // Outer Container: Reduced height to 300vh = Faster/Shorter scroll journey
        <section ref={targetRef} id="testimonials" className="relative bg-[#FF0000] h-auto lg:h-[300vh] snap-start snap-always">

            {/* Sticky Viewport Container - Only sticky on Desktop */}
            <div className="relative w-full h-auto lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-between">

                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Background />
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col pt-20 md:pt-14 pb-24">

                    {/* Header */}
                    <div className="bg-transparent px-4 relative z-20 shrink-0">
                        <Intro />
                    </div>

                    {/* SCROLLING TRACK (Desktop) / VERTICAL STACK (Mobile) */}
                    <div className="flex-1 flex items-center lg:block relative w-full overflow-hidden lg:overflow-visible">
                        {/* Desktop Horizontal Track */}
                        <motion.div
                            style={{ x }}
                            className="hidden lg:flex -space-x-12 px-20 items-center w-max h-full lg:-mt-10" // Lifted panels
                        >
                            {/* Render tripled list */}
                            {tripleTestimonials.map((testimonial, index) => (
                                <Panel key={`${testimonial.id}-${index}`} data={testimonial} index={index} />
                            ))}
                        </motion.div>

                        {/* Mobile Vertical Stack */}
                        <div className="lg:hidden flex flex-col gap-12 px-4 pb-20 w-full">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <Panel key={testimonial.id} data={testimonial} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Buttons - Flex Row */}
                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6 pb-8 lg:pb-12 shrink-0 mt-8">

                        {/* Primary Action */}
                        <motion.a
                            href="#contact"
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-[#FACC15] text-black px-6 py-3 md:px-8 md:py-4 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                        >
                            <span>Available for Work</span>
                            <ArrowRight className="w-6 h-6 stroke-[3]" />
                        </motion.a>

                        {/* Secondary Action */}
                        <Link
                            to="/under-construction"
                            className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer transform hover:rotate-[-2deg] active:scale-95"
                        >
                            <span>Read More Feedback</span>
                            <MessageSquare className="w-6 h-6 stroke-[3]" />
                        </Link>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
