import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Palette, Zap, Target, TrendingUp, Users, Layers } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: "Brand Architecture & Design",
    subtitle: "Transform Your Identity Into a Cult Brand",
    description: "We don't just design logos—we architect brand ecosystems that command attention and build unshakeable loyalty. Our boutique approach transforms corporate identities into cultural movements, creating emotional connections that turn customers into advocates.",
    benefits: [
      "Build a brand that stands out in crowded markets",
      "Create visual systems that scale across all touchpoints",
      "Develop brand stories that resonate deeply with your audience",
      "Establish market leadership through distinctive identity"
    ],
    industries: "Spirits, Wine, Luxury Goods, Hospitality",
    color: "#ffffff"
  },
  {
    icon: Palette,
    title: "Product Design & Packaging",
    subtitle: "Design Products That Define Categories",
    description: "From concept to shelf, we engineer product experiences that capture attention and drive sales. Our strategic design approach combines market intelligence with creative innovation, delivering packaging and product designs that don't just look beautiful—they perform.",
    benefits: [
      "Launch products that create new market categories",
      "Design packaging that commands premium pricing",
      "Develop product lines that tell cohesive brand stories",
      "Optimize for both aesthetics and functional excellence"
    ],
    industries: "Spirits, Wine, Beverages, Consumer Goods",
    color: "#ffffff"
  },
  {
    icon: Zap,
    title: "Innovation Strategy & NPD",
    subtitle: "Turn Ideas Into Market-Dominating Products",
    description: "We bridge the gap between vision and reality. Our innovation framework transforms bold ideas into tangible products that capture market value. We don't just design—we engineer competitive advantages through strategic product development.",
    benefits: [
      "Identify and capitalize on untapped market opportunities",
      "Develop products that solve real consumer problems",
      "Create innovation pipelines that drive sustained growth",
      "Build product portfolios that maximize market share"
    ],
    industries: "FMCG, Spirits, Technology, Retail",
    color: "#ffffff"
  },
  {
    icon: Target,
    title: "Strategic Brand Positioning",
    subtitle: "Own Your Category Before Your Competitors Do",
    description: "In a world of noise, positioning is everything. We craft brand strategies that cut through the clutter and establish your brand as the definitive choice in your category. Our data-driven approach ensures every decision is backed by market intelligence.",
    benefits: [
      "Establish clear market differentiation",
      "Command premium pricing through strategic positioning",
      "Build brand equity that compounds over time",
      "Create messaging that converts prospects into customers"
    ],
    industries: "All Industries, B2B, B2C, Luxury",
    color: "#ffffff"
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="services-section-new">
      <div className="services-container-new">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="services-header-new"
        >
          <h2 className="services-title-new">What We Do</h2>
          <p className="services-subtitle-new">
            We transform brands into market leaders. Every project is engineered to deliver measurable impact, 
            from category-defining product launches to brand transformations that reshape industries.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid-new">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="services-card-new"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="services-card-header">
                  <div className="services-icon-wrapper">
                    <IconComponent className="services-icon" size={32} />
                  </div>
                  <div className="services-card-number">0{index + 1}</div>
                </div>
                
                <h3 className="services-card-title">{service.title}</h3>
                <p className="services-card-subtitle">{service.subtitle}</p>
                <p className="services-card-description">{service.description}</p>
                
                <div className="services-benefits">
                  <h4 className="services-benefits-title">You'll Get:</h4>
                  <ul className="services-benefits-list">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="services-benefit-item">
                        <span className="services-benefit-check">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="services-industries">
                  <span className="services-industries-label">Industries:</span>
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
          className="services-cta-new"
        >
          <div className="services-cta-content">
            <h3 className="services-cta-title">Ready to Transform Your Brand?</h3>
            <p className="services-cta-description">
              Let's discuss how we can help you dominate your category. 
              Every great brand starts with a conversation.
            </p>
            <div className="services-cta-buttons">
              <motion.a
                href="#contact"
                className="services-cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#projects"
                className="services-cta-secondary"
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
