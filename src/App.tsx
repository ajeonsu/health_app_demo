import { useState } from 'react';
import { LanguageProvider, useLang } from './contexts/LanguageContext';
import BottomNav from './components/BottomNav';
import type { Screen } from './components/BottomNav';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import type { Role } from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StepsScreen from './screens/StepsScreen';
import WeightScreen from './screens/WeightScreen';
import NutritionScreen from './screens/NutritionScreen';
import PointsScreen from './screens/PointsScreen';
import ChatScreen from './screens/ChatScreen';
import GoalsScreen from './screens/GoalsScreen';
import VideosScreen from './screens/VideosScreen';
import SettingsScreen from './screens/SettingsScreen';
import AdminApp from './admin/AdminApp';
import SysAdminApp from './sysadmin/SysAdminApp';

function AppInner() {
  const { t } = useLang();
  const [role, setRole] = useState<Role | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [showSettings, setShowSettings] = useState(false);

  const handleLogin = (r: Role) => { setRole(r); setScreen('home'); setShowSettings(false); };
  const handleLogout = () => { setRole(null); setScreen('home'); setShowSettings(false); };

  if (!role) return <LoginScreen onLogin={handleLogin} />;
  if (role === 'admin') return <AdminApp onLogout={handleLogout} />;
  if (role === 'sysadmin') return <SysAdminApp onLogout={handleLogout} />;

  // Employee app
  if (showSettings) {
    return (
      <div style={{ maxWidth: 430, margin: '0 auto', position: 'relative', minHeight: '100vh', background: '#f9fafb' }}>
        <Header title={t.settingsTitle} onBack={() => setShowSettings(false)} showLangToggle />
        <SettingsScreen onLogout={handleLogout} />
      </div>
    );
  }

  const screenTitles: Record<Screen, string> = {
    home: t.appName,
    steps: t.steps,
    weight: t.weightTitle,
    nutrition: t.nutritionTitle,
    points: t.pointsTitle,
    chat: t.chatTitle,
    goals: t.goalsTitle,
    videos: t.videosTitle,
  };

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', position: 'relative', minHeight: '100vh', background: '#f9fafb' }}>
      <Header title={screenTitles[screen]} onSettings={() => setShowSettings(true)} showLangToggle />
      <main>
        {screen === 'home' && <HomeScreen onNavigate={setScreen} />}
        {screen === 'steps' && <StepsScreen />}
        {screen === 'weight' && <WeightScreen />}
        {screen === 'nutrition' && <NutritionScreen />}
        {screen === 'points' && <PointsScreen />}
        {screen === 'chat' && <ChatScreen />}
        {screen === 'goals' && <GoalsScreen />}
        {screen === 'videos' && <VideosScreen />}
      </main>
      <BottomNav active={screen} onNavigate={setScreen} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
