import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Star, ArrowUpRight, ArrowDownRight, Footprints, UtensilsCrossed, Scale, Send, CheckCircle2 } from 'lucide-react';

const rewardItems = [
  { icon: '🎁', nameEn: 'Amazon Gift Card ¥500', nameJa: 'Amazonギフトカード ¥500', cost: 500 },
  { icon: '☕', nameEn: 'Coffee Voucher', nameJa: 'コーヒー券', cost: 200 },
  { icon: '🏋️', nameEn: 'Gym Day Pass', nameJa: 'ジム1日パス', cost: 350 },
  { icon: '🎫', nameEn: 'Movie Ticket', nameJa: '映画チケット', cost: 450 },
];

const historyItems = [
  { type: 'earn', descEn: '10,000 Step Milestone', descJa: '10,000歩達成', pts: 50, date: '2026-04-10' },
  { type: 'earn', descEn: 'Daily Login Bonus', descJa: 'デイリーログインボーナス', pts: 10, date: '2026-04-10' },
  { type: 'earn', descEn: 'Weight Logged', descJa: '体重記録', pts: 5, date: '2026-04-09' },
  { type: 'redeem', descEn: 'Coffee Voucher Redeemed', descJa: 'コーヒー券交換', pts: -200, date: '2026-04-07' },
  { type: 'transfer', descEn: 'Transferred to Suzuki Hanako', descJa: '鈴木 花子へ送付', pts: -50, date: '2026-04-06' },
  { type: 'transfer', descEn: 'Received from Tanaka Ken', descJa: '田中 健から受取', pts: 30, date: '2026-04-05' },
];

const earnWays = [
  { icon: <Footprints size={16} color="#6366f1" />, descEn: '10,000 steps/day', descJa: '10,000歩/日', pts: 50 },
  { icon: <Star size={16} color="#eab308" />, descEn: 'Daily login', descJa: 'デイリーログイン', pts: 10 },
  { icon: <Scale size={16} color="#3b82f6" />, descEn: 'Log weight', descJa: '体重記録', pts: 5 },
  { icon: <UtensilsCrossed size={16} color="#10b981" />, descEn: 'Log meal', descJa: '食事記録', pts: 5 },
];

const colleagues = [
  { id: 1, nameEn: 'Suzuki Hanako', nameJa: '鈴木 花子', dept: 'HR', deptJa: '人事部', avatar: '👩‍💼' },
  { id: 2, nameEn: 'Tanaka Ken', nameJa: '田中 健', dept: 'Engineering', deptJa: '技術部', avatar: '👨‍💻' },
  { id: 3, nameEn: 'Ito Yuki', nameJa: '伊藤 雪', dept: 'Operations', deptJa: '運営部', avatar: '👩‍🔧' },
  { id: 4, nameEn: 'Kato Shin', nameJa: '加藤 慎', dept: 'Sales', deptJa: '営業部', avatar: '🧑‍💼' },
];

type Tab = 'rewards' | 'transfer' | 'history';

export default function PointsScreen() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<Tab>('rewards');
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [transferAmt, setTransferAmt] = useState('100');
  const [transferNote, setTransferNote] = useState('');
  const [transferDone, setTransferDone] = useState(false);

  const myPoints = 2150;

  const handleTransfer = () => {
    setTransferDone(true);
    setTimeout(() => { setTransferDone(false); setSelectedRecipient(null); setTransferAmt('100'); setTransferNote(''); }, 2500);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'rewards', label: t.rewards },
    { id: 'transfer', label: t.transferTitle },
    { id: 'history', label: t.history },
  ];

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Points Banner */}
      <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: 20, padding: '20px', color: '#fff', marginBottom: 20 }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, opacity: 0.85 }}>{t.availablePoints}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
          <Star size={28} fill="#fff" color="#fff" />
          <span style={{ fontSize: 44, fontWeight: 800 }}>{myPoints.toLocaleString()}</span>
          <span style={{ fontSize: 16, opacity: 0.8 }}>{t.pts}</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 11, opacity: 0.75 }}>{t.lifetimePoints}</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>8,430</p>
          </div>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 11, opacity: 0.75 }}>{t.earnedThisMonth}</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>+320</p>
          </div>
        </div>
      </div>

      {/* How to Earn */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {earnWays.map((way, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 14, padding: '12px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {way.icon}
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#374151', fontWeight: 500 }}>{lang === 'ja' ? way.descJa : way.descEn}</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>+{way.pts} pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 3, marginBottom: 16 }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 9, border: 'none',
            background: tab === tb.id ? '#fff' : 'transparent',
            color: tab === tb.id ? '#f59e0b' : '#9ca3af',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            boxShadow: tab === tb.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s',
          }}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* Tab: Rewards */}
      {tab === 'rewards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rewardItems.map((reward, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: 28 }}>{reward.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{lang === 'ja' ? reward.nameJa : reward.nameEn}</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: '#f59e0b', fontWeight: 700 }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: 2 }} />
                  {reward.cost} pts
                </p>
              </div>
              <button style={{ padding: '7px 14px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {t.redeem}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Transfer */}
      {tab === 'transfer' && (
        <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 16, padding: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {transferDone ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 16, fontWeight: 700, color: '#10b981', margin: 0 }}>{t.transferSuccess}</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.transferTitle}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{t.myBalance}: {myPoints.toLocaleString()}</span>
                </div>
              </div>

              {/* Recipient select */}
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#374151' }}>{t.selectRecipient}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {colleagues.map(c => (
                  <button key={c.id} onClick={() => setSelectedRecipient(c.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 12,
                    border: `2px solid ${selectedRecipient === c.id ? '#f59e0b' : '#f3f4f6'}`,
                    background: selectedRecipient === c.id ? '#fffbeb' : '#fff',
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    <span style={{ fontSize: 24 }}>{c.avatar}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{lang === 'ja' ? c.nameJa : c.nameEn}</p>
                      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{lang === 'ja' ? c.deptJa : c.dept}</p>
                    </div>
                    {selectedRecipient === c.id && <CheckCircle2 size={18} color="#f59e0b" style={{ marginLeft: 'auto' }} />}
                  </button>
                ))}
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.transferAmount}</label>
                <input
                  type="number"
                  value={transferAmt}
                  onChange={e => setTransferAmt(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              {/* Note */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.transferNote}</label>
                <input
                  value={transferNote}
                  onChange={e => setTransferNote(e.target.value)}
                  placeholder={lang === 'ja' ? 'ありがとう！' : 'Great work!'}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <button
                onClick={handleTransfer}
                disabled={!selectedRecipient || !transferAmt}
                style={{
                  width: '100%', padding: '13px', border: 'none', borderRadius: 12,
                  background: selectedRecipient ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#e5e7eb',
                  color: selectedRecipient ? '#fff' : '#9ca3af',
                  fontSize: 15, fontWeight: 700, cursor: selectedRecipient ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <Send size={17} /> {t.transferConfirm}
              </button>
            </>
          )}
        </div>
      )}

      {/* Tab: History */}
      {tab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {historyItems.map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: item.type === 'earn' ? '#f0fdf4' : item.type === 'transfer' ? '#fffbeb' : '#fef2f2',
              }}>
                {item.type === 'earn' && <ArrowUpRight size={16} color="#22c55e" />}
                {item.type === 'redeem' && <ArrowDownRight size={16} color="#ef4444" />}
                {item.type === 'transfer' && <Send size={15} color="#f59e0b" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>{lang === 'ja' ? item.descJa : item.descEn}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>{item.date}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: item.pts > 0 ? '#22c55e' : item.type === 'transfer' ? '#f59e0b' : '#ef4444' }}>
                {item.pts > 0 ? '+' : ''}{item.pts}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
