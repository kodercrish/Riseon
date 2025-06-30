import { useWelcomeData } from '../hooks/useWelcomeData';
import WelcomeStats from './subComponents/WelcomeStats';

const WelcomeSection = () => {
  const { fullName, streak, activeGoals, completionRate, loading, greeting } = useWelcomeData();

  if (loading) {
    return (
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-white/20 rounded mb-6 w-1/2"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-white/20 rounded-2xl w-32"></div>
              <div className="h-10 bg-white/20 rounded-2xl w-32"></div>
              <div className="h-10 bg-white/20 rounded-2xl w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {greeting}, {fullName}! 🌟
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Ready to continue your growth journey? You're doing amazing!
          </p>
          
          <WelcomeStats 
            streak={streak}
            activeGoals={activeGoals}
            completionRate={completionRate}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;