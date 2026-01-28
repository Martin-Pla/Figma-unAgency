import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

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

  // Inicializar EmailJS cuando el componente se monte
  useEffect(() => {
    // Configuración de EmailJS - Reemplaza estos valores con tus credenciales reales
    // Puedes obtenerlas creando una cuenta gratuita en https://www.emailjs.com/
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
    if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey);
    }
  }, []);

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
    
    // Configuración de EmailJS
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
    
    // Si EmailJS no está configurado, usar FormSubmit como fallback
    if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      // Usar FormSubmit (servicio gratuito que no requiere configuración)
      const formDataToSend = new FormData();
      formDataToSend.append('name', sanitizedData.name);
      formDataToSend.append('email', sanitizedData.email);
      formDataToSend.append('message', sanitizedData.message);
      formDataToSend.append('subject', `New Inquiry from ${sanitizedData.name}`);
      formDataToSend.append('_to', 'ad.theunagency@gmail.com');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'box');
      
      try {
        const response = await fetch('https://formsubmit.co/ajax/ad.theunagency@gmail.com', {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          setSubmitStatus('success');
          setIsSubmitting(false);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitStatus(null), 5000);
        } else {
          throw new Error(result.message || 'Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        setSubmitStatus('error');
        setIsSubmitting(false);
        setErrors({ 
          submit: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.' 
        });
      }
    } else {
      // Usar EmailJS si está configurado
      try {
        const templateParams = {
          to_email: 'ad.theunagency@gmail.com',
          from_name: sanitizedData.name,
          from_email: sanitizedData.email,
          message: sanitizedData.message,
          subject: `New Inquiry from ${sanitizedData.name}`
        };
        
        await emailjs.send(serviceId, templateId, templateParams);
        
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        setSubmitStatus('error');
        setIsSubmitting(false);
        setErrors({ 
          submit: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.' 
        });
      }
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
            LET'S TALK
          </motion.h2>

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
              <span className="contact-submit-icon" style={{ fontSize: '16px', marginLeft: '8px' }}>→</span>
            </button>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="contact-success-message"
                role="alert"
              >
                ¡Mensaje enviado exitosamente! Te contactaremos pronto.
              </motion.div>
            )}
            
            {submitStatus === 'error' && errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
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
