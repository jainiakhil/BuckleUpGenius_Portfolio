import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [noBlend, setNoBlend] = React.useState(true);

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero' || id === 'testimonials') {
            setNoBlend(true);
          } else {
            setNoBlend(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    ['hero', 'about', 'projects', 'testimonials', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-[100] p-6 md:p-8 flex justify-between items-center pointer-events-none"
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div className="relative group pointer-events-auto">
        <div className={`transition-all duration-500 ${!noBlend ? 'mix-blend-difference' : ''}`}>
          <a
            href="#"
            className="block relative z-50"
            data-cursor="hover"
            onMouseEnter={() => setIsMenuOpen(true)}
          >
            <img
              src="assets/logoFinal.png"
              alt="BuckleUpGenius"
              className={`h-12 md:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110 ${!noBlend ? 'invert' : ''}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className={`hidden font-serif text-2xl font-black tracking-tighter transition-colors duration-500 ${!noBlend ? 'text-white' : 'text-ink-black'}`}>BUCKLE UP</span>
          </a>
        </div>

        {/* Floating Pop-up Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 left-0 pt-20 md:pt-24 min-w-[240px] z-40"
            >
              <div className="bg-white border-4 border-black p-5 shadow-[12px_12px_0px_#000] rotate-1">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ x: 10, color: '#DC2626' }}
                      className="text-ink-black font-sans text-xl font-black uppercase tracking-tight transition-colors border-b-4 border-transparent hover:border-black pb-1 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                {/* Decorative Dots */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-comic-yellow border-4 border-black z-10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden persistent links - using for spacing or keeping structure if needed, but per request removing them from desktop view */}
      <div className="hidden md:flex gap-8 items-center opacity-0 pointer-events-none">
        {/* Placeholder for layout balance if logo was centered, but it's left-aligned */}
      </div>

      {/* Mobile Menu Icon (Simplified for now or keeping as is) */}
      <div className="md:hidden opacity-0 pointer-events-none">
        <div className="w-8 h-8 flex flex-col justify-center gap-1.5 items-end">
          <div className="w-8 h-1 bg-ink-black" />
          <div className="w-6 h-1 bg-ink-black" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;