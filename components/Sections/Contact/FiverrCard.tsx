import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

const FiverrCard: React.FC = () => {
    return (
        <motion.a
            href="https://www.fiverr.com/buckleupgenius"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full group relative"
            whileHover={{ scale: 1.02, rotate: 1 }}
        >
            <div className="bg-green-500 border-4 border-black p-6 shadow-[8px_8px_0px_#000] relative overflow-hidden">

                {/* Background Dot Pattern (Subtle) */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '8px 8px'
                    }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-sans font-black text-2xl uppercase italic text-black leading-none transform -skew-x-6">
                            Hire Me On<br /><span className="text-white text-4xl not-italic">Fiverr</span>
                        </h3>
                        <div className="bg-white border-2 border-black p-2 rounded-full">
                            <ExternalLink className="w-6 h-6 text-black" />
                        </div>
                    </div>

                    <div className="bg-black text-white p-3 font-bold text-sm transform skew-x-[-2deg]">
                        <p>Escrow • Milestones • Verified</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 bg-white w-fit px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_#000]">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current stroke-black stroke-1" />
                            ))}
                        </div>
                        <span className="font-black text-black text-xs">5.0 ELITE</span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

export default FiverrCard;
