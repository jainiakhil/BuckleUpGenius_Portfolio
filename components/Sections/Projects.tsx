import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Grid, Layers, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../UI/SectionWrapper';
import { COMIC_ISSUES, ComicIssue, ComicPanelData } from './comicData';

// --- Types ---
type ViewMode = 'flip' | 'scroll';

// --- Utility Components ---

const ViewModeToggle: React.FC<{
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  onPrev?: () => void;
  onNext?: () => void;
}> = ({ mode, setMode, onPrev, onNext }) => (
  <div className="flex flex-col items-end gap-3 relative z-20">
    <div className="flex bg-neutral-900 border border-neutral-800 rounded-full p-1 gap-1">
      <button
        onClick={() => setMode('flip')}
        className={`px-4 py-2 rounded-full text-sm font-mono transition-all flex items-center gap-2 ${mode === 'flip' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
      >
        <Layers size={16} /> <span className="hidden sm:inline">Issue Mode</span>
      </button>
      <button
        onClick={() => setMode('scroll')}
        className={`px-4 py-2 rounded-full text-sm font-mono transition-all flex items-center gap-2 ${mode === 'scroll' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
      >
        <Grid size={16} /> <span className="hidden sm:inline">Scroll Mode</span>
      </button>
    </div>

    {/* Navigation Arrows (Only visible in Flip Mode on Desktop) */}
    {mode === 'flip' && (
      <div className="hidden md:flex gap-2">
        <button
          onClick={onPrev}
          className="p-3 bg-neutral-900 border border-neutral-700 rounded-full text-white hover:bg-neutral-800 hover:border-white transition-all active:scale-95"
          title="Previous Issue"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={onNext}
          className="p-3 bg-neutral-900 border border-neutral-700 rounded-full text-white hover:bg-neutral-800 hover:border-white transition-all active:scale-95"
          title="Next Issue"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    )}
  </div>
);

// --- Panel Components ---

const PanelOverlay: React.FC<{ panel: ComicPanelData; onClose: () => void; color: string }> = ({ panel, onClose, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateY: -90, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative w-full max-w-5xl bg-neutral-50 shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        style={{ border: `4px solid ${color}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left: Visual */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-neutral-900 group">
          <img src={panel.image} alt={panel.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Comic texture overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#fdfbf7] relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            {/* Halftone pattern or similar decorative element could go here */}
          </div>

          <span className="font-mono text-xs tracking-widest uppercase mb-4 block font-bold" style={{ color: color }}>
            {panel.category} — {panel.year}
          </span>

          <h2 className="font-serif text-4xl md:text-5xl text-black mb-6 leading-tight uppercase font-black tracking-tight" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
            {panel.title}
          </h2>

          <div className="prose prose-lg text-neutral-800 mb-8 font-serif leading-relaxed">
            <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-black pb-4">{panel.description}</p>
            <p>
              This project explores the intersection of {panel.category.toLowerCase()} and narrative storytelling.
              Designed to push boundaries, every pixel was crafted with intent.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-black text-white font-mono text-sm uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-black"
            >
              Open Project
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ComicPanel: React.FC<{ panel: ComicPanelData; issueColor: any; onClick: () => void; index: number }> = ({ panel, issueColor, onClick, index }) => {
  const isTextBased = panel.panelType === 'Writing' || panel.panelType === 'Copyediting';

  // Seeded random-ish rotation based on index (-2deg or 2deg)
  const rotateValue = index % 2 === 0 ? -2 : 2;

  // Variants for layout stability + tilt effect
  const panelVariants = {
    initial: { opacity: 0, y: 20, rotate: rotateValue * 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: rotateValue,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    hover: {
      scale: 1.05,
      rotate: 0, // Straighten on hover
      zIndex: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      layoutId={`panel-${panel.id}`}
      onClick={onClick}
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      variants={panelVariants}
      className="relative group cursor-pointer bg-neutral-900 border-4 border-black transition-shadow duration-300 shadow-md h-full w-full"
      style={{
        boxShadow: `8px 8px 0px 0px ${issueColor.primary}`
      }}
    >
      <div className="relative w-full h-full aspect-[4/5] md:aspect-square overflow-hidden">
        {isTextBased ? (
          <div className="w-full h-full p-6 bg-[#fdfbf7] flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <h3 className="font-serif text-2xl text-black md:text-3xl mb-2 relative z-10 font-black uppercase">{panel.title}</h3>
            <p className="font-mono text-xs text-neutral-500 relative z-10 bg-white/80 px-2 py-1">{panel.description}</p>
          </div>
        ) : (
          <>
            <img
              src={panel.image}
              alt={panel.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 p-4 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
              <span
                className="inline-block px-2 py-1 mb-2 text-[10px] font-mono uppercase tracking-widest text-black font-bold -rotate-2"
                style={{ backgroundColor: issueColor.primary }}
              >
                {panel.category}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white leading-none drop-shadow-md uppercase italic">
                {panel.title}
              </h3>
            </div>
          </>
        )}

        {/* Comic "Burst" Effect placeholder (border or corner accent) */}
        <div
          className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 transition-all duration-300 group-hover:w-full group-hover:h-full opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ borderColor: issueColor.primary }}
        />
      </div>
    </motion.div>
  );
};

const IssueCover: React.FC<{ issue: ComicIssue }> = ({ issue }) => {
  return (
    <div className="relative w-full md:w-[400px] flex-shrink-0 flex flex-col justify-end p-8 md:p-12 border-r-0 md:border-r border-neutral-800 h-full overflow-hidden">
      {/* Background Solid Color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: issue.color.primary
        }}
      />

      {/* Decorative Halftone for Texture (Solid theme but with comic feel) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '15px 15px' }}></div>

      <div className="relative z-10">
        <span className="font-mono text-lg mb-4 block font-black tracking-widest bg-black text-white inline-block px-3 py-1 -rotate-1 shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
          {issue.issueNumber}
        </span>
        <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase leading-[0.85] tracking-tighter italic drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
          {issue.title}
        </h2>
        <p className="text-white font-serif text-xl border-l-4 pl-4 max-w-xs italic font-bold border-white">
          {issue.tagline}
        </p>

        <div className="mt-12 flex items-center gap-4 text-sm font-mono text-white/80">
          {/* Desktop: Swipe Line */}
          <span className="hidden md:block w-8 h-[2px] bg-white" />
          <span className="hidden md:block uppercase tracking-widest text-xs font-bold">Swipe to read</span>

          {/* Mobile: Vertical Arrow */}
          <div className="md:hidden flex flex-col items-center gap-2 animate-bounce opacity-100">
            <span className="uppercase tracking-widest text-xs font-bold">Scroll Down</span>
            <ArrowDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ComicIssueSection: React.FC<{ issue: ComicIssue; onPanelClick: (p: ComicPanelData) => void }> = ({ issue, onPanelClick }) => {
  return (
    <section className="flex flex-col md:flex-row min-w-full md:w-auto md:snap-start border-r border-neutral-800 relative group/section h-auto md:h-full">
      {/* Cover */}
      <IssueCover issue={issue} />

      {/* Panels Grid */}
      <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 content-center flex-grow max-w-[600px] relative max-h-full overflow-y-auto overflow-x-hidden hide-scrollbar">
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 whitespace-nowrap pointer-events-none">
          <span className="text-[200px] font-black uppercase text-white" style={{ WebkitTextStroke: `2px ${issue.color.primary}`, color: 'transparent' }}>
            {issue.title.split(' ')[0]}
          </span>
        </div>

        {issue.panels.map((panel, idx) => (
          <ComicPanel key={panel.id} panel={panel} issueColor={issue.color} onClick={() => onPanelClick(panel)} index={idx} />
        ))}
      </div>
    </section>
  );
};

// --- Main Projects Component ---

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('flip');
  const [selectedPanel, setSelectedPanel] = useState<ComicPanelData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flipContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Scroll Handlers
  const scrollPrev = () => {
    if (flipContainerRef.current) {
      flipContainerRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (flipContainerRef.current) {
      flipContainerRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    }
  };

  const handlePanelClick = () => {
    navigate('/under-construction');
  };


  // Handle "Escape" to close overlay
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPanel(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getIssueColor = (issueId: string) => {
    return COMIC_ISSUES.find(i => i.id === issueId)?.color.primary || '#ffffff';
  };

  return (
    <div
      id="projects"
      className={`relative bg-neutral-950 md:overflow-hidden snap-start snap-always ${viewMode === 'flip' ? 'min-h-screen md:h-screen flex flex-col' : 'min-h-screen py-20'}`}
    >
      {/* Header / Toggle  */}
      <div className="container mx-auto px-6 relative z-30 pointer-events-none">
        {/* Toggle & Nav - Top Right - Aligned with Navigation Brand */}
        <div className="absolute top-8 md:top-10 right-10 hidden md:flex items-center gap-4 pointer-events-auto">
          <ViewModeToggle
            mode={viewMode}
            setMode={setViewMode}
            onPrev={scrollPrev}
            onNext={scrollNext}
          />
        </div>

        {/* Centered Title */}
        <div className={`
                    flex flex-col items-center justify-center text-center
                    ${viewMode === 'flip' ? 'h-[15vh] md:h-[25vh] min-h-[120px] md:min-h-[160px]' : 'py-16 md:py-24'}
                `}>
          <h2 className="font-serif text-5xl md:text-8xl text-white mb-2 tracking-tight leading-none uppercase italic underline decoration-accent-red underline-offset-8 pointer-events-auto">
            The Archive
          </h2>
          {viewMode !== 'flip' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center pointer-events-auto"
            >
              <div className="h-2 w-48 bg-accent-red skew-x-12 mb-6 mt-4"></div>
              <p className="text-neutral-400 font-mono text-sm max-w-xl text-center">
                Explore the collection of digital artifacts. Each issue represents a different facet of the creative process.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'flip' ? (
        // HORIZONTAL / FLIP MODE (Desktop default)
        <div
          ref={flipContainerRef}
          className="w-full flex-grow md:overflow-x-auto snap-x snap-mandatory flex flex-col md:flex-row gap-0 hide-scrollbar relative z-20"
        >
          {COMIC_ISSUES.map(issue => (
            <div key={issue.id} className="min-w-full md:min-w-0 md:flex-shrink-0 border-b md:border-b-0 border-neutral-800 last:border-0 h-auto md:h-full snap-start md:snap-center">
              <ComicIssueSection issue={issue} onPanelClick={handlePanelClick} />
            </div>
          ))}

          {/* Final CTA "Page" */}
          <div className="min-w-full md:min-w-[500px] flex flex-col justify-center items-center p-12 snap-start border-l border-neutral-800 bg-neutral-900/50">
            <h3 className="text-4xl font-black text-white mb-6 text-center italic uppercase transform -rotate-2">
              To Be Continued...
            </h3>
            <p className="text-neutral-400 max-w-xs text-center mb-8 font-serif">
              The story doesn't end here. Check the full archives for more back issues.
            </p>

            {/* 
                            !!! DATA EDITING INSTRUCTIONS !!!
                            To add new projects or modify existing ones, please edit the 'COMIC_ISSUES' array in:
                            components/Sections/comicData.ts
                         */}

            <button className="px-8 py-4 bg-accent-red text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-all rounded-sm shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              View Full Archive
            </button>
          </div>
        </div>
      ) : (
        // SCROLL MODE (Grid)
        <div className="container mx-auto px-6 grid grid-cols-1 gap-24 relative z-20">
          {COMIC_ISSUES.map((issue) => (
            <div key={issue.id} className="flex flex-col gap-8">
              <div className="border-b border-neutral-800 pb-4 flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-sm font-bold bg-neutral-800 px-2 py-1 rounded text-white mr-4">{issue.issueNumber}</span>
                  <h3 className="text-4xl font-black text-white inline-block uppercase italic" style={{ color: issue.color.primary }}>{issue.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {issue.panels.map((panel, idx) => (
                  <div key={panel.id} onClick={handlePanelClick} className="aspect-[4/5]">
                    <ComicPanel panel={panel} issueColor={issue.color} onClick={handlePanelClick} index={idx} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Prompt */}
      {viewMode === 'flip' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-50 z-30 hidden md:block pointer-events-none">
          {/* <p className="font-mono text-xs text-neutral-600">
            *Use arrows or Scroll/Swipe to navigate
          </p> */}
        </div>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {selectedPanel && (
          <PanelOverlay
            panel={selectedPanel}
            color={getIssueColor(selectedPanel.issueId)}
            onClose={() => setSelectedPanel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;