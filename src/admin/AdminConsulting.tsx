import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

const initialData = [
  { categoryEn: 'Health Screening', categoryJa: '健康診断費', budget: 3200000, actual: 3050000 },
  { categoryEn: 'Wellness Programs', categoryJa: 'ウェルネスプログラム', budget: 1800000, actual: 1650000 },
  { categoryEn: 'Consulting Fee', categoryJa: 'コンサルティング費', budget: 2400000, actual: 2400000 },
  { categoryEn: 'App Development', categoryJa: 'アプリ開発費', budget: 5000000, actual: 4800000 },
  { categoryEn: 'Other', categoryJa: 'その他', budget: 600000, actual: 520000 },
];

const deptSummary = [
  { dept: 'Sales', deptJa: '営業部', employees: 62, investment: 3200000, scoreAvg: 82, absenceRate: 2.1 },
  { dept: 'HR', deptJa: '人事部', employees: 28, investment: 1440000, scoreAvg: 79, absenceRate: 1.8 },
  { dept: 'Engineering', deptJa: '技術部', employees: 95, investment: 4900000, scoreAvg: 86, absenceRate: 1.5 },
  { dept: 'Operations', deptJa: '運営部', employees: 63, investment: 3240000, scoreAvg: 74, absenceRate: 3.2 },
];

export default function AdminConsulting() {
  const { t, lang } = useLang();
  const [rows, setRows] = useState(initialData);
  const [fiscalYear, setFiscalYear] = useState('2026');

  const totalBudget = rows.reduce((s, r) => s + r.budget, 0);
  const totalActual = rows.reduce((s, r) => s + r.actual, 0);
  const roi = (((totalBudget - totalActual) / totalBudget) * 100).toFixed(1);

  const chartData = rows.map(r => ({
    name: lang === 'ja' ? r.categoryJa : r.categoryEn,
    [t.budgetPlan]: r.budget / 10000,
    [t.actual]: r.actual / 10000,
  }));

  const fmt = (n: number) => `¥${(n / 10000).toFixed(0)}${lang === 'ja' ? '万' : 'W'}`;

  return (
    <div>
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{t.fiscalYear}:</label>
          <select
            value={fiscalYear}
            onChange={e => setFiscalYear(e.target.value)}
            style={{ padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff', cursor: 'pointer' }}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Download size={16} /> {t.exportCSV}
        </button>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: t.totalInvestment, value: fmt(totalBudget), sub: t.budgetPlan, color: '#3b82f6' },
          { label: t.actual, value: fmt(totalActual), sub: `${((totalActual / totalBudget) * 100).toFixed(0)}% of budget`, color: '#8b5cf6' },
          { label: t.roi, value: `${roi}%`, sub: t.autoCalc, color: '#10b981', icon: <TrendingUp size={16} color="#10b981" /> },
        ].map((card, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '16px 18px',
            border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: '#6b7280' }}>{card.label}</p>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</p>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#9ca3af' }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 24, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.investmentInput}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barGap={4}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} formatter={(val: number) => [`¥${val}万`, '']} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey={t.budgetPlan} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey={t.actual} fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Editable Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.investmentInput}</h3>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{t.autoCalc}</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[t.category, `${t.budgetPlan} (¥)`, `${t.actual} (¥)`, 'Variance'].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const variance = row.actual - row.budget;
              return (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500, color: '#374151' }}>
                    {lang === 'ja' ? row.categoryJa : row.categoryEn}
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <input
                      value={row.budget.toLocaleString()}
                      onChange={e => {
                        const val = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
                        setRows(prev => prev.map((r, j) => j === i ? { ...r, budget: val } : r));
                      }}
                      style={{
                        width: 130, padding: '5px 8px', border: '1.5px solid #e2e8f0',
                        borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none',
                      }}
                    />
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <input
                      value={row.actual.toLocaleString()}
                      onChange={e => {
                        const val = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
                        setRows(prev => prev.map((r, j) => j === i ? { ...r, actual: val } : r));
                      }}
                      style={{
                        width: 130, padding: '5px 8px', border: '1.5px solid #e2e8f0',
                        borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none',
                      }}
                    />
                  </td>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700, color: variance > 0 ? '#ef4444' : '#22c55e' }}>
                    {variance > 0 ? '+' : ''}{(variance / 10000).toFixed(0)}万
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>TOTAL</td>
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 800, color: '#3b82f6' }}>¥{(totalBudget / 10000).toFixed(0)}万</td>
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 800, color: '#10b981' }}>¥{(totalActual / 10000).toFixed(0)}万</td>
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: totalActual < totalBudget ? '#22c55e' : '#ef4444' }}>
                {((totalActual - totalBudget) / 10000).toFixed(0)}万
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Dept Summary */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.deptSummary}</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {[t.department, t.totalEmployees, t.totalInvestment, t.avgHealthScore, lang === 'ja' ? '欠勤率' : 'Absence Rate'].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#6b7280', textAlign: 'left', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deptSummary.map((row, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{lang === 'ja' ? row.deptJa : row.dept}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, color: '#374151' }}>{row.employees}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#3b82f6' }}>¥{(row.investment / 10000).toFixed(0)}万</td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700, color: row.scoreAvg >= 80 ? '#22c55e' : row.scoreAvg >= 75 ? '#f59e0b' : '#ef4444' }}>{row.scoreAvg}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, color: row.absenceRate > 2.5 ? '#ef4444' : '#374151' }}>{row.absenceRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
