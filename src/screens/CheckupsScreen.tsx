import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Upload, Download, FileText, Heart, Activity, Droplets, TrendingUp, TrendingDown, Minus } from 'lucide-react';

type StatusLevel = 'normal' | 'caution' | 'urgent';

interface CheckItem {
  nameKey: keyof ReturnType<typeof useLang>['t'];
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  unit: string;
  range: string;
  status: StatusLevel;
  delta: number | null;
  deltaUnit: string;
}

interface PastCheckup {
  date: string;
  grade: string;
  labelKey: 'gradeGood' | 'gradeCaution' | 'gradeUrgent';
  gradeColor: string;
}

export default function CheckupsScreen() {
  const { t } = useLang();
  const [fileSelected, setFileSelected] = useState(false);

  const statusStyle = (s: StatusLevel): React.CSSProperties => {
    if (s === 'normal') return { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' };
    if (s === 'caution') return { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
    return { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' };
  };

  const statusLabel = (s: StatusLevel) => {
    if (s === 'normal') return t.statusNormal;
    if (s === 'caution') return t.statusCaution;
    return t.statusUrgent;
  };

  const checkItems: CheckItem[] = [
    {
      nameKey: 'bmi', icon: <Activity size={16} color="#6366f1" />, iconBg: '#eef2ff',
      value: '22.4', unit: '', range: '18.5–24.9',
      status: 'normal', delta: -0.5, deltaUnit: '',
    },
    {
      nameKey: 'bloodPressure', icon: <Heart size={16} color="#ef4444" />, iconBg: '#fee2e2',
      value: '118/76', unit: 'mmHg', range: '≤120/80',
      status: 'normal', delta: 0, deltaUnit: '',
    },
    {
      nameKey: 'bloodSugar', icon: <Droplets size={16} color="#3b82f6" />, iconBg: '#eff6ff',
      value: '95', unit: 'mg/dL', range: '70–109',
      status: 'normal', delta: -8, deltaUnit: '',
    },
    {
      nameKey: 'totalCholesterol', icon: <Activity size={16} color="#f59e0b" />, iconBg: '#fffbeb',
      value: '195', unit: 'mg/dL', range: '150–199',
      status: 'caution', delta: 12, deltaUnit: '',
    },
    {
      nameKey: 'hdlCholesterol', icon: <Droplets size={16} color="#10b981" />, iconBg: '#ecfdf5',
      value: '58', unit: 'mg/dL', range: '≥40',
      status: 'normal', delta: 3, deltaUnit: '',
    },
    {
      nameKey: 'ldlCholesterol', icon: <Activity size={16} color="#8b5cf6" />, iconBg: '#f5f3ff',
      value: '115', unit: 'mg/dL', range: '50–119',
      status: 'normal', delta: 0, deltaUnit: '',
    },
  ];

  const pastCheckups: PastCheckup[] = [
    { date: '2024年1月15日', grade: 'B', labelKey: 'gradeGood', gradeColor: '#3b82f6' },
    { date: '2023年7月10日', grade: 'C', labelKey: 'gradeCaution', gradeColor: '#f59e0b' },
    { date: '2023年1月20日', grade: 'B', labelKey: 'gradeGood', gradeColor: '#3b82f6' },
    { date: '2022年7月5日', grade: 'A', labelKey: 'gradeGood', gradeColor: '#10b981' },
  ];

  const DeltaIcon = ({ delta }: { delta: number | null }) => {
    if (delta === null || delta === 0) return <Minus size={12} color="#9ca3af" />;
    if (delta > 0) return <TrendingUp size={12} color="#f59e0b" />;
    return <TrendingDown size={12} color="#10b981" />;
  };

  const deltaColor = (delta: number | null) => {
    if (delta === null || delta === 0) return '#9ca3af';
    if (delta > 0) return '#f59e0b';
    return '#10b981';
  };

  const deltaText = (delta: number | null) => {
    if (delta === null || delta === 0) return '±0';
    return delta > 0 ? `+${delta}` : `${delta}`;
  };

  return (
    <div style={{ padding: '16px 16px 100px' }}>

      {/* Latest Checkup Card */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.latestCheckup}</h2>
          <span style={{ fontSize: 11, color: '#6366f1', background: '#eef2ff', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>
            2024年1月15日
          </span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{t.overallRating}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: '#3b82f6', lineHeight: 1 }}>B</span>
              <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>{t.gradeGood}</span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: 24 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{t.comparedToLast}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <TrendingUp size={18} color="#10b981" />
              <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>{t.improving}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Items */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.testItems}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {checkItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: i < checkItems.length - 1 ? '1px solid #f9fafb' : 'none',
            }}>
              {/* Left: icon + name + range */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{t[item.nameKey] as string}</p>
                  <p style={{ margin: 0, fontSize: 10, color: '#9ca3af' }}>{t.refRange}: {item.range}</p>
                </div>
              </div>
              {/* Right: value + status + delta */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#1f2937' }}>{item.value}</span>
                  {item.unit && <span style={{ fontSize: 10, color: '#6b7280' }}>{item.unit}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, borderRadius: 20, padding: '2px 8px', ...statusStyle(item.status) }}>
                    {statusLabel(item.status)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, color: deltaColor(item.delta), fontWeight: 600 }}>
                    <DeltaIcon delta={item.delta} />
                    {deltaText(item.delta)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.uploadDiagnosis}</h3>
        <label style={{ display: 'block', cursor: 'pointer' }}>
          <input type="file" accept=".pdf,image/*" style={{ display: 'none' }} onChange={() => setFileSelected(true)} />
          <div style={{
            border: `2px dashed ${fileSelected ? '#6366f1' : '#d1d5db'}`,
            borderRadius: 12,
            padding: '28px 20px',
            textAlign: 'center',
            background: fileSelected ? '#eef2ff' : '#fafafa',
            transition: 'all 0.2s',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: fileSelected ? '#6366f1' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Upload size={22} color={fileSelected ? '#fff' : '#9ca3af'} />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: fileSelected ? '#6366f1' : '#374151' }}>
              {fileSelected ? '✓ File selected' : t.uploadFileLabel}
            </p>
            <p style={{ margin: '0 0 16px', fontSize: 11, color: '#9ca3af' }}>{t.uploadHint}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#374151', fontWeight: 500 }}>
              <FileText size={14} color="#6366f1" />
              {t.selectFile}
            </div>
          </div>
        </label>
      </div>

      {/* Past Checkups */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{t.pastCheckups}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {pastCheckups.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: i < pastCheckups.length - 1 ? '1px solid #f9fafb' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} color="#6b7280" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{t.regularCheckup}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>{c.date}</p>
                  <span style={{
                    display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 600,
                    borderRadius: 20, padding: '2px 8px',
                    ...(c.labelKey === 'gradeGood'
                      ? { background: '#d1fae5', color: '#065f46' }
                      : c.labelKey === 'gradeCaution'
                      ? { background: '#fef3c7', color: '#92400e' }
                      : { background: '#fee2e2', color: '#991b1b' }),
                  }}>
                    {t[c.labelKey]}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: c.gradeColor }}>{c.grade}</span>
                <button style={{ border: 'none', background: '#f1f5f9', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Download size={16} color="#6b7280" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
