import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Send, ImageIcon, ChevronLeft } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: 'doctor', text: '', time: '09:00' },
  { id: 2, sender: 'user', text: '', time: '09:02' },
  { id: 3, sender: 'doctor', text: '', time: '09:03' },
  { id: 4, sender: 'user', text: '', time: '09:04' },
  { id: 5, sender: 'doctor', text: '', time: '09:05' },
];

const doctors = [
  { id: 1, nameEn: 'Dr. Tanaka Yuki', nameJa: '田中 裕紀 先生', role: 'Health Coach', roleJa: 'ヘルスコーチ', avatar: '👩‍⚕️', online: true },
  { id: 2, nameEn: 'Dr. Sato Kenji', nameJa: '佐藤 健二 先生', role: 'Nutritionist', roleJa: '栄養士', avatar: '👨‍⚕️', online: true },
  { id: 3, nameEn: 'Dr. Kimura Aya', nameJa: '木村 彩 先生', role: 'Wellness Advisor', roleJa: 'ウェルネスアドバイザー', avatar: '👩‍⚕️', online: false },
];

export default function ChatScreen() {
  const { t, lang } = useLang();
  const [activeDoctor, setActiveDoctor] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const msgTextsEn = [t.msgSample1, t.msgSample2, t.msgSample3, t.msgSample4, t.msgSample5];
  const msgTextsJa = [t.msgSample1, t.msgSample2, t.msgSample3, t.msgSample4, t.msgSample5];
  const msgTexts = lang === 'ja' ? msgTextsJa : msgTextsEn;

  const populated = initialMessages.map((m, i) => ({ ...m, text: msgTexts[i] }));

  const handleOpenChat = (doctorId: number) => {
    setActiveDoctor(doctorId);
    setMessages(populated);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender: 'user', text: input, time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, sender: 'doctor', text: lang === 'ja' ? 'ありがとうございます。引き続きサポートします！' : 'Thank you! I will continue to support you.', time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 800);
  };

  const doctor = doctors.find(d => d.id === activeDoctor);

  if (activeDoctor && doctor) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
        {/* Chat Header */}
        <div style={{
          padding: '12px 16px',
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button onClick={() => setActiveDoctor(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6366f1', padding: 0 }}>
            <ChevronLeft size={24} />
          </button>
          <span style={{ fontSize: 28 }}>{doctor.avatar}</span>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1f2937' }}>
              {lang === 'ja' ? doctor.nameJa : doctor.nameEn}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#22c55e', fontWeight: 500 }}>● {t.online}</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          background: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          paddingBottom: 90,
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: 8,
              alignItems: 'flex-end',
            }}>
              {msg.sender === 'doctor' && (
                <span style={{ fontSize: 22, flexShrink: 0 }}>{doctor.avatar}</span>
              )}
              <div style={{
                maxWidth: '72%',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#fff',
                color: msg.sender === 'user' ? '#fff' : '#1f2937',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 14px',
                fontSize: 14,
                lineHeight: 1.5,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>
                {msg.text}
                <span style={{ display: 'block', fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          position: 'fixed',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          padding: '10px 16px',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          boxSizing: 'border-box',
        }}>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }}>
            <ImageIcon size={22} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t.typeMessage}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1.5px solid #e5e7eb',
              borderRadius: 22,
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Send size={16} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 16px 100px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>{t.doctors}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {doctors.map(doc => (
          <div key={doc.id} style={{
            background: '#fff',
            border: '1px solid #f3f4f6',
            borderRadius: 16,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: 40 }}>{doc.avatar}</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1f2937' }}>
                {lang === 'ja' ? doc.nameJa : doc.nameEn}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>
                {lang === 'ja' ? doc.roleJa : doc.role}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, fontWeight: 500, color: doc.online ? '#22c55e' : '#9ca3af' }}>
                ● {doc.online ? t.online : (lang === 'ja' ? 'オフライン' : 'Offline')}
              </p>
            </div>
            <button
              onClick={() => handleOpenChat(doc.id)}
              style={{
                padding: '9px 16px',
                background: doc.online ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f3f4f6',
                border: 'none',
                borderRadius: 12,
                color: doc.online ? '#fff' : '#9ca3af',
                fontSize: 13,
                fontWeight: 600,
                cursor: doc.online ? 'pointer' : 'not-allowed',
              }}
              disabled={!doc.online}
            >
              {t.startChat}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
