import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/shared/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import StatsOverview from '../components/StatsOverview';
import MainFeatures from '../components/MainFeatures';
import RecentActivity from '../components/RecentActivity';
import ROUTES from '../../../constants/urls';

function Dashboard() {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    if (feature === 'calendar') {
      navigate(ROUTES.PLANS);
    } else if (feature === 'journal') {
      navigate(ROUTES.DIARY);
    } else {
      console.log(`Navigate to ${feature}`);
    }
  };

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
