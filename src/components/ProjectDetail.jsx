import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';
import { generateProjectSlug } from './Projects';

const ProjectHeader = ({ project }) => (
  <div className="project-detail-header">
    <motion.span 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="project-detail-meta"
    >
      {project.category} — {project.year || '2024'}
    </motion.span>
    <motion.h1 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="project-detail-title"
    >
      {project.title}
    </motion.h1>
    {project.subtitle && (
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="project-detail-subtitle"
      >
        {project.subtitle}
      </motion.p>
    )}
  </div>
);

const ProjectInfo = ({ project }) => (
  <div className="project-detail-info">
    <div className="project-detail-info-section">
      <h3 className="project-detail-info-label">Description</h3>
      <p className="project-detail-description">
        {project.description || 'A premium project showcasing exceptional design and craftsmanship.'}
      </p>
    </div>
    {project.services && project.services.length > 0 && (
      <div className="project-detail-info-section">
        <h3 className="project-detail-info-label">Services</h3>
        <ul className="project-detail-services">
          {project.services.map((service, i) => (
            <li key={i} className="project-detail-service-tag">
              {service}
            </li>
          ))}
        </ul>
      </div>
    )}
    {project.artDirection && (
      <div className="project-detail-info-section">
        <h3 className="project-detail-info-label">Credits</h3>
        <p className="project-detail-description" style={{ whiteSpace: 'pre-line' }}>
          {project.credits || `Lead Designer: ${project.artDirection}\nAgency: The unAgency Co.`}
        </p>
      </div>
    )}
  </div>
);

const EditorialLayout = ({ project }) => {
  const gallery = project.gallery || [];

  return (
    <div>
      <ProjectHeader project={project} />
      <div className="project-detail-content">
        <div className="project-detail-grid">
          <div className="project-detail-sidebar">
            <ProjectInfo project={project} />
          </div>
          <div className="project-detail-main">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-detail-main-image" 
            />
            {gallery.length > 0 && (
              <div className="project-detail-gallery-grid">
                {gallery.slice(0, 2).map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`Detail ${index + 1}`} 
                    className="project-detail-gallery-image" 
                  />
                ))}
              </div>
            )}
            {project.bottomImage && (
              <img 
                src={project.bottomImage} 
                alt="Detail" 
                className="project-detail-bottom-image" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryLayout = ({ project }) => {
  return (
    <div>
      <div className="project-detail-gallery-header">
        <span className="project-detail-meta">{project.category}</span>
        <h1 className="project-detail-gallery-title">{project.title}</h1>
        <p className="project-detail-gallery-description">{project.description || ''}</p>
      </div>
      
      <div className="project-detail-gallery-container">
        <div className="project-detail-masonry">
          <div className="project-detail-masonry-item">
            <img src={project.image} alt={project.title} className="project-detail-masonry-image" />
          </div>
          <div className="project-detail-masonry-placeholder">
            <p className="project-detail-masonry-text">Process &<br/>Development</p>
          </div>
          <div className="project-detail-masonry-item">
            <img src={project.image} alt="Detail" className="project-detail-masonry-image project-detail-masonry-image-grayscale" />
          </div>
          <div className="project-detail-masonry-year">
            <span className="project-detail-year-text">{project.year || '2024'}</span>
          </div>
          <div className="project-detail-masonry-item">
            <img src={project.image} alt="Detail" className="project-detail-masonry-image" />
          </div>
          <div className="project-detail-masonry-info">
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImmersiveLayout = ({ project }) => {
  return (
    <div>
      <div className="project-detail-immersive-hero">
        <img src={project.image} alt={project.title} className="project-detail-immersive-bg" />
        <div className="project-detail-immersive-overlay" />
        <div className="project-detail-immersive-content">
          <h1 className="project-detail-immersive-title">{project.title}</h1>
          <div className="project-detail-immersive-meta">
            <span>{project.category}</span>
            <span>{project.year || '2024'}</span>
          </div>
        </div>
      </div>

      <div className="project-detail-immersive-quote">
        <div className="project-detail-quote-text">
          {project.quote ? `"${project.quote}"` : '"We approached this project with a mindset of stripping away the non-essential, focusing purely on the material and the form."'}
        </div>
        <div className="project-detail-quote-info">
          <ProjectInfo project={project} />
        </div>
      </div>

      {project.bottomImage && (
        <div className="project-detail-immersive-bottom">
          <img src={project.bottomImage} alt="Detail" className="project-detail-immersive-bottom-img" />
        </div>
      )}
      
      <div className="project-detail-immersive-grid">
        {project.gallery && project.gallery.length > 0 ? (
          <>
            {project.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="project-detail-immersive-grid-item">
                <img src={img} alt={`Gallery ${i}`} className="project-detail-immersive-grid-image" />
              </div>
            ))}
            {[...Array(Math.max(0, 4 - project.gallery.length))].map((_, i) => (
              <div key={`empty-${i}`} className="project-detail-immersive-grid-placeholder">
                <span className="project-detail-grid-number">0{(project.gallery?.length || 0) + i + 1}</span>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="project-detail-immersive-grid-placeholder">
              <span className="project-detail-grid-number">01</span>
            </div>
            <div className="project-detail-immersive-grid-placeholder">
              <span className="project-detail-grid-number">02</span>
            </div>
            <div className="project-detail-immersive-grid-placeholder">
              <span className="project-detail-grid-number">03</span>
            </div>
            <div className="project-detail-immersive-grid-placeholder">
              <span className="project-detail-grid-number">04</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CinematicLayout = ({ project }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="project-detail-cinematic-hero">
        <img src={project.image} alt={project.title} className="project-detail-cinematic-bg" />
        <div className="project-detail-cinematic-overlay" />
        <div className="project-detail-cinematic-content">
          <div className="project-detail-cinematic-header">
            <span className="project-detail-cinematic-meta">
              {project.category} — {project.year || '2024'}
            </span>
            <h1 className="project-detail-cinematic-title">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="project-detail-cinematic-subtitle">{project.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="project-detail-cinematic-content-section">
        <div className="project-detail-cinematic-content-grid">
          <div className="project-detail-cinematic-quote-wrapper">
            <div className="project-detail-cinematic-quote-text">
              {project.quote ? `"${project.quote}"` : '"The essence of the spirit captured in glass."'}
            </div>
          </div>
          <div className="project-detail-cinematic-info-wrapper">
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>

      {/* Large Visuals Grid */}
      <div className="project-detail-cinematic-gallery-grid">
        {project.gallery && project.gallery[0] && (
          <div className="project-detail-cinematic-gallery-item">
            <img 
              src={project.gallery[0]} 
              alt="Gallery 1" 
              className="project-detail-cinematic-gallery-image" 
            />
          </div>
        )}
        {project.gallery && project.gallery[1] && (
          <div className="project-detail-cinematic-gallery-item">
            <img 
              src={project.gallery[1]} 
              alt="Gallery 2" 
              className="project-detail-cinematic-gallery-image" 
            />
          </div>
        )}
      </div>

      {/* Bottom Full Width */}
      {project.bottomImage && (
        <div className="project-detail-cinematic-bottom">
          <img src={project.bottomImage} alt="Mood" className="project-detail-cinematic-bottom-img" />
          <div className="project-detail-cinematic-bottom-overlay">
            <div className="project-detail-cinematic-bottom-badge">
              <span className="project-detail-cinematic-bottom-text">Est. {project.year || '2024'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CarouselLayout = ({ project }) => {
  return (
    <div>
      {/* Hero Section - Cinematic Style */}
      <div className="project-detail-cinematic-hero">
        <img src={project.image} alt={project.title} className="project-detail-cinematic-bg" />
        <div className="project-detail-cinematic-overlay" />
        <div className="project-detail-cinematic-content">
          <div className="project-detail-cinematic-header">
            <span className="project-detail-cinematic-meta">
              {project.category} — {project.year || '2024'}
            </span>
            <h1 className="project-detail-cinematic-title">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="project-detail-cinematic-subtitle">{project.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="project-detail-cinematic-content-section">
        <div className="project-detail-cinematic-content-grid">
          <div className="project-detail-cinematic-quote-wrapper">
            <div className="project-detail-cinematic-quote-text">
              {project.quote ? `"${project.quote}"` : '"A story told through texture, color, and form."'}
            </div>
          </div>
          <div className="project-detail-cinematic-info-wrapper">
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="project-detail-carousel-section">
        <h3 className="project-detail-carousel-label">Project Gallery</h3>
        <div className="project-detail-carousel-container">
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery.map((img, i) => (
              <div key={i} className="project-detail-carousel-item">
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`} 
                  className="project-detail-carousel-image" 
                />
                <div className="project-detail-carousel-overlay">
                  <span className="project-detail-carousel-number">View 0{i + 1}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="project-detail-carousel-item project-detail-carousel-placeholder">
              <span>No images available</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Full Width */}
      {project.bottomImage && (
        <div className="project-detail-cinematic-bottom">
          <img src={project.bottomImage} alt="Mood" className="project-detail-cinematic-bottom-img" />
        </div>
      )}
    </div>
  );
};

export default function ProjectDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate SEO meta tags for the project
  const projectTitle = `${project.title}${project.subtitle ? ` - ${project.subtitle}` : ''} | The unAgency`;
  const projectDescription = project.description 
    ? `${project.description.substring(0, 155)}...` 
    : `Explore ${project.title} project by The unAgency. ${project.category} design and branding.`;
  const projectImage = project.image.startsWith('http') 
    ? project.image 
    : `https://theunagency.com${project.image}`;
  const projectSlug = generateProjectSlug(project.title);
  const projectUrl = `https://theunagency.com/project/${projectSlug}`;

  const renderLayout = () => {
    switch (project.layout) {
      case 'editorial':
        return <EditorialLayout project={project} />;
      case 'gallery':
        return <GalleryLayout project={project} />;
      case 'immersive':
        return <ImmersiveLayout project={project} />;
      case 'cinematic':
        return <CinematicLayout project={project} />;
      case 'carousel':
        return <CarouselLayout project={project} />;
      default:
        return <EditorialLayout project={project} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-detail-container"
    >
      <SEO
        title={projectTitle}
        description={projectDescription}
        keywords={`${project.title}, ${project.category}, ${project.services?.join(', ') || ''}, The unAgency, product design, brand architecture`}
        image={projectImage}
        url={projectUrl}
        type="article"
      />
      <button
        onClick={onBack}
        className="project-detail-back-button"
      >
        <span className="project-detail-back-icon" style={{ fontSize: '14px', fontFamily: 'Space Mono, monospace', marginRight: '8px' }}>←</span>
        Back
      </button>

      {renderLayout()}

      {/* Footer */}
      <div className="project-detail-footer">
        <p className="project-detail-footer-label">End of Project</p>
        <h3 className="project-detail-footer-title">{project.title}</h3>
      </div>
    </motion.div>
  );
}
