import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../../../types'; // Assuming types export Testimonial
import { Star } from 'lucide-react';

interface PanelProps {
    data: Testimonial;
    index: number;
}

const Panel: React.FC<PanelProps> = ({ data, index }) => {
    // Rotate alternate panels slightly for a "messy desk" comic look
    const rotateValue = index % 2 === 0 ? -2 : 2;

    // Vertical Offset for messy pile look (Random-ish based on index)
    // [0, -20, 10, -10, 20] sequence
    const yOffsets = [0, -30, 15, -15, 30];
    const yOffset = yOffsets[index % yOffsets.length];

    return (
        <motion.div
            className="relative group w-full md:w-[400px] lg:w-[450px] flex-shrink-0 mx-0 md:mx-4 p-2"
            style={{ y: yOffset }}
            initial={{ opacity: 0, scale: 0.8, rotate: rotateValue * 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotateValue }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0, type: 'spring' }} // Removed delay
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }} // Higher z-index on hover
        >
            {/* Comic Panel Container */}
            <div className="relative bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">

                {/* Removed POW Effect */}

                {/* Corner Deco */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[var(--color-brand-red)] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="mb-6 relative">
                    <Star className="text-[var(--color-brand-yellow)] w-8 h-8 fill-current absolute -top-4 -left-2 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all" />

                    <p className="font-serif text-lg md:text-xl text-neutral-900 leading-relaxed relative z-10">
                        "
                        {data.text.split(' ').map((word, i) => {
                            // Check if word (cleaned of punctuation) matches emphasis
                            const cleanWord = word.replace(/[.,!?'"]/g, '');
                            const isEmphasized = data.emphasis?.some(e => e.toLowerCase().includes(cleanWord.toLowerCase()));

                            return (
                                <span key={i} className={isEmphasized ? "font-bold text-[var(--color-brand-violet)]" : ""}>
                                    {word}{' '}
                                </span>
                            )
                        })}
                        "
                    </p>
                </div>

                <div className="flex items-center border-t-2 border-black pt-4 mt-auto">
                    {/* Avatar Placeholder / Initial */}
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold mr-4 border border-black group-hover:bg-[var(--color-brand-red)] transition-colors">
                        {data.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-black text-base uppercase tracking-wider">{data.name}</h4>
                        <p className="font-comic text-xs md:text-sm text-neutral-600 font-bold">{data.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Panel;
