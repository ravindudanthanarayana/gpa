import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
}

interface AuthFormProps {
  onLogin: (user: User) => void;
}

export const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isSignUp) {
        // Mock signup - just create a user object
        const user: User = {
          id: Date.now().toString(),
          email: email
        };
        onLogin(user);
        toast({
          title: "Account created!",
          description: "Welcome to SLIIT GPA Calculator!",
        });
      } else {
        // Mock signin - create a user object
        const user: User = {
          id: Date.now().toString(),
          email: email
        };
        onLogin(user);
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-400/15 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 dark:bg-purple-400/15 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-500/20 dark:bg-indigo-400/15 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 animate-fade-in shadow-2xl border-0 bg-card/95 text-card-foreground backdrop-blur-sm">
        <CardHeader className="text-center space-y-6">
          {/* SLIIT Logo */}
          <div className="flex justify-center animate-scale-in">
            <img 
              src="/lovable-uploads/6f085b70-cb3a-48f2-ab38-0f6b900685f7.png" 
              alt="SLIIT Logo" 
              className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-2 animate-fade-in delay-200">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SLIIT GPA Calculator
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {isSignUp ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="animate-fade-in delay-300">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-4 border-2 border-input bg-background focus:border-blue-500 transition-all duration-300 group-hover:border-border"
                />
              </div>
              
              <div className="relative group">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-4 border-2 border-input bg-background focus:border-blue-500 transition-all duration-300 group-hover:border-border"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-300 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
          
          {/* Additional decorative elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
