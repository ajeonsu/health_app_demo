import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Star, CheckCircle2, XCircle, Users, Zap } from 'lucide-react';

const pendingRedemptions = [
  { id: 1, name: 'Yamada Taro', dept: 'Sales', deptJa: '営業部', rewardEn: 'Amazon Gift Card ¥500', rewardJa: 'Amazonギフトカード ¥500', pts: 500, date: '2026-04-09' },
  { id: 2, name: 'Suzuki Hanako', dept: 'HR', deptJa: '人事部', rewardEn: 'Gym Day Pass', rewardJa: 'ジム1日パス', pts: 350, date: '2026-04-09' },
  { id: 3, name: 'Ito Yuki', dept: 'Operations', deptJa: '運営部', rewardEn: 'Coffee Voucher', rewardJa: 'コーヒー券', pts: 200, date: '2026-04-08' },
  { id: 4, name: 'Tanaka Ken', dept: 'Engineering', deptJa: '技術部', rewardEn: 'Movie Ticket', rewardJa: '映画チケット', pts: 450, date: '2026-04-07' },
];

const pointHistory = [
  { nameEn: 'Monthly Activity Bonus', nameJa: '月次アクティビティボーナス', type: 'bulk', pts: 100, recipients: 248, date: '2026-04-01' },
  { nameEn: 'Step Challenge Winners', nameJa: '歩数チャレンジ優勝者', type: 'manual', pts: 500, recipients: 3, date: '2026-03-31' },
  { nameEn: 'Survey Completion Bonus', nameJa: 'サーベイ完了ボーナス', type: 'bulk', pts: 20, recipients: 214, date: '2026-03-28' },
];

export default function AdminPoints() {
  const { t, lang } = useLang();
  const [redemptions, setRedemptions] = useState(pendingRedemptions);
  const [allocTarget, setAllocTarget] = useState<'all' | 'dept'>('all');
  const [ptsInput, setPtsInput] = useState('100');
  const [reasonInput, setReasonInput] = useState('');

  const handleApprove = (id: number) => setRedemptions(prev => prev.filter(r => r.id !== id));
  const handleReject = (id: number) => setRedemptions(prev => prev.filter(r => r.id !== id));

  return (
    <div>
      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: lang === 'ja' ? '発行済みポイント (今月)' : 'Points Issued (This Month)', value: '24,800', color: '#3b82f6', icon: <Zap size={20} color="#3b82f6" /> },
          { label: lang === 'ja' ? '交換申請中' : 'Pending Redemptions', value: String(redemptions.length), color: '#f59e0b', icon: <Star size={20} color="#f59e0b" /> },
          { label: lang === 'ja' ? '今月の交換承認数' : 'Approved This Month', value: '42', color: '#10b981', icon: <CheckCircle2 size={20} color="#10b981" /> },
        ].map((card, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '16px 18px',
            border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {card.icon}
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 11, color: '#6b7280' }}>{card.label}</p>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Bulk Allocate */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={16} color="#3b82f6" /> {t.bulkAllocate}
          </h3>

          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 3, marginBottom: 14 }}>
            {([['all', t.allEmployees], ['dept', t.selectedDept]] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setAllocTarget(id)}
                style={{
                  flex: 1, padding: '7px 10px', borderRadius: 8, border: 'none',
                  background: allocTarget === id ? '#fff' : 'transparent',
                  color: allocTarget === id ? '#1e293b' : '#64748b',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  boxShadow: allocTarget === id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {allocTarget === 'dept' && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.department}</label>
              <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }}>
                <option>{lang === 'ja' ? '営業部' : 'Sales'}</option>
                <option>{lang === 'ja' ? '人事部' : 'HR'}</option>
                <option>{lang === 'ja' ? '技術部' : 'Engineering'}</option>
                <option>{lang === 'ja' ? '運営部' : 'Operations'}</option>
              </select>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.pointsPerEmployee}</label>
            <input
              type="number"
              value={ptsInput}
              onChange={e => setPtsInput(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.reason}</label>
            <input
              value={reasonInput}
              onChange={e => setReasonInput(e.target.value)}
              placeholder={lang === 'ja' ? '例: 月次ボーナス' : 'e.g. Monthly bonus'}
              style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            style={{
              width: '100%', padding: '11px', border: 'none', borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <Zap size={16} /> {t.allocatePoints}
          </button>
        </div>

        {/* Point History */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.history}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pointHistory.map((item, i) => (
              <div key={i} style={{
                background: '#f8fafc', borderRadius: 10, padding: '10px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                    {lang === 'ja' ? item.nameJa : item.nameEn}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>
                    {item.date} · {item.recipients} {lang === 'ja' ? '名' : 'recipients'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#3b82f6' }}>+{item.pts}</p>
                  <p style={{ margin: 0, fontSize: 10, color: '#9ca3af' }}>/person</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Redemptions */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.pendingRedemptions}</h3>
          {redemptions.length > 0 && (
            <span style={{ background: '#f59e0b', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
              {redemptions.length}
            </span>
          )}
        </div>
        {redemptions.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
            {lang === 'ja' ? '申請中の交換はありません' : 'No pending redemptions'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {[t.employeeName, t.department, lang === 'ja' ? '交換特典' : 'Reward', lang === 'ja' ? 'ポイント' : 'Points', t.date, lang === 'ja' ? 'アクション' : 'Action'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {redemptions.map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#6b7280' }}>{lang === 'ja' ? r.deptJa : r.dept}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#374151' }}>{lang === 'ja' ? r.rewardJa : r.rewardEn}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: 3 }} />
                    {r.pts}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>{r.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleApprove(r.id)}
                        style={{ padding: '5px 12px', borderRadius: 8, border: 'none', background: '#f0fdf4', color: '#16a34a', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        <CheckCircle2 size={13} /> {t.approve}
                      </button>
                      <button
                        onClick={() => handleReject(r.id)}
                        style={{ padding: '5px 12px', borderRadius: 8, border: 'none', background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        <XCircle size={13} /> {t.reject}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
