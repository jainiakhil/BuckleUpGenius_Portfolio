import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const SignalBackground: React.FC = () => {
    const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight });
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleResize = () => {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [mouseX, mouseY]);

    return (
        // HIDDEN ON MOBILE (md:block)
        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none bg-neutral-900">

            {/* Base Texture */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* SVG Container */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen">

                {/* Left Beam: Red - Starts from Bottom Left */}
                <ExtendedBeam
                    mouseX={mouseX}
                    mouseY={mouseY}
                    sourceX={0}
                    sourceY={windowSize.h}
                    color="rgba(220, 38, 38, 0.6)"
                    beamWidth={800}
                />

                {/* Right Beam: Violet - Starts from Bottom Right */}
                <ExtendedBeam
                    mouseX={mouseX}
                    mouseY={mouseY}
                    sourceX={windowSize.w}
                    sourceY={windowSize.h}
                    color="rgba(124, 58, 237, 0.6)"
                    beamWidth={800}
                />
            </svg>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
};

// Helper to calculate extended beam points
const ExtendedBeam = ({ mouseX, mouseY, sourceX, sourceY, color, beamWidth }: any) => {

    const points = useTransform([mouseX, mouseY], ([mx, my]: any[]) => {
        // Vector from Source to Mouse
        const dx = mx - sourceX;
        const dy = my - sourceY;

        // Multiply by large factor to extend off-screen
        const scale = 20;

        const endX = sourceX + dx * scale;
        const endY = sourceY + dy * scale;

        // Spread logic: Vertical offset perpendicular to view? 
        // Simple approximation: Fixed width offset at the end point.
        // Since beams are coming from bottom, horizontal spread might be more relevant?
        // Let's effectively make the end a "wide line".

        const spread = beamWidth * scale * 0.15;

        // If coming from bottom, X-spread is better?
        // Or tangent?
        // Let's stick to the previous simple offset, it looked fine.
        // Actually for bottom-source, the beam is vertical-ish.
        return `${sourceX},${sourceY} ${endX - spread},${endY} ${endX + spread},${endY}`;
    });

    return <motion.polygon points={points} fill={color} stroke="none" />;
};

export default SignalBackground;
