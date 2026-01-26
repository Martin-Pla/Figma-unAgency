import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const logoImg = "/assets/logo-unagency.png";

export default function Hero() {
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hero-section-new"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* 1. Background Typography (Ahora con position absolute para que NO empuje nada) */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none', width: '100%', textAlign: 'center' }}>
         <motion.h1 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.03 }}
           transition={{ duration: 2, delay: 0.5 }}
           className="hero-background-text"
           style={{ margin: 0, fontSize: '20vw', whiteSpace: 'nowrap' }}
         >
           The unAgency | Product Design & Brand Architecture
         </motion.h1>
      </div>

      {/* 2. Contenido Principal */}
      <div className="hero-content-container" style={{ zIndex: 10, position: 'relative', textAlign: 'center' }}>
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
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
      </div>

      {/* 3. Indicador de Scroll (Fijo abajo) */}
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

      {/* Decoraciones de fondo */}
      <motion.div className="hero-gradient-spot" style={{ x: springX, y: springY }} />
      <div className="hero-noise-overlay" />
    </section>
  );
}