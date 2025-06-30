import StatsCard from './StatsCard';
import { TrendingUp, Target, BookOpen } from 'lucide-react';

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Weekly Progress"
        value="85%"
        change="+12% from last week"
        changeType="positive"
        icon={TrendingUp}
      />
      <StatsCard
        title="Active Goals"
        value="3"
        change="2 completed this month"
        changeType="positive"
        icon={Target}
      />
      <StatsCard
        title="Journal Entries"
        value="24"
        change="4 this week"
        changeType="positive"
        icon={BookOpen}
      />
    </div>
  );
};

export default StatsOverview;
