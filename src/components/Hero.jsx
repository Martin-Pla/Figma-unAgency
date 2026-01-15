import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const logoImg = "http://localhost:3845/assets/73fc6d9c98f3c8b428987b1b0c9ff057d036651c.png";

export default function Hero() {
  const containerRef = useRef(null);
  
  // Mouse interaction for subtle spotlight/glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Calculate position relative to center (for parallax movement)
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
    >
      {/* Background Gradient Spot that follows mouse subtly */}
      <motion.div 
        className="hero-gradient-spot"
        style={{
          x: springX,
          y: springY,
        }}
      />

      <div className="hero-content-container">
        <motion.div
          style={{ 
            x: springX,
            y: springY,
          }}
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-logo-wrapper"
        >
          <img 
            src={logoImg} 
            alt="The unAgency" 
            className="hero-logo-image" 
          />
          
          {/* Subtle sheen/reflection effect */}
          <div className="hero-sheen" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="hero-text-wrapper"
        >
          <p className="hero-tagline">
            Where creativity meets strategy. <br className="hero-tagline-break" /> 
            We don't follow the rules—we <span className="hero-tagline-bold">rewrite</span> them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="hero-scroll-indicator"
        >
          <span className="hero-scroll-text">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="hero-scroll-arrow" />
          </motion.div>
        </motion.div>
      </div>

      {/* Massive Background Typography */}
      <div className="hero-background-text-container">
         <motion.h2 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.03 }}
           transition={{ duration: 2, delay: 0.5 }}
           className="hero-background-text"
         >
           UNAGENCY
         </motion.h2>
      </div>
      
      {/* Noise texture overlay for grit */}
      <div className="hero-noise-overlay" />
    </section>
  );
}
