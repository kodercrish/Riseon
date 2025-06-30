import { Flame, Target, CheckCircle } from 'lucide-react';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Good morning, {userName}! 🌟</h1>
          <p className="text-white/90 text-lg mb-6">Ready to continue your growth journey? You're doing amazing!</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="font-semibold">7-day streak</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-300" />
              <span className="font-semibold">3 goals active</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-300" />
              <span className="font-semibold">85% completion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;