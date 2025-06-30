import { useState } from 'react';
import Navbar from '../../../components/shared/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import StatsOverview from '../components/StatsOverview';
import MainFeatures from '../components/MainFeatures';
import RecentActivity from '../components/RecentActivity';
import Calendar from '../../calendar/pages/Calendar';

function Dashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar'>('dashboard');

  const handleFeatureClick = (feature: string) => {
    if (feature === 'calendar') {
      setCurrentView('calendar');
    } else {
      console.log(`Navigate to ${feature}`);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'calendar') {
    return <Calendar onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Navbar/>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection />
        <StatsOverview />
        <MainFeatures onFeatureClick={handleFeatureClick} />
        <RecentActivity />
      </div>
    </div>
  );
}

export default Dashboard;
