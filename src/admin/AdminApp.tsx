import { useState } from 'react';
import AdminLayout from './AdminLayout';
import type { AdminScreen } from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminAssessment from './AdminAssessment';
import AdminSurvey from './AdminSurvey';
import AdminHealthScore from './AdminHealthScore';
import AdminConsulting from './AdminConsulting';
import AdminPoints from './AdminPoints';

interface Props {
  onLogout: () => void;
}

export default function AdminApp({ onLogout }: Props) {
  const [screen, setScreen] = useState<AdminScreen>('dashboard');

  return (
    <AdminLayout active={screen} onNavigate={setScreen} onLogout={onLogout}>
      {screen === 'dashboard' && <AdminDashboard />}
      {screen === 'assessment' && <AdminAssessment />}
      {screen === 'survey' && <AdminSurvey />}
      {screen === 'healthscore' && <AdminHealthScore />}
      {screen === 'consulting' && <AdminConsulting />}
      {screen === 'points' && <AdminPoints />}
    </AdminLayout>
  );
}
