import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface Profile {
  degreeProgram: string;
  specialization?: string;
  currentYear: number;
  currentSemester: number;
}

interface ProfileSetupProps {
  onProfileComplete: (profile: Profile) => void;
  onBack: () => void;
}

export const ProfileSetup = ({ onProfileComplete, onBack }: ProfileSetupProps) => {
  const [formData, setFormData] = useState({
    degreeProgram: '',
    specialization: '',
    currentYear: 1,
    currentSemester: 1,
  });

  const degreePrograms = [
    'B.Sc. (Hons) in Information Technology',
    'B.Sc. (Hons) in Computer Science (CS)',
    'B.Sc. (Hons) in Computer Systems Engineering (CSE)'
  ];

  const specializations = [
    'IT',
    'SE',
    'CSNE',
    'ISE',
    'CS',
    'DS',
    'IM',
    'AI'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.degreeProgram) {
      // For Information Technology, specialization is required
      if (formData.degreeProgram === 'B.Sc. (Hons) in Information Technology' && !formData.specialization) {
        return;
      }
      localStorage.removeItem('gpaModules');
      localStorage.removeItem('gpaActiveTab');
      onProfileComplete(formData);
    }
  };

  const showSpecialization = formData.degreeProgram === 'B.Sc. (Hons) in Information Technology';

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto px-6 sm:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-6 sm:mb-8 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full px-6 sm:px-8 py-3 sm:py-4 touch-manipulation"
            aria-label="Go back to landing page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img 
                src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                alt="SLIIT Logo - Sri Lanka Institute of Information Technology" 
                className="h-12 w-10 sm:h-16 sm:w-12"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-3 sm:mb-4 tracking-tight">
              Setup Your
              <span className="block text-blue-600">Profile</span>
            </h1>
          </div>
        </header>

        {/* Form */}
        <section>
          <Card className="border-0 shadow-2xl rounded-3xl sm:rounded-[2rem] overflow-hidden bg-white transition-all duration-500 ease-in-out hover:shadow-2xl">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4 transition-all duration-300">
                  <Label htmlFor="degree" className="text-base sm:text-lg font-medium text-gray-900">
                    Degree Program
                  </Label>
                  <Select
                    value={formData.degreeProgram}
                    onValueChange={(value) => setFormData({ ...formData, degreeProgram: value, specialization: '' })}
                  >
                    <SelectTrigger className="h-12 sm:h-14 border-gray-200 rounded-xl text-base sm:text-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out touch-manipulation">
                      <SelectValue placeholder="Select your degree program" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 max-h-60 w-[calc(100vw-3rem)] sm:w-auto">
                      {degreePrograms.map((program) => (
                        <SelectItem key={program} value={program} className="text-sm sm:text-lg py-3 sm:py-4 whitespace-normal break-words transition-all duration-200 hover:bg-gray-50">
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showSpecialization && (
                  <div className="space-y-3 sm:space-y-4 transition-all duration-500 ease-in-out animate-in fade-in-0 slide-in-from-bottom-4">
                    <Label htmlFor="specialization" className="text-base sm:text-lg font-medium text-gray-900">
                      Specialization
                    </Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                    >
                      <SelectTrigger className="h-12 sm:h-14 border-gray-200 rounded-xl text-base sm:text-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out touch-manipulation">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 w-[calc(100vw-3rem)] sm:w-auto">
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec} className="text-sm sm:text-lg py-3 sm:py-4 transition-all duration-200 hover:bg-gray-50">
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4 transition-all duration-300">
                    <Label htmlFor="year" className="text-base sm:text-lg font-medium text-gray-900">
                      Current Year
                    </Label>
                    <Select
                      value={formData.currentYear.toString()}
                      onValueChange={(value) => setFormData({ ...formData, currentYear: parseInt(value) })}
                    >
                      <SelectTrigger className="h-12 sm:h-14 border-gray-200 rounded-xl text-base sm:text-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out touch-manipulation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 w-[calc(100vw-3rem)] sm:w-auto">
                        {[1, 2, 3, 4].map((year) => (
                          <SelectItem key={year} value={year.toString()} className="text-sm sm:text-lg py-3 sm:py-4 transition-all duration-200 hover:bg-gray-50">
                            Year {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 sm:space-y-4 transition-all duration-300">
                    <Label htmlFor="semester" className="text-base sm:text-lg font-medium text-gray-900">
                      Current Semester
                    </Label>
                    <Select
                      value={formData.currentSemester.toString()}
                      onValueChange={(value) => setFormData({ ...formData, currentSemester: parseInt(value) })}
                    >
                      <SelectTrigger className="h-12 sm:h-14 border-gray-200 rounded-xl text-base sm:text-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out touch-manipulation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 w-[calc(100vw-3rem)] sm:w-auto">
                        <SelectItem value="1" className="text-sm sm:text-lg py-3 sm:py-4 transition-all duration-200 hover:bg-gray-50">Semester 1</SelectItem>
                        <SelectItem value="2" className="text-sm sm:text-lg py-3 sm:py-4 transition-all duration-200 hover:bg-gray-50">Semester 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 transition-all duration-300">
                  <Button 
                    type="submit" 
                    className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-lg sm:text-xl font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl touch-manipulation"
                    disabled={!formData.degreeProgram || (showSpecialization && !formData.specialization)}
                    aria-label="Continue to GPA Calculator"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
      <footer className="text-center py-4 text-sm text-gray-500 mt-auto">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu Danthanarayana
        </a>
      </footer>
    </main>
  );
};
