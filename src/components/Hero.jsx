import React from 'react';
import { motion } from 'framer-motion';

const logoImg = "/assets/The-unAgency-w.svg";

export default function Hero() {
  return (
    <section 
      className="hero-section-new"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000' }}
    >
      {/* Kinetic Depth Background - Ambient Blobs */}
      <div className="hero-background-ambient">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Contenido Principal */}
      <div className="hero-content-container" style={{ zIndex: 10, position: 'relative', textAlign: 'center' }}>
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
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}
      >
        <span className="hero-scroll-text" style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: '16px', color: '#525252', fontFamily: 'Space Mono, monospace' }}
        >
          ↓
        </motion.div>
      </motion.div>

    </section>
  );
}