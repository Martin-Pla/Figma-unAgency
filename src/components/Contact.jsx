import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' o 'error'

  const handleSubmit = async (e) => {
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
    setSubmitStatus(null);
    
    // Sanitizar todos los valores antes de enviar
    // Para el mensaje, preservar espacios múltiples y saltos de línea
    const sanitizeMessage = (input) => {
      if (typeof input !== 'string') return '';
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim(); // Solo trim al inicio y final, preserva espacios internos
    };
    
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeMessage(formData.message)
    };
    
    // Enviar usando la API de Resend
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
        }),
      });

      // Verificar el Content-Type antes de parsear
      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
          const textResponse = await response.text();
          console.error('Server response (text):', textResponse);
          throw new Error(getTranslation(language, 'errorMessage') + ': Invalid server response');
        }
      } else {
        // Si no es JSON, leer como texto y loguear
        const textResponse = await response.text();
        console.error('Server returned non-JSON response:', textResponse);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(getTranslation(language, 'errorMessage') + ': Server error');
      }

      // Log para debugging si la respuesta no es OK
      if (!response.ok) {
        console.error('Response not OK:', {
          status: response.status,
          statusText: response.statusText,
          result: result
        });
        throw new Error(result?.error || result?.details || getTranslation(language, 'errorMessage'));
      }

      if (result.success) {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        // El estado de éxito se mantiene visible por 5 segundos
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error(result?.error || getTranslation(language, 'errorMessage'));
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      setErrors({ 
        submit: error.message || getTranslation(language, 'errorMessage')
      });
      // El estado de error se mantiene visible hasta que el usuario intente de nuevo
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para el campo de mensaje, permitir espacios y no sanitizar en tiempo real
    // Solo sanitizar al enviar para mantener la experiencia de escritura fluida
    if (name === 'message') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      // Sanitizar en tiempo real para otros campos
      const sanitized = sanitizeInput(value);
      setFormData({
        ...formData,
        [name]: sanitized
      });
    }
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const { language } = useLanguage();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll-driven animations
  const formY = useTransform(scrollYProgress, [0, 0.5], [50, -20]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  
  const infoY = useTransform(scrollYProgress, [0, 0.5], [40, -15]);
  const infoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.7]);

  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-100px" });

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="contact-section-updated"
    >
      <div className="contact-container-updated">
        {/* Contact Form */}
        <motion.div 
          ref={formRef}
          className="contact-form-section"
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          style={{
            y: formInView ? undefined : formY,
            opacity: formInView ? undefined : formOpacity,
          }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2 
            className="contact-title-updated"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getTranslation(language, 'contactTitle')}
          </motion.h2>

          <form onSubmit={handleSubmit} className="contact-form-updated" noValidate>
            <div className="contact-form-field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={getTranslation(language, 'namePlaceholder')}
                required
                maxLength={100}
                pattern="[a-zA-Z\s\-'áéíóúÁÉÍÓÚñÑüÜ]{2,100}"
                className="contact-input"
                aria-label={getTranslation(language, 'namePlaceholder')}
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
                placeholder={getTranslation(language, 'emailPlaceholder')}
                required
                maxLength={254}
                className="contact-input"
                aria-label={getTranslation(language, 'emailPlaceholder')}
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
                placeholder={getTranslation(language, 'messagePlaceholder')}
                rows={1}
                required
                maxLength={2000}
                className="contact-textarea"
                aria-label={getTranslation(language, 'messagePlaceholder')}
              />
              {errors.message && (
                <span className="contact-error-message" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`contact-submit-button-updated ${
                submitStatus === 'success' ? 'contact-submit-button-success' : ''
              } ${submitStatus === 'error' ? 'contact-submit-button-error' : ''}`}
              disabled={isSubmitting || submitStatus === 'success'}
            >
              {isSubmitting ? (
                <>
                  {getTranslation(language, 'sending')}
                  <span className="contact-submit-loading" style={{ marginLeft: '8px' }}>⋯</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  {getTranslation(language, 'successMessage')}
                  <span className="contact-submit-icon" style={{ fontSize: '16px', marginLeft: '8px' }}>✓</span>
                </>
              ) : (
                <>
                  {getTranslation(language, 'sendInquiry')}
                  <span className="contact-submit-icon" style={{ fontSize: '16px', marginLeft: '8px' }}>→</span>
                </>
              )}
            </button>
            
            {submitStatus === 'error' && errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="contact-error-message"
                role="alert"
              >
                {errors.submit}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Locations & Info */}
        <motion.div 
          ref={infoRef}
          className="contact-info-section"
          initial={{ opacity: 0, y: 50 }}
          animate={infoInView ? { opacity: 1, y: 0 } : {}}
          style={{
            y: infoInView ? undefined : infoY,
            opacity: infoInView ? undefined : infoOpacity,
          }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-info-content">
            <div className="contact-locations-section">
              <h3 className="contact-locations-title">
                {getTranslation(language, 'locations')}
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

            {/* Email Section */}
            <div className="contact-email-section">
              <h3 className="contact-email-title">
                {getTranslation(language, 'email')}
              </h3>
              <div className="contact-email-content">
                <a href="mailto:hello@theunagencyco.com" className="contact-email-link">
                  hello@theunagencyco.com
                </a>
              </div>
            </div>

          </div>

          <div className="contact-footer-updated">
            {/* SEO-only text - hidden from users but visible to search engines */}
            <div className="seo-only" aria-hidden="true">
              <p>
                Boutique Design & Strategy Hub serving San Diego (California, USA), Tijuana (Baja California, Mexico), and Guadalajara (Jalisco, Mexico).
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer Boutique - Redes Sociales y Copyright */}
      <div className="contact-footer-boutique">
        <div className="contact-footer-boutique-container">
          <div className="contact-footer-boutique-content">
            <span className="contact-footer-copyright-boutique">
              Copyright © {new Date().getFullYear()} The unAgency
            </span>
            <div className="contact-footer-social-boutique">
              <a
                href="https://www.instagram.com/theunagencyco/"
                className="contact-footer-link-boutique"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Síguenos en Instagram"
              >
                <span className="contact-footer-link-text">INSTAGRAM</span>
                <span className="contact-footer-link-arrow">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/company/the-unagency-co/"
                className="contact-footer-link-boutique"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Conéctate con nosotros en LinkedIn"
              >
                <span className="contact-footer-link-text">LINKEDIN</span>
                <span className="contact-footer-link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
