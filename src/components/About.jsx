import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { initAssemblyAnimations, initTextReveal, cleanupScrollTriggers, refreshScrollTriggers } from '../utils/gsapAnimations';

const brands = [
  "JMRPACKING", "TBG GOLF", "BELTECH", "CASTELLANA IMPORTACIONES", 
  "NUWA STONE", "NORTHWEST", "OKAPI ENERGY"
];

// Duplicate the brands array to create a seamless loop
const marqueeBrands = [...brands, ...brands, ...brands];

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const manifestoRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const manifestoInView = useInView(manifestoRef, { once: true, margin: "-100px" });

  // Scroll-driven parallax para el título
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  // Scroll-driven para el contenido
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  // Inicializar animaciones GSAP
  useEffect(() => {
    cleanupScrollTriggers();

    const timer = setTimeout(() => {
      // Animaciones para textos
      initTextReveal('.about-text', {
        yOffset: 60,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        start: 'top 90%'
      });

      // Animaciones para servicios
      initAssemblyAnimations('.about-service-item', {
        yOffset: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        start: 'top 85%'
      });

      refreshScrollTriggers();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section-updated">
      <div className="about-container-updated">
        <div className="about-grid">
          
          {/* Left Column - Heading */}
          <div className="about-left-column">
            <div className="about-sticky">
              <motion.h2 
                ref={titleRef}
                initial={{ opacity: 0, x: -60 }}
                animate={titleInView ? { opacity: 1, x: 0 } : {}}
                style={{
                  y: titleInView ? undefined : titleY,
                  opacity: titleInView ? undefined : titleOpacity,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="about-title-updated"
              >
                ABOUT
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Manifesto */}
          <div className="about-right-column">
            <motion.div
              ref={manifestoRef}
              initial={{ opacity: 0, y: 60 }}
              animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
              style={{
                y: manifestoInView ? undefined : contentY,
                opacity: manifestoInView ? undefined : contentOpacity,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h3 
                className="about-manifesto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We are the <span className="about-manifesto-italic">glitch</span> in the agency model. A collective of rogue creatives obsessed with the absolute.
              </motion.h3>
              
              <motion.div 
                className="about-text-grid"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Traditional agencies sell time and bloated processes. We sell impact. We have surgically removed the account managers, the endless meetings, and the layers of middle-management that dilute vision.
                </motion.p>
                <motion.p 
                  className="about-text"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  What remains is pure potency. Direct access to elite talent. Radical transparency. Relentless execution. We don't just build digital products; we engineer market dominance.
                </motion.p>
              </motion.div>

              <motion.div 
                className="about-services"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
                    transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
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
