import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'japanese' | 'arabic';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or default to 'japanese'
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('userLanguage');
    return (saved as Language) || 'japanese';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}