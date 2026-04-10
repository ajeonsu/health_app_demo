import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import {
  Building2, Users, Database, Bell, Settings,
  LogOut, Menu, Shield, Plus, CheckCircle2,
  ToggleLeft, ToggleRight, Send, RefreshCw, Server,
} from 'lucide-react';

type SysScreen = 'company' | 'users' | 'master' | 'notifications' | 'settings';

// ─── Data ────────────────────────────────────────────────────────────────────
const companies = [
  { id: 1, nameEn: 'Example Company Inc.', nameJa: '株式会社エグザンプル', plan: 'Enterprise', employees: 248, status: 'active', joined: '2025-04-01' },
  { id: 2, nameEn: 'TechVision Co.', nameJa: 'テックビジョン株式会社', plan: 'Pro', employees: 95, status: 'active', joined: '2025-07-15' },
  { id: 3, nameEn: 'HealthFirst Ltd.', nameJa: 'ヘルスファースト有限会社', plan: 'Basic', employees: 42, status: 'active', joined: '2025-10-03' },
  { id: 4, nameEn: 'Sunrise Corp.', nameJa: 'サンライズ株式会社', plan: 'Pro', employees: 130, status: 'suspended', joined: '2026-01-20' },
];

const users = [
  { id: 1, name: 'Yamada Taro', email: 'yamada@example.com', role: 'Employee', roleJa: '従業員', company: 'Example Company Inc.', companyJa: '株式会社エグザンプル', lastLogin: '2026-04-10', status: 'active' },
  { id: 2, name: 'Admin Hanako', email: 'admin@example.com', role: 'Corp Admin', roleJa: '企業管理者', company: 'Example Company Inc.', companyJa: '株式会社エグザンプル', lastLogin: '2026-04-10', status: 'active' },
  { id: 3, name: 'Suzuki Ken', email: 'suzuki@techvision.com', role: 'Employee', roleJa: '従業員', company: 'TechVision Co.', companyJa: 'テックビジョン株式会社', lastLogin: '2026-04-09', status: 'active' },
  { id: 4, name: 'Ito Aya', email: 'ito@healthfirst.com', role: 'Corp Admin', roleJa: '企業管理者', company: 'HealthFirst Ltd.', companyJa: 'ヘルスファースト有限会社', lastLogin: '2026-03-28', status: 'suspended' },
  { id: 5, name: 'Kato Ryu', email: 'kato@sunrise.com', role: 'Employee', roleJa: '従業員', company: 'Sunrise Corp.', companyJa: 'サンライズ株式会社', lastLogin: '2026-02-14', status: 'suspended' },
];

const rewards = [
  { id: 1, nameEn: 'Amazon Gift Card ¥500', nameJa: 'Amazonギフトカード ¥500', cost: 500, stock: 100 },
  { id: 2, nameEn: 'Coffee Voucher', nameJa: 'コーヒー券', cost: 200, stock: 250 },
  { id: 3, nameEn: 'Gym Day Pass', nameJa: 'ジム1日パス', cost: 350, stock: 80 },
  { id: 4, nameEn: 'Movie Ticket', nameJa: '映画チケット', cost: 450, stock: 60 },
];

const pointRules = [
  { actionEn: 'Daily Login', actionJa: 'デイリーログイン', pts: 10 },
  { actionEn: '10,000 Steps', actionJa: '10,000歩達成', pts: 50 },
  { actionEn: 'Weight Log', actionJa: '体重記録', pts: 5 },
  { actionEn: 'Meal Log', actionJa: '食事記録', pts: 5 },
  { actionEn: 'Complete Survey', actionJa: 'サーベイ完了', pts: 20 },
];

const sentNotifs = [
  { titleEn: 'System Maintenance Notice', titleJa: 'システムメンテナンスのお知らせ', audience: 'All', date: '2026-04-08', sent: 515 },
  { titleEn: 'New Feature: Video Library', titleJa: '新機能：動画ライブラリ', audience: 'All', date: '2026-04-01', sent: 515 },
  { titleEn: 'Monthly Health Report Ready', titleJa: '月次健康レポート準備完了', audience: 'Employees', date: '2026-03-31', sent: 470 },
];

const featureFlags = [
  { keyEn: 'Video Library', keyJa: '動画ライブラリ', enabled: true },
  { keyEn: 'Point Transfer', keyJa: 'ポイント移動', enabled: true },
  { keyEn: 'Wearable Integration (Beta)', keyJa: 'ウェアラブル連携（β）', enabled: false },
  { keyEn: 'Health Checkup Import', keyJa: '健診インポート', enabled: false },
  { keyEn: 'Productivity Loss Calc', keyJa: '生産性損失計算', enabled: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function CompanyMgmt() {
  const { t, lang } = useLang();
  const [list, setList] = useState(companies);
  const [showForm, setShowForm] = useState(false);
  const planColor = { Enterprise: '#8b5cf6', Pro: '#3b82f6', Basic: '#6b7280' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={16} /> {t.addCompany}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, padding: 20, marginBottom: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.addCompany}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            {[t.companyName, t.companyPlan, t.companyEmployees].map((lbl, i) => (
              <div key={i}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{lbl}</label>
                {i === 1 ? (
                  <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}>
                    <option>Enterprise</option><option>Pro</option><option>Basic</option>
                  </select>
                ) : (
                  <input style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 9, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{t.cancel}</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 9, border: 'none', borderRadius: 8, background: '#3b82f6', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.save}</button>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[t.companyName, t.companyPlan, t.companyEmployees, t.companyJoined, t.companyStatus, ''].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(co => (
              <tr key={co.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{lang === 'ja' ? co.nameJa : co.nameEn}</p>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${planColor[co.plan as keyof typeof planColor]}20`, color: planColor[co.plan as keyof typeof planColor] }}>
                    {lang === 'ja' ? (co.plan === 'Basic' ? t.planBasic : co.plan === 'Pro' ? t.planPro : t.planEnterprise) : co.plan}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>{co.employees}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>{co.joined}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: co.status === 'active' ? '#f0fdf4' : '#fef2f2', color: co.status === 'active' ? '#16a34a' : '#ef4444' }}>
                    {co.status === 'active' ? t.active : t.inactive}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => setList(prev => prev.map(c => c.id === co.id ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' } : c))}
                    style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#374151' }}
                  >
                    {co.status === 'active' ? t.suspendUser : t.activateUser}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserMgmt() {
  const { t, lang } = useLang();
  const [list, setList] = useState(users);
  const roleColor = { Employee: '#6366f1', 'Corp Admin': '#f59e0b' };

  return (
    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            {[t.employeeName, t.userRole, t.company, t.userLastLogin, t.userStatus, ''].map((h, i) => (
              <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map(u => (
            <tr key={u.id} style={{ borderTop: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px 16px' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{u.name}</p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#9ca3af' }}>{u.email}</p>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${roleColor[u.role as keyof typeof roleColor]}20`, color: roleColor[u.role as keyof typeof roleColor] }}>
                  {lang === 'ja' ? u.roleJa : u.role}
                </span>
              </td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: '#6b7280' }}>{lang === 'ja' ? u.companyJa : u.company}</td>
              <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>{u.lastLogin}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: u.status === 'active' ? '#f0fdf4' : '#fef2f2', color: u.status === 'active' ? '#16a34a' : '#ef4444' }}>
                  {u.status === 'active' ? t.active : t.inactive}
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button
                  onClick={() => setList(prev => prev.map(x => x.id === u.id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x))}
                  style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: u.status === 'active' ? '#ef4444' : '#16a34a' }}
                >
                  {u.status === 'active' ? t.suspendUser : t.activateUser}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MasterData() {
  const { t, lang } = useLang();
  const [rewardList, setRewardList] = useState(rewards);
  const [rules, setRules] = useState(pointRules);

  return (
    <div>
      {/* Rewards */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.rewardMaster}</h3>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 9, border: 'none', background: '#3b82f6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={14} /> {t.addReward}
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[t.rewardName, t.rewardCost, t.rewardStock, ''].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rewardList.map((r, i) => (
              <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{lang === 'ja' ? r.nameJa : r.nameEn}</td>
                <td style={{ padding: '11px 16px' }}>
                  <input type="number" value={r.cost} onChange={e => setRewardList(prev => prev.map((x, j) => j === i ? { ...x, cost: +e.target.value } : x))}
                    style={{ width: 80, padding: '5px 8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <input type="number" value={r.stock} onChange={e => setRewardList(prev => prev.map((x, j) => j === i ? { ...x, stock: +e.target.value } : x))}
                    style={{ width: 80, padding: '5px 8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <button style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12, color: '#374151' }}>{t.save}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Point Rules */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.pointRules}</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[lang === 'ja' ? 'アクション' : 'Action', lang === 'ja' ? 'ポイント' : 'Points', ''].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, color: '#374151' }}>{lang === 'ja' ? r.actionJa : r.actionEn}</td>
                <td style={{ padding: '11px 16px' }}>
                  <input type="number" value={r.pts} onChange={e => setRules(prev => prev.map((x, j) => j === i ? { ...x, pts: +e.target.value } : x))}
                    style={{ width: 80, padding: '5px 8px', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <button style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 12, color: '#374151' }}>{t.save}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NotificationMgmt() {
  const { t, lang } = useLang();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* Compose */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 24, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.sendAnnouncement}</h3>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.announcementTitle}</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder={lang === 'ja' ? 'タイトルを入力...' : 'Enter title...'} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.announcementBody}</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder={lang === 'ja' ? '本文を入力...' : 'Enter message body...'} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.targetAudience}</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['all', t.allUsers], ['employees', lang === 'ja' ? '従業員のみ' : 'Employees Only'], ['admins', lang === 'ja' ? '管理者のみ' : 'Admins Only']].map(([val, label]) => (
              <button key={val} onClick={() => setAudience(val)} style={{
                padding: '7px 14px', borderRadius: 10, border: `1.5px solid ${audience === val ? '#3b82f6' : '#e2e8f0'}`,
                background: audience === val ? '#eff6ff' : '#fff',
                color: audience === val ? '#3b82f6' : '#6b7280',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {sent ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: '#f0fdf4', borderRadius: 10 }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>{lang === 'ja' ? 'お知らせを送信しました！' : 'Announcement sent successfully!'}</span>
          </div>
        ) : (
          <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }} style={{ width: '100%', padding: '11px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Send size={16} /> {t.sendNow}
          </button>
        )}
      </div>

      {/* History */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.sentHistory}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sentNotifs.map((n, i) => (
            <div key={i} style={{ padding: '14px 20px', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{lang === 'ja' ? n.titleJa : n.titleEn}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>{n.date} · {n.audience} · {n.sent} recipients</p>
              </div>
              <CheckCircle2 size={16} color="#22c55e" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemSettings() {
  const { t, lang } = useLang();
  const [flags, setFlags] = useState(featureFlags);
  const [maintenance, setMaintenance] = useState(false);
  const [backingUp, setBackingUp] = useState(false);
  const [backupDone, setBackupDone] = useState(false);

  const runBackup = () => {
    setBackingUp(true);
    setTimeout(() => { setBackingUp(false); setBackupDone(true); setTimeout(() => setBackupDone(false), 3000); }, 2000);
  };

  const apiList = [
    { nameEn: 'Supabase DB', nameJa: 'Supabase DB', status: 'operational' },
    { nameEn: 'Firebase FCM', nameJa: 'Firebase FCM', status: 'operational' },
    { nameEn: 'Nutrition API', nameJa: '栄養APIサービス', status: 'operational' },
    { nameEn: 'Apple HealthKit', nameJa: 'Apple HealthKit', status: 'degraded' },
  ];

  return (
    <div>
      {/* System Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: t.systemVersion, value: '1.0.0 (Demo)' },
          { label: t.lastBackup, value: '2026-04-10 02:00' },
          { label: lang === 'ja' ? '登録会社数' : 'Registered Companies', value: '4' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: '#6b7280' }}>{card.label}</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Maintenance + Backup */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.sysSettings}</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{t.maintenanceMode}</span>
            <button onClick={() => setMaintenance(!maintenance)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              {maintenance ? <ToggleRight size={28} color="#ef4444" /> : <ToggleLeft size={28} color="#d1d5db" />}
            </button>
          </div>

          <div style={{ padding: '16px 0' }}>
            <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#374151' }}>{t.dbBackup}</p>
            {backupDone ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: 13 }}>
                <CheckCircle2 size={16} /> {lang === 'ja' ? 'バックアップ完了！' : 'Backup completed!'}
              </div>
            ) : (
              <button onClick={runBackup} disabled={backingUp} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: 'none', background: backingUp ? '#f1f5f9' : '#1e293b', color: backingUp ? '#9ca3af' : '#fff', fontSize: 13, fontWeight: 600, cursor: backingUp ? 'not-allowed' : 'pointer' }}>
                <RefreshCw size={15} style={{ animation: backingUp ? 'spin 1s linear infinite' : 'none' }} />
                {backingUp ? (lang === 'ja' ? 'バックアップ中...' : 'Backing up...') : t.runBackup}
              </button>
            )}
          </div>
        </div>

        {/* API Status */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.apiStatus}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {apiList.map((api, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Server size={14} color="#6b7280" />
                  <span style={{ fontSize: 13, color: '#374151' }}>{lang === 'ja' ? api.nameJa : api.nameEn}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: api.status === 'operational' ? '#f0fdf4' : '#fffbeb', color: api.status === 'operational' ? '#16a34a' : '#d97706' }}>
                  {api.status === 'operational' ? (lang === 'ja' ? '正常' : 'Operational') : (lang === 'ja' ? '低下中' : 'Degraded')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.featureFlags}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {flags.map((f, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < flags.length - 1 ? '1px solid #f9fafb' : 'none' }}>
              <span style={{ fontSize: 13, color: '#374151' }}>{lang === 'ja' ? f.keyJa : f.keyEn}</span>
              <button onClick={() => setFlags(prev => prev.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                {f.enabled ? <ToggleRight size={26} color="#3b82f6" /> : <ToggleLeft size={26} color="#d1d5db" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main SysAdmin App ────────────────────────────────────────────────────────
export default function SysAdminApp({ onLogout }: { onLogout: () => void }) {
  const { t, lang, setLang } = useLang();
  const [screen, setScreen] = useState<SysScreen>('company');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: SysScreen; icon: React.ReactNode; label: string }[] = [
    { id: 'company', icon: <Building2 size={18} />, label: t.sysCompany },
    { id: 'users', icon: <Users size={18} />, label: t.sysUsers },
    { id: 'master', icon: <Database size={18} />, label: t.sysMaster },
    { id: 'notifications', icon: <Bell size={18} />, label: t.sysNotif },
    { id: 'settings', icon: <Settings size={18} />, label: t.sysSettings },
  ];

  const screenTitles: Record<SysScreen, string> = {
    company: t.sysCompany, users: t.sysUsers, master: t.sysMaster,
    notifications: t.sysNotif, settings: t.sysSettings,
  };

  const Sidebar = () => (
    <aside style={{ width: 220, background: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} color="#fff" />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff' }}>{t.appName}</p>
          <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>{t.sysAdminSub}</p>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => { setScreen(item.id); setSidebarOpen(false); }} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none',
            background: screen === item.id ? 'rgba(99,102,241,0.2)' : 'transparent',
            color: screen === item.id ? '#818cf8' : '#94a3b8',
            fontSize: 13, fontWeight: screen === item.id ? 700 : 400, cursor: 'pointer', marginBottom: 2, textAlign: 'left',
          }}>
            {item.icon} {item.label}
            {screen === item.id && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />}
          </button>
        ))}
      </nav>
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>System Admin</p>
            <p style={{ margin: 0, fontSize: 10, color: '#64748b' }}>sysadmin@vitalcare.app</p>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, border: 'none', background: 'transparent', color: '#ef4444', fontSize: 13, cursor: 'pointer' }}>
          <LogOut size={16} /> {t.logout}
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ width: 220, flexShrink: 0, display: window.innerWidth >= 768 ? 'block' : 'none' }}>
        <Sidebar />
      </div>
      {sidebarOpen && window.innerWidth < 768 && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
          <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 201, width: 220 }}><Sidebar /></div>
        </>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {window.innerWidth < 768 && (
              <button onClick={() => setSidebarOpen(true)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#374151' }}><Menu size={22} /></button>
            )}
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{screenTitles[screen]}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 10, padding: 3 }}>
              {(['en', 'ja'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: '5px 12px', borderRadius: 7, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#1e293b' : '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer', boxShadow: lang === l ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s' }}>
                  {l === 'en' ? 'EN' : '日本語'}
                </button>
              ))}
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🛡️</div>
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {screen === 'company' && <CompanyMgmt />}
          {screen === 'users' && <UserMgmt />}
          {screen === 'master' && <MasterData />}
          {screen === 'notifications' && <NotificationMgmt />}
          {screen === 'settings' && <SystemSettings />}
        </main>
      </div>
    </div>
  );
}
