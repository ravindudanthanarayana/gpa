import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <main className="h-screen max-h-screen bg-white relative overflow-hidden">
      {/* Apple-style hero section */}
      <div className="relative z-10 h-full flex flex-col overflow-hidden">
        {/* Navigation */}
        <header className="w-full px-3 py-1 flex-shrink-0">
          <nav className="max-w-4xl mx-auto flex items-center justify-start">
            {/* Removed SLIIT logo from navigation */}
        </nav>
        </header>

        {/* Hero Content */}
        <section className="flex-1 flex items-center justify-center px-3 min-h-0">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              {/* SLIIT Logo in Center */}
              <div className="flex justify-center mb-2">
                <img 
                  src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                  alt="SLIIT Logo - Sri Lanka Institute of Information Technology" 
                  className="h-8 w-6 sm:h-12 sm:w-8"
                />
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2 sm:mb-3 tracking-tight leading-none">
                GPA
                <span className="block text-blue-600 font-normal">Calculator</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 max-w-xl sm:max-w-2xl mx-auto font-light leading-relaxed">
                Calculate your GPA with precision.
                <br className="hidden sm:block" />
                <span className="block sm:inline"> Track your academic progress.</span>
              </p>
              
              {/* CTA Button */}
              <div className="space-y-1 sm:space-y-2">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 w-full sm:w-auto min-h-[36px] sm:min-h-[40px] touch-manipulation"
                  aria-label="Get Started with GPA Calculator"
                >
                  Get Started
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                  For SLIIT Faculty of Computing students
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-1 sm:h-2 flex-shrink-0"></div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-1 sm:py-2 text-xs text-gray-500 z-20">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu 👨🏻‍💻
        </a>
      </footer>
    </main>
  );
};
