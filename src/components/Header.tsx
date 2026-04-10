import { Settings, ChevronLeft } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface Props {
  title: string;
  onSettings?: () => void;
  onBack?: () => void;
  showLangToggle?: boolean;
}

export default function Header({ title, onSettings, onBack, showLangToggle }: Props) {
  const { lang, setLang } = useLang();

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onBack && (
          <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6366f1', padding: 0 }}>
            <ChevronLeft size={24} />
          </button>
        )}
        <span style={{ fontWeight: 700, fontSize: 18, color: '#1f2937' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {showLangToggle && (
          <button
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
            style={{
              border: '1.5px solid #6366f1',
              borderRadius: 20,
              background: 'none',
              cursor: 'pointer',
              padding: '3px 12px',
              fontSize: 12,
              fontWeight: 600,
              color: '#6366f1',
              transition: 'all 0.2s',
            }}
          >
            {lang === 'en' ? '日本語' : 'EN'}
          </button>
        )}
        {onSettings && (
          <button onClick={onSettings} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>
            <Settings size={22} />
          </button>
        )}
      </div>
    </header>
  );
}
