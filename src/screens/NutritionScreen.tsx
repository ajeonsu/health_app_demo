import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Search } from 'lucide-react';

const meals = {
  breakfast: [
    { name: 'Oatmeal', nameJa: 'オートミール', cal: 320, protein: 12, carbs: 54, fat: 6 },
    { name: 'Banana', nameJa: 'バナナ', cal: 90, protein: 1, carbs: 23, fat: 0 },
  ],
  lunch: [
    { name: 'Grilled Chicken Rice', nameJa: 'チキンライス', cal: 520, protein: 38, carbs: 58, fat: 10 },
    { name: 'Salad', nameJa: 'サラダ', cal: 85, protein: 3, carbs: 10, fat: 4 },
  ],
  dinner: [
    { name: 'Salmon & Veggies', nameJa: 'サーモンと野菜', cal: 480, protein: 42, carbs: 22, fat: 18 },
  ],
  snacks: [
    { name: 'Protein Bar', nameJa: 'プロテインバー', cal: 190, protein: 15, carbs: 20, fat: 5 },
  ],
};

export default function NutritionScreen() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('lunch');

  const totalCal = Object.values(meals).flat().reduce((s, m) => s + m.cal, 0);
  const totalProtein = Object.values(meals).flat().reduce((s, m) => s + m.protein, 0);
  const totalCarbs = Object.values(meals).flat().reduce((s, m) => s + m.carbs, 0);
  const totalFat = Object.values(meals).flat().reduce((s, m) => s + m.fat, 0);

  const calorieGoal = 2000;
  const remaining = calorieGoal - totalCal;

  const macroData = [
    { name: t.protein, value: totalProtein, color: '#6366f1' },
    { name: t.carbs, value: totalCarbs, color: '#3b82f6' },
    { name: t.fat, value: totalFat, color: '#f97316' },
  ];

  const tabs = [
    { key: 'breakfast' as const, label: t.breakfast },
    { key: 'lunch' as const, label: t.lunch },
    { key: 'dinner' as const, label: t.dinner },
    { key: 'snacks' as const, label: t.snacks },
  ];

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Calorie Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        borderRadius: 20,
        padding: 20,
        color: '#fff',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 13, opacity: 0.85 }}>{t.caloriesConsumed}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 36, fontWeight: 800 }}>{totalCal}</span>
            <span style={{ fontSize: 16, opacity: 0.8 }}>{t.kcal}</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.8 }}>
            {t.calorieGoal}: {calorieGoal} kcal · {t.remaining}: {remaining} kcal
          </p>
        </div>
        <div style={{ width: 70, height: 70 }}>
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeDasharray={`${(totalCal / calorieGoal) * 100} 100`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
        </div>
      </div>

      {/* Macros Chart */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f3f4f6',
      }}>
        <div style={{ width: 120, height: 120 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={macroData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2} dataKey="value">
                {macroData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val: number) => [`${val}g`, '']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {macroData.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#374151', flex: 1 }}>{m.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1f2937' }}>{m.value}g</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{
        position: 'relative',
        marginBottom: 16,
      }}>
        <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          placeholder={t.searchFood}
          style={{
            width: '100%',
            padding: '11px 14px 11px 38px',
            border: '1.5px solid #e5e7eb',
            borderRadius: 12,
            fontSize: 14,
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            outline: 'none',
            background: '#fafafa',
          }}
        />
      </div>

      {/* Meal Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              border: '1.5px solid',
              borderColor: activeTab === tab.key ? '#10b981' : '#e5e7eb',
              background: activeTab === tab.key ? '#10b981' : '#fff',
              color: activeTab === tab.key ? '#fff' : '#6b7280',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Meal Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {meals[activeTab].map((item, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid #f3f4f6',
            borderRadius: 14,
            padding: '12px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1f2937' }}>
                {lang === 'ja' ? item.nameJa : item.name}
              </p>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9ca3af' }}>
                P: {item.protein}g · C: {item.carbs}g · F: {item.fat}g
              </p>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10b981' }}>{item.cal} {t.kcal}</span>
          </div>
        ))}
      </div>

      <button style={{
        width: '100%',
        padding: '13px',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        border: 'none',
        borderRadius: 14,
        color: '#fff',
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
        <Plus size={18} /> {t.addMeal}
      </button>
    </div>
  );
}
