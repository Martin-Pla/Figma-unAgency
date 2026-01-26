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
              
              <motion.div 
                className="about-text-grid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Traditional agencies sell time and bloated processes. We sell impact. We have surgically removed the account managers, the endless meetings, and the layers of middle-management that dilute vision.
                </motion.p>
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  What remains is pure potency. Direct access to elite talent. Radical transparency. Relentless execution. We don't just build digital products; we engineer market dominance.
                </motion.p>
              </motion.div>

              <motion.div 
                className="about-services"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { number: "01", label: "Visceral Strategy" },
                  { number: "02", label: "Radical Design" },
                  { number: "03", label: "Kinetic Dev" },
                  { number: "04", label: "Total Impact" }
                ].map((item, index) => (
                  <motion.div
                    key={item.number}
                    className="about-service-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="about-service-number">{item.number}</span>
                    <span className="about-service-label">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
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
