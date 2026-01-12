import React from 'react';
import { motion } from 'framer-motion';

const Intro: React.FC = () => {
    return (
        <div className="relative z-10 text-center mb-12 md:mb-20 pt-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "backOut" }}
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none mb-4"
                    style={{
                        textShadow: '4px 4px 0px #000',
                        WebkitTextStroke: '1px black'
                    }}
                >
                    Words from <br className="md:hidden" />
                    <span className="relative inline-block text-[var(--color-brand-yellow)]">
                        The City
                        {/* Underline Decoration */}
                        <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-black" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5 L 100 8 Q 50 13 0 8 Z" fill="currentColor" />
                        </svg>
                    </span>
                </h2>

                <div className="inline-block relative bg-white border-2 border-black p-3 md:p-4 rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs md:max-w-md mx-auto mt-6">
                    <p className="font-comic text-black text-sm md:text-lg font-bold uppercase tracking-wide">
                        "Real Feedback from Real Collaborations"
                    </p>
                    {/* Speech bubble tail */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-black rotate-45" />
                </div>
            </motion.div>
        </div>
    );
};

export default Intro;
