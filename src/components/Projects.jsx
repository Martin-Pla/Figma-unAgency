import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Projects data from Figma Make
const projects = [
  {
    id: "1",
    title: "AARON MAIER",
    subtitle: "Chef",
    category: "Visual Identity",
    image: "/assets/aaron/aron-maier-04.png",
    layout: "immersive",
    description: "The Visionary: Aaron Maier. The Roots: Monterrey to Mexico City.\n\nThe Expertise: Mexican Institute of Gastronomy alumnus with a trajectory through the city's most influential kitchens.\n\nThe Project: Comprehensive branding, identity system, and editorial stationery for La Sazón.",
    year: "2025",
    services: ["Brand Identity", "Editorial Stationery", "Identity System"],
    artDirection: "Luis Esquivel",
    gallery: [
      "/assets/aaron/aron-maier-01.png",
      "/assets/aaron/aron-maier-03.png",
      "/assets/aaron/aron-maier-05.png",
      "/assets/aaron/aron-maier-06.png"
    ],
    bottomImage: "/assets/aaron/aron-maier-04.png",
    quote: "A trajectory through the city's most influential kitchens.",
  },
  {
    id: "2",
    title: "GALLUS",
    subtitle: "Islay Single Malt Scotch Whisky",
    category: "Spirits Packaging",
    image: "/assets/img-gallus.png",
    layout: "immersive",
    description: "Gallus is a whisky born from Scotland's cheeky and daring character, inspired by the colloquial word that means bold, mischievous, and full of life. More than a drink, it embodies a playful spirit rooted in Scotland's tradition of magical and fantastic stories. Each bottle captures that irreverent and charming essence, delivering a flavor that dares to be different: bold, mysterious, and full of character. Gallus is not just a whisky, it's an invitation to live with audacity—spiced with humor and a touch of magic in every sip.",
    year: "2023",
    services: ["Visual Identity", "Packaging", "Art Direction"],
    gallery: [
      "/assets/gallus/gallus-1.png",
      "/assets/gallus/gallus-2.png",
      "/assets/gallus/gallus-3.png",
      "/assets/gallus/gallus-4.png"
    ],
    bottomImage: "/assets/gallus/gallus-5.png",
  },
  {
    id: "3",
    title: "CASAREY",
    subtitle: "Tequila Gran Reserva",
    category: "Spirits Packaging",
    image: "/assets/img-casarey.png",
    layout: "immersive",
    description: "Casa Rey Tequila Gran Reserva is more than an aged spirit; it is a tribute to a family, its roots, and the tradition that forges character. Each drop carries the strength of those who came before and the promise of those who will continue.\n\nCarefully matured in French oak barrels, this tequila offers deep complexity and a lingering finish—much like the memory of those we honor.",
    year: "2024",
    services: ["Packaging Design", "Branding"],
    gallery: [
      "/assets/casarey/Casa-Rey-Teuila-05.png",
      "/assets/casarey/Casa-Rey-Teuila-07.png",
      "/assets/casarey/Casa-Rey-Teuila-08.png",
      "/assets/casarey/Casa-Rey-Teuila-09.png"
    ],
    bottomImage: "/assets/casarey/Casa-Rey-Teuila-04.jpg",
    quote: "Each drop carries the strength of those who came before and the promise of those who will continue.",
  },
  {
    id: "4",
    title: "MARIELEN",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-marielen.png",
    layout: "carousel",
    description: "Redefining the Rioja classic through the lens of timeless minimalism. Designed for the luxury consumer, this identity prioritizes precision and material integrity, utilizing smooth cotton paper to convey a pure, high-prestige aesthetic.\n\nBreaking away from 'Dark Luxury,' the brand achieves luminous differentiation through a high-contrast palette of ivory and deep black. It commands the shelf with serene authority, stripped of all unnecessary ornamentation. The fusion of tradition and contemporary sobriety is embodied in a single blind-embossed line—a tactile detail for the connoisseur who values discipline over excess.\n\nOur wine label and bottle design expertise brings together traditional winemaking heritage with contemporary luxury aesthetics, creating packaging that speaks to discerning wine enthusiasts while maintaining the sophistication expected in premium wine markets.",
    year: "2023",
    services: ["Label Design", "Storytelling", "Art Direction"],
    gallery: [
      "/assets/marielen/marielen-1.png",
      "/assets/marielen/marielen-2.png",
      "/assets/marielen/marielen-3.png",
      "/assets/marielen/marielen-4.png"
    ],
    bottomImage: null,
    quote: "A sophisticated tribute to subtle perfection, positioning the brand as the new standard of clarity and extreme elegance.",
  },
  {
    id: "5",
    title: "SUHAR",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-suhar.png",
    layout: "cinematic",
    description: "Designed for the new generation of connoisseurs. This is where heritage meets vanguard aesthetics; a fusion of Rioja's soul with a sophisticated, light-driven minimalism. Suhar represents the Contemporary Edge.\n\nOur approach to wine label and bottle design combines innovative visual language with the rich traditions of winemaking, creating distinctive packaging that captures the essence of modern wine culture while honoring the craft's timeless elegance.",
    year: "2023",
    services: ["Packaging Design", "Naming"],
    gallery: [
      "/assets/suhar/suhar-2.png",
      "/assets/suhar/suhar-3.png"
    ],
    bottomImage: "/assets/suhar/suhar-4.png",
    quote: "A luminous, high-contrast statement for those who value absolute design clarity and modern sophistication.",
  },
  {
    id: "6",
    title: "WHAT THE FLOCK",
    subtitle: "Ready to Drink",
    category: "Beverage Packaging",
    image: "/assets/img-what-the-flock.png",
    layout: "immersive",
    description: "Disruptive, fun, and unapologetic. What The Flock is a new line of canned cocktails targeting a younger demographic. The visual identity relies on vibrant colors, quirky illustrations of birds in human clothing, and a tone of voice that doesn't take itself too seriously.",
    year: "2025",
    services: ["Visual Identity", "Packaging", "Social Media Content"],
    gallery: [
      "/assets/wtf/WTF-1.png",
      "/assets/wtf/WTF-2.png",
      "/assets/wtf/WTF-3.png",
      "/assets/wtf/WTF-4.png"
    ],
    bottomImage: "/assets/wtf/WTF-5.png",
    quote: "Disruptive, fun, and unapologetic.",
  },
  {
    id: "7",
    title: "AVE DE FUEGO",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-ave-de-fuego.png",
    layout: "cinematic",
    description: "Ave de Fuego is a tequila that embodies rebirth, strength, and tradition, inspired by the mythological firebird—the phoenix. Just as this legendary creature rises from its ashes, the brand represents the enduring spirit of Mexican craftsmanship, forged through fire and time. The design reflects the duality of elegance and power: a premium square bottle that conveys solidity, combined with warm amber tones that evoke flames and volcanic origins. Ave de Fuego pays tribute to both the ancestral roots of tequila and the sophistication of contemporary luxury, offering a drink that is as timeless as it is bold.",
    year: "2024",
    services: ["Packaging Design", "Bottle Design", "Brand Strategy"],
    gallery: [
      "/assets/ave-fuego/ave-fuego-1.png",
      "/assets/ave-fuego/ave-fuego-2.png"
    ],
    bottomImage: "/assets/ave-fuego/ave-fuego-3.png",
    quote: "The brand represents the enduring spirit of Mexican craftsmanship, forged through fire and time.",
  },
  {
    id: "13",
    title: "NUWA STONE",
    subtitle: null,
    category: "Branding & Visual Identity",
    image: "/assets/img-nuwa.png",
    layout: "gallery",
    description: "Nuwa Stone specializes in high-end architectural stone surfaces. The branding reflects the solidity and timeless beauty of natural stone. We created a modular identity system that can scale across various applications, from sample books to showroom signage.",
    year: "2024",
    services: ["Rebranding", "Web Design", "Collateral"],
    gallery: [],
    bottomImage: null,
    hidden: true,
  },
  {
    id: "8",
    title: "THREE BROTHERS GOLF",
    subtitle: null,
    category: "Branding & Visual Identity",
    image: "/assets/img-3bg.png",
    layout: "gallery",
    description: "A lifestyle brand for the modern golfer. Three Brothers Golf merges streetwear aesthetics with performance gear. The logo is a stylized crest that feels both heritage and contemporary.",
    year: "2024",
    services: ["Brand Identity", "Apparel Design", "Art Direction"],
    gallery: [],
    bottomImage: null,
    hidden: true,
  },
  {
    id: "9",
    title: "AKBAL",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-akbal.png",
    layout: "immersive",
    description: "Named after the Mayan sign for 'Night', Akbal is a tequila designed for evening sipping. The bottle is made of dark, smoky glass, and the label features constellation maps printed in phosphorescent ink, glowing faintly in low light.",
    year: "2023",
    services: ["Packaging Innovation", "Concept Development"],
    gallery: [
      "/assets/akbal/akbal-01.png",
      "/assets/akbal/akbal-02.png",
      "/assets/akbal/akbal-03.png",
      "/assets/akbal/akbal-04.png"
    ],
    bottomImage: "/assets/akbal/akbal-05.png",
    quote: "Glowing faintly in low light, like the night sky.",
  },
  {
    id: "10",
    title: "BLACK AGNES",
    subtitle: "Islay Single Malt Scotch Whisky",
    category: "Spirits Packaging",
    image: "/assets/img-black-agnes.png",
    layout: "immersive",
    description: "Inspired by the legend of Black Agnes, the defender of Dunbar Castle. This whisky is robust and unyielding. The packaging features heavy textured paper, wax seals, and illustrations reminiscent of medieval woodcuts.",
    year: "2022",
    services: ["Packaging Design", "Illustration"],
    gallery: [],
    bottomImage: null,
  },
  {
    id: "11",
    title: "TRES DIABLOS",
    subtitle: "Tequila",
    category: "Spirits Packaging",
    image: "/assets/img-tres-diablos.png",
    layout: "gallery",
    description: "Tres Diablos plays with the mischievous side of agave spirits. The branding uses bold typography and devilish iconography to create a playful yet premium look. Each expression (Blanco, Reposado, Añejo) features a different 'Diablo' character.",
    year: "2024",
    services: ["Character Design", "Packaging", "Merchandise"],
    gallery: [],
    bottomImage: null,
  },
  {
    id: "15",
    title: "GUACHIMONTONES",
    subtitle: "Cultural Heritage",
    category: "Visual Identity",
    image: "/assets/guachimontones/Guachimontones-01.png",
    layout: "carousel",
    description: "The Heritage: Guachimontones represents the legacy of an ancient prehistoric settlement in Teuchitlán, located an hour outside Guadalajara. Its ceremonial epicenter is defined by a singular architectural language—a series of distinct, circular staggered structures that stand as a testament to ancestral ingenuity.\n\nThe Creative Challenge: The objective was to engineer a new logotype that served as a direct conduit to this unique architectural style. The mission required a delicate balance: rescuing the core values of the site's historical identity—specifically the iconic circular geometry—while building a modern visual foundation for a broader system.\n\nDesign & Identity Scope: Comprehensive Visual Identity System, including bespoke Stationery, Signage, Marketing Collateral, and Premium Packaging.",
    year: "2025",
    services: ["Visual Identity System", "Signage", "Editorial Design"],
    gallery: [
      "/assets/guachimontones/Guachimontones-03.png",
      "/assets/guachimontones/Guachimontones-04.png",
      "/assets/guachimontones/Guachimontones-05.png",
      "/assets/guachimontones/Guachimontones-06.png",
      "/assets/guachimontones/Guachimontones-07.png",
      "/assets/guachimontones/Guachimontones-08.png",
      "/assets/guachimontones/Guachimontones-09.png",
      "/assets/guachimontones/Guachimontones-10.png",
      "/assets/guachimontones/Guachimontones-11.png"
    ],
    bottomImage: "/assets/guachimontones/Guachimontones-01.png",
    quote: "A singular architectural language that stands as a testament to ancestral ingenuity.",
    artDirection: "Luis Esquivel",
  },
  {
    id: "12",
    title: "AGUA SALADA",
    subtitle: "Tequila Reposado",
    category: "Spirits Packaging",
    image: "/assets/img-agua-salada.png",
    layout: "immersive",
    description: "Agua Salada celebrates the coastal culture of Baja California. The tequila has a slight salinity from being aged in barrels exposed to the ocean breeze. The bottle uses recycled glass with a sea-glass texture, and the stopper is made of driftwood.",
    year: "2025",
    services: ["Sustainable Packaging", "Branding"],
    gallery: [],
    bottomImage: null,
  },
];

const getSpanClass = (index) => {
  const position = index % 6;
  
  if (position < 3) return "projects-span-2";
  if (position < 5) return "projects-span-3";
  return "projects-span-6";
};

const getAspectRatioClass = (index) => {
  const position = index % 6;
  if (position === 5) return "projects-aspect-wide";
  return "projects-aspect-normal";
};

// Función para generar atributos alt descriptivos y bilingües
const generateAltText = (project) => {
  const { title, subtitle, category } = project;
  
  // Mapeo de categorías a español
  const categoryMap = {
    "Visual Identity": "Identidad Visual",
    "Spirits Packaging": "Embalaje de Bebidas Espirituosas",
    "Beverage Packaging": "Embalaje de Bebidas",
    "Branding & Visual Identity": "Branding e Identidad Visual"
  };
  
  const categoryES = categoryMap[category] || category;
  
  // Construir el alt text bilingüe con formato descriptivo
  let altText = `${title}`;
  
  if (subtitle) {
    altText += ` - ${subtitle}`;
  }
  
  // Añadir descripción específica según la categoría
  if (category.includes("Spirits Packaging")) {
    altText += ` - Luxury Tequila/Whisky Packaging Design / Diseño de Embalaje de Lujo para Bebidas Espirituosas`;
  } else if (category.includes("Beverage Packaging")) {
    altText += ` - Beverage Packaging Design / Diseño de Embalaje de Bebidas`;
  } else if (category.includes("Visual Identity") || category.includes("Branding")) {
    altText += ` - ${category} Design / Diseño de ${categoryES}`;
  } else {
    altText += ` - ${category} / ${categoryES}`;
  }
  
  return altText;
};

export default function Projects({ onProjectSelect }) {
  const [showAll, setShowAll] = useState(false);
  // Filtrar proyectos ocultos
  const visibleProjectsList = projects.filter(project => !project.hidden);
  const visibleProjects = showAll ? visibleProjectsList : visibleProjectsList.slice(0, 5);

  return (
    <section id="projects" className="projects-section-updated">
      <div className="projects-container">
        <motion.div 
          className="projects-header-updated"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="projects-title-updated">PROJECTS</h2>
        </motion.div>

        <motion.div 
          layout
          className="projects-grid-updated"
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index < 5 ? index * 0.1 : 0 }}
                className={`projects-item ${getSpanClass(index)}`}
              >
                <div 
                  onClick={() => onProjectSelect && onProjectSelect(project)}
                  className={`projects-image-container ${getAspectRatioClass(index)}`}
                >
                  <div className="projects-image-bg" />
                  <motion.img
                    style={{ scale: project.id === "6" || project.id === "12" ? 1.1 : 1 }}
                    whileHover={{ scale: project.id === "6" || project.id === "12" ? 1.15 : 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={project.image}
                    alt={generateAltText(project)}
                    loading="lazy"
                    className="projects-image"
                  />
                  <div className="projects-overlay" />
                  
                  {/* Overlay Text on Hover */}
                  <div className="projects-hover-icon">
                    <div className="projects-icon-bg">
                      <span className="projects-icon" style={{ fontSize: '14px', fontFamily: 'Space Mono, monospace' }}>↗</span>
                    </div>
                  </div>
                </div>
                
                <div className="projects-info">
                  <div className="projects-info-left">
                    <h3 
                      onClick={() => onProjectSelect && onProjectSelect(project)}
                      className="projects-info-title"
                    >
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="projects-info-subtitle">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="projects-info-category">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {visibleProjectsList.length > 5 && (
          <motion.div 
            className="projects-button-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={() => setShowAll(!showAll)}
              className="projects-view-all-button"
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
