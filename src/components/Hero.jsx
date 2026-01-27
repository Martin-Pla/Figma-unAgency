import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const logoImg = "/assets/The-unAgency-w.svg";

export default function Hero({ isLoaded = false }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section ref={containerRef} className="hero-container">
      {/* Mesh Gradient Container con Parallax */}
      <motion.div 
        className="mesh-gradient-container"
        style={{ y: backgroundY }}
      >
        <div className="mesh-gradient-overlay"></div>
      </motion.div>
      
      {/* Contenido Principal con Parallax */}
      <motion.div 
        className="hero-content"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            scale: isLoaded ? 1 : 0.95,
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)'
          }}
          transition={{ duration: 1.2, delay: isLoaded ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="hero-logo-wrapper"
        >
          <img 
            src={logoImg} 
            alt="The unAgency" 
            className="hero-logo-image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? 0 : 20,
            filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ duration: 1.2, delay: isLoaded ? 0.5 : 0, ease: "easeOut" }}
          className="hero-text-wrapper"
        >
          <p className="hero-tagline" style={{ marginTop: '20px' }}>
            Where creativity meets strategy. <br className="hero-tagline-break" /> 
            We don't follow the rules—we <span className="hero-tagline-bold">rewrite</span> them.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? 0 : 20,
            filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ duration: 1.2, delay: isLoaded ? 0.7 : 0, ease: "easeOut" }}
          className="hero-cta-wrapper"
        >
          <a href="#contact" className="hero-cta-button">
            Start a Project
          </a>
          
          {/* Indicador de Scroll debajo del botón */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="hero-cta-scroll-indicator"
          >
            <span className="hero-cta-scroll-text">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hero-cta-scroll-arrow"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="hero-scroll-indicator"
      >
        <span className="hero-scroll-text">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="hero-scroll-arrow"
        >
          ↓
        </motion.div>
      </motion.div>

    </section>
  );
}