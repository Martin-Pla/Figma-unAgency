// Traducciones para el sitio
export const translations = {
  en: {
    // Navigation
    menu: "Menu",
    close: "Close",
    projects: "Projects",
    about: "About",
    services: "Services",
    contact: "Contact",
    
    // Hero
    heroTagline: "Where creativity meets strategy.",
    heroTaglineBold: "rewrite",
    heroTaglineSecond: "We don't follow the rules—we <strong>rewrite</strong> them.",
    heroCta: "Start a Project",
    scroll: "SCROLL",
    
    // Projects
    projects: "PROJECTS",
    viewAll: "View All Projects",
    showLess: "Show Less",
    
    // About
    about: "ABOUT",
    aboutManifesto: "We are the <em>glitch</em> in the agency model. A collective of rogue creatives obsessed with the absolute.",
    aboutText1: "Traditional agencies sell time and bloated processes. We sell impact. We have surgically removed the account managers, the endless meetings, and the layers of middle-management that dilute vision.",
    aboutText2: "What remains is pure potency. Direct access to elite talent. Radical transparency. Relentless execution. We don't just build digital products; we engineer market dominance.",
    service1: "Visceral Strategy",
    service2: "Radical Design",
    service3: "Kinetic Dev",
    service4: "Total Impact",
    trustedBy: "Trusted By",
    
    // Services
    servicesTitle: "What We Do",
    servicesSubtitle: "We transform brands into market leaders. Every project delivers measurable impact.",
    
    // Contact
    contactTitle: "LET'S TALK",
    namePlaceholder: "NAME",
    emailPlaceholder: "EMAIL",
    messagePlaceholder: "MESSAGE",
    sendInquiry: "Send Inquiry",
    sending: "Sending...",
    locations: "Locations",
    email: "Email",
    successMessage: "Message sent successfully! We'll contact you soon.",
    errorMessage: "There was an error sending the message. Please try again.",
    
    // Footer
    copyright: "Copyright",
    instagram: "INSTAGRAM",
    linkedin: "LINKEDIN",
  },
  es: {
    // Navigation
    menu: "Menú",
    close: "Cerrar",
    projects: "Proyectos",
    about: "Nosotros",
    services: "Servicios",
    contact: "Contacto",
    
    // Hero
    heroTagline: "Donde la creatividad se encuentra con la estrategia.",
    heroTaglineBold: "reescribimos",
    heroTaglineSecond: "No seguimos las reglas—las <strong>reescribimos</strong>.",
    heroCta: "Iniciar un Proyecto",
    scroll: "DESPLAZAR",
    
    // Projects
    projects: "PROYECTOS",
    viewAll: "Ver Todos los Proyectos",
    showLess: "Mostrar Menos",
    
    // About
    about: "NOSOTROS",
    aboutManifesto: "Somos el <em>glitch</em> en el modelo de agencia. Un colectivo de creativos rebeldes obsesionados con lo absoluto.",
    aboutText1: "Las agencias tradicionales venden tiempo y procesos inflados. Nosotros vendemos impacto. Hemos eliminado quirúrgicamente a los gerentes de cuenta, las reuniones interminables y las capas de gerencia media que diluyen la visión.",
    aboutText2: "Lo que queda es potencia pura. Acceso directo a talento de élite. Transparencia radical. Ejecución implacable. No solo construimos productos digitales; diseñamos el dominio del mercado.",
    service1: "Estrategia Visceral",
    service2: "Diseño Radical",
    service3: "Desarrollo Cinético",
    service4: "Impacto Total",
    trustedBy: "Confían en Nosotros",
    
    // Services
    servicesTitle: "Qué Hacemos",
    servicesSubtitle: "Transformamos marcas en líderes de mercado. Cada proyecto entrega impacto medible.",
    
    // Contact
    contactTitle: "HABLEMOS",
    namePlaceholder: "NOMBRE",
    emailPlaceholder: "CORREO",
    messagePlaceholder: "MENSAJE",
    sendInquiry: "Enviar Consulta",
    sending: "Enviando...",
    locations: "Ubicaciones",
    email: "Correo",
    successMessage: "¡Mensaje enviado exitosamente! Te contactaremos pronto.",
    errorMessage: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
    
    // Footer
    copyright: "Copyright",
    instagram: "INSTAGRAM",
    linkedin: "LINKEDIN",
  }
};

// Función helper para obtener traducción con formato
export const getTranslation = (lang, key, replacements = {}) => {
  const text = translations[lang]?.[key] || translations.en[key] || key;
  
  // Reemplazar placeholders
  let result = text;
  Object.keys(replacements).forEach(placeholder => {
    result = result.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  
  return result;
};
