import React from 'react';
import { Target } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showQuote?: boolean;
  quote?: string;
  backgroundVariant?: 'purple-blue' | 'blue-teal' | 'purple-teal';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = "Riseon",
  subtitle = "Begin your transformation journey",
  showLogo = true,
  showQuote = true,
  quote = "Journey of a thousand miles begins with a single step.",
  backgroundVariant = 'blue-teal',
}) => {
  return (
    <AnimatedBackground variant={backgroundVariant}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          {showLogo && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <p className="text-white/80 text-lg">{subtitle}</p>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            {children}
          </div>

          {/* Bottom Inspirational Quote */}
          {showQuote && (
            <div className="text-center mt-8">
              <p className="text-white/80 text-sm italic">"{quote}"</p>
            </div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default AuthLayout;
