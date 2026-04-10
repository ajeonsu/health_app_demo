import { useLang } from '../contexts/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, Footprints, Heart, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const weeklySteps = [
  { week: 'W1', sales: 7200, hr: 8100, eng: 9200, ops: 6500 },
  { week: 'W2', sales: 7800, hr: 8400, eng: 9500, ops: 7000 },
  { week: 'W3', sales: 8100, hr: 7900, eng: 8800, ops: 7200 },
  { week: 'W4', sales: 8600, hr: 8700, eng: 9100, ops: 7800 },
];

const riskData = [
  { name: '', value: 18, color: '#ef4444' },
  { name: '', value: 34, color: '#f59e0b' },
  { name: '', value: 48, color: '#22c55e' },
];

const topPerformers = [
  { name: 'Yamada Taro', dept: 'Sales', steps: 12450, score: 94 },
  { name: 'Suzuki Hanako', dept: 'HR', steps: 11230, score: 91 },
  { name: 'Tanaka Ken', dept: 'Engineering', steps: 10980, score: 89 },
  { name: 'Ito Yuki', dept: 'Operations', steps: 10540, score: 87 },
];

const deptData = [
  { dept: 'Sales', deptJa: '営業部', avg: 82, steps: 8600, participation: 88 },
  { dept: 'HR', deptJa: '人事部', avg: 79, steps: 8700, participation: 94 },
  { dept: 'Engineering', deptJa: '技術部', avg: 86, steps: 9100, participation: 91 },
  { dept: 'Operations', deptJa: '運営部', avg: 74, steps: 7800, participation: 76 },
];

export default function AdminDashboard() {
  const { t, lang } = useLang();

  riskData[0].name = t.highRisk;
  riskData[1].name = t.mediumRisk;
  riskData[2].name = t.lowRisk;

  const kpiCards = [
    { icon: <Users size={22} color="#3b82f6" />, label: t.totalEmployees, value: '248', sub: '+12 this month', bg: '#eff6ff', border: '#bfdbfe' },
    { icon: <Footprints size={22} color="#8b5cf6" />, label: t.avgSteps, value: '8,542', sub: '↑ 6% vs last week', bg: '#f5f3ff', border: '#ddd6fe' },
    { icon: <Heart size={22} color="#ef4444" />, label: t.avgHealthScore, value: '80.3', sub: '/ 100', bg: '#fef2f2', border: '#fecaca' },
    { icon: <TrendingUp size={22} color="#10b981" />, label: t.participationRate, value: '87%', sub: 'Survey response rate', bg: '#f0fdf4', border: '#bbf7d0' },
  ];

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {kpiCards.map((card, i) => (
          <div key={i} style={{
            background: '#fff',
            border: `1px solid ${card.border}`,
            borderRadius: 16,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {card.icon}
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 12, color: '#6b7280' }}>{card.label}</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1e293b' }}>{card.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 24 }}>
        {/* Steps Trend */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.stepsTrend}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklySteps}>
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={false} name={lang === 'ja' ? '営業' : 'Sales'} />
              <Line type="monotone" dataKey="hr" stroke="#8b5cf6" strokeWidth={2} dot={false} name={lang === 'ja' ? '人事' : 'HR'} />
              <Line type="monotone" dataKey="eng" stroke="#10b981" strokeWidth={2} dot={false} name={lang === 'ja' ? '技術' : 'Eng'} />
              <Line type="monotone" dataKey="ops" stroke="#f59e0b" strokeWidth={2} dot={false} name={lang === 'ja' ? '運営' : 'Ops'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.riskDistribution}</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={riskData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {riskData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val: number) => [`${val}%`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {riskData.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color }} />
                <span style={{ flex: 1, fontSize: 12, color: '#374151' }}>{r.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.departmentBreakdown}</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deptData} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey={lang === 'ja' ? 'deptJa' : 'dept'} tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} formatter={(val: number) => [`${val}`, t.avgHealthScore]} />
              <Bar dataKey="avg" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.topPerformers}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topPerformers.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: ['#fef9c3', '#f1f5f9', '#f1f5f9', '#f1f5f9'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: ['#ca8a04', '#64748b', '#64748b', '#64748b'][i],
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{p.dept} · {p.steps.toLocaleString()} steps</p>
                </div>
                <div style={{
                  padding: '3px 10px',
                  background: p.score >= 90 ? '#f0fdf4' : '#f8fafc',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: p.score >= 90 ? '#16a34a' : '#475569',
                }}>
                  {p.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <AlertTriangle size={20} color="#ef4444" />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#991b1b' }}>
            {lang === 'ja' ? '18名の従業員が高リスク判定です。コンサルティングシートを確認してください。' : '18 employees have been flagged as high-risk. Please review the Consulting Sheet.'}
          </p>
        </div>
        <CheckCircle2 size={18} color="#ef4444" style={{ cursor: 'pointer', flexShrink: 0 }} />
      </div>
    </div>
  );
}
