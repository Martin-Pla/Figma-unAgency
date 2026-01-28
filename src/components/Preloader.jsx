import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Iniciar progreso mínimo inmediatamente para que sea visible
  useEffect(() => {
    setProgress(5);
  }, []);

  useEffect(() => {
    let progressTimer;
    let minDisplayTime = 2000; // Mínimo 2 segundos de visualización
    const startTime = Date.now();

    // Función para cargar todas las imágenes
    const loadAllImages = () => {
      return new Promise((resolve) => {
        // Lista de imágenes críticas que deben cargarse
        const criticalImages = [
          "/assets/The-unAgency-w.svg",
          "/assets/img-3bg.png",
          "/assets/img-agua-salada.png",
          "/assets/img-akbal.png",
          "/assets/img-ave-de-fuego.png",
          "/assets/img-black-agnes.png",
          "/assets/img-casarey.png",
          "/assets/img-gallus.png",
          "/assets/img-marielen.png",
          "/assets/img-nuwa.png",
          "/assets/img-suhar.png",
          "/assets/img-tres-diablos.png",
          "/assets/img-what-the-flock.png"
        ];

        // También obtener todas las imágenes del DOM
        const domImages = Array.from(document.querySelectorAll('img'));
        const allImageSources = new Set([
          ...criticalImages,
          ...domImages.map(img => img.src.replace(window.location.origin, ''))
        ]);

        const imageArray = Array.from(allImageSources);
        
        if (imageArray.length === 0) {
          resolve();
          return;
        }

        let loadedCount = 0;
        const totalImages = imageArray.length;
        let resolved = false;

        const checkComplete = () => {
          if (resolved) return;
          
          loadedCount++;
          const imageProgress = 20 + (loadedCount / totalImages) * 70; // 20-90% del progreso viene de imágenes
          setProgress((prev) => Math.max(prev, imageProgress));
          
          if (loadedCount === totalImages) {
            resolved = true;
            resolve();
          }
        };

        // Precargar imágenes críticas
        imageArray.forEach((src) => {
          const img = new Image();
          img.onload = checkComplete;
          img.onerror = checkComplete;
          img.src = src.startsWith('/') ? src : `/${src}`;
        });

        // También verificar imágenes del DOM
        domImages.forEach((img) => {
          if (img.complete) {
            checkComplete();
          } else {
            img.addEventListener('load', checkComplete, { once: true });
            img.addEventListener('error', checkComplete, { once: true });
          }
        });
      });
    };

    // Simular progreso inicial mientras se cargan las imágenes
    const simulateProgress = () => {
      const interval = 16; // ~60fps
      let currentProgress = 0;
      const targetProgress = 20; // Progreso inicial del 20%

      progressTimer = setInterval(() => {
        currentProgress += 0.5;
        if (currentProgress < targetProgress) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressTimer);
        }
      }, interval);
    };

    // Función principal de carga
    const handleLoad = async () => {
      simulateProgress();
      
      // Esperar un momento para que React renderice los componentes
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Esperar a que todas las imágenes se carguen
      await loadAllImages();
      
      // Asegurar que el progreso llegue al 100%
      setProgress(100);
      
      // Esperar el tiempo mínimo de visualización
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      setTimeout(() => {
        setIsComplete(true);
        // Esperar un momento antes de desaparecer
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500);
      }, remainingTime);
    };

    // Iniciar carga después de un pequeño delay para asegurar que React haya renderizado
    const initLoad = () => {
      setTimeout(() => {
        handleLoad();
      }, 100);
    };

    if (document.readyState === 'complete') {
      initLoad();
    } else {
      window.addEventListener('load', initLoad);
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="preloader-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="preloader-welcome"
        >
          Welcome
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="preloader-text"
        >
          LOADING
        </motion.div>
        
        <div className="preloader-bar-container">
          <motion.div
            className="preloader-bar"
            style={{ width: `${Math.max(progress, 5)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
