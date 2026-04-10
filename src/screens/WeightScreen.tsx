import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Scale, Target, Plus, Edit2, CheckCircle2 } from 'lucide-react';

const initialHistory = [
  { date: '3/1',  weight: 75.2 },
  { date: '3/5',  weight: 74.8 },
  { date: '3/10', weight: 74.5 },
  { date: '3/15', weight: 74.1 },
  { date: '3/20', weight: 73.9 },
  { date: '3/25', weight: 73.6 },
  { date: '4/1',  weight: 73.2 },
  { date: '4/5',  weight: 72.9 },
  { date: '4/10', weight: 72.6 },
];

const HEIGHT_M = 1.74; // user's height from profile (174 cm)

function calcBMI(weightKg: number) {
  return parseFloat((weightKg / (HEIGHT_M * HEIGHT_M)).toFixed(1));
}

function bmiCategory(bmi: number, lang: string) {
  if (bmi < 18.5) return lang === 'ja' ? '低体重' : 'Underweight';
  if (bmi < 25)   return lang === 'ja' ? '普通体重' : 'Normal Weight';
  if (bmi < 30)   return lang === 'ja' ? '過体重' : 'Overweight';
  return lang === 'ja' ? '肥満' : 'Obese';
}

function bmiColor(bmi: number) {
  if (bmi < 18.5) return '#3b82f6';
  if (bmi < 25)   return '#22c55e';
  if (bmi < 30)   return '#f59e0b';
  return '#ef4444';
}

export default function WeightScreen() {
  const { t, lang } = useLang();

  const [history, setHistory] = useState(initialHistory);
  const [newWeight, setNewWeight] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const [logSaved, setLogSaved] = useState(false);

  const [targetWeight, setTargetWeight] = useState(70.0);
  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState('70.0');

  const current = history[history.length - 1].weight;
  const bmi = calcBMI(current);
  const startWeight = initialHistory[0].weight;
  const progress = Math.round(Math.min(((startWeight - current) / (startWeight - targetWeight)) * 100, 100));

  const handleSaveWeight = () => {
    const val = parseFloat(newWeight);
    if (!val || val < 30 || val > 300) return;
    const today = new Date();
    const label = `${today.getMonth() + 1}/${today.getDate()}`;
    setHistory(prev => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last.date === label) {
        updated[updated.length - 1] = { date: label, weight: val };
      } else {
        updated.push({ date: label, weight: val });
      }
      return updated;
    });
    setLogSaved(true);
    setNewWeight('');
    setTimeout(() => { setLogSaved(false); setShowLogForm(false); }, 1500);
  };

  const handleSaveTarget = () => {
    const val = parseFloat(targetInput);
    if (!val || val < 30 || val > 300) return;
    setTargetWeight(val);
    setEditingTarget(false);
  };

  const yDomain: [number, number] = [
    Math.floor(Math.min(...history.map(h => h.weight), targetWeight) - 1),
    Math.ceil(Math.max(...history.map(h => h.weight)) + 1),
  ];

  return (
    <div style={{ padding: '20px 16px 100px' }}>

      {/* ── Current Weight + Auto BMI ──────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        borderRadius: 20, padding: 20, color: '#fff', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 13, opacity: 0.85 }}>{t.currentWeight}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 40, fontWeight: 800 }}>{current}</span>
              <span style={{ fontSize: 18, opacity: 0.8 }}>kg</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.75 }}>
              {lang === 'ja' ? `身長 ${HEIGHT_M * 100} cm` : `Height: ${HEIGHT_M * 100} cm`}
            </p>
          </div>
          <Scale size={52} color="rgba(255,255,255,0.25)" />
        </div>

        {/* Auto-calculated BMI */}
        <div style={{
          marginTop: 14,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 14, padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backdropFilter: 'blur(4px)',
        }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 11, opacity: 0.8 }}>
              {lang === 'ja' ? 'BMI（自動計算）' : 'BMI (Auto-calculated)'}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 800 }}>{bmi}</span>
              <span style={{ fontSize: 12, background: bmiColor(bmi), padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>
                {bmiCategory(bmi, lang)}
              </span>
            </div>
          </div>
          {/* BMI scale bar */}
          <div style={{ width: 90 }}>
            <div style={{ display: 'flex', height: 8, borderRadius: 6, overflow: 'hidden', gap: 1 }}>
              {['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c, opacity: bmi < [18.5, 25, 30, 100][i] && (i === 0 || bmi >= [0, 18.5, 25, 30][i]) ? 1 : 0.3 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              {['18.5', '25', '30'].map(v => <span key={v} style={{ fontSize: 8, opacity: 0.7 }}>{v}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* ── Target Weight Setting ─────────────────────── */}
      <div style={{
        background: '#fff', border: '1px solid #f3f4f6',
        borderRadius: 16, padding: 16, marginBottom: 20,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Target size={16} color="#6366f1" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{t.weightGoalProgress}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#6366f1' }}>{progress}%</span>
        </div>

        <div style={{ background: '#f3f4f6', borderRadius: 8, height: 10, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{
            width: `${Math.max(progress, 0)}%`, height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: 8, transition: 'width 0.5s ease',
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{t.current}: <b style={{ color: '#374151' }}>{current} kg</b></span>

          {/* Editable target weight */}
          {editingTarget ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="number"
                step="0.5"
                value={targetInput}
                onChange={e => setTargetInput(e.target.value)}
                autoFocus
                style={{
                  width: 70, padding: '4px 8px', border: '1.5px solid #6366f1',
                  borderRadius: 8, fontSize: 13, fontFamily: 'inherit',
                  outline: 'none', textAlign: 'center',
                }}
              />
              <span style={{ fontSize: 12, color: '#6b7280' }}>kg</span>
              <button onClick={handleSaveTarget} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6366f1', padding: 0 }}>
                <CheckCircle2 size={20} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>
                {t.targetWeight}: <b style={{ color: '#6366f1' }}>{targetWeight} kg</b>
              </span>
              <button
                onClick={() => { setTargetInput(String(targetWeight)); setEditingTarget(true); }}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
                title={lang === 'ja' ? '目標を変更' : 'Edit target'}
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Historical Trend Graph ────────────────────── */}
      <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{t.weightHistory}</h3>
      <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={history}>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis domain={yDomain} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip
              contentStyle={{ borderRadius: 10, fontSize: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
              formatter={(val: number) => [`${val} kg`, '']}
            />
            <ReferenceLine y={targetWeight} stroke="#6366f1" strokeDasharray="4 4" strokeWidth={1.5}
              label={{ value: `${lang === 'ja' ? '目標' : 'Target'} ${targetWeight}kg`, position: 'right', fontSize: 10, fill: '#6366f1' }}
            />
            <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2.5}
              dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
          — — {t.targetWeight}: {targetWeight} kg
        </p>
      </div>

      {/* ── Log New Weight ────────────────────────────── */}
      <button onClick={() => setShowLogForm(!showLogForm)} style={{
        width: '100%', padding: '14px',
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        border: 'none', borderRadius: 14, color: '#fff',
        fontSize: 15, fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16,
      }}>
        <Plus size={18} /> {t.logNewWeight}
      </button>

      {showLogForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {logSaved ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <CheckCircle2 size={40} color="#22c55e" style={{ margin: '0 auto 8px' }} />
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#22c55e' }}>
                {lang === 'ja' ? `${newWeight || current} kg を記録しました！BMI: ${calcBMI(parseFloat(newWeight) || current)}` : `Logged ${newWeight || current} kg · BMI: ${calcBMI(parseFloat(newWeight) || current)}`}
              </p>
            </div>
          ) : (
            <>
              <p style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.logNewWeight}</p>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  {t.weightKg}
                </label>
                <input
                  value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                  type="number"
                  step="0.1"
                  placeholder={`e.g. ${current}`}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 16, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              {/* Live BMI preview */}
              {newWeight && !isNaN(parseFloat(newWeight)) && (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  borderRadius: 10, padding: '10px 14px', marginBottom: 14,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, color: '#374151' }}>
                    {lang === 'ja' ? 'BMI（自動計算）' : 'BMI (Auto-calculated)'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#1f2937' }}>
                      {calcBMI(parseFloat(newWeight))}
                    </span>
                    <span style={{ fontSize: 12, background: bmiColor(calcBMI(parseFloat(newWeight))), color: '#fff', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>
                      {bmiCategory(calcBMI(parseFloat(newWeight)), lang)}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setShowLogForm(false); setNewWeight(''); }} style={{ flex: 1, padding: 12, border: '1.5px solid #e5e7eb', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6b7280' }}>
                  {t.cancel}
                </button>
                <button onClick={handleSaveWeight} style={{ flex: 1, padding: 12, border: 'none', borderRadius: 10, background: '#3b82f6', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                  {t.addEntry}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
