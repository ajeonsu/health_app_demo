import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

const surveys = [
  {
    id: 1,
    nameEn: 'Monthly Stress Check', nameJa: '月次ストレスチェック',
    active: true, responses: 214, total: 248,
    results: [
      { label: 'Very Low', labelJa: '非常に低い', val: 38 },
      { label: 'Low', labelJa: '低い', val: 72 },
      { label: 'Medium', labelJa: '中程度', val: 68 },
      { label: 'High', labelJa: '高い', val: 28 },
      { label: 'Very High', labelJa: '非常に高い', val: 8 },
    ],
  },
  {
    id: 2,
    nameEn: 'Sleep Quality Survey', nameJa: '睡眠の質サーベイ',
    active: true, responses: 189, total: 248,
    results: [
      { label: 'Excellent', labelJa: '優秀', val: 30 },
      { label: 'Good', labelJa: '良い', val: 84 },
      { label: 'Fair', labelJa: '普通', val: 52 },
      { label: 'Poor', labelJa: '悪い', val: 23 },
    ],
  },
  {
    id: 3,
    nameEn: 'Work-Life Balance Check', nameJa: 'ワークライフバランスチェック',
    active: false, responses: 0, total: 248,
    results: [],
  },
  {
    id: 4,
    nameEn: 'Workplace Satisfaction', nameJa: '職場満足度調査',
    active: true, responses: 201, total: 248,
    results: [
      { label: 'Very Satisfied', labelJa: '非常に満足', val: 62 },
      { label: 'Satisfied', labelJa: '満足', val: 88 },
      { label: 'Neutral', labelJa: '普通', val: 34 },
      { label: 'Unsatisfied', labelJa: '不満', val: 17 },
    ],
  },
];

export default function AdminSurvey() {
  const { t, lang } = useLang();
  const [surveyList, setSurveyList] = useState(surveys);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const toggleSurvey = (id: number) => {
    setSurveyList(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const selected = surveyList.find(s => s.id === selectedId);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 18px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {t.createSurvey}
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{t.createSurvey}</h3>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.surveyName}</label>
            <input
              placeholder={lang === 'ja' ? 'サーベイ名を入力...' : 'Enter survey name...'}
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: 9, border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{t.cancel}</button>
            <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: 9, border: 'none', borderRadius: 8, background: '#3b82f6', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.save}</button>
          </div>
        </div>
      )}

      {/* Survey List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {surveyList.map(survey => (
          <div key={survey.id} style={{
            background: '#fff', borderRadius: 14, padding: '16px 20px',
            border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
                {lang === 'ja' ? survey.nameJa : survey.nameEn}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#9ca3af' }}>
                {t.responses}: {survey.responses} / {survey.total}
                &nbsp;&nbsp;·&nbsp;&nbsp;
                {t.responseRate}: {survey.total > 0 ? Math.round((survey.responses / survey.total) * 100) : 0}%
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ background: '#f1f5f9', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.round((survey.responses / survey.total) * 100)}%`,
                  height: '100%',
                  background: survey.active ? '#3b82f6' : '#94a3b8',
                  borderRadius: 6,
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: survey.active ? '#f0fdf4' : '#f1f5f9',
                color: survey.active ? '#16a34a' : '#94a3b8',
              }}>
                {survey.active ? t.active : t.inactive}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setSelectedId(selectedId === survey.id ? null : survey.id)}
                style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#374151' }}
              >
                <Eye size={14} /> {t.viewResults}
              </button>
              <button
                onClick={() => toggleSurvey(survey.id)}
                style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#374151' }}
              >
                {survey.active ? <ToggleRight size={14} color="#10b981" /> : <ToggleLeft size={14} color="#9ca3af" />}
                {t.toggleStatus}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Survey Results Chart */}
      {selected && selected.results.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>
            {t.surveyResults}: {lang === 'ja' ? selected.nameJa : selected.nameEn}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={selected.results.map(r => ({ name: lang === 'ja' ? r.labelJa : r.label, value: r.val }))} barSize={32}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
