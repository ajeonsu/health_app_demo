import { useLang } from '../contexts/LanguageContext';
import { Footprints, Scale, UtensilsCrossed, Bell, Flame, Trophy, TrendingUp, Target, Video } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Screen = 'home' | 'steps' | 'weight' | 'nutrition' | 'points' | 'chat' | 'goals' | 'videos';

interface Props {
  onNavigate: (s: Screen) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  const { t } = useLang();

  const weekData = [
    { day: t.monday, steps: 6200 },
    { day: t.tuesday, steps: 8100 },
    { day: t.wednesday, steps: 7500 },
    { day: t.thursday, steps: 9200 },
    { day: t.friday, steps: 7800 },
    { day: t.saturday, steps: 5400 },
    { day: t.sunday, steps: 10200 },
  ];

  const summaryCards = [
    { icon: <Footprints size={20} color="#6366f1" />, label: t.stepsToday, value: '8,432', sub: t.stepsUnit, bg: '#eef2ff' },
    { icon: <Flame size={20} color="#f97316" />, label: t.calories, value: '1,840', sub: t.kcal, bg: '#fff7ed' },
    { icon: <Trophy size={20} color="#eab308" />, label: t.totalPoints, value: '2,150', sub: t.pts, bg: '#fefce8' },
    { icon: <TrendingUp size={20} color="#22c55e" />, label: t.healthScore, value: '82', sub: '/ 100', bg: '#f0fdf4' },
  ];

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Greeting Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '24px 20px 28px',
        color: '#fff',
      }}>
        <p style={{ margin: '0 0 2px', fontSize: 14, opacity: 0.85 }}>{t.goodMorning},</p>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Yamada Taro</h2>
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '8px 16px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>12</span>
            <span style={{ fontSize: 12, display: 'block', opacity: 0.85 }}>{t.streak}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '8px 16px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: 20, fontWeight: 800 }}>82%</span>
            <span style={{ fontSize: 12, display: 'block', opacity: 0.85 }}>{t.achieved}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {/* Summary Cards */}
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{t.todaySummary}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {summaryCards.map((card, i) => (
            <div key={i} style={{
              background: card.bg,
              borderRadius: 16,
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                {card.icon}
                <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{card.label}</span>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#1f2937' }}>{card.value}</span>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{card.sub}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{t.quickActions}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { label: t.logMeal, icon: <UtensilsCrossed size={18} />, screen: 'nutrition' as Screen, color: '#10b981' },
            { label: t.logWeight, icon: <Scale size={18} />, screen: 'weight' as Screen, color: '#3b82f6' },
            { label: t.viewGoals, icon: <Target size={18} />, screen: 'goals' as Screen, color: '#8b5cf6' },
            { label: t.videosNav, icon: <Video size={18} />, screen: 'videos' as Screen, color: '#ef4444' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.screen)}
              style={{
                background: '#fff',
                border: '1.5px solid #f3f4f6',
                borderRadius: 14,
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <span style={{ color: action.color }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>

        {/* Weekly Chart */}
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{t.weeklyOverview}</h3>
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', marginBottom: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weekData} barSize={18}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                formatter={(val: unknown) => [`${(val as number).toLocaleString()} steps`, '']}
              />
              <Bar dataKey="steps" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notifications */}
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Bell size={16} color="#6366f1" /> {t.notifications}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[t.notif1, t.notif2, t.notif3].map((notif, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid #f3f4f6',
              borderLeft: '3px solid #6366f1',
              borderRadius: '0 12px 12px 0',
              padding: '10px 14px',
              fontSize: 13,
              color: '#374151',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              {notif}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
