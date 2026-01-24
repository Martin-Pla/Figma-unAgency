import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const locations = [
  { city: "San Diego", country: "USA", time: "PST" },
  { city: "Los Angeles", country: "USA", time: "PST" },
  { city: "Tijuana", country: "MX", time: "PST" },
  { city: "Valle de Guadalupe", country: "MX", time: "PST", region: "Ensenada (Baja California Wine Region)" },
  { city: "Guadalajara", country: "MX", time: "CST" },
  { city: "Ciudad de Mexico", country: "MX", time: "CST" },
  { city: "Louisville", country: "USA", time: "EST", state: "KY" },
  { city: "Nashville", country: "USA", time: "CST", state: "TN" },
  { city: "Austin", country: "USA", time: "CST", state: "TX" },
  { city: "Seattle", country: "USA", time: "PST", state: "WA" },
  { city: "Chicago", country: "USA", time: "CST", state: "IL" },
];

// Función para sanitizar inputs y prevenir XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Eliminar caracteres peligrosos y scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
};

// Validación de email estricta
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validación de longitud y caracteres permitidos
const validateInput = (value, fieldName) => {
  if (!value || typeof value !== 'string') return false;
  
  const sanitized = sanitizeInput(value);
  
  // Validaciones por campo
  switch (fieldName) {
    case 'name':
      return sanitized.length >= 2 && sanitized.length <= 100 && /^[a-zA-Z\s\-'áéíóúÁÉÍÓÚñÑüÜ]+$/.test(sanitized);
    case 'email':
      return validateEmail(sanitized);
    case 'message':
      return sanitized.length >= 10 && sanitized.length <= 2000;
    default:
      return false;
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    const newErrors = {};
    if (!validateInput(formData.name, 'name')) {
      newErrors.name = 'El nombre debe tener entre 2 y 100 caracteres y solo letras';
    }
    if (!validateInput(formData.email, 'email')) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    if (!validateInput(formData.message, 'message')) {
      newErrors.message = 'El mensaje debe tener entre 10 y 2000 caracteres';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Sanitizar todos los valores antes de enviar
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };
    
    const subject = `New Inquiry from ${sanitizedData.name}`;
    const body = `Name: ${sanitizedData.name}%0D%0AEmail: ${sanitizedData.email}%0D%0AMessage: ${sanitizedData.message}`;
    
    // Usar encodeURIComponent para mayor seguridad
    window.location.href = `mailto:ad.theunagency@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/%0D%0A/g, '\n'))}`;
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitizar en tiempo real
    const sanitized = sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitized
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  return (
    <footer
      id="contact"
      className="contact-section-updated"
    >
      <div className="contact-container-updated">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2 className="contact-title-updated">
            LET'S TALK
          </h2>

          <form onSubmit={handleSubmit} className="contact-form-updated" noValidate>
            <div className="contact-form-field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="NAME"
                required
                maxLength={100}
                pattern="[a-zA-Z\s\-'áéíóúÁÉÍÓÚñÑüÜ]{2,100}"
                className="contact-input"
                aria-label="Nombre"
              />
              {errors.name && (
                <span className="contact-error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="contact-form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                required
                maxLength={254}
                className="contact-input"
                aria-label="Email"
              />
              {errors.email && (
                <span className="contact-error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="contact-form-field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="MESSAGE"
                rows={1}
                required
                maxLength={2000}
                className="contact-textarea"
                aria-label="Mensaje"
              />
              {errors.message && (
                <span className="contact-error-message" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="contact-submit-button-updated"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              <ArrowRight className="contact-submit-icon" />
            </button>
          </form>
        </div>

        {/* Locations & Info */}
        <div className="contact-info-section">
          <div className="contact-info-content">
            <div className="contact-locations-section">
              <h3 className="contact-locations-title">
                Locations
              </h3>
              <ul className="contact-locations-list">
                {locations
                  .filter(loc => ['San Diego', 'Tijuana', 'Guadalajara'].includes(loc.city))
                  .sort((a, b) => {
                    const order = ['San Diego', 'Tijuana', 'Guadalajara'];
                    return order.indexOf(a.city) - order.indexOf(b.city);
                  })
                  .map((loc) => (
                    <li
                      key={loc.city}
                      className="contact-location-item"
                    >
                      <span className="contact-location-city">
                        {loc.city}
                      </span>
                      <div className="contact-location-details">
                        <span>{loc.country}</span>
                        <span>{loc.time}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

          </div>

          <div className="contact-footer-updated">
            {/* SEO-only text - hidden from users but visible to search engines */}
            <div className="seo-only" aria-hidden="true">
              <p>
                Boutique Design & Strategy Hub serving San Diego (California, USA), Tijuana (Baja California, Mexico), and Guadalajara (Jalisco, Mexico).
              </p>
            </div>
            <div className="contact-footer-bottom">
              <span className="contact-copyright">
                © {new Date().getFullYear()} The unAgency
              </span>
              <div className="contact-footer-social">
                <a
                  href="#"
                  className="contact-footer-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Síguenos en Instagram"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="contact-footer-link"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Conéctate con nosotros en LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
