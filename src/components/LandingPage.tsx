import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Apple-style hero section */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Navigation */}
        <nav className="w-full px-6 sm:px-8 py-2 sm:py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-start">
            {/* Removed SLIIT logo from navigation */}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              {/* SLIIT Logo in Center */}
              <div className="flex justify-center mb-4 sm:mb-8">
                <img 
                  src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                  alt="SLIIT Logo" 
                  className="h-14 w-10 sm:h-20 sm:w-16"
                />
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-gray-900 mb-4 sm:mb-12 tracking-tight leading-none">
                GPA
                <span className="block text-blue-600 font-normal">Calculator</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-2xl md:text-3xl text-gray-600 mb-8 sm:mb-20 max-w-3xl mx-auto font-light leading-relaxed">
                Calculate your GPA with precision.
                <br className="hidden sm:block" />
                <span className="block sm:inline"> Track your academic progress.</span>
              </p>
              
              {/* CTA Button */}
              <div className="space-y-3 sm:space-y-6">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-16 py-4 sm:py-8 text-lg sm:text-xl font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 w-full sm:w-auto min-h-[48px] sm:min-h-[64px] touch-manipulation"
                >
                  Get Started
                  <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                
                <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-6">
                  For Sri Lanka Institute of Information Technology students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-4 sm:h-16"></div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-2 sm:py-4 text-sm text-gray-500 z-20">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu Danthanarayana
        </a>
      </footer>
    </div>
  );
};
