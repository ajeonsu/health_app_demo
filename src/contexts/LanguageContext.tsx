import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)['en'];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
