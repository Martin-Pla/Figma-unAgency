import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import FluidBackground from './components/FluidBackground';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Projects, { projects, generateProjectSlug } from './components/Projects';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import SchemaMarkup from './components/SchemaMarkup';
import SEO from './components/SEO';
import SectionWrapper from './components/SectionWrapper';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import { getTranslation } from './utils/translations';

const logoImg = "/assets/The-unAgency-w.svg";

// Componente interno que usa el contexto
function AppContent() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Función para encontrar proyecto por slug
  const findProjectBySlug = (slug) => {
    return projects.find(project => generateProjectSlug(project.title) === slug);
  };

  // Leer la URL al cargar la página
  useEffect(() => {
    const path = window.location.pathname;
    const projectMatch = path.match(/^\/project\/(.+)$/);
    
    if (projectMatch) {
      const slug = projectMatch[1];
      const project = findProjectBySlug(slug);
      if (project) {
        setSelectedProject(project);
      } else {
        // Si el proyecto no se encuentra, redirigir a la página principal
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  // Manejar cambios en la URL (botón atrás/adelante del navegador)
  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname;
      const projectMatch = path.match(/^\/project\/(.+)$/);
      
      if (projectMatch) {
        const slug = projectMatch[1];
        const project = findProjectBySlug(slug);
        if (project) {
          setSelectedProject(project);
        } else {
          setSelectedProject(null);
        }
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 100);
      
      // Calcular progreso del scroll
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollPosition / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez para inicializar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`app-container-new ${isLoading ? 'app-loading' : ''}`}>
      <SEO />
      <SchemaMarkup />
      
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {/* Barra de Progreso de Scroll */}
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="bg-fix">
        <FluidBackground />
      </div>

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail 
            key="detail"
            project={selectedProject} 
            onBack={() => {
              setSelectedProject(null);
              // Limpiar la URL cuando se vuelve a la página principal
              window.history.pushState({}, '', '/');
            }}
            onProjectSelect={(project) => {
              setSelectedProject(project);
              const slug = generateProjectSlug(project.title);
              window.history.pushState({}, '', `/project/${slug}`);
            }}
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
                href="/" 
                className="nav-logo-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  setSelectedProject(null);
                  window.history.pushState({}, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
              
              <div className="nav-right-group">
                <LanguageSelector />
                <button 
                  onClick={toggleMenu}
                  className="nav-menu-button"
                >
                  {isMenuOpen ? getTranslation(language, 'close') : getTranslation(language, 'menu')}
                </button>
              </div>
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
                    {['projects', 'about', 'services', 'contact'].map((item, index) => (
                      <motion.a 
                        key={item} 
                        href={`#${item}`}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                        className="menu-item-link"
                      >
                        {getTranslation(language, item)}
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
                      href="https://www.instagram.com/theunagencyco/"
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
              <Hero isLoaded={!isLoading} />
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

// Componente principal con Provider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
