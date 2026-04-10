import { useLang } from '../contexts/LanguageContext';
import { User, Bell, Link, Shield, Info, ChevronRight, LogOut, Target } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export default function SettingsScreen({ onLogout }: Props) {
  const { t, lang, setLang } = useLang();

  const toggleItem = (label: string, defaultOn = true) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #f9fafb',
    }}>
      <span style={{ fontSize: 14, color: '#374151' }}>{label}</span>
      <div
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: defaultOn ? '#6366f1' : '#e5e7eb',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 2,
          left: defaultOn ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }} />
      </div>
    </div>
  );

  const section = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        {icon}
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
      </div>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        padding: '0 16px',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        {children}
      </div>
    </div>
  );

  const rowLink = (label: string, value?: string) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '13px 0',
      borderBottom: '1px solid #f9fafb',
      cursor: 'pointer',
    }}>
      <span style={{ fontSize: 14, color: '#374151' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {value && <span style={{ fontSize: 13, color: '#9ca3af' }}>{value}</span>}
        <ChevronRight size={16} color="#d1d5db" />
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Profile Card */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: 20,
        padding: 20,
        color: '#fff',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}>
          🧑‍💼
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Yamada Taro</p>
          <p style={{ margin: '2px 0', fontSize: 13, opacity: 0.85 }}>yamada@company.co.jp</p>
          <p style={{ margin: '2px 0', fontSize: 12, opacity: 0.75 }}>
            {lang === 'ja' ? '株式会社エグザンプル · 営業部' : 'Example Company Inc. · Sales Dept.'}
          </p>
        </div>
      </div>

      {/* Language Toggle — prominent */}
      <div style={{
        background: '#fff',
        border: '2px solid #6366f1',
        borderRadius: 16,
        padding: '16px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#6366f1' }}>{t.languageLabel}</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>
            {lang === 'en' ? 'Currently: English' : '現在: 日本語'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setLang('en')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: lang === 'en' ? '#6366f1' : '#f3f4f6',
              color: lang === 'en' ? '#fff' : '#6b7280',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ja')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: lang === 'ja' ? '#6366f1' : '#f3f4f6',
              color: lang === 'ja' ? '#fff' : '#6b7280',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            日本語
          </button>
        </div>
      </div>

      {/* Profile Section */}
      {section(t.profile, <User size={14} color="#6b7280" />,
        <>
          {rowLink(t.editProfile)}
          {rowLink(t.company, lang === 'ja' ? '株式会社エグザンプル' : 'Example Company Inc.')}
          {rowLink(t.department, lang === 'ja' ? '営業部' : 'Sales Dept.')}
        </>
      )}

      {/* Goals */}
      {section(t.goal, <Target size={14} color="#6b7280" />,
        <>
          {rowLink(t.stepGoal, '10,000')}
          {rowLink(t.calGoal, '2,000 kcal')}
          {rowLink(t.weightGoalLabel, '70.0 kg')}
        </>
      )}

      {/* Notifications */}
      {section(t.notificationsSettings, <Bell size={14} color="#6b7280" />,
        <>
          {toggleItem(t.pushNotifs, true)}
          {toggleItem(t.emailNotifs, true)}
          {toggleItem(t.weeklyReport, true)}
        </>
      )}

      {/* Connected Apps */}
      {section(t.connectedApps, <Link size={14} color="#6b7280" />,
        <>
          {rowLink('Apple HealthKit', lang === 'ja' ? '接続済み' : 'Connected')}
          {rowLink('Google Fit', lang === 'ja' ? '未接続' : 'Not connected')}
        </>
      )}

      {/* Privacy */}
      {section(t.privacy, <Shield size={14} color="#6b7280" />,
        <>
          {toggleItem(t.dataSharing, true)}
          <div style={{ padding: '12px 0', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: '#ef4444' }}>{t.deleteAccount}</span>
          </div>
        </>
      )}

      {/* About */}
      {section(t.about, <Info size={14} color="#6b7280" />,
        <>
          {rowLink(t.appVersion, '1.0.0 (Demo)')}
        </>
      )}

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '14px',
          background: '#fff',
          border: '1.5px solid #fecaca',
          borderRadius: 14,
          color: '#ef4444',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <LogOut size={18} /> {t.logout}
      </button>
    </div>
  );
}
