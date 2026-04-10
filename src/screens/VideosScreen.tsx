import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Play, ExternalLink, Clock, Eye } from 'lucide-react';

type VideoCategory = 'all' | 'exercise' | 'nutrition' | 'mental' | 'sleep';

const videos = [
  {
    id: 'dQw4w9WgXcQ',
    titleEn: '10-Minute Office Stretch Routine',
    titleJa: '10分オフィスストレッチルーティン',
    descEn: 'Quick stretches you can do at your desk to reduce tension and improve circulation.',
    descJa: 'デスクでできる簡単ストレッチで、緊張をほぐし血行を促進します。',
    category: 'exercise' as VideoCategory,
    duration: 10,
    views: '142K',
    thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    featured: true,
  },
  {
    id: 'LsHSJMz2AA8',
    titleEn: 'Balanced Meal Prep for Busy Workers',
    titleJa: '忙しい社会人のためのバランス食事プレップ',
    descEn: 'Learn how to prepare nutritious meals for the whole week in under an hour.',
    descJa: '1時間以内に1週間分の栄養満点の食事を準備する方法を学びましょう。',
    category: 'nutrition' as VideoCategory,
    duration: 18,
    views: '89K',
    thumb: 'https://img.youtube.com/vi/LsHSJMz2AA8/mqdefault.jpg',
    featured: true,
  },
  {
    id: 'inpok4MKVLM',
    titleEn: '5-Minute Mindfulness Meditation',
    titleJa: '5分間マインドフルネス瞑想',
    descEn: 'A short guided meditation to reduce workplace stress and sharpen focus.',
    descJa: '職場のストレスを軽減し、集中力を高める短いガイド瞑想。',
    category: 'mental' as VideoCategory,
    duration: 5,
    views: '218K',
    thumb: 'https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg',
    featured: false,
  },
  {
    id: 'nm1TxQj9IsQ',
    titleEn: 'How to Improve Sleep Quality',
    titleJa: '睡眠の質を向上させる方法',
    descEn: 'Evidence-based tips for deeper, more restorative sleep every night.',
    descJa: '毎晩より深く、回復力のある睡眠を取るための科学的なヒント。',
    category: 'sleep' as VideoCategory,
    duration: 14,
    views: '305K',
    thumb: 'https://img.youtube.com/vi/nm1TxQj9IsQ/mqdefault.jpg',
    featured: false,
  },
  {
    id: 'sTANio_2E0Q',
    titleEn: 'Beginner Full Body Workout (No Equipment)',
    titleJa: '器具なし初心者向け全身トレーニング',
    descEn: 'A simple full-body routine you can do anywhere — no gym required.',
    descJa: 'どこでもできる簡単な全身ルーティン — ジム不要。',
    category: 'exercise' as VideoCategory,
    duration: 22,
    views: '512K',
    thumb: 'https://img.youtube.com/vi/sTANio_2E0Q/mqdefault.jpg',
    featured: false,
  },
  {
    id: 'KzGjEkp772s',
    titleEn: 'Understanding Macronutrients',
    titleJa: '三大栄養素を理解する',
    descEn: 'Protein, carbs, and fat — learn how to balance them for optimal health.',
    descJa: 'タンパク質・炭水化物・脂質のバランスを学び、最適な健康を目指す。',
    category: 'nutrition' as VideoCategory,
    duration: 12,
    views: '67K',
    thumb: 'https://img.youtube.com/vi/KzGjEkp772s/mqdefault.jpg',
    featured: false,
  },
  {
    id: 'O-6f5wQXSu8',
    titleEn: 'Reducing Work Stress: Practical Strategies',
    titleJa: '仕事のストレスを減らす実践的な戦略',
    descEn: 'Actionable techniques to manage and reduce chronic workplace stress.',
    descJa: '慢性的な職場ストレスを管理・軽減するための実践的な技術。',
    category: 'mental' as VideoCategory,
    duration: 16,
    views: '178K',
    thumb: 'https://img.youtube.com/vi/O-6f5wQXSu8/mqdefault.jpg',
    featured: false,
  },
];

const categoryColors: Record<VideoCategory, { color: string; bg: string }> = {
  all: { color: '#6366f1', bg: '#eef2ff' },
  exercise: { color: '#f97316', bg: '#fff7ed' },
  nutrition: { color: '#10b981', bg: '#f0fdf4' },
  mental: { color: '#8b5cf6', bg: '#f5f3ff' },
  sleep: { color: '#3b82f6', bg: '#eff6ff' },
};

export default function VideosScreen() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');

  const categories: { id: VideoCategory; label: string }[] = [
    { id: 'all', label: t.allVideos },
    { id: 'exercise', label: t.videoExercise },
    { id: 'nutrition', label: t.videoNutrition },
    { id: 'mental', label: t.videoMental },
    { id: 'sleep', label: t.videoSleep },
  ];

  const filtered = activeCategory === 'all' ? videos : videos.filter(v => v.category === activeCategory);
  const featured = videos.filter(v => v.featured);

  const openVideo = (id: string) => {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      {/* Featured banner */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 18 }}>⭐</span> {t.featuredContent}
        </h3>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {featured.map(v => (
            <div key={v.id} style={{
              flexShrink: 0, width: 240,
              background: '#fff', borderRadius: 16,
              overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              border: '1px solid #f3f4f6',
              cursor: 'pointer',
            }}
              onClick={() => openVideo(v.id)}
            >
              <div style={{ position: 'relative' }}>
                <img src={v.thumb} alt="" style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={20} color="#1f2937" fill="#1f2937" />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4 }}>
                  {v.duration} {t.videoDuration}
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: '#1f2937', lineHeight: 1.3 }}>
                  {lang === 'ja' ? v.titleJa : v.titleEn}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: categoryColors[v.category].bg, color: categoryColors[v.category].color, fontWeight: 600 }}>
                    {categories.find(c => c.id === v.category)?.label}
                  </span>
                  <Eye size={11} color="#9ca3af" />
                  <span style={{ fontSize: 10, color: '#9ca3af' }}>{v.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
            padding: '7px 14px', borderRadius: 20, border: '1.5px solid',
            borderColor: activeCategory === cat.id ? categoryColors[cat.id].color : '#e5e7eb',
            background: activeCategory === cat.id ? categoryColors[cat.id].bg : '#fff',
            color: activeCategory === cat.id ? categoryColors[cat.id].color : '#6b7280',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(v => (
          <div key={v.id} style={{
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            border: '1px solid #f3f4f6', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            display: 'flex', gap: 0,
          }}>
            {/* Thumbnail */}
            <div style={{ position: 'relative', flexShrink: 0, width: 120, cursor: 'pointer' }} onClick={() => openVideo(v.id)}>
              <img src={v.thumb} alt="" style={{ width: 120, height: '100%', minHeight: 80, objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.background = '#f3f4f6'; }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={13} color="#1f2937" fill="#1f2937" />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 9, padding: '1px 4px', borderRadius: 3, fontWeight: 600 }}>
                {v.duration}m
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: '#1f2937', lineHeight: 1.35 }}>
                  {lang === 'ja' ? v.titleJa : v.titleEn}
                </p>
                <p style={{ margin: '0 0 8px', fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>
                  {lang === 'ja' ? v.descJa : v.descEn}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: categoryColors[v.category].bg, color: categoryColors[v.category].color, fontWeight: 600 }}>
                    {categories.find(c => c.id === v.category)?.label}
                  </span>
                  <span style={{ fontSize: 10, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Clock size={10} /> {v.duration} {t.videoDuration}
                  </span>
                  <span style={{ fontSize: 10, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Eye size={10} /> {v.views}
                  </span>
                </div>
                <button
                  onClick={() => openVideo(v.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '5px 10px', borderRadius: 8, border: 'none',
                    background: '#fef2f2', color: '#ef4444',
                    fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={11} /> {t.watchNow}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
