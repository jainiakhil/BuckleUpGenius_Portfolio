import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialLinks: React.FC = () => {
    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub", hoverColor: "group-hover:bg-[#333]" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "group-hover:bg-[#0077b5]" },
        // Using Instagram
        { icon: Instagram, href: "https://instagram.com", label: "Instagram", hoverColor: "group-hover:bg-[#E1306C]" },
    ];

    return (
        <div className="flex gap-4">
            {socialLinks.map((social) => (
                <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-12 h-12 bg-white border-4 border-black flex items-center justify-center transition-all duration-300 shadow-[4px_4px_0px_#000]`}
                    whileHover={{
                        y: -4,
                        x: -4,
                        boxShadow: "8px 8px 0px #000"
                    }}
                    whileTap={{ y: 0, x: 0, boxShadow: "0px 0px 0px #000" }}
                >
                    {/* Default: Black Icon. On Hover: Turns White + Background changes color via parent class */}
                    <div className={`absolute inset-0 ${social.hoverColor} origin-bottom-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`} />

                    <social.icon className="w-6 h-6 stroke-[3] text-black group-hover:text-white relative z-10 transition-colors duration-300" />
                </motion.a>
            ))}
        </div>
    );
};

export default SocialLinks;
