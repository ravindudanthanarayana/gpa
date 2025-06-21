import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Log the attempted navigation for debugging
    console.log(
      "Page not found:",
      location.pathname
    );
  }, [location.pathname]);

  const onGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 sm:space-y-8 transition-all duration-500 ease-in-out">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-light text-gray-300 transition-all duration-300">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 transition-all duration-300">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto leading-relaxed transition-all duration-300">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Button 
            onClick={onGoHome} 
            className="bg-blue-600 hover:bg-blue-700 text-lg sm:text-xl font-medium px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation"
            aria-label="Go back to home page"
          >
            Go Home
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu Danthanarayana
        </a>
      </footer>
    </div>
  );
};

export default NotFound;
