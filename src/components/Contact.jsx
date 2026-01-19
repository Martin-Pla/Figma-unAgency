import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const locations = [
  { city: "San Diego", country: "USA", time: "PST" },
  { city: "Tijuana", country: "MX", time: "PST" },
  { city: "Guadalajara", country: "MX", time: "CST" },
  { city: "London", country: "UK", time: "GMT" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `New Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:ad.theunagency@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

          <form onSubmit={handleSubmit} className="contact-form-updated">
            <div className="contact-form-field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="NAME"
                required
                className="contact-input"
              />
            </div>
            <div className="contact-form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                required
                className="contact-input"
              />
            </div>
            <div className="contact-form-field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="MESSAGE"
                rows={1}
                required
                className="contact-textarea"
              />
            </div>

            <button
              type="submit"
              className="contact-submit-button-updated"
            >
              Send Inquiry
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
                {locations.map((loc) => (
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

            <div className="contact-email-section">
              <h3 className="contact-email-title">
                Contact
              </h3>
              <div className="contact-email-content">
                <a
                  href="mailto:hello@theunagencyco.com"
                  className="contact-email-link"
                >
                  hello@theunagencyco.com
                </a>
              </div>
            </div>
          </div>

          <div className="contact-footer-updated">
            <span className="contact-copyright">
              © {new Date().getFullYear()} The unAgency
            </span>
            <div className="contact-footer-social">
              <a
                href="#"
                className="contact-footer-link"
              >
                Instagram
              </a>
              <a
                href="#"
                className="contact-footer-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
