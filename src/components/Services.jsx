import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Palette, Zap, Target } from 'lucide-react';

const services = [
  {
    number: '01',
    icon: Sparkles,
    title: "Brand Architecture",
    subtitle: "Cult brands, not corporate identities",
    description: "We architect brand ecosystems that command attention. No logos. No fluff. Just systems that build unshakeable loyalty.",
    deliverables: [
      "Build brands that stand out in crowded markets",
      "Visual systems that scale across all touchpoints",
      "Brand stories that turn customers into advocates",
      "Establish **market leadership** through distinctive identity"
    ],
    industries: "Spirits, Wine, Luxury, Hospitality"
  },
  {
    number: '02',
    icon: Palette,
    title: "Product Design",
    subtitle: "Products that define categories",
    description: "From concept to shelf. We engineer experiences that capture attention and drive sales. Beautiful? Yes. Functional? Always.",
    deliverables: [
      "Launch products that create **new market categories**",
      "Packaging that commands **premium pricing**",
      "Product lines that tell cohesive brand stories",
      "Aesthetics and function in perfect balance"
    ],
    industries: "Spirits, Wine, Beverages, Consumer Goods"
  },
  {
    number: '03',
    icon: Zap,
    title: "Innovation Strategy",
    subtitle: "Ideas become market-dominating products",
    description: "We bridge vision and reality. Our framework transforms bold ideas into tangible products that capture market value.",
    deliverables: [
      "Identify and capitalize on untapped opportunities",
      "Products that solve real consumer problems",
      "Innovation pipelines that drive **sustained growth**",
      "Product portfolios that maximize **market share**"
    ],
    industries: "FMCG, Spirits, Technology, Retail"
  },
  {
    number: '04',
    icon: Target,
    title: "Brand Positioning",
    subtitle: "Own your category before competitors do",
    description: "In a world of noise, positioning is everything. We craft strategies that cut through clutter and establish your brand as the definitive choice.",
    deliverables: [
      "Clear **market differentiation**",
      "**Premium pricing** through strategic positioning",
      "Brand equity that compounds over time",
      "Messaging that converts prospects into customers"
    ],
    industries: "All Industries, B2B, B2C, Luxury"
  }
];

export default function Services() {
  return (
    <section id="services" className="services-section-restructured">
      <div className="services-container-restructured">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="services-header-restructured"
        >
          <h2 className="services-title-restructured">What We Do</h2>
          <p className="services-subtitle-restructured">
            We transform brands into market leaders. Every project delivers measurable impact.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid-restructured">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="services-card-restructured"
              >
                {/* Number + Icon Header */}
                <div className="services-card-header-restructured">
                  <div className="services-number-icon-group">
                    <span className="services-number-restructured">{service.number}</span>
                    <div className="services-icon-wrapper-restructured">
                      <IconComponent className="services-icon-restructured" size={24} />
                    </div>
                  </div>
                </div>
                
                {/* Title - Short & Aggressive */}
                <h3 className="services-card-title-restructured">{service.title}</h3>
                
                {/* Subtitle - One Line */}
                <p className="services-card-subtitle-restructured">{service.subtitle}</p>
                
                {/* Description - Max 2-3 Lines */}
                <p className="services-card-description-restructured">{service.description}</p>
                
                {/* Deliverables - Bullet Points with Strategic Bolds */}
                <ul className="services-deliverables-restructured">
                  {service.deliverables.map((item, itemIndex) => {
                    // Parse bold text (wrapped in **)
                    const parts = item.split(/(\*\*.*?\*\*)/g);
                    return (
                      <li key={itemIndex} className="services-deliverable-item-restructured">
                        <span className="services-deliverable-check">✓</span>
                        <span className="services-deliverable-text">
                          {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              const boldText = part.slice(2, -2);
                              return <strong key={partIndex} className="services-deliverable-bold">{boldText}</strong>;
                            }
                            return <span key={partIndex}>{part}</span>;
                          })}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                
                {/* Industries - Minimal Footer */}
                <div className="services-industries-restructured">
                  <span className="services-industries-text">{service.industries}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="services-cta-restructured"
        >
          <div className="services-cta-content-restructured">
            <h3 className="services-cta-title-restructured">Ready to Transform Your Brand?</h3>
            <p className="services-cta-description-restructured">
              Let's discuss how we can help you dominate your category.
            </p>
            <div className="services-cta-buttons-restructured">
              <motion.a
                href="#contact"
                className="services-cta-primary-restructured"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#projects"
                className="services-cta-secondary-restructured"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
