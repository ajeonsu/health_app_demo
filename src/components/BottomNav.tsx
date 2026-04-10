import { Home, Footprints, UtensilsCrossed, Star, MessageCircle, Target, Video } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

export type Screen = 'home' | 'steps' | 'weight' | 'nutrition' | 'points' | 'chat' | 'goals' | 'videos';

interface Props {
  active: Screen;
  onNavigate: (s: Screen) => void;
}

export default function BottomNav({ active, onNavigate }: Props) {
  const { t } = useLang();

  const items: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={20} />, label: t.home },
    { id: 'steps', icon: <Footprints size={20} />, label: t.steps },
    { id: 'goals', icon: <Target size={20} />, label: t.goalsNav },
    { id: 'nutrition', icon: <UtensilsCrossed size={20} />, label: t.nutrition },
    { id: 'points', icon: <Star size={20} />, label: t.points },
    { id: 'videos', icon: <Video size={20} />, label: t.videosNav },
    { id: 'chat', icon: <MessageCircle size={20} />, label: t.chat },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '6px 0 12px',
      zIndex: 100,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
    }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            color: active === item.id ? '#6366f1' : '#9ca3af',
            transition: 'color 0.2s',
          }}
        >
          {item.icon}
          <span style={{ fontSize: 9, fontWeight: active === item.id ? 700 : 400 }}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
