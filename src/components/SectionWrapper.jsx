import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * SectionWrapper - Componente que envuelve secciones con scroll-driven animations
 * Inspirado en lightweight.info - Revelación progresiva y posicionamiento dinámico
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la sección
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.delay - Delay inicial para la animación (en segundos)
 * @param {number} props.duration - Duración de la animación (en segundos)
 * @param {number} props.yOffset - Offset vertical inicial (en px)
 * @param {boolean} props.enableParallax - Habilita efecto parallax basado en scroll
 */
export default function SectionWrapper({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  yOffset = 60,
  enableParallax = false
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scroll-driven opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Scroll-driven y position (parallax)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? [yOffset, -yOffset * 0.5] : [yOffset, 0]
  );

  // Scroll-driven scale
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : {}}
      style={{
        opacity: isInView ? undefined : opacity,
        y: isInView ? undefined : y,
        scale: enableParallax ? scale : undefined,
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
