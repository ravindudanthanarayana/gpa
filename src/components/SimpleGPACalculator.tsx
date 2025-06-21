import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Edit2, ArrowLeft, Trophy, Star } from 'lucide-react';

interface Profile {
  degreeProgram: string;
  currentYear: number;
  currentSemester: number;
}

interface Module {
  id: string;
  year: number;
  semester: number;
  module_number: number;
  module_name: string;
  credits: number;
  grade: string | null;
  grade_points?: number;
}

interface SimpleGPACalculatorProps {
  profile: Profile;
  onEditProfile: () => void;
  onBackToHome: () => void;
}

// Updated curriculum structure with simplified module names
const curriculum = {
  'Information Technology': {
    1: { 1: ['IT1', 'IT2', 'IT3', 'IT4'], 2: ['IT5', 'IT6', 'IT7', 'IT8'] },
    2: { 1: ['IT9', 'IT10', 'IT11', 'IT12'], 2: ['IT13', 'IT14', 'IT15', 'IT16'] },
    3: { 1: ['IT17', 'IT18', 'IT19', 'IT20'], 2: ['IT21', 'IT22', 'IT23', 'IT24'] },
    4: { 1: ['IT25', 'IT26', 'IT27', 'IT28'], 2: ['IT29', 'IT30', 'IT31', 'IT32'] }
  },
  'Software Engineering': {
    1: { 1: ['SE1', 'SE2', 'SE3', 'SE4'], 2: ['SE5', 'SE6', 'SE7', 'SE8'] },
    2: { 1: ['SE9', 'SE10', 'SE11', 'SE12'], 2: ['SE13', 'SE14', 'SE15', 'SE16'] },
    3: { 1: ['SE17', 'SE18', 'SE19', 'SE20'], 2: ['SE21', 'SE22', 'SE23', 'SE24'] },
    4: { 1: ['SE25', 'SE26', 'SE27', 'SE28'], 2: ['SE29', 'SE30', 'SE31', 'SE32'] }
  },
  'Data Science': {
    1: { 1: ['DS1', 'DS2', 'DS3', 'DS4'], 2: ['DS5', 'DS6', 'DS7', 'DS8'] },
    2: { 1: ['DS9', 'DS10', 'DS11', 'DS12'], 2: ['DS13', 'DS14', 'DS15', 'DS16'] },
    3: { 1: ['DS17', 'DS18', 'DS19', 'DS20'], 2: ['DS21', 'DS22', 'DS23', 'DS24'] },
    4: { 1: ['DS25', 'DS26', 'DS27', 'DS28'], 2: ['DS29', 'DS30', 'DS31', 'DS32'] }
  },
  'Information Systems Engineering': {
    1: { 1: ['ISE1', 'ISE2', 'ISE3', 'ISE4'], 2: ['ISE5', 'ISE6', 'ISE7', 'ISE8'] },
    2: { 1: ['ISE9', 'ISE10', 'ISE11', 'ISE12'], 2: ['ISE13', 'ISE14', 'ISE15', 'ISE16'] },
    3: { 1: ['ISE17', 'ISE18', 'ISE19', 'ISE20'], 2: ['ISE21', 'ISE22', 'ISE23', 'ISE24'] },
    4: { 1: ['ISE25', 'ISE26', 'ISE27', 'ISE28'], 2: ['ISE29', 'ISE30', 'ISE31', 'ISE32'] }
  }
};

const gradePoints: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'E': 0.0
};

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E'];

export const SimpleGPACalculator = ({ profile, onEditProfile, onBackToHome }: SimpleGPACalculatorProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [gpaData, setGpaData] = useState({ cumulative_gpa: 0, total_credits: 0 });
  const [showCelebration, setShowCelebration] = useState(false);

  const generateModules = useCallback(() => {
    const modules: Module[] = [];
    const degreeProgram = profile.degreeProgram as keyof typeof curriculum;

    for (let year = 1; year <= profile.currentYear; year++) {
      const maxSemester = year === profile.currentYear ? profile.currentSemester : 2;
      for (let semester = 1; semester <= maxSemester; semester++) {
        const moduleNames = curriculum[degreeProgram]?.[year]?.[semester] || [];
        
        for (let moduleNumber = 1; moduleNumber <= 4; moduleNumber++) {
          const defaultModuleName = moduleNames[moduleNumber - 1] || `Module ${moduleNumber}`;

          modules.push({
            id: `${year}-${semester}-${moduleNumber}`,
            year,
            semester,
            module_number: moduleNumber,
            module_name: defaultModuleName,
            credits: 4,
            grade: null,
          });
        }
      }
    }

    setModules(modules);
    localStorage.setItem('gpaModules', JSON.stringify(modules));
  }, [profile]);

  const calculateGPA = useCallback((moduleList: Module[]) => {
    const validModules = moduleList.filter(m => m.grade && gradePoints[m.grade] !== undefined);
    
    if (validModules.length === 0) {
      setGpaData({ cumulative_gpa: 0, total_credits: 0 });
      return;
    }

    const totalWeightedPoints = validModules.reduce((sum, module) => {
      return sum + (gradePoints[module.grade!] * module.credits);
    }, 0);
    
    const totalCredits = validModules.reduce((sum, module) => sum + module.credits, 0);
    const cumulativeGPA = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    setGpaData({
      cumulative_gpa: cumulativeGPA,
      total_credits: totalCredits,
    });

    const allModulesGraded = moduleList.every(m => m.grade);

    if (cumulativeGPA > 3.7 && allModulesGraded && validModules.length > 0) {
      setShowCelebration(true);
    }
  }, []);

  useEffect(() => {
    const allModulesGraded = modules.every(m => m.grade);
    if (allModulesGraded && modules.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [modules]);

  useEffect(() => {
    // Load modules from localStorage
    const savedModules = localStorage.getItem('gpaModules');
    if (savedModules) {
      const parsedModules = JSON.parse(savedModules);
      // Update any modules with 3 credits to 4 credits
      const updatedModules = parsedModules.map((module: Module) => ({
        ...module,
        credits: module.credits === 3 ? 4 : module.credits
      }));
      setModules(updatedModules);
      localStorage.setItem('gpaModules', JSON.stringify(updatedModules));
      calculateGPA(updatedModules);
    } else {
      generateModules();
    }
  }, [profile, generateModules, calculateGPA]);

  const handleModuleUpdate = (moduleIndex: number, field: keyof Module, value: string | number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], [field]: value };
    
    if (field === 'grade') {
      updatedModules[moduleIndex].grade_points = value ? gradePoints[value as string] : undefined;
    }
    
    setModules(updatedModules);
    localStorage.setItem('gpaModules', JSON.stringify(updatedModules));
    calculateGPA(updatedModules);
  };

  const groupModulesBySemester = () => {
    const grouped: { [key: string]: Module[] } = {};
    modules.forEach(module => {
      const key = `Year ${module.year} - Semester ${module.semester}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(module);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12 sm:mb-16">
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
              GPA Calculator
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600">
              <span className="text-lg sm:text-xl truncate">{profile.degreeProgram}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-base sm:text-lg">Year {profile.currentYear}, Semester {profile.currentSemester}</span>
              <Button onClick={onEditProfile} variant="outline" size="sm" className="rounded-full border-gray-300 w-fit touch-manipulation">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4 flex-shrink-0">
            <Button onClick={onBackToHome} variant="outline" className="rounded-full border-gray-300 text-gray-600 flex-1 sm:flex-none touch-manipulation">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </div>

        {/* Dean's List Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center shadow-lg animate-in zoom-in-95 duration-300 relative">
              <button 
                onClick={() => setShowCelebration(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex justify-center mb-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎉 Congratulations!
              </h3>
              <p className="text-sm text-gray-600">
                You've been selected for the Dean's List!
              </p>
            </div>
          </div>
        )}

        {/* GPA Summary */}
        <Card className="mb-12 sm:mb-16 border-0 shadow-lg rounded-3xl sm:rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-light text-blue-600 mb-3 sm:mb-4">
                  {gpaData.cumulative_gpa.toFixed(2)}
                </div>
                <div className="text-gray-600 text-lg sm:text-xl">Cumulative GPA</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-light text-gray-900 mb-3 sm:mb-4">
                  {gpaData.total_credits}
                </div>
                <div className="text-gray-600 text-lg sm:text-xl">Total Credits</div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-light text-gray-900 mb-3 sm:mb-4">
                  {Object.keys(groupModulesBySemester()).length}
                </div>
                <div className="text-gray-600 text-lg sm:text-xl">Semesters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules by Semester */}
        <div className="space-y-8 sm:space-y-12">
          {Object.entries(groupModulesBySemester()).map(([semesterKey, semesterModules]) => (
            <Card key={semesterKey} className="border-0 shadow-lg rounded-3xl sm:rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-gray-50 p-8 sm:p-12">
                <CardTitle className="text-2xl sm:text-3xl font-light text-gray-900">{semesterKey}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {semesterModules.map((module, moduleIndex) => {
                    const globalIndex = modules.findIndex(m => m.id === module.id);
                    
                    return (
                      <div key={module.id} className="space-y-4 sm:space-y-6">
                        {/* Module Name - Read Only */}
                        <div className="text-center p-4 sm:p-6 bg-gray-100 rounded-xl text-lg sm:text-xl font-medium text-gray-900">
                          {module.module_name}
                        </div>
                        
                        {/* Credits Input */}
                        <Input
                          type="number"
                          placeholder="Credits"
                          value={module.credits}
                          onChange={(e) => handleModuleUpdate(globalIndex, 'credits', parseInt(e.target.value) || 4)}
                          min="1"
                          max="6"
                          className="border-gray-200 rounded-xl bg-white h-12 sm:h-14 text-base sm:text-lg touch-manipulation text-center"
                        />
                        
                        {/* Grade Selection */}
                        <Select
                          value={module.grade || ''}
                          onValueChange={(value) => handleModuleUpdate(globalIndex, 'grade', value)}
                        >
                          <SelectTrigger className={`rounded-xl transition-colors h-12 sm:h-14 text-base sm:text-lg touch-manipulation ${module.grade ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                            <SelectValue placeholder="Select Grade" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-gray-200">
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade} className="py-3 sm:py-4 text-base sm:text-lg">
                                {grade} ({gradePoints[grade]})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
