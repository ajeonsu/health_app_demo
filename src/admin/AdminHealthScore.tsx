import { useLang } from '../contexts/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { AlertTriangle, CheckCircle2, MinusCircle, User } from 'lucide-react';

const employees = [
  { name: 'Kato Shin', dept: 'Sales', deptJa: '営業部', lifestyle: 58, mental: 52, physical: 65, nutrition: 55, overall: 57, risk: 'high' },
  { name: 'Mori Akiko', dept: 'HR', deptJa: '人事部', lifestyle: 62, mental: 58, physical: 70, nutrition: 60, overall: 62, risk: 'high' },
  { name: 'Yamada Taro', dept: 'Sales', deptJa: '営業部', lifestyle: 88, mental: 90, physical: 85, nutrition: 86, overall: 87, risk: 'low' },
  { name: 'Suzuki Hanako', dept: 'HR', deptJa: '人事部', lifestyle: 80, mental: 84, physical: 88, nutrition: 79, overall: 83, risk: 'low' },
  { name: 'Ono Ryu', dept: 'Operations', deptJa: '運営部', lifestyle: 70, mental: 68, physical: 72, nutrition: 65, overall: 69, risk: 'medium' },
  { name: 'Hayashi Mei', dept: 'Engineering', deptJa: '技術部', lifestyle: 73, mental: 71, physical: 76, nutrition: 70, overall: 72, risk: 'medium' },
];

const riskConfig = {
  high: { color: '#ef4444', bg: '#fef2f2', icon: <AlertTriangle size={14} color="#ef4444" />, labelEn: 'High Risk', labelJa: '高リスク' },
  medium: { color: '#f59e0b', bg: '#fffbeb', icon: <MinusCircle size={14} color="#f59e0b" />, labelEn: 'Medium', labelJa: '中リスク' },
  low: { color: '#22c55e', bg: '#f0fdf4', icon: <CheckCircle2 size={14} color="#22c55e" />, labelEn: 'Low Risk', labelJa: '低リスク' },
};

export default function AdminHealthScore() {
  const { t, lang } = useLang();

  const indicators = [
    { key: 'lifestyle', label: t.lifestyle },
    { key: 'mental', label: t.mental },
    { key: 'physical', label: t.physical },
    { key: 'nutrition2', label: t.nutrition2 },
  ];

  const avgData = indicators.map(ind => ({
    name: ind.label,
    company: Math.round(employees.reduce((s, e) => s + (e[ind.key as keyof typeof e] as number), 0) / employees.length),
  }));

  const highRisk = employees.filter(e => e.risk === 'high');
  const others = employees.filter(e => e.risk !== 'high');

  return (
    <div>
      {/* Score Breakdown Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.scoreBreakdown}</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={avgData} barSize={28}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} />
              <Bar dataKey="company" radius={[6, 6, 0, 0]}>
                {avgData.map((_, i) => (
                  <Cell key={i} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Summary */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.riskDistribution}</h3>
          {(['high', 'medium', 'low'] as const).map(risk => {
            const cfg = riskConfig[risk];
            const count = employees.filter(e => e.risk === risk).length;
            const pct = Math.round((count / employees.length) * 100);
            return (
              <div key={risk} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {cfg.icon}
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                      {lang === 'ja' ? cfg.labelJa : cfg.labelEn}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{count} ({pct}%)</span>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: cfg.color, borderRadius: 6 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High Risk Alert */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #fecaca', marginBottom: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={16} color="#ef4444" /> {t.identify}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {highRisk.map((emp, i) => (
            <div key={i} style={{
              background: '#fef2f2', borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} color="#ef4444" />
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#991b1b' }}>{emp.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: '#b91c1c' }}>{lang === 'ja' ? emp.deptJa : emp.dept}</p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {indicators.map(ind => (
                  <div key={ind.key} style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 10, color: '#9ca3af' }}>{ind.label}</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#ef4444' }}>
                      {emp[ind.key as keyof typeof emp]}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{
                padding: '4px 12px', borderRadius: 20,
                background: '#ef4444', color: '#fff',
                fontSize: 13, fontWeight: 800,
              }}>
                {emp.overall}
              </div>
              <button style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #ef4444', background: '#fff', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {t.viewProfile}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Employees Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.adminEmployees}</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[t.employeeName, t.department, t.lifestyle, t.mental, t.physical, t.nutrition2, t.overall, t.riskLevel].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...highRisk, ...others].map((emp, i) => {
              const cfg = riskConfig[emp.risk as keyof typeof riskConfig];
              return (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{emp.name}</td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: '#6b7280' }}>{lang === 'ja' ? emp.deptJa : emp.dept}</td>
                  {[emp.lifestyle, emp.mental, emp.physical, emp.nutrition].map((val, j) => (
                    <td key={j} style={{ padding: '11px 14px', fontSize: 13, fontWeight: 600, color: val < 65 ? '#ef4444' : val < 75 ? '#f59e0b' : '#22c55e' }}>{val}</td>
                  ))}
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: emp.overall < 65 ? '#ef4444' : emp.overall < 75 ? '#f59e0b' : '#22c55e' }}>
                      {emp.overall}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 20,
                      background: cfg.bg, color: cfg.color,
                      fontSize: 11, fontWeight: 600,
                    }}>
                      {cfg.icon} {lang === 'ja' ? cfg.labelJa : cfg.labelEn}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
