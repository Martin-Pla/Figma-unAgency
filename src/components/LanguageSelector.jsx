import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLang) => {
    if (newLang !== language) {
      changeLanguage(newLang);
    }
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`language-option ${language === 'en' ? 'active' : ''}`}
        aria-label="English"
      >
        EN
      </button>
      <span className="language-separator">/</span>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`language-option ${language === 'es' ? 'active' : ''}`}
        aria-label="Español"
      >
        ES
      </button>
    </div>
  );
}
