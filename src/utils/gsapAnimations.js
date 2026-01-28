import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Sistema de animaciones de ensamblaje inspirado en lightweight.info
 * Implementa efectos de scroll interactivo con GSAP y ScrollTrigger
 */

/**
 * Inicializa animaciones de ensamblaje para una sección
 * @param {string} selector - Selector CSS de la sección
 * @param {Object} options - Opciones de configuración
 */
export const initAssemblyAnimations = (selector, options = {}) => {
  const {
    yOffset = 100,
    duration = 1.2,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
    end = 'bottom 15%',
    toggleActions = 'play none none reverse'
  } = options;

  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) return;

  elements.forEach((element, index) => {
    // Calcular delay basado en posición (izquierda más lento que derecha)
    const rect = element.getBoundingClientRect();
    const isLeftSide = rect.left < window.innerWidth / 2;
    const positionDelay = isLeftSide ? stagger * 1.5 : stagger;
    const finalDelay = index * positionDelay;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: yOffset,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration,
        delay: finalDelay,
        ease: ease,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          toggleActions: toggleActions,
          markers: false // Cambiar a true para debug
        }
      }
    );
  });
};

/**
 * Inicializa parallax para imágenes dentro de contenedores
 * @param {string} containerSelector - Selector del contenedor
 * @param {string} imageSelector - Selector de la imagen dentro del contenedor
 * @param {Object} options - Opciones de configuración
 */
export const initImageParallax = (containerSelector, imageSelector, options = {}) => {
  const {
    yMovement = -50,
    start = 'top bottom',
    end = 'bottom top',
    ease = 'none'
  } = options;

  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const image = container.querySelector(imageSelector);
    if (!image) return;

    gsap.to(image, {
      y: yMovement,
      ease: ease,
      scrollTrigger: {
        trigger: container,
        start: start,
        end: end,
        scrub: 1,
        markers: false
      }
    });
  });
};

/**
 * Inicializa animaciones escalonadas para proyectos
 * Los elementos de la izquierda se mueven más lento que los de la derecha
 * @param {string} selector - Selector de los elementos de proyecto
 * @param {Object} options - Opciones de configuración
 */
export const initStaggeredProjects = (selector, options = {}) => {
  const {
    yOffset = 100,
    duration = 1.2,
    baseStagger = 0.08,
    ease = 'power3.out',
    start = 'top 85%'
  } = options;

  const projects = document.querySelectorAll(selector);
  
  if (projects.length === 0) return;

  projects.forEach((project, index) => {
    const rect = project.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;
    const projectCenter = rect.left + rect.width / 2;
    
    // Calcular factor de velocidad basado en posición horizontal
    // Elementos a la izquierda: más lento (factor > 1)
    // Elementos a la derecha: más rápido (factor < 1)
    const distanceFromCenter = Math.abs(projectCenter - viewportCenter);
    const maxDistance = viewportCenter;
    const speedFactor = 1 + (distanceFromCenter / maxDistance) * 0.5;
    
    // Stagger personalizado: izquierda más lento
    const isLeftSide = projectCenter < viewportCenter;
    const customStagger = isLeftSide 
      ? baseStagger * speedFactor 
      : baseStagger * (1 / speedFactor);
    
    const delay = index * customStagger;

    gsap.fromTo(
      project,
      {
        opacity: 0,
        y: yOffset,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: project,
          start: start,
          toggleActions: 'play none none reverse',
          markers: false
        }
      }
    );
  });
};

/**
 * Inicializa animaciones para secciones de texto
 * @param {string} selector - Selector de los elementos de texto
 * @param {Object} options - Opciones de configuración
 */
export const initTextReveal = (selector, options = {}) => {
  const {
    yOffset = 60,
    duration = 1,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 90%'
  } = options;

  const elements = document.querySelectorAll(selector);

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: yOffset
    },
    {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: stagger,
      ease: ease,
      scrollTrigger: {
        trigger: elements[0]?.parentElement || elements[0],
        start: start,
        toggleActions: 'play none none reverse',
        markers: false
      }
    }
  );
};

/**
 * Limpia todas las instancias de ScrollTrigger
 * Útil para limpiar al desmontar componentes
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Refresca ScrollTrigger después de cambios en el DOM
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};
