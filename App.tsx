import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/UI/CustomCursor';
import NoiseOverlay from './components/UI/NoiseOverlay';
import Navigation from './components/Layout/Navigation';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Testimonials from './components/Sections/Testimonials/index';
import Contact from './components/Sections/Contact';
import PageUnderConstruction from './components/Pages/PageUnderConstruction';
import PageNotFound from './components/Pages/PageNotFound';

const Home: React.FC = () => (
  <main className="relative bg-ink-black min-h-screen text-ink-paper selection:bg-accent-red selection:text-white">
    <Navigation />
    <Hero />
    <About />
    <Projects />
    <Testimonials />
    <Contact />
  </main>
);

const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/under-construction" element={<PageUnderConstruction />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;