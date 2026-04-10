import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import {
  LayoutDashboard, Activity, ClipboardList, Heart,
  FileSpreadsheet, Star, LogOut, Menu, X, Building2,
} from 'lucide-react';

export type AdminScreen =
  | 'dashboard' | 'assessment' | 'survey'
  | 'healthscore' | 'consulting' | 'points';

interface Props {
  children: React.ReactNode;
  active: AdminScreen;
  onNavigate: (s: AdminScreen) => void;
  onLogout: () => void;
}

export default function AdminLayout({ children, active, onNavigate, onLogout }: Props) {
  const { t, lang, setLang } = useLang();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: AdminScreen; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: t.adminDashboard },
    { id: 'assessment', icon: <Activity size={18} />, label: t.adminAssessment },
    { id: 'survey', icon: <ClipboardList size={18} />, label: t.adminSurvey },
    { id: 'healthscore', icon: <Heart size={18} />, label: t.adminHealthScore },
    { id: 'consulting', icon: <FileSpreadsheet size={18} />, label: t.adminConsulting },
    { id: 'points', icon: <Star size={18} />, label: t.adminPoints },
  ];

  const screenTitles: Record<AdminScreen, string> = {
    dashboard: t.adminDashboard,
    assessment: t.assessmentTitle,
    survey: t.surveyTitle,
    healthscore: t.healthScoreTitle,
    consulting: t.consultingTitle,
    points: t.adminPointsTitle,
  };

  const Sidebar = () => (
    <aside style={{
      width: 220,
      background: '#1e293b',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Building2 size={20} color="#fff" />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff' }}>{t.appName}</p>
          <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{t.adminWelcomeSub}</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: 'none',
              background: active === item.id ? 'rgba(59,130,246,0.2)' : 'transparent',
              color: active === item.id ? '#60a5fa' : '#94a3b8',
              fontSize: 13,
              fontWeight: active === item.id ? 700 : 400,
              cursor: 'pointer',
              marginBottom: 2,
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            {item.icon}
            {item.label}
            {active === item.id && (
              <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>👔</span>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Admin User</p>
            <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>admin@company.com</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', borderRadius: 10, border: 'none',
            background: 'transparent', color: '#ef4444', fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <LogOut size={16} /> {t.logout}
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Desktop Sidebar */}
      <div style={{ display: 'none' }} className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Always-visible sidebar for wider screens, hidden on mobile */}
      <div style={{ width: 220, flexShrink: 0, display: window.innerWidth >= 768 ? 'block' : 'none' }}>
        <Sidebar />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && window.innerWidth < 768 && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }}
          />
          <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 201, width: 220 }}>
            <Sidebar />
          </div>
        </>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {window.innerWidth < 768 && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#374151' }}
              >
                <Menu size={22} />
              </button>
            )}
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
              {screenTitles[active]}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', gap: 4,
              background: '#f1f5f9', borderRadius: 10, padding: 3,
            }}>
              {(['en', 'ja'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '5px 12px', borderRadius: 7, border: 'none',
                    background: lang === l ? '#fff' : 'transparent',
                    color: lang === l ? '#1e293b' : '#94a3b8',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    boxShadow: lang === l ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {l === 'en' ? 'EN' : '日本語'}
                </button>
              ))}
            </div>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, cursor: 'pointer',
            }}>
              👔
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
