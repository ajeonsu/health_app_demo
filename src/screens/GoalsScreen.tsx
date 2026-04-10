import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Footprints, Scale, Flame, Clock, Plus, CheckCircle2, Edit2 } from 'lucide-react';

interface Goal {
  id: number;
  type: 'steps' | 'weight' | 'calories' | 'active';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  done: boolean;
}

const initialGoals: Goal[] = [
  { id: 1, type: 'steps', targetValue: 10000, currentValue: 8432, unit: 'steps/day', deadline: '2026-04-30', done: false },
  { id: 2, type: 'weight', targetValue: 70, currentValue: 72.6, unit: 'kg', deadline: '2026-06-30', done: false },
  { id: 3, type: 'calories', targetValue: 2000, currentValue: 1840, unit: 'kcal/day', deadline: '2026-04-30', done: false },
  { id: 4, type: 'active', targetValue: 60, currentValue: 52, unit: 'min/day', deadline: '2026-05-31', done: false },
];

const goalConfig = {
  steps: { icon: <Footprints size={20} />, color: '#6366f1', bg: '#eef2ff', label: 'goalSteps' as const },
  weight: { icon: <Scale size={20} />, color: '#3b82f6', bg: '#eff6ff', label: 'goalWeight' as const },
  calories: { icon: <Flame size={20} />, color: '#f97316', bg: '#fff7ed', label: 'goalCalories' as const },
  active: { icon: <Clock size={20} />, color: '#10b981', bg: '#f0fdf4', label: 'goalActive' as const },
};

function CircleProgress({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - Math.min(pct / 100, 1) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f3f4f6" strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={8} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}

export default function GoalsScreen() {
  const { t, lang } = useLang();
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [filter, setFilter] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const daysLeft = (deadline: string) => {
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    return diff > 0 ? diff : 0;
  };

  const getPct = (g: Goal) => {
    if (g.type === 'weight') {
      // lower is better
      const start = 75.2;
      return Math.round(Math.min(((start - g.currentValue) / (start - g.targetValue)) * 100, 100));
    }
    return Math.round(Math.min((g.currentValue / g.targetValue) * 100, 100));
  };

  const filtered = goals.filter(g => {
    if (filter === 'inProgress') return !g.done;
    if (filter === 'completed') return g.done;
    return true;
  });

  const toggleDone = (id: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const typeLabels: Record<Goal['type'], string> = {
    steps: t.goalSteps,
    weight: t.goalWeight,
    calories: t.goalCalories,
    active: t.goalActive,
  };

  const unitLabels: Record<Goal['type'], string> = {
    steps: lang === 'ja' ? '歩/日' : 'steps/day',
    weight: 'kg',
    calories: 'kcal/day',
    active: lang === 'ja' ? '分/日' : 'min/day',
  };

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: 16, padding: '16px', color: '#fff' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, opacity: 0.85 }}>{t.inProgress}</p>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>{goals.filter(g => !g.done).length}</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.75 }}>{lang === 'ja' ? '目標進行中' : 'active goals'}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: 16, padding: '16px', color: '#fff' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, opacity: 0.85 }}>{t.completed}</p>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>{goals.filter(g => g.done).length}</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.75 }}>{lang === 'ja' ? '目標達成' : 'goals achieved'}</p>
        </div>
      </div>

      {/* Filter Tabs + Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10 }}>
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 10, padding: 3, flex: 1 }}>
          {[
            { id: 'all' as const, label: t.allGoals },
            { id: 'inProgress' as const, label: t.inProgress },
            { id: 'completed' as const, label: t.completed },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              flex: 1, padding: '6px 4px', borderRadius: 8, border: 'none',
              background: filter === f.id ? '#fff' : 'transparent',
              color: filter === f.id ? '#6366f1' : '#9ca3af',
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
              boxShadow: filter === f.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}>
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); }} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '8px 14px', borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          <Plus size={15} /> {t.addGoal}
        </button>
      </div>

      {/* Goal Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
        {filtered.map(goal => {
          const cfg = goalConfig[goal.type];
          const pct = getPct(goal);
          return (
            <div key={goal.id} style={{
              background: '#fff', borderRadius: 16, padding: '16px',
              border: `1px solid ${goal.done ? '#d1fae5' : '#f3f4f6'}`,
              boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
              opacity: goal.done ? 0.85 : 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Circle */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <CircleProgress pct={pct} color={goal.done ? '#10b981' : cfg.color} />
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)', textAlign: 'center',
                  }}>
                    {goal.done
                      ? <CheckCircle2 size={18} color="#10b981" />
                      : <span style={{ fontSize: 13, fontWeight: 800, color: cfg.color }}>{pct}%</span>
                    }
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{typeLabels[goal.type]}</span>
                    {goal.done && (
                      <span style={{ background: '#d1fae5', color: '#059669', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                        {t.goalComplete}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div style={{ background: '#f3f4f6', borderRadius: 6, height: 8, marginBottom: 6, overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(pct, 100)}%`, height: '100%',
                      background: goal.done ? '#10b981' : cfg.color, borderRadius: 6,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>
                      {t.goalCurrent}: <b style={{ color: '#374151' }}>{goal.currentValue} {unitLabels[goal.type]}</b>
                      &nbsp;→&nbsp;
                      {t.target}: <b style={{ color: cfg.color }}>{goal.targetValue} {unitLabels[goal.type]}</b>
                    </span>
                    <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>
                      {daysLeft(goal.deadline)} {t.goalDaysLeft}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button onClick={() => { setEditingId(goal.id); setShowForm(true); }} style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, padding: '6px', cursor: 'pointer', color: '#6b7280' }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => toggleDone(goal.id)} style={{
                    border: 'none', padding: '6px', borderRadius: 8, cursor: 'pointer',
                    background: goal.done ? '#f0fdf4' : '#f3f4f6',
                    color: goal.done ? '#10b981' : '#9ca3af',
                  }}>
                    <CheckCircle2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>
            {editingId ? t.editGoal : t.addGoal}
          </h3>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.goalType}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {(['steps', 'weight', 'calories', 'active'] as const).map(type => {
                const cfg = goalConfig[type];
                return (
                  <button key={type} style={{
                    padding: '10px', borderRadius: 10,
                    border: '1.5px solid #e5e7eb', background: cfg.bg,
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 600, color: cfg.color, cursor: 'pointer',
                  }}>
                    {cfg.icon} {typeLabels[type]}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.goalSetTarget}</label>
              <input type="number" placeholder="e.g. 10000" style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.date}</label>
              <input type="date" defaultValue="2026-05-31" style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 11, border: '1.5px solid #e5e7eb', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6b7280' }}>{t.cancel}</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 11, border: 'none', borderRadius: 10, background: 'linear-gradient(135deg, #667eea, #764ba2)', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.save}</button>
          </div>
        </div>
      )}
    </div>
  );
}
