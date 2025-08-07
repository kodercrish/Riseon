import FeatureCard from './FeatureCard';
import { Calendar, BookOpen, Target, ChevronRight } from 'lucide-react';

interface MainFeaturesProps {
    onFeatureClick: (feature: string) => void;
}

const MainFeatures = ({ onFeatureClick }: MainFeaturesProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Growth Tools</h2>
                <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1 transition-colors duration-200">
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    title="Smart Planning"
                    description="Organize your goals and schedule with our intelligent calendar system. Plan your days, weeks, and months for maximum productivity."
                    icon={Calendar}
                    gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                    stats={{
                        label: "Events this week",
                        value: "12"
                    }}
                    actionText="Open Calendar"
                    onClick={() => onFeatureClick('calendar')}
                />

                <FeatureCard
                    title="Daily Journal"
                    description="Reflect on your journey with guided journaling. Track your thoughts, emotions, and progress with personalized prompts."
                    icon={BookOpen}
                    gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                    stats={{
                        label: "Entries this month",
                        value: "24"
                    }}
                    actionText="Start Writing"
                    onClick={() => onFeatureClick('journal')}
                />

                <FeatureCard
                    title="Goal Tracker"
                    description="Set meaningful resolutions and track your commitments. Build lasting habits with our proven accountability system."
                    icon={Target}
                    gradient="bg-gradient-to-r from-green-500 to-teal-500"
                    stats={{
                        label: "Active goals",
                        value: "3"
                    }}
                    actionText="View Goals"
                    onClick={() => onFeatureClick('resolutions')}
                />
            </div>
        </div>
    );
};

export default MainFeatures;