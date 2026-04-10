import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line,
} from 'recharts';
import { Footprints, Flame, Route, Clock, Star, Trophy, ChevronRight } from 'lucide-react';

const weekData = [
  { day: 'Mon', steps: 6200 },
  { day: 'Tue', steps: 8100 },
  { day: 'Wed', steps: 7500 },
  { day: 'Thu', steps: 9200 },
  { day: 'Fri', steps: 7800 },
  { day: 'Sat', steps: 5400 },
  { day: 'Sun', steps: 10200 },
];

const weekDataJa = [
  { day: '月', steps: 6200 },
  { day: '火', steps: 8100 },
  { day: '水', steps: 7500 },
  { day: '木', steps: 9200 },
  { day: '金', steps: 7800 },
  { day: '土', steps: 5400 },
  { day: '日', steps: 10200 },
];

const monthData = [
  { day: '4/1', steps: 7200 }, { day: '4/2', steps: 8500 }, { day: '4/3', steps: 6800 },
  { day: '4/4', steps: 9100 }, { day: '4/5', steps: 10200 }, { day: '4/6', steps: 5400 },
  { day: '4/7', steps: 7800 }, { day: '4/8', steps: 8900 }, { day: '4/9', steps: 7600 },
  { day: '4/10', steps: 8432 },
];

type ViewMode = 'day' | 'week' | 'month';

export default function StepsScreen() {
  const { t, lang } = useLang();
  const [view, setView] = useState<ViewMode>('week');

  const todaySteps = 8432;
  const dailyGoal = 10000;
  const pct = Math.round((todaySteps / dailyGoal) * 100);

  // Point milestones based on step count
  const milestones = [
    { steps: 5000,  pts: 20,  label: lang === 'ja' ? '5,000歩達成' : '5,000 Steps' },
    { steps: 8000,  pts: 35,  label: lang === 'ja' ? '8,000歩達成' : '8,000 Steps' },
    { steps: 10000, pts: 50,  label: lang === 'ja' ? '10,000歩達成' : '10,000 Steps' },
    { steps: 15000, pts: 80,  label: lang === 'ja' ? '15,000歩達成' : '15,000 Steps' },
  ];
  const earned = milestones.filter(m => todaySteps >= m.steps);
  const totalPtsToday = earned.reduce((s, m) => s + m.pts, 0);
  const nextMilestone = milestones.find(m => todaySteps < m.steps);
  const stepsToNext = nextMilestone ? nextMilestone.steps - todaySteps : 0;
  const weeklyPts = 270; // accumulated this week
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const totalMonth = monthData.reduce((s, d) => s + d.steps, 0);
  const bestDay = Math.max(...monthData.map(d => d.steps));
  const avgDay = Math.round(totalMonth / monthData.length);

  const currentWeekData = lang === 'ja' ? weekDataJa : weekData;

  const stats = [
    { icon: <Route size={18} color="#3b82f6" />, label: t.distance, value: '6.2', unit: t.km },
    { icon: <Flame size={18} color="#f97316" />, label: t.calories, value: '412', unit: t.kcal },
    { icon: <Clock size={18} color="#8b5cf6" />, label: t.activeTime, value: '52', unit: t.min },
  ];

  const tabs: { id: ViewMode; label: string }[] = [
    { id: 'day', label: t.viewDay },
    { id: 'week', label: t.viewWeek },
    { id: 'month', label: t.viewMonth },
  ];

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Circular Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke="url(#stepGrad)"
              strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            <defs>
              <linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" /><stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <Footprints size={24} color="#6366f1" style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1f2937', lineHeight: 1 }}>{todaySteps.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t.stepsToday}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6366f1', marginTop: 4 }}>{pct}%</div>
          </div>
        </div>
      </div>

      {/* Daily Goal */}
      <div style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', borderRadius: 16, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#4338ca' }}>{t.dailyGoal}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#4338ca' }}>{dailyGoal.toLocaleString()} {t.stepsUnit}</span>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 14, padding: '12px 8px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1f2937' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>{s.unit}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Points Linkage Panel ─────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #fef9c3, #fef3c7)',
        border: '1.5px solid #fde68a',
        borderRadius: 16,
        padding: '14px 16px',
        marginBottom: 20,
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>
              {lang === 'ja' ? '本日獲得ポイント' : "Today's Points Earned"}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: 18, fontWeight: 800, color: '#d97706' }}>+{totalPtsToday}</span>
            <span style={{ fontSize: 12, color: '#92400e' }}>pts</span>
          </div>
        </div>

        {/* Milestone progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {milestones.map((m, i) => {
            const done = todaySteps >= m.steps;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 20,
                background: done ? '#f59e0b' : 'rgba(245,158,11,0.12)',
                border: `1px solid ${done ? '#d97706' : '#fde68a'}`,
              }}>
                {done
                  ? <Trophy size={11} color="#fff" fill="#fff" />
                  : <Star size={11} color="#d97706" />}
                <span style={{ fontSize: 11, fontWeight: 700, color: done ? '#fff' : '#b45309' }}>
                  {m.label} +{m.pts}pts
                </span>
              </div>
            );
          })}
        </div>

        {/* Next milestone progress bar */}
        {nextMilestone && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: '#92400e', fontWeight: 600 }}>
                {lang === 'ja'
                  ? `次のマイルストーンまであと ${stepsToNext.toLocaleString()} 歩 → +${nextMilestone.pts} pts`
                  : `${stepsToNext.toLocaleString()} more steps → +${nextMilestone.pts} pts`}
              </span>
              <span style={{ fontSize: 11, color: '#b45309', fontWeight: 700 }}>
                {Math.round((todaySteps / nextMilestone.steps) * 100)}%
              </span>
            </div>
            <div style={{ background: 'rgba(245,158,11,0.2)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min((todaySteps / nextMilestone.steps) * 100, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                borderRadius: 6,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* Weekly summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1px solid #fde68a' }}>
          <span style={{ fontSize: 11, color: '#92400e' }}>
            {lang === 'ja' ? '今週の歩数ポイント合計' : 'Total step points this week'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#d97706' }}>{weeklyPts} pts</span>
            <ChevronRight size={14} color="#d97706" />
          </div>
        </div>
      </div>
      {/* ── End Points Linkage Panel ─────────────────────────── */}

      {/* View Tabs */}
      <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 3, marginBottom: 16 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setView(tab.id)} style={{
            flex: 1, padding: '8px', borderRadius: 9, border: 'none',
            background: view === tab.id ? '#fff' : 'transparent',
            color: view === tab.id ? '#6366f1' : '#9ca3af',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: view === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
        {view === 'week' && (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#1f2937' }}>{t.weeklySteps}</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={currentWeekData} barSize={20}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} formatter={(val: unknown) => [`${(val as number).toLocaleString()}`, t.stepsUnit]} />
                <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
                  {currentWeekData.map((_, index) => (
                    <Cell key={index} fill={index === currentWeekData.length - 1 ? '#6366f1' : '#c7d2fe'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {view === 'day' && (
          <>
            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: '#1f2937' }}>{t.stepsToday}</p>
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#9ca3af' }}>April 10, 2026</p>
            {/* Hourly breakdown */}
            <ResponsiveContainer width="100%" height={160}>
              <BarChart barSize={14} data={[
                { h: '6AM', s: 820 }, { h: '8AM', s: 1240 }, { h: '10AM', s: 980 },
                { h: '12PM', s: 1600 }, { h: '2PM', s: 740 }, { h: '4PM', s: 1200 },
                { h: '6PM', s: 1052 }, { h: '8PM', s: 800 },
              ]}>
                <XAxis dataKey="h" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} formatter={(val: unknown) => [`${val}`, t.stepsUnit]} />
                <Bar dataKey="s" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {view === 'month' && (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#1f2937' }}>{t.monthlySteps} — April 2026</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={monthData}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} interval={2} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} formatter={(val: unknown) => [`${(val as number).toLocaleString()}`, t.stepsUnit]} />
                <Line type="monotone" dataKey="steps" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            {/* Monthly stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 16 }}>
              {[
                { label: t.totalMonthSteps, value: totalMonth.toLocaleString() },
                { label: t.bestDay, value: bestDay.toLocaleString() },
                { label: t.avgPerDay, value: avgDay.toLocaleString() },
              ].map((stat, i) => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 10, color: '#9ca3af' }}>{stat.label}</p>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#6366f1' }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
        {t.connectedTo}: {t.appleHealth} / {t.googleFit}
      </p>
    </div>
  );
}
