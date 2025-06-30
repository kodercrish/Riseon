import { DivideIcon as LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  gradient: string;
  stats?: {
    label: string;
    value: string;
  };
  actionText: string;
  onClick?: () => void;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  stats, 
  actionText,
  onClick 
}: FeatureCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {stats && (
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{stats.value}</p>
            <p className="text-xs text-gray-500">{stats.label}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Action Button */}
      <button 
        onClick={onClick}
        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-blue-50 group-hover:border-purple-200"
      >
        <span>{actionText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
}