import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 sm:p-8">
        <div className="flex items-center space-x-3">
          {/* Removed SLIIT logo from header */}
        </div>
      </header>

      {/* Hero Content */}
      <section className="flex-1 flex items-center justify-center px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-in">
            {/* SLIIT Logo in Center */}
            <div className="flex justify-center mb-4 sm:mb-8">
              <img 
                src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                alt="SLIIT Logo - Sri Lanka Institute of Information Technology" 
                className="h-14 w-10 sm:h-20 sm:w-16 transition-all duration-300 ease-in-out hover:scale-105"
              />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-gray-900 mb-4 sm:mb-12 tracking-tight leading-none transition-all duration-500 ease-in-out">
              GPA
              <span className="block text-blue-600 font-normal">Calculator</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-2xl md:text-3xl text-gray-600 mb-8 sm:mb-20 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-300">
              Calculate your GPA with precision.
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Track your academic progress.</span>
            </p>
            
            {/* CTA Button */}
            <div className="space-y-3 sm:space-y-6">
              <Button 
                onClick={onGetStarted} 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-16 py-4 sm:py-8 text-lg sm:text-xl font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-0 w-full sm:w-auto min-h-[48px] sm:min-h-[64px] touch-manipulation"
                aria-label="Get Started with GPA Calculator"
              >
                Get Started
                <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              
              <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-6 transition-all duration-300">
                For Sri Lanka Institute of Information Technology students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 sm:py-8 px-6 sm:px-8">
        <p className="text-gray-600 text-sm sm:text-base transition-all duration-300">
          Developed by{' '}
          <a 
            href="https://www.linkedin.com/in/ravindu-danthanarayana/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Visit Ravindu Danthanarayana's LinkedIn profile"
          >
            Ravindu Danthanarayana
          </a>
        </p>
      </footer>
    </div>
  );
}
