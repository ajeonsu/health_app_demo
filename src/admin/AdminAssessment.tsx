import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { Plus } from 'lucide-react';

const employees = [
  { id: 1, name: 'Yamada Taro', dept: 'Sales', deptJa: '営業部', grip: 85, balance: 78, flexibility: 72, endurance: 88, agility: 81, strength: 83 },
  { id: 2, name: 'Suzuki Hanako', dept: 'HR', deptJa: '人事部', grip: 70, balance: 88, flexibility: 90, endurance: 76, agility: 84, strength: 68 },
  { id: 3, name: 'Tanaka Ken', dept: 'Engineering', deptJa: '技術部', grip: 78, balance: 72, flexibility: 65, endurance: 80, agility: 75, strength: 80 },
  { id: 4, name: 'Ito Yuki', dept: 'Operations', deptJa: '運営部', grip: 82, balance: 76, flexibility: 70, endurance: 85, agility: 79, strength: 77 },
];

const deptAvg = { grip: 76, balance: 78, flexibility: 74, endurance: 82, agility: 80, strength: 77 };
const companyAvg = { grip: 74, balance: 76, flexibility: 72, endurance: 80, agility: 77, strength: 75 };

export default function AdminAssessment() {
  const { t, lang } = useLang();
  const [selectedId, setSelectedId] = useState(1);
  const [viewMode, setViewMode] = useState<'individual' | 'dept'>('individual');
  const [showForm, setShowForm] = useState(false);

  const selected = employees.find(e => e.id === selectedId)!;

  const indicators = [
    { key: 'grip', label: t.grip },
    { key: 'balance', label: t.balance },
    { key: 'flexibility', label: t.flexibility },
    { key: 'endurance', label: t.endurance },
    { key: 'agility', label: t.agility },
    { key: 'strength', label: t.strength },
  ];

  const radarData = indicators.map(ind => ({
    subject: ind.label,
    individual: selected[ind.key as keyof typeof selected] as number,
    deptAvg: deptAvg[ind.key as keyof typeof deptAvg],
    companyAvg: companyAvg[ind.key as keyof typeof companyAvg],
  }));

  const deptRadarData = indicators.map(ind => ({
    subject: ind.label,
    Sales: 82, HR: 78, Engineering: 76, Operations: 74,
  }));

  return (
    <div>
      {/* View Mode Toggle */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 3, gap: 2 }}>
          {[
            { id: 'individual' as const, label: t.viewIndividual },
            { id: 'dept' as const, label: t.viewDept },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              style={{
                padding: '7px 16px', borderRadius: 8, border: 'none',
                background: viewMode === v.id ? '#fff' : 'transparent',
                color: viewMode === v.id ? '#1e293b' : '#64748b',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                boxShadow: viewMode === v.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {t.addAssessment}
        </button>
      </div>

      {viewMode === 'individual' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
          {/* Employee List */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
            <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.adminEmployees}
            </p>
            {employees.map(emp => (
              <button
                key={emp.id}
                onClick={() => setSelectedId(emp.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10, border: 'none',
                  background: selectedId === emp.id ? '#eff6ff' : 'transparent',
                  cursor: 'pointer', marginBottom: 4, textAlign: 'left',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: '#e0e7ff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 16,
                }}>
                  {['🧑‍💼', '👩‍💼', '👨‍💻', '👩‍🔧'][emp.id - 1]}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{emp.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{lang === 'ja' ? emp.deptJa : emp.dept}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Radar Chart */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>{selected.name}</h3>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>{lang === 'ja' ? selected.deptJa : selected.dept}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Radar name={selected.name} dataKey="individual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name={t.deptAverage} dataKey="deptAvg" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeDasharray="4 2" />
                <Radar name={t.companyAverage} dataKey="companyAvg" stroke="#94a3b8" fill="none" strokeDasharray="2 2" />
              </RadarChart>
            </ResponsiveContainer>

            {/* Score Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
              {indicators.map(ind => (
                <div key={ind.key} style={{
                  background: '#f8fafc', borderRadius: 10, padding: '10px',
                  textAlign: 'center',
                }}>
                  <p style={{ margin: '0 0 4px', fontSize: 11, color: '#64748b' }}>{ind.label}</p>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#1e293b' }}>
                    {selected[ind.key as keyof typeof selected]}
                  </p>
                  <div style={{ marginTop: 4, height: 4, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${selected[ind.key as keyof typeof selected]}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Department Radar */
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{t.viewDept}</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={deptRadarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#374151' }} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Radar name={lang === 'ja' ? '営業' : 'Sales'} dataKey="Sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Radar name={lang === 'ja' ? '人事' : 'HR'} dataKey="HR" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              <Radar name={lang === 'ja' ? '技術' : 'Engineering'} dataKey="Engineering" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Radar name={lang === 'ja' ? '運営' : 'Operations'} dataKey="Operations" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Add Assessment Form */}
      {showForm && (
        <div style={{
          marginTop: 20, background: '#fff', borderRadius: 16, padding: 24,
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{t.addAssessment}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[t.employeeName, ...indicators.map(i => i.label)].map((label, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input
                  type={i === 0 ? 'text' : 'number'}
                  placeholder={i === 0 ? 'e.g. Yamada Taro' : '0–100'}
                  style={{
                    width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
                    borderRadius: 8, fontSize: 13, boxSizing: 'border-box',
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 10, border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{t.cancel}</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 10, border: 'none', borderRadius: 10, background: '#3b82f6', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.save}</button>
          </div>
        </div>
      )}
    </div>
  );
}
