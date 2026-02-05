import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Obtener idioma del localStorage o usar inglés por defecto
  const getInitialLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'en' || saved === 'es')) {
      return saved;
    }
    // Por defecto inglés
    return 'en';
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'es') {
      setLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
