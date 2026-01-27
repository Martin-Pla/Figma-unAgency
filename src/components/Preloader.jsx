import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simular carga con animación de progreso
    const duration = 2500; // 2.5 segundos
    const interval = 16; // ~60fps
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          // Esperar un momento antes de desaparecer
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // También escuchar el evento window.onload
    const handleLoad = () => {
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="preloader-content">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="preloader-text"
            >
              THE UNAGENCY // LOADING
            </motion.div>
            
            <div className="preloader-bar-container">
              <motion.div
                className="preloader-bar"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
