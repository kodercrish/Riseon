import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'purple-blue' | 'blue-teal' | 'purple-teal';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  children, 
  variant = 'blue-teal',
  className = '' 
}) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'purple-blue':
        return 'bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500';
      case 'blue-teal':
        return 'bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-500';
      case 'purple-teal':
        return 'bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500';
      default:
        return 'bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${getGradientClass()} ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full animate-float animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-white/8 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-white/6 rounded-full animate-pulse-slow"></div>
        
        {/* Additional floating elements for more variety */}
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-white/4 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-white/6 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
