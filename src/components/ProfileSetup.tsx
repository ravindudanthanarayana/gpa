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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-4 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full px-4 py-2 touch-manipulation"
            aria-label="Go back to landing page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <img 
                src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                alt="SLIIT Logo - Sri Lanka Institute of Information Technology" 
                className="h-12 w-9 sm:h-14 sm:w-11 md:h-16 md:w-12"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight">
              Setup Your
              <span className="block text-blue-600">Profile</span>
            </h1>
          </div>
        </header>

        {/* Form */}
        <section className="mb-8 sm:mb-12">
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white w-full max-w-sm mx-auto">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-sm font-medium text-gray-900">
                  Degree Program
                </Label>
                <Select
                  value={formData.degreeProgram}
                    onValueChange={(value) => setFormData({ ...formData, degreeProgram: value, specialization: '' })}
                >
                    <SelectTrigger className="h-11 border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                    <SelectValue placeholder="Select your degree program" />
                  </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-200 max-h-48 w-[calc(100vw-2rem)] sm:w-auto">
                    {degreePrograms.map((program) => (
                        <SelectItem key={program} value={program} className="text-sm py-2 whitespace-normal break-words">
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                {showSpecialization && (
                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-sm font-medium text-gray-900">
                      Specialization
                    </Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                    >
                      <SelectTrigger className="h-11 border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-gray-200 w-[calc(100vw-2rem)] sm:w-auto">
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec} className="text-sm py-2">
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium text-gray-900">
                    Current Year
                  </Label>
                  <Select
                    value={formData.currentYear.toString()}
                    onValueChange={(value) => setFormData({ ...formData, currentYear: parseInt(value) })}
                  >
                      <SelectTrigger className="h-11 border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                      <SelectContent className="rounded-lg border-gray-200 w-[calc(100vw-2rem)] sm:w-auto">
                      {[1, 2, 3, 4].map((year) => (
                          <SelectItem key={year} value={year.toString()} className="text-sm py-2">
                          Year {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-sm font-medium text-gray-900">
                    Current Semester
                  </Label>
                  <Select
                    value={formData.currentSemester.toString()}
                    onValueChange={(value) => setFormData({ ...formData, currentSemester: parseInt(value) })}
                  >
                      <SelectTrigger className="h-11 border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                      <SelectContent className="rounded-lg border-gray-200 w-[calc(100vw-2rem)] sm:w-auto">
                        <SelectItem value="1" className="text-sm py-2">Semester 1</SelectItem>
                        <SelectItem value="2" className="text-sm py-2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

                <div className="pt-4 sm:pt-6">
                <Button 
                  type="submit" 
                    className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl touch-manipulation"
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
      <footer className="text-center py-3 sm:py-4 text-xs text-gray-500 bg-white border-t border-gray-100 flex-shrink-0">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors font-medium">
          Developed by Ravindu 👨🏻‍💻
        </a>
      </footer>
    </div>
  );
};
