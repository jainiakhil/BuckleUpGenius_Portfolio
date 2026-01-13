import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageUnderConstruction: React.FC = () => {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* Background Video - Desktop */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-60"
            >
                <source src="/assets/PageUnderConstruction_Landscape.mp4" type="video/mp4" />
            </video>

            {/* Background Video - Mobile */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover md:hidden opacity-60"
            >
                <source src="/assets/PageUnderConstruction_Portrait.mp4" type="video/mp4" />
            </video>

            {/* Logo - Top Left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30">
                <img
                    src="/assets/logoFinal.png"
                    alt="BuckleUpGenius"
                    className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
                />
            </div>

            {/* Return Button - Bottom Right */}
            <div className="absolute bottom-8 right-8 z-30">
                <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all duration-300 transform hover:scale-105 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]"
                >
                    <ArrowLeft size={20} />
                    Return to Base
                </Link>
            </div>
        </div>
    );
};

export default PageUnderConstruction;
