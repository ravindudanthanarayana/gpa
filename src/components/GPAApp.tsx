import { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import { ProfileSetup } from './ProfileSetup';
import { SimpleGPACalculator } from './SimpleGPACalculator';

interface Profile {
  degreeProgram: string;
  specialization?: string;
  currentYear: number;
  currentSemester: number;
}

export const GPAApp = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Check if profile exists in localStorage
    const savedProfile = localStorage.getItem('gpaProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setShowLanding(false);
    }
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleProfileComplete = (profileData: Profile) => {
    setProfile(profileData);
    localStorage.setItem('gpaProfile', JSON.stringify(profileData));
  };

  const handleEditProfile = () => {
    // Clear all data when editing profile to ensure clean reset
    setProfile(null);
    localStorage.removeItem('gpaProfile');
    localStorage.removeItem('gpaModules');
    localStorage.removeItem('gpaActiveTab');
  };

  const handleBackToHome = () => {
    setShowLanding(true);
    setProfile(null);
    localStorage.removeItem('gpaProfile');
    localStorage.removeItem('gpaModules');
    localStorage.removeItem('gpaActiveTab');
  };

  // Show landing page
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show profile setup if no profile
  if (!profile) {
    return <ProfileSetup onProfileComplete={handleProfileComplete} onBack={() => setShowLanding(true)} />;
  }

  // Show GPA calculator
  return <SimpleGPACalculator profile={profile} onEditProfile={handleEditProfile} onBackToHome={handleBackToHome} />;
};
