import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

/**
 * Componente OptimizedImage - Similar a next/image pero para React
 * 
 * Características:
 * - Lazy loading automático (solo carga cuando está en viewport)
 * - Genera diferentes tamaños para móviles y desktop
 * - Mantiene la nitidez máxima
 * - Placeholder mientras carga
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false, // Si es true, carga inmediatamente (para imágenes above the fold)
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  quality = 90,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  
  // Usar useInView de Framer Motion para detectar cuando la imagen está visible
  const isInView = useInView(imgRef, { 
    once: true, 
    margin: '50px',
    amount: 0.1 
  });

  // Si es priority, siempre está "in view"
  const shouldLoad = priority || isInView;

  useEffect(() => {
    if (shouldLoad && imgRef.current) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [shouldLoad, src]);

  // Generar srcset para diferentes tamaños (responsive)
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    // Si la imagen ya tiene parámetros o es una URL externa, no generar srcset
    if (baseSrc.includes('?') || baseSrc.startsWith('http')) {
      return '';
    }

    // Tamaños comunes para responsive
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  const srcSet = generateSrcSet(src);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && !hasError && (
        <div 
          className="optimized-image-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#171717',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #404040',
              borderTopColor: '#ffffff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      )}

      {/* Imagen real */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          className={`optimized-image ${isLoaded ? 'optimized-image-loaded' : ''} ${className}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            imageRendering: '-webkit-optimize-contrast',
            imageRendering: 'crisp-edges',
            imageRendering: 'high-quality',
            filter: 'brightness(1.05) contrast(1.05)',
            ...props.style,
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#171717',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#737373',
            fontFamily: 'Space Mono, monospace',
            fontSize: '14px',
          }}
        >
          Image not available
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .optimized-image-loaded {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
