import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Projects data from Figma Make
const projects = [
  {
    id: "1",
    title: "AVE DE FUEGO",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-ave-de-fuego.png",
    layout: "editorial",
    description: "Ave de Fuego is a tequila that embodies rebirth, strength, and tradition, inspired by the mythological firebird—the phoenix. Just as this legendary creature rises from its ashes, the brand represents the enduring spirit of Mexican craftsmanship, forged through fire and time. The design reflects the duality of elegance and power: a premium square bottle that conveys solidity, combined with warm amber tones that evoke flames and volcanic origins.",
    year: "2024",
    services: ["Packaging Design", "Bottle Design", "Brand Strategy"],
    gallery: [
      "/assets/ave-fuego/ave-fuego-1.png",
      "/assets/ave-fuego/ave-fuego-2.png",
      "/assets/ave-fuego/ave-fuego-3.png"
    ],
    bottomImage: "/assets/ave-fuego/ave-fuego-3.png",
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
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-casarey.png",
    layout: "editorial",
    description: "Casarey embodies the regal heritage of the highlands of Jalisco. The design focuses on elegance and sophistication, utilizing deep royal blues and gold foil accents.",
    year: "2024",
    services: ["Packaging Design", "Branding"],
    gallery: [],
    bottomImage: null,
  },
  {
    id: "4",
    title: "MARIELEN",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-marielen.png",
    layout: "editorial",
    description: "A modern take on classic Rioja wine. Marielen's label design tells the story of the vineyard's matriarch through abstract watercolor illustrations mixed with serif typography.",
    year: "2023",
    services: ["Label Design", "Storytelling"],
    gallery: [],
    bottomImage: null,
  },
  {
    id: "5",
    title: "SUHAR",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-suhar.png",
    layout: "editorial",
    description: "Suhar represents the fiery spirit of the Basque country. The branding utilizes charred wood textures and bold red accents to convey the intensity of the wine.",
    year: "2023",
    services: ["Packaging Design", "Naming"],
    gallery: [],
    bottomImage: null,
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
    gallery: [],
    bottomImage: null,
  },
  {
    id: "7",
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
  },
  {
    id: "9",
    title: "AKBAL",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-akbal.png",
    layout: "editorial",
    description: "Named after the Mayan sign for 'Night', Akbal is a tequila designed for evening sipping. The bottle is made of dark, smoky glass, and the label features constellation maps printed in phosphorescent ink, glowing faintly in low light.",
    year: "2023",
    services: ["Packaging Innovation", "Concept Development"],
    gallery: [],
    bottomImage: null,
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

export default function Projects({ onProjectSelect }) {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <section id="projects" className="projects-section-updated">
      <div className="projects-container">
        <div className="projects-header-updated">
          <h2 className="projects-title-updated">PROJECTS</h2>
        </div>

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
                    alt={project.title}
                    className="projects-image"
                  />
                  <div className="projects-overlay" />
                  
                  {/* Overlay Text on Hover */}
                  <div className="projects-hover-icon">
                    <div className="projects-icon-bg">
                      <ArrowUpRight className="projects-icon" />
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
        
        {projects.length > 5 && (
          <div className="projects-button-container">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="projects-view-all-button"
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
