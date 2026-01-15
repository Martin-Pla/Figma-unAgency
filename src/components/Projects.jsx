import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Sample projects data - replace with your actual data
const projects = [
  {
    id: "1",
    title: "AVE DE FUEGO",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-ave-de-fuego.png",
  },
  {
    id: "2",
    title: "GALLUS",
    subtitle: "Islay Single Malt Scotch Whisky",
    category: "Spirits Packaging",
    image: "/assets/img-gallus.png",
  },
  {
    id: "3",
    title: "CASAREY",
    subtitle: "Tequila Extra Añejo",
    category: "Spirits Packaging",
    image: "/assets/img-casarey.png",
  },
  {
    id: "4",
    title: "MARIELEN",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-marielen.png",
  },
  {
    id: "5",
    title: "SUHAR",
    subtitle: "Rioja Crianza · Tempranillo",
    category: "Spirits Packaging",
    image: "/assets/img-suhar.png",
  },
  {
    id: "6",
    title: "WHAT THE FLOCK",
    subtitle: "Ready to Drink",
    category: "Beverage Packaging",
    image: "/assets/img-what-the-flock.png",
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
                    style={{ scale: project.id === "6" ? 1.1 : 1 }}
                    whileHover={{ scale: project.id === "6" ? 1.15 : 1.05 }}
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
        
        <div className="projects-button-container">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="projects-view-all-button"
          >
            {showAll ? "Show Less" : "View All Projects"}
          </button>
        </div>
      </div>
    </section>
  );
}
