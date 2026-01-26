import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionWrapper - Componente que envuelve secciones con fade-in escalonado
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la sección
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.delay - Delay inicial para la animación (en segundos)
 * @param {number} props.duration - Duración de la animación (en segundos)
 * @param {number} props.yOffset - Offset vertical inicial (en px)
 */
export default function SectionWrapper({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  yOffset = 40
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
