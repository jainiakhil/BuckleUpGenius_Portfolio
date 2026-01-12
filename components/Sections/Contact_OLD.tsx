import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../UI/SectionWrapper';
import { SOCIALS } from '../../constants';

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" className="pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-24">
        
        {/* Contact Info */}
        <div>
          <h2 className="font-serif text-5xl md:text-7xl mb-8">Let's start a <br/>conversation.</h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-md">
            Interested in collaboration? I'm currently available for freelance projects worldwide.
          </p>
          
          <div className="flex gap-6">
            {SOCIALS.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                className="p-4 border border-neutral-800 rounded-full hover:border-accent-red hover:text-accent-red transition-colors duration-300"
                data-cursor="hover"
                aria-label={social.platform}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8">
          <div className="group">
            <label className="block text-neutral-500 text-sm font-mono mb-2 uppercase tracking-widest">Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-ink-paper focus:outline-none focus:border-accent-red transition-colors placeholder-neutral-700"
              placeholder="John Doe"
            />
          </div>
          
          <div className="group">
            <label className="block text-neutral-500 text-sm font-mono mb-2 uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-ink-paper focus:outline-none focus:border-accent-red transition-colors placeholder-neutral-700"
              placeholder="john@example.com"
            />
          </div>
          
          <div className="group">
            <label className="block text-neutral-500 text-sm font-mono mb-2 uppercase tracking-widest">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl text-ink-paper focus:outline-none focus:border-accent-red transition-colors placeholder-neutral-700 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 bg-ink-paper text-ink-black font-medium text-lg uppercase tracking-widest hover:bg-accent-red hover:text-white transition-colors duration-300 mt-8"
            data-cursor="hover"
          >
            Send Message
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900 py-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm font-mono">
        <p>&copy; 2024 Ink & Motion.</p>
        <p>Designed with Lottie & React.</p>
      </div>
    </SectionWrapper>
  );
};

export default Contact;