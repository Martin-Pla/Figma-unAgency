import { useEffect } from 'react';

const SchemaMarkup = () => {
  useEffect(() => {
    // JSON-LD Schema for ProfessionalService
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "The unAgency",
      "description": "Agencia de innovación y diseño de producto (NPD). Creamos marcas de culto y estrategias de mercado desde California hasta CDMX. Strategic design for high-impact brands.",
      "url": "https://theunagency.com",
      "logo": "https://theunagency.com/assets/logo-unagency.png",
      "image": "https://theunagency.com/assets/logo-unagency.png",
      "areaServed": [
        {
          "@type": "State",
          "name": "California",
          "addressRegion": "CA"
        },
        {
          "@type": "State",
          "name": "Arizona",
          "addressRegion": "AZ"
        },
        {
          "@type": "State",
          "name": "Nevada",
          "addressRegion": "NV"
        },
        {
          "@type": "State",
          "name": "Baja California",
          "addressRegion": "BC"
        },
        {
          "@type": "City",
          "name": "Ensenada",
          "addressRegion": "BC",
          "addressCountry": "MX"
        },
        {
          "@type": "Place",
          "name": "Valle de Guadalupe",
          "addressRegion": "BC",
          "addressCountry": "MX",
          "description": "Baja California Wine Region"
        },
        {
          "@type": "State",
          "name": "Jalisco",
          "addressRegion": "JAL"
        },
        {
          "@type": "City",
          "name": "Ciudad de Mexico",
          "addressRegion": "CDMX"
        },
        {
          "@type": "City",
          "name": "Louisville",
          "addressRegion": "KY",
          "addressCountry": "US"
        },
        {
          "@type": "City",
          "name": "Nashville",
          "addressRegion": "TN",
          "addressCountry": "US"
        },
        {
          "@type": "City",
          "name": "Austin",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        {
          "@type": "City",
          "name": "Seattle",
          "addressRegion": "WA",
          "addressCountry": "US"
        },
        {
          "@type": "City",
          "name": "Chicago",
          "addressRegion": "IL",
          "addressCountry": "US"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Product Design",
              "description": "New Product Development (NPD) and product design services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Architecture",
              "description": "Brand strategy, identity design, and brand architecture services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Innovation Strategy",
              "description": "Strategic innovation consulting and market strategy development"
            }
          }
        ]
      },
      "serviceType": [
        "Product Design",
        "Brand Architecture",
        "Innovation Strategy"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "ad.theunagency@gmail.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Diego",
        "addressRegion": "CA",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.instagram.com/theunagency",
        "https://www.linkedin.com/company/theunagency"
      ]
    };

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'schema-markup-professional-service';

    // Remove existing schema if present
    const existingScript = document.getElementById('schema-markup-professional-service');
    if (existingScript) {
      existingScript.remove();
    }

    // Append to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('schema-markup-professional-service');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SchemaMarkup;
