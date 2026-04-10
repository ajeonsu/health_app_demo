import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Heart, Building2, Shield } from 'lucide-react';

export type Role = 'employee' | 'admin' | 'sysadmin';

interface Props {
  onLogin: (role: Role) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const { t, lang, setLang } = useLang();
  const [role, setRole] = useState<Role>('employee');

  const roles: { id: Role; label: string; icon: React.ReactNode; color: string; gradient: string }[] = [
    { id: 'employee', label: t.loginAsEmployee, icon: <Heart size={38} color="#fff" fill="#fff" />, color: '#6366f1', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'admin', label: t.loginAsAdmin, icon: <Building2 size={38} color="#fff" />, color: '#2563eb', gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' },
    { id: 'sysadmin', label: t.loginAsSysAdmin, icon: <Shield size={38} color="#fff" />, color: '#6366f1', gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
  ];

  const active = roles.find(r => r.id === role)!;

  const emailMap: Record<Role, string> = {
    employee: 'yamada@company.com',
    admin: 'admin@company.com',
    sysadmin: 'sysadmin@vitalcare.app',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: active.gradient,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      transition: 'background 0.4s',
    }}>
      {/* Lang toggle */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button onClick={() => setLang(lang === 'en' ? 'ja' : 'en')} style={{ border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: 20, background: 'rgba(255,255,255,0.15)', cursor: 'pointer', padding: '4px 14px', fontSize: 13, fontWeight: 600, color: '#fff', backdropFilter: 'blur(4px)' }}>
          {lang === 'en' ? '日本語' : 'EN'}
        </button>
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.2)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', backdropFilter: 'blur(8px)' }}>
          {active.icon}
        </div>
        <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 800, margin: 0 }}>{t.appName}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 6 }}>
          {role === 'employee' ? t.tagline : role === 'admin' ? t.adminWelcomeSub : t.sysAdminSub}
        </p>
      </div>

      {/* Role Toggle */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 4, marginBottom: 24, backdropFilter: 'blur(4px)', gap: 4 }}>
        {roles.map(r => (
          <button key={r.id} onClick={() => setRole(r.id)} style={{
            padding: '8px 14px', borderRadius: 12, border: 'none',
            background: role === r.id ? '#fff' : 'transparent',
            color: role === r.id ? active.color : 'rgba(255,255,255,0.85)',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}>
            {r.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{ background: '#fff', borderRadius: 24, padding: 28, width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: '0 0 4px' }}>
          {role === 'employee' ? t.welcome : role === 'admin' ? t.adminWelcome : t.sysAdminWelcome}
        </h2>
        <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 24px' }}>{t.welcomeSub}</p>

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{t.email}</label>
        <input value={emailMap[role]} readOnly style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, marginBottom: 16, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', background: '#f9fafb' }} />

        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{t.password}</label>
        <input type="password" defaultValue="••••••••" style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, marginBottom: 8, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />

        <div style={{ textAlign: 'right', marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: active.color, cursor: 'pointer', fontWeight: 500 }}>{t.forgotPassword}</span>
        </div>

        <button onClick={() => onLogin(role)} style={{ width: '100%', padding: '14px', background: active.gradient, border: 'none', borderRadius: 12, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}>
          {t.login}
        </button>

        {role === 'employee' && (
          <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', margin: 0 }}>
            <span style={{ color: active.color, cursor: 'pointer' }}>{t.newAccount}</span>
          </p>
        )}
      </div>
    </div>
  );
}
