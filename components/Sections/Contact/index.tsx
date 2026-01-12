import React from 'react';
import { motion } from 'framer-motion';
import SignalBackground from './SignalBackground';
import ContactForm from './ContactForm';
import FiverrCard from './FiverrCard';
import SocialLinks from './SocialLinks';

const ContactSection: React.FC = () => {
    return (
        <section
            className="relative w-full min-h-[100dvh] md:h-[100dvh] snap-start snap-always flex flex-col items-center justify-center overflow-y-auto md:overflow-hidden bg-neutral-900 text-white"
            id="contact"
        >
            <SignalBackground />

            {/* Container */}
            <div className="relative z-10 container mx-auto px-4 py-12 md:py-0 w-full h-full flex flex-col justify-center max-w-7xl">

                {/* --- DESKTOP LAYOUT (Restored: Header Top, Content Below) --- */}
                <div className="hidden md:flex flex-col w-full h-full justify-center">

                    {/* Header - Centered Top - Compact Margin */}
                    <div className="mb-4 text-center shrink-0">
                        <h2 className="font-sans font-black text-6xl lg:text-8xl text-white tracking-tighter relative z-10 transform -rotate-1"
                            style={{ WebkitTextStroke: '2px black', textShadow: '6px 6px 0px #000' }}>
                            SEND THE <span className="text-red-600">SIGNAL</span>
                        </h2>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-16 items-center w-full grow-0">
                        {/* Left: Form */}
                        <div className="w-full flex justify-end">
                            <ContactForm />
                        </div>

                        {/* Right: Quote, Fiverr, Socials */}
                        <div className="w-full flex flex-col gap-8 justify-center items-start pl-8">

                            {/* SUPERHERO QUOTE */}
                            <motion.div
                                initial={{ opacity: 0, scale: 3, y: -100 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20, mass: 2 }}
                                className="text-left relative w-full transform rotate-1"
                            >
                                <p className="font-serif font-black text-4xl lg:text-5xl leading-[0.9] text-white uppercase tracking-wider italic drop-shadow-[4px_4px_0px_#DC2626]">
                                    "Every great<br />story starts<br />with a <span className="text-comic-yellow text-5xl lg:text-6xl not-italic mt-2 inline-block transform -skew-x-12">HELLO!</span>"
                                </p>
                            </motion.div>

                            {/* Stacked Layout: Fiverr Top, Socials Bottom */}
                            <div className="w-full flex flex-col items-start gap-6 mt-4">
                                <div className="w-full max-w-xs transform rotate-2 hover:scale-105 transition-transform duration-300">
                                    <FiverrCard />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-sans font-black text-xs uppercase text-white/50 tracking-widest">Channels</p>
                                    <SocialLinks />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* --- MOBILE LAYOUT (Preserved: Header -> Form -> Quote -> Fiverr -> Socials) --- */}
                <div className="md:hidden flex flex-col gap-8 w-full max-w-md mx-auto">

                    {/* 1. Header */}
                    <div className="text-center">
                        <h2 className="font-sans font-black text-6xl text-white tracking-tighter"
                            style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #000' }}>
                            SEND THE <br /><span className="text-red-600">SIGNAL</span>
                        </h2>
                    </div>

                    {/* 2. Form */}
                    <div className="w-full">
                        <ContactForm />
                    </div>

                    {/* 3. Quote */}
                    <div className="text-center">
                        <p className="font-serif font-black text-4xl leading-[0.9] text-white uppercase tracking-wider italic drop-shadow-[3px_3px_0px_#DC2626]">
                            "Every great <br />story starts <br />with a <span className="text-comic-yellow text-5xl not-italic mt-2 inline-block transform -skew-x-6">HELLO!</span>"
                        </p>
                    </div>

                    {/* 4. Fiverr */}
                    <div className="w-full transform rotate-1">
                        <FiverrCard />
                    </div>

                    {/* 5. Socials */}
                    <div className="flex justify-center gap-4">
                        <SocialLinks />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;
