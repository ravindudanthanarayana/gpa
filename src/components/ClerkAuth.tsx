
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface ClerkAuthProps {
  onBack: () => void;
}

export const ClerkAuth = ({ onBack }: ClerkAuthProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      console.log('User signed in successfully');
    }
  }, [isSignedIn]);

  if (isSignedIn) {
    return null; // This will be handled by the parent component
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/a53f293b-7aa3-4420-b9d8-ab3f0e510bc2.png')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl animate-fade-in">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/6f085b70-cb3a-48f2-ab38-0f6b900685f7.png" 
                  alt="SLIIT Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                {isSignUp ? (
                  <SignUp 
                    fallbackRedirectUrl="/"
                    forceRedirectUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                        card: 'shadow-none border-0 bg-transparent',
                      }
                    }}
                  />
                ) : (
                  <SignIn 
                    fallbackRedirectUrl="/"
                    forceRedirectUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                        card: 'shadow-none border-0 bg-transparent',
                      }
                    }}
                  />
                )}
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 hover:underline"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
