import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface Profile {
  degreeProgram: string;
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
    currentYear: 1,
    currentSemester: 1,
  });

  const degreePrograms = [
    'Information Technology',
    'Software Engineering',
    'Data Science',
    'Information Systems Engineering'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.degreeProgram) {
      localStorage.removeItem('gpaModules');
      onProfileComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-8 sm:mb-12 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full px-6 sm:px-8 py-3 sm:py-4 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img 
                src="/lovable-uploads/680455e5-c000-4aed-bc7e-4ca59054a3e6.png" 
                alt="SLIIT Logo" 
                className="h-16 w-12 sm:h-20 sm:w-16"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Setup Your
              <span className="block text-blue-600">Profile</span>
            </h1>
          </div>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-2xl rounded-3xl sm:rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <Label htmlFor="degree" className="text-lg sm:text-xl font-medium text-gray-900">
                  Degree Program
                </Label>
                <Select
                  value={formData.degreeProgram}
                  onValueChange={(value) => setFormData({ ...formData, degreeProgram: value })}
                >
                  <SelectTrigger className="h-14 sm:h-16 border-gray-200 rounded-xl text-lg sm:text-xl bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                    <SelectValue placeholder="Select your degree program" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200">
                    {degreePrograms.map((program) => (
                      <SelectItem key={program} value={program} className="text-lg sm:text-xl py-4">
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <Label htmlFor="year" className="text-lg sm:text-xl font-medium text-gray-900">
                    Current Year
                  </Label>
                  <Select
                    value={formData.currentYear.toString()}
                    onValueChange={(value) => setFormData({ ...formData, currentYear: parseInt(value) })}
                  >
                    <SelectTrigger className="h-14 sm:h-16 border-gray-200 rounded-xl text-lg sm:text-xl bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200">
                      {[1, 2, 3, 4].map((year) => (
                        <SelectItem key={year} value={year.toString()} className="text-lg sm:text-xl py-4">
                          Year {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="semester" className="text-lg sm:text-xl font-medium text-gray-900">
                    Current Semester
                  </Label>
                  <Select
                    value={formData.currentSemester.toString()}
                    onValueChange={(value) => setFormData({ ...formData, currentSemester: parseInt(value) })}
                  >
                    <SelectTrigger className="h-14 sm:h-16 border-gray-200 rounded-xl text-lg sm:text-xl bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200">
                      <SelectItem value="1" className="text-lg sm:text-xl py-4">Semester 1</SelectItem>
                      <SelectItem value="2" className="text-lg sm:text-xl py-4">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6 sm:pt-8">
                <Button 
                  type="submit" 
                  className="w-full h-14 sm:h-16 bg-blue-600 hover:bg-blue-700 text-lg sm:text-xl font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl touch-manipulation"
                  disabled={!formData.degreeProgram}
                >
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <footer className="text-center py-4 text-sm text-gray-500">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu Danthanarayana
        </a>
      </footer>
    </div>
  );
};
