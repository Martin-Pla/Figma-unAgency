import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    category: "Strategy & Data Intelligence",
    description: "Focus on Qual & Quant Research and Insights. Our strategic approach combines qualitative depth with quantitative precision to deliver actionable intelligence that drives decision-making.",
    services: [
      "Qualitative Research & Insights",
      "Quantitative Data Analysis",
      "Market Intelligence & Trends",
      "Consumer Behavior Analytics"
    ]
  },
  {
    category: "Brand Architecture & Design",
    description: "Reinvención de marcas y Cult Branding. Especialistas en Branding Boutique que transforman identidades corporativas en cultos de marca. Creamos sistemas de identidad que conectan emocionalmente y construyen lealtad duradera. Strategic branding for the Spirits industry, from Tequila in Jalisco to Bourbon in Kentucky. Especialistas en branding y packaging para la industria del vino y destilados de alta gama, desde el Valle de Guadalupe hasta los mercados globales.",
    services: [
      "Brand Reinvention & Transformation",
      "Cult Brand Development",
      "Visual Identity Systems",
      "Brand Strategy & Positioning"
    ]
  },
  {
    category: "Ideation & JTBD",
    description: "Resolver necesidades reales del consumidor. Aplicamos el framework Jobs-to-be-Done para identificar y satisfacer las necesidades fundamentales del mercado, creando soluciones que los consumidores realmente quieren.",
    services: [
      "Jobs-to-be-Done Framework",
      "Consumer Needs Analysis",
      "Concept Development",
      "Product-Market Fit Strategy"
    ]
  },
  {
    category: "Innovation & NPD (New Product Development)",
    description: "Especialistas en Diseño de Producto y segmentación de categorías. Nuestro enfoque de Strategic Innovation transforma ideas en productos tangibles que definen nuevas categorías y capturan valor de mercado.",
    services: [
      "New Product Development",
      "Category Segmentation & Strategy",
      "Product Design & Engineering",
      "Innovation Pipeline Development"
    ]
  },
  {
    category: "High-Impact Advertising",
    description: "Film, Broadcast y PR Estratégico. Creamos campañas publicitarias de alto impacto que trascienden los medios tradicionales, combinando narrativa cinematográfica con estrategia de comunicación estratégica.",
    services: [
      "Film Production & Direction",
      "Broadcast Advertising",
      "Strategic PR & Communications",
      "Integrated Campaign Development"
    ]
  },
  {
    category: "Content & Experience",
    description: "Digital Strategy y Experiential Marketing. Combinamos Strategic Innovation con experiencias inmersivas que conectan marcas con audiencias en el punto exacto donde la estrategia digital encuentra la emoción humana.",
    services: [
      "Digital Strategy & Planning",
      "Experiential Marketing",
      "Content Strategy & Creation",
      "Omnichannel Experience Design"
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="services-main-title"
        >
          SERVICES
        </motion.h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="services-category"
            >
              <h2 className="services-category-title">
                {['I', 'II', 'III', 'IV', 'V', 'VI'][index]}. {service.category}
              </h2>
              <p className="services-category-description">
                {service.description}
              </p>
              <ul className="services-list">
                {service.services.map((item, itemIndex) => (
                  <li key={itemIndex} className="services-item">
                    <h3 className="services-item-title">{item}</h3>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
