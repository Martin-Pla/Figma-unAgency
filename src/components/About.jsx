import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  "JMRPACKING", "TBG GOLF", "BELTECH", "CASTELLANA IMPORTACIONES", 
  "NUWA STONE", "NORTHWEST", "OKAPI ENERGY"
];

// Duplicate the brands array to create a seamless loop
const marqueeBrands = [...brands, ...brands, ...brands];

export default function About() {
  return (
    <section id="about" className="about-section-updated">
      <div className="about-container-updated">
        <div className="about-grid">
          
          {/* Left Column - Heading */}
          <div className="about-left-column">
            <div className="about-sticky">
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="about-title-updated"
              >
                ABOUT
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Manifesto */}
          <div className="about-right-column">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="about-manifesto">
                We are the <span className="about-manifesto-italic">glitch</span> in the agency model. A collective of rogue creatives obsessed with the absolute.
              </h3>
              
              <div className="about-text-grid">
                <p className="about-text">
                  Traditional agencies sell time and bloated processes. We sell impact. We have surgically removed the account managers, the endless meetings, and the layers of middle-management that dilute vision.
                </p>
                <p className="about-text">
                  What remains is pure potency. Direct access to elite talent. Radical transparency. Relentless execution. We don't just build digital products; we engineer market dominance.
                </p>
              </div>

              <div className="about-services">
                <div className="about-service-item">
                  <span className="about-service-number">01</span>
                  <span className="about-service-label">Visceral Strategy</span>
                </div>
                <div className="about-service-item">
                  <span className="about-service-number">02</span>
                  <span className="about-service-label">Radical Design</span>
                </div>
                <div className="about-service-item">
                  <span className="about-service-number">03</span>
                  <span className="about-service-label">Kinetic Dev</span>
                </div>
                <div className="about-service-item">
                  <span className="about-service-number">04</span>
                  <span className="about-service-label">Total Impact</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Client Carousel */}
      <div className="about-carousel-container">
        <p className="about-carousel-label">Trusted By</p>
        <div className="about-carousel-wrapper">
          <motion.div 
            className="about-carousel"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {marqueeBrands.map((brand, index) => (
              <h4 key={index} className="about-carousel-brand">
                {brand}
              </h4>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Background Graphic Element */}
      <div className="about-bg-graphic" />
    </section>
  );
}
