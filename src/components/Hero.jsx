import React from 'react';
import { motion } from 'framer-motion';

const logoImg = "/assets/The-unAgency-w.svg";

export default function Hero() {
  return (
    <section className="hero-container">
      {/* Mesh Gradient Container */}
      <div className="mesh-gradient-container">
        <div className="mesh-gradient-overlay"></div>
      </div>
      
      {/* Línea Vertical Técnica */}
      <div className="hero-vertical-line"></div>
      
      {/* Contenido Principal */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="hero-text-wrapper"
        >
          <p className="hero-tagline" style={{ marginTop: '20px' }}>
            Where creativity meets strategy. <br className="hero-tagline-break" /> 
            We don't follow the rules—we <span className="hero-tagline-bold">rewrite</span> them.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
          className="hero-cta-wrapper"
        >
          <a href="#contact" className="hero-cta-button">
            Start a Project
          </a>
        </motion.div>
      </div>

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