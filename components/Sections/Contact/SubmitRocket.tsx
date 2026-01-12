import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowUp, Check } from 'lucide-react';

interface SubmitRocketProps {
    isSubmitting: boolean;
    onAnimationComplete: () => void;
}

const SubmitRocket: React.FC<SubmitRocketProps> = ({ isSubmitting, onAnimationComplete }) => {
    const controls = useAnimation();
    const [stage, setStage] = useState<'idle' | 'locking' | 'morphing' | 'launching' | 'completed'>('idle');

    useEffect(() => {
        if (isSubmitting && stage === 'idle') startLaunchSequence();
    }, [isSubmitting]);

    const startLaunchSequence = async () => {
        setStage('locking');
        // Lock
        await controls.start({ scale: 0.95 });

        // Morph
        setStage('morphing');
        await controls.start({
            width: 60,
            height: 100,
            backgroundColor: '#DC2626', // Red-600
            borderRadius: '50px 50px 0 0',
            borderWidth: '4px',
            borderColor: '#000',
            transition: { duration: 0.4, type: "spring" }
        });

        // Ignite
        setStage('launching');
        await new Promise(r => setTimeout(r, 400)); // Fuel up

        // Launch
        await controls.start({
            y: -800,
            transition: { duration: 0.8, ease: "backIn" }
        });

        onAnimationComplete();
        setStage('completed');
    };

    if (stage === 'completed') {
        return (
            <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-full h-14 bg-green-500 border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-3 font-sans font-black text-black uppercase"
            >
                <Check className="w-6 h-6 stroke-[3]" />
                <span>Signal Locked</span>
            </motion.div>
        );
    }

    return (
        <div className="relative h-20 w-full flex justify-center items-end pb-2">
            <motion.button
                animate={controls}
                initial={{ scale: 1, width: '100%', height: '3.5rem', borderRadius: '0' }}
                className={`relative z-10 flex items-center justify-center bg-comic-yellow border-4 border-black font-sans font-black text-xl uppercase tracking-widest text-black shadow-[6px_6px_0px_#000] focus:outline-none overflow-visible ${stage === 'idle' ? 'hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_#000] transition-transform' : ''}`}
                disabled={stage !== 'idle'}
            >
                {/* Text Content */}
                <AnimatePresence>
                    {stage === 'idle' && (
                        <motion.span exit={{ opacity: 0 }} className="flex items-center gap-2">
                            LAUNCH SIGNAL <ArrowUp className="w-5 h-5 stroke-[3]" />
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* --- ROCKET PARTS (Only visible after morph) --- */}

                {/* 1. Window */}
                <AnimatePresence>
                    {(stage === 'morphing' || stage === 'launching') && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-6 w-6 h-6 bg-blue-300 border-2 border-black rounded-full z-20"
                        />
                    )}
                </AnimatePresence>

                {/* 2. Fins (Left/Right) */}
                <AnimatePresence>
                    {(stage === 'morphing' || stage === 'launching') && (
                        <>
                            <motion.div
                                initial={{ x: 0, opacity: 0 }}
                                animate={{ x: -28, opacity: 1 }}
                                className="absolute bottom-0 left-0 w-8 h-12 bg-red-700 border-4 border-black skew-y-[30deg] origin-bottom-right -z-10"
                            />
                            <motion.div
                                initial={{ x: 0, opacity: 0 }}
                                animate={{ x: 28, opacity: 1 }}
                                className="absolute bottom-0 right-0 w-8 h-12 bg-red-700 border-4 border-black -skew-y-[30deg] origin-bottom-left -z-10"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* 3. Flame (Jagged Comic Style) */}
                <AnimatePresence>
                    {stage === 'launching' && (
                        <motion.div
                            initial={{ scale: 0, y: 0 }}
                            animate={{ scale: [1, 1.2, 0.9], y: 40 }}
                            transition={{ repeat: Infinity, duration: 0.1 }}
                            className="absolute -bottom-8 w-10 h-10 -z-20"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[2px_2px_0px_#000]">
                                <path d="M50 0 L70 30 L60 40 L90 50 L60 60 L80 90 L50 70 L20 90 L40 60 L10 50 L40 40 L30 30 Z" fill="#FACC15" stroke="#000" strokeWidth="4" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.button>
        </div>
    );
};

export default SubmitRocket;
