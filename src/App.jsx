import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FluidBackground from './components/FluidBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import SchemaMarkup from './components/SchemaMarkup';
import SEO from './components/SEO';
import SectionWrapper from './components/SectionWrapper';

const logoImg = "/assets/The-unAgency-w.svg";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container-new">
      <SEO />
      <SchemaMarkup />
      <div className="bg-fix">
        <FluidBackground />
      </div>

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail 
            key="detail"
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        ) : (
          <motion.div 
            key="home" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            {/* Navigation Bar */}
            <motion.nav 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="nav-bar"
            >
              <motion.a 
                href="#" 
                className="nav-logo-link" 
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: hasScrolled ? 1 : 0,
                  x: hasScrolled ? 0 : -20
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ pointerEvents: hasScrolled ? 'auto' : 'none' }}
              >
                <img src={logoImg} alt="The unAgency" className="nav-logo-img" />
              </motion.a>
              
              <button 
                onClick={toggleMenu}
                className="nav-menu-button"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            </motion.nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="menu-overlay"
                >
                  <div className="menu-items">
                    {['Projects', 'About', 'Services', 'Contact'].map((item, index) => (
                      <motion.a 
                        key={item} 
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                        className="menu-item-link"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="menu-social"
                  >
                    <a 
                      href="#" 
                      className="menu-social-link"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Síguenos en Instagram"
                    >
                      Instagram
                    </a>
                    <a 
                      href="#" 
                      className="menu-social-link"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Conéctate con nosotros en LinkedIn"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="#" 
                      className="menu-social-link"
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Síguenos en Twitter"
                    >
                      Twitter
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <main className="main-content">
              <Hero />
              <SectionWrapper delay={0.2}>
                <Projects onProjectSelect={setSelectedProject} />
              </SectionWrapper>
              <SectionWrapper delay={0.3}>
                <About />
              </SectionWrapper>
              <SectionWrapper delay={0.4}>
                <Services />
              </SectionWrapper>
              <SectionWrapper delay={0.5}>
                <Contact />
              </SectionWrapper>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
