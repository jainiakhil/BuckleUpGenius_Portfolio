import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#FF0000]">
            {/* Halftone Dot Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Subtle Paper Grain / Noise */}
            <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* Diagonal Speed Lines (Subtle) */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)',
                }}
            />

            {/* Vignette - Reduced opacity significantly */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10" />
        </div>
    );
};

export default Background;
