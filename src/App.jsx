import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FluidBackground from './components/FluidBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

const logoImg = "/assets/logo-unagency.png";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-container-new">
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
              <a href="#" className="nav-logo-link" onClick={() => setIsMenuOpen(false)}>
                <img src={logoImg} alt="The unAgency" className="nav-logo-img" />
              </a>
              
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
                    {['Projects', 'About', 'Contact'].map((item, index) => (
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
                    <a href="#" className="menu-social-link">Instagram</a>
                    <a href="#" className="menu-social-link">LinkedIn</a>
                    <a href="#" className="menu-social-link">Twitter</a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <main className="main-content">
              <Hero />
              <Projects onProjectSelect={setSelectedProject} />
              <About />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
