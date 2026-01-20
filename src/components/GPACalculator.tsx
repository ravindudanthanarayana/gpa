import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { LogOut, Calculator, Edit2, Save, X, Trophy, Star } from 'lucide-react';

type GradeEnum = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';
type DegreeProgramEnum = 'Software Engineering' | 'Information Technology' | 'Data Science';

interface Module {
  id?: string;
  year: number;
  semester: number;
  module_number: number;
  module_name: string;
  credits: number;
  grade: GradeEnum | null;
  grade_points?: number;
}

interface Profile {
  degree_program: DegreeProgramEnum;
  current_year: number;
  current_semester: number;
}

interface GPAData {
  semester_gpa: number;
  cumulative_gpa: number;
  total_credits: number;
}

// Grade points mapping
const gradePoints: Record<GradeEnum, number> = {
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
  'F': 0.0,
};

const degreePrograms: DegreeProgramEnum[] = [
  'Software Engineering',
  'Information Technology',
  'Data Science'
];

const grades: GradeEnum[] = [
  'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'
];

// Curriculum structure for all degree programs
const curriculum = {
  'Software Engineering': {
    1: {
      1: [
        'Introduction to Information Technology',
        'Fundamentals of Programming (Python or Java)',
        'Digital Systems and Computer Organization',
        'Academic Writing and Communication Skills'
      ],
      2: [
        'Data Structures and Algorithms',
        'Web Technologies I (HTML, CSS, JS Basics)',
        'Discrete Mathematics',
        'Introduction to Databases'
      ]
    },
    2: {
      1: [
        'Object-Oriented Programming',
        'Operating Systems',
        'Web Technologies II (Client/Server, APIs)',
        'Software Engineering Fundamentals'
      ],
      2: [
        'Computer Networks',
        'Database Management Systems',
        'Human-Computer Interaction',
        'Systems Analysis and Design'
      ]
    },
    3: {
      1: [
        'Mobile Application Development',
        'IT Project Management',
        'Information Security Fundamentals',
        'Cloud Computing Basics'
      ],
      2: [
        'Artificial Intelligence / Machine Learning Basics',
        'Data Analytics and Visualization',
        'Advanced Database Systems (NoSQL, Data Warehousing)',
        'Elective I (Game Development / FinTech / IoT)'
      ]
    },
    4: {
      1: [
        'Final Year Project I (Proposal + Planning)',
        'IT Ethics and Law',
        'DevOps and Software Deployment',
        'Elective II (Cybersecurity, Blockchain, AR/VR)'
      ],
      2: [
        'Final Year Project II (Implementation + Presentation)',
        'Entrepreneurship and Innovation in IT',
        'Professional Practice and Portfolio Development',
        'Elective III (Data Science Capstone, Advanced Networking)'
      ]
    }
  },
  'Information Technology': {
    1: {
      1: [
        'Computer Fundamentals and Applications',
        'Programming Fundamentals (C/C++)',
        'Mathematics for Computing',
        'English Language Skills'
      ],
      2: [
        'Object-Oriented Programming',
        'Computer Architecture',
        'Statistics for IT',
        'Business Communication'
      ]
    },
    2: {
      1: [
        'Data Structures and Algorithms',
        'Database Systems',
        'Computer Networks',
        'Management Information Systems'
      ],
      2: [
        'Web Programming',
        'Software Engineering',
        'Operating Systems',
        'Project Management'
      ]
    },
    3: {
      1: [
        'Information Systems Development',
        'Network Security',
        'Mobile Computing',
        'E-Commerce Technologies'
      ],
      2: [
        'IT Service Management',
        'Business Intelligence',
        'Cloud Technologies',
        'Elective I (IoT / Digital Marketing)'
      ]
    },
    4: {
      1: [
        'Research Project I',
        'IT Governance and Compliance',
        'Enterprise Architecture',
        'Elective II (AI Applications / Data Mining)'
      ],
      2: [
        'Research Project II',
        'Professional Ethics in IT',
        'Innovation and Technology Management',
        'Industrial Training'
      ]
    }
  },
  'Data Science': {
    1: {
      1: [
        'Introduction to Data Science',
        'Programming for Data Science (Python)',
        'Statistics and Probability',
        'Linear Algebra'
      ],
      2: [
        'Data Structures and Algorithms',
        'Database Systems for Data Science',
        'Calculus for Data Science',
        'Research Methods'
      ]
    },
    2: {
      1: [
        'Machine Learning Fundamentals',
        'Data Visualization',
        'Statistical Computing (R)',
        'Big Data Technologies'
      ],
      2: [
        'Advanced Machine Learning',
        'Data Mining and Knowledge Discovery',
        'Time Series Analysis',
        'Web Scraping and APIs'
      ]
    },
    3: {
      1: [
        'Deep Learning',
        'Natural Language Processing',
        'Computer Vision',
        'Distributed Computing'
      ],
      2: [
        'Advanced Analytics',
        'Recommendation Systems',
        'A/B Testing and Experimentation',
        'Elective I (MLOps / Reinforcement Learning)'
      ]
    },
    4: {
      1: [
        'Data Science Capstone Project I',
        'Ethics in Data Science',
        'Advanced Statistical Modeling',
        'Elective II (Computer Vision / NLP)'
      ],
      2: [
        'Data Science Capstone Project II',
        'Data Science Leadership',
        'Industry Applications and Case Studies',
        'Elective III (Advanced ML / Big Data Analytics)'
      ]
    }
  }
};

export const GPACalculator = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tempProfile, setTempProfile] = useState<Profile | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gpaData, setGpaData] = useState<GPAData>({
    semester_gpa: 0,
    cumulative_gpa: 0,
    total_credits: 0,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load profile from localStorage
      const savedProfile = localStorage.getItem('gpa_profile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      } else {
        // Default profile
        const defaultProfile: Profile = {
          degree_program: 'Software Engineering',
          current_year: 1,
          current_semester: 1,
        };
        setProfile(defaultProfile);
        localStorage.setItem('gpa_profile', JSON.stringify(defaultProfile));
      }

      // Load modules from localStorage
      const savedModules = localStorage.getItem('gpa_modules');
      if (savedModules) {
        const modulesData = JSON.parse(savedModules);
        // Update any modules with 3 credits to 4 credits
        const updatedModules = modulesData.map((module: Module) => ({
          ...module,
          credits: module.credits === 3 ? 4 : module.credits
        }));
        setModules(updatedModules);
        localStorage.setItem('gpa_modules', JSON.stringify(updatedModules));
      } else {
        // Generate default modules
        const defaultModules = generateModules(
          profile?.degree_program || 'Software Engineering',
          profile?.current_year || 1,
          profile?.current_semester || 1,
          []
        );
        setModules(defaultModules);
        localStorage.setItem('gpa_modules', JSON.stringify(defaultModules));
      }

      // Calculate GPA
      calculateGPA();
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateModules = (degreeProgram: DegreeProgramEnum, currentYear: number, currentSemester: number, existingModules: Module[]) => {
    const modules: Module[] = [];

    for (let year = 1; year <= currentYear; year++) {
      const maxSemester = year === currentYear ? currentSemester : 2;
      for (let semester = 1; semester <= maxSemester; semester++) {
        const moduleNames = curriculum[degreeProgram]?.[year]?.[semester] || [];
        
        for (let moduleNumber = 1; moduleNumber <= 4; moduleNumber++) {
          const existing = existingModules.find(
            m => m.year === year && m.semester === semester && m.module_number === moduleNumber
          );

          const defaultModuleName = moduleNames[moduleNumber - 1] || `Module ${moduleNumber}`;

          modules.push({
            id: existing?.id || `${year}-${semester}-${moduleNumber}`,
            year,
            semester,
            module_number: moduleNumber,
            module_name: existing?.module_name || defaultModuleName,
            credits: existing?.credits || 4,
            grade: existing?.grade || null,
            grade_points: existing?.grade_points,
          });
        }
      }
    }

    return modules;
  };

  const calculateGPA = () => {
    const modulesWithGrades = modules.filter(module => module.grade && module.grade_points !== undefined);

    if (modulesWithGrades.length > 0) {
      const totalWeightedPoints = modulesWithGrades.reduce((sum, module) => {
        return sum + ((module.grade_points || 0) * module.credits);
      }, 0);
      const totalCredits = modulesWithGrades.reduce((sum, module) => sum + module.credits, 0);
        const cumulativeGPA = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

        setGpaData({
          semester_gpa: cumulativeGPA, // For simplicity, using cumulative
          cumulative_gpa: cumulativeGPA,
          total_credits: totalCredits,
        });

      // Check for Dean's List (GPA > 3.7)
      if (cumulativeGPA > 3.7 && modulesWithGrades.length >= 4) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 4000); // Hide after 4 seconds
      }
      } else {
        setGpaData({
          semester_gpa: 0,
          cumulative_gpa: 0,
          total_credits: 0,
        });
    }
  };

  const handleModuleUpdate = async (moduleIndex: number, field: keyof Module, value: any) => {
    const updatedModules = [...modules];
    const module = updatedModules[moduleIndex];
    
    if (field === 'grade') {
      module.grade = value as GradeEnum;
      module.grade_points = value ? gradePoints[value] : undefined;
    } else {
      (module as any)[field] = value;
        }
    
    setModules(updatedModules);
    localStorage.setItem('gpa_modules', JSON.stringify(updatedModules));

      // Recalculate GPA
    calculateGPA();
  };

  const handleEditProfile = () => {
    setTempProfile(profile);
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    if (!tempProfile || !profile) return;
    
    setSaving(true);
    try {
      // Check if there are changes that require data deletion
      const shouldClearData = 
        tempProfile.degree_program !== profile.degree_program ||
        tempProfile.current_year !== profile.current_year ||
        tempProfile.current_semester !== profile.current_semester;

      // If there are significant changes, clear all existing module data
      if (shouldClearData) {
        localStorage.removeItem('gpa_modules');
      }

      // Save new profile
      setProfile(tempProfile);
      localStorage.setItem('gpa_profile', JSON.stringify(tempProfile));
      setEditingProfile(false);
      
      // Generate new modules based on new profile
      const allModules = generateModules(tempProfile.degree_program, tempProfile.current_year, tempProfile.current_semester, []);
      setModules(allModules);
      localStorage.setItem('gpa_modules', JSON.stringify(allModules));

      // Reset GPA data
      setGpaData({
        semester_gpa: 0,
        cumulative_gpa: 0,
        total_credits: 0,
      });

      if (shouldClearData) {
        toast({
          title: "Profile updated!",
          description: "Your academic information has been updated and all previous module data has been cleared.",
        });
      } else {
        toast({
          title: "Profile updated!",
          description: "Your academic information has been updated.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setTempProfile(null);
    setEditingProfile(false);
  };

  const handleSignOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('gpa_profile');
    localStorage.removeItem('gpa_modules');
    window.location.reload();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const groupedModules = groupModulesBySemester();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
              <Calculator className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
              SLIIT GPA Calculator
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
              {editingProfile && tempProfile ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Select
                    value={tempProfile.degree_program}
                    onValueChange={(value) => setTempProfile({ ...tempProfile, degree_program: value as DegreeProgramEnum })}
                  >
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {degreePrograms.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={tempProfile.current_year.toString()}
                    onValueChange={(value) => setTempProfile({ ...tempProfile, current_year: parseInt(value) })}
                  >
                    <SelectTrigger className="w-full sm:w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          Year {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={tempProfile.current_semester.toString()}
                    onValueChange={(value) => setTempProfile({ ...tempProfile, current_semester: parseInt(value) })}
                  >
                    <SelectTrigger className="w-full sm:w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} size="sm" disabled={saving}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <p className="text-muted-foreground">
                    {profile?.degree_program} - Year {profile?.current_year}, Semester {profile?.current_semester}
                  </p>
                  <Button onClick={handleEditProfile} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Dean's List Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-card text-card-foreground border border-border rounded-lg p-6 max-w-sm mx-4 text-center shadow-lg animate-in zoom-in-95 duration-300 relative">
              <button 
                onClick={() => setShowCelebration(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex justify-center mb-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                🎉 Congratulations!
              </h3>
              <p className="text-sm text-muted-foreground">
                You've been selected for the Dean's List!
              </p>
            </div>
          </div>
        )}

        {/* GPA Summary */}
        {gpaData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">GPA Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {gpaData.cumulative_gpa.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Cumulative GPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {gpaData.semester_gpa.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Semester GPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {gpaData.total_credits}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modules */}
        <div className="space-y-6">
          {Object.entries(groupedModules).map(([semester, semesterModules]) => (
            <Card key={semester}>
              <CardHeader>
                <CardTitle className="text-lg">{semester}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semesterModules.map((module, index) => {
                    const moduleIndex = modules.findIndex(m => m.id === module.id);
                    return (
                      <div key={module.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{module.module_name}</div>
                          <div className="text-sm text-muted-foreground">Module {module.module_number}</div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Input
                          type="number"
                          value={module.credits}
                            onChange={(e) => handleModuleUpdate(moduleIndex, 'credits', parseInt(e.target.value) || 4)}
                            className="w-20"
                          min="1"
                          max="6"
                        />
                          <span className="text-sm text-muted-foreground whitespace-nowrap">credits</span>
                        </div>
                        <Select
                          value={module.grade || ''}
                          onValueChange={(value) => handleModuleUpdate(moduleIndex, 'grade', value)}
                        >
                          <SelectTrigger className="w-full sm:w-24">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {module.grade_points !== undefined && (
                          <div className="text-sm text-muted-foreground w-12 text-right">
                            {module.grade_points.toFixed(1)}
                          </div>
                        )}
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
