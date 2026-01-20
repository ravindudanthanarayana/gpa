import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Edit2, ArrowLeft, Trophy, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Profile {
  degreeProgram: string;
  specialization?: string;
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

// Updated curriculum structure with new degree programs and module names
const curriculum = {
  'B.Sc. (Hons) in Information Technology - IT': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['IT13', 'IT14', 'IT15', 'IT16'] },
    3: { 1: ['IT17', 'IT18', 'IT19', 'IT20'], 2: ['IT21', 'IT22', 'IT23', 'IT24'] },
    4: { 1: ['IT25', 'IT26', 'IT27', 'IT28'], 2: ['IT29', 'IT30', 'IT31', 'IT32'] }
  },
  'B.Sc. (Hons) in Information Technology - SE': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['SE13', 'SE14', 'SE15', 'SE16'] },
    3: { 1: ['SE17', 'SE18', 'SE19', 'SE20'], 2: ['SE21', 'SE22', 'SE23', 'SE24'] },
    4: { 1: ['SE25', 'SE26', 'SE27', 'SE28'], 2: ['SE29', 'SE30', 'SE31', 'SE32'] }
  },
  'B.Sc. (Hons) in Information Technology - CSNE': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['CSNE13', 'CSNE14', 'CSNE15', 'CSNE16'] },
    3: { 1: ['CSNE17', 'CSNE18', 'CSNE19', 'CSNE20'], 2: ['CSNE21', 'CSNE22', 'CSNE23', 'CSNE24'] },
    4: { 1: ['CSNE25', 'CSNE26', 'CSNE27', 'CSNE28'], 2: ['CSNE29', 'CSNE30', 'CSNE31', 'CSNE32'] }
  },
  'B.Sc. (Hons) in Information Technology - ISE': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['ISE13', 'ISE14', 'ISE15', 'ISE16'] },
    3: { 1: ['ISE17', 'ISE18', 'ISE19', 'ISE20'], 2: ['ISE21', 'ISE22', 'ISE23', 'ISE24'] },
    4: { 1: ['ISE25', 'ISE26', 'ISE27', 'ISE28'], 2: ['ISE29', 'ISE30', 'ISE31', 'ISE32'] }
  },
  'B.Sc. (Hons) in Information Technology - CS': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['CS13', 'CS14', 'CS15', 'CS16'] },
    3: { 1: ['CS17', 'CS18', 'CS19', 'CS20'], 2: ['CS21', 'CS22', 'CS23', 'CS24'] },
    4: { 1: ['CS25', 'CS26', 'CS27', 'CS28'], 2: ['CS29', 'CS30', 'CS31', 'CS32'] }
  },
  'B.Sc. (Hons) in Information Technology - DS': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['DS13', 'DS14', 'DS15', 'DS16'] },
    3: { 1: ['DS17', 'DS18', 'DS19', 'DS20'], 2: ['DS21', 'DS22', 'DS23', 'DS24'] },
    4: { 1: ['DS25', 'DS26', 'DS27', 'DS28'], 2: ['DS29', 'DS30', 'DS31', 'DS32'] }
  },
  'B.Sc. (Hons) in Information Technology - IM': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['IM13', 'IM14', 'IM15', 'IM16'] },
    3: { 1: ['IM17', 'IM18', 'IM19', 'IM20'], 2: ['IM21', 'IM22', 'IM23', 'IM24'] },
    4: { 1: ['IM25', 'IM26', 'IM27', 'IM28'], 2: ['IM29', 'IM30', 'IM31', 'IM32'] }
  },
  'B.Sc. (Hons) in Information Technology - AI': {
    1: { 1: ['IP', 'MC', 'FC', 'DCN'], 2: ['OOP', 'DSA', 'TW', 'DM'] },
    2: { 1: ['PS', 'SE', 'AI', 'DDD'], 2: ['AI13', 'AI14', 'AI15', 'AI16'] },
    3: { 1: ['AI17', 'AI18', 'AI19', 'AI20'], 2: ['AI21', 'AI22', 'AI23', 'AI24'] },
    4: { 1: ['AI25', 'AI26', 'AI27', 'AI28'], 2: ['AI29', 'AI30', 'AI31', 'AI32'] }
  },
  'B.Sc. (Hons) in Computer Science (CS)': {
    1: { 1: ['CS1', 'CS2', 'CS3', 'CS4'], 2: ['CS5', 'CS6', 'CS7', 'CS8'] },
    2: { 1: ['CS9', 'CS10', 'CS11', 'CS12'], 2: ['CS13', 'CS14', 'CS15', 'CS16'] },
    3: { 1: ['CS17', 'CS18', 'CS19', 'CS20'], 2: ['CS21', 'CS22', 'CS23', 'CS24'] },
    4: { 1: ['CS25', 'CS26', 'CS27', 'CS28'], 2: ['CS29', 'CS30', 'CS31', 'CS32'] }
  },
  'B.Sc. (Hons) in Computer Systems Engineering (CSE)': {
    1: { 1: ['CSE1', 'CSE2', 'CSE3', 'CSE4'], 2: ['CSE5', 'CSE6', 'CSE7', 'CSE8'] },
    2: { 1: ['CSE9', 'CSE10', 'CSE11', 'CSE12'], 2: ['CSE13', 'CSE14', 'CSE15', 'CSE16'] },
    3: { 1: ['CSE17', 'CSE18', 'CSE19', 'CSE20'], 2: ['CSE21', 'CSE22', 'CSE23', 'CSE24'] },
    4: { 1: ['CSE25', 'CSE26', 'CSE27', 'CSE28'], 2: ['CSE29', 'CSE30', 'CSE31', 'CSE32'] }
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
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('gpaActiveTab') || '1');

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    localStorage.setItem('gpaActiveTab', newTab);
  }

  const generateModules = useCallback(() => {
    const modules: Module[] = [];
    
    // Construct the full degree program key based on degree program and specialization
    let degreeProgramKey = profile.degreeProgram;
    if (profile.degreeProgram === 'B.Sc. (Hons) in Information Technology' && profile.specialization) {
      degreeProgramKey = `${profile.degreeProgram} - ${profile.specialization}`;
    }
    
    const degreeProgram = degreeProgramKey as keyof typeof curriculum;
    
    // Debug: Log the degree program and available curriculum keys
    console.log('Profile:', profile);
    console.log('Degree Program Key:', degreeProgramKey);
    console.log('Available curriculum keys:', Object.keys(curriculum));
    console.log('Curriculum for this program:', curriculum[degreeProgram]);

    for (let year = 1; year <= profile.currentYear; year++) {
      const maxSemester = year === profile.currentYear ? profile.currentSemester : 2;
      for (let semester = 1; semester <= maxSemester; semester++) {
        const moduleNames = curriculum[degreeProgram]?.[year]?.[semester] || [];
        console.log(`Year ${year}, Semester ${semester} modules:`, moduleNames);
        
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

    console.log('Generated modules:', modules);
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
      setTimeout(() => setShowCelebration(false), 5000); // Auto-hide after 5 seconds
    }
  }, []);

  useEffect(() => {
    const allModulesGraded = modules.every(m => m.grade);
    if (allModulesGraded && modules.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [modules]);

  useEffect(() => {
    // Clear localStorage to force regeneration with new curriculum
    localStorage.removeItem('gpaModules');
    generateModules();
  }, [profile, generateModules, calculateGPA]);

  const handleModuleUpdate = (moduleIndex: number, field: keyof Module, value: string | number) => {
    const updatedModules = [...modules];
    const moduleBeforeUpdate = { ...updatedModules[moduleIndex] };
    updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], [field]: value };
    
    if (field === 'grade') {
      updatedModules[moduleIndex].grade_points = value ? gradePoints[value as string] : undefined;
    }
    
    setModules(updatedModules);
    localStorage.setItem('gpaModules', JSON.stringify(updatedModules));
    calculateGPA(updatedModules);

    // Auto-switch tab logic
    if (field === 'grade' && value && !moduleBeforeUpdate.grade) {
      const yearOfModule = updatedModules[moduleIndex].year;
      const modulesInYear = updatedModules.filter(m => m.year === yearOfModule);
      const allInYearGraded = modulesInYear.every(m => m.grade);

      if (allInYearGraded) {
        const yearsWithModules = [...new Set(updatedModules.map(m => m.year))].sort((a,b) => a - b);
        const currentYearIndex = yearsWithModules.indexOf(yearOfModule);
        if (currentYearIndex !== -1 && currentYearIndex < yearsWithModules.length - 1) {
          const nextYear = yearsWithModules[currentYearIndex + 1];
          handleTabChange(nextYear.toString()); // Use handleTabChange to also save state
        }
      }
    }
  };

  const groupModulesByYearAndSemester = () => {
    const grouped: { [year: string]: { [semester: string]: Module[] } } = {};
    modules.forEach(module => {
      const yearKey = module.year.toString();
      const semesterKey = module.semester.toString();

      if (!grouped[yearKey]) {
        grouped[yearKey] = {};
      }
      if (!grouped[yearKey][semesterKey]) {
        grouped[yearKey][semesterKey] = [];
      }
      grouped[yearKey][semesterKey].push(module);
    });
    return grouped;
  };

  const getGradeColorClass = (grade: string | null): string => {
    if (!grade) return 'bg-card border-border';
    switch (grade) {
      case 'A+': return 'bg-green-300/50 border-green-500';
      case 'A': return 'bg-green-200/50 border-green-400';
      case 'A-': return 'bg-green-100/50 border-green-300';
      case 'B+': return 'bg-lime-300/50 border-lime-500';
      case 'B': return 'bg-lime-200/50 border-lime-400';
      case 'B-': return 'bg-lime-100/50 border-lime-300';
      case 'C+': return 'bg-yellow-200/50 border-yellow-400';
      case 'C': return 'bg-yellow-100/50 border-yellow-300';
      case 'C-': return 'bg-orange-200/50 border-orange-400';
      case 'D+': return 'bg-orange-300/50 border-orange-500';
      case 'D': return 'bg-red-200/50 border-red-400';
      case 'E': return 'bg-red-300/50 border-red-500';
      default: return 'bg-card border-border';
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12 sm:mb-16">
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4 tracking-tight">
              GPA Calculator
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-muted-foreground">
              <span className="text-lg sm:text-xl">
                {profile.degreeProgram}
                {profile.specialization && ` - ${profile.specialization}`}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-base sm:text-lg">Year {profile.currentYear}, Semester {profile.currentSemester}</span>
              <Button onClick={onEditProfile} variant="outline" size="sm" className="rounded-full border-border w-fit touch-manipulation" aria-label="Edit profile settings">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4 flex-shrink-0">
            <Button onClick={onBackToHome} variant="outline" className="rounded-full border-border text-muted-foreground flex-1 sm:flex-none touch-manipulation" aria-label="Go back to home page">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </header>

        {/* Dean's List Celebration */}
        {showCelebration && (
          <div className="fixed bottom-6 right-6 z-50" role="alert" aria-live="polite">
            <div className="bg-card text-card-foreground border border-border rounded-lg p-4 max-w-xs text-center shadow-lg animate-in fade-in duration-300 slide-in-from-bottom-4">
              <button 
                onClick={() => setShowCelebration(false)}
                className="absolute top-1 right-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close celebration message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Congratulations!</h3>
                  <p className="text-xs text-muted-foreground">You're on the Dean's List!</p>
                </div>
              </div>
          </div>
        </div>
        )}

        {/* GPA Summary */}
        <section>
        <Card className="mb-12 sm:mb-16 border-0 shadow-lg rounded-3xl sm:rounded-[2rem] overflow-hidden bg-card">
            <CardContent className="p-8 sm:p-12">
              <div className="flex justify-center">
              <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-normal text-blue-600 mb-3 tracking-tight" aria-label={`Cumulative GPA: ${gpaData.cumulative_gpa.toFixed(2)}`}>
                  {gpaData.cumulative_gpa.toFixed(2)}
                </div>
                  <div className="text-muted-foreground text-lg">Cumulative GPA</div>
              </div>
            </div>
          </CardContent>
        </Card>
        </section>

        {/* Modules Section */}
        <section>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted rounded-full h-12 p-1" role="tablist">
              {Object.keys(groupModulesByYearAndSemester()).map(year => (
                <TabsTrigger key={year} value={year} className="rounded-full text-base data-[state=active]:bg-background data-[state=active]:shadow-md" role="tab">
                  Year {year}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(groupModulesByYearAndSemester()).map(([year, semesters]) => (
              <TabsContent key={year} value={year} className="space-y-10 mt-6" role="tabpanel">
                {Object.entries(semesters).map(([semester, semesterModules]) => (
                  <div key={semester}>
                    <h3 className="text-lg font-medium text-muted-foreground mb-4 pl-2">Semester {semester}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {semesterModules.map((module) => {
                    const globalIndex = modules.findIndex(m => m.id === module.id);
                    
                    return (
                          <article key={module.id} className={`p-3 rounded-xl border space-y-2 transition-all hover:shadow-lg hover:border-blue-300 ${getGradeColorClass(module.grade)}`}>
                            <div className="text-center font-semibold text-foreground text-xs truncate">
                          {module.module_name}
                        </div>
                        
                        <Input
                          type="number"
                          placeholder="Credits"
                          value={module.credits}
                              onChange={(e) => handleModuleUpdate(globalIndex, 'credits', parseInt(e.target.value) || 4)}
                          min="1"
                          max="6"
                              className="border-input rounded-lg bg-background h-9 text-xs touch-manipulation text-center focus:bg-background"
                              aria-label={`Credits for ${module.module_name}`}
                        />
                        
                        <Select
                          value={module.grade || ''}
                          onValueChange={(value) => handleModuleUpdate(globalIndex, 'grade', value)}
                        >
                              <SelectTrigger className={`rounded-lg transition-colors h-9 text-xs touch-manipulation ${module.grade ? 'border-blue-300 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 font-semibold' : 'border-input bg-background'}`}>
                                <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                              <SelectContent className="rounded-lg border-border">
                            {grades.map((grade) => (
                                  <SelectItem key={grade} value={grade} className="py-1 text-xs">
                                {grade} ({gradePoints[grade]})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                          </article>
                    );
                  })}
                </div>
                  </div>
                ))}
              </TabsContent>
          ))}
          </Tabs>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground mt-auto">
        <a href="https://www.linkedin.com/in/ravindudanthanarayana/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
          Developed by Ravindu 👨🏻‍💻
        </a>
      </footer>
    </main>
  );
};
