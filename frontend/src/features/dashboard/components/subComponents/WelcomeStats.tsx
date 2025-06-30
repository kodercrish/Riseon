import { Flame, Target, CheckCircle } from 'lucide-react';

interface WelcomeStatsProps {
  streak: number;
  activeGoals: number;
  completionRate: number;
}

const WelcomeStats = ({ streak, activeGoals, completionRate }: WelcomeStatsProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
        <Flame className="w-5 h-5 text-orange-300" />
        <span className="font-semibold">{streak}-day streak</span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
        <Target className="w-5 h-5 text-green-300" />
        <span className="font-semibold">{activeGoals} goals active</span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2">
        <CheckCircle className="w-5 h-5 text-blue-300" />
        <span className="font-semibold">{completionRate}% completion</span>
      </div>
    </div>
  );
};

export default WelcomeStats;
