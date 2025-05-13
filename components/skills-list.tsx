'use client'

import type React from "react"
import { Code, Database, Cloud, Component, Save, RefreshCw } from "lucide-react"
import { FaAws, FaDocker, FaJenkins, FaReact } from "react-icons/fa"
import {IoLogoVercel} from "react-icons/io5"
import { SiPostgresql, SiGraphql, SiMysql, SiPrisma, SiMongodb, SiTypescript, SiPython, SiCplusplus, SiR, SiVectorlogozone, SiFlask, SiCypress, SiJira } from "react-icons/si"
import { TbBrandCSharp, TbBrandNextjs } from "react-icons/tb"
import { VscCircuitBoard } from "react-icons/vsc"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { FaRegKeyboard } from "react-icons/fa6";

interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  logo: React.ReactNode
  position?: 'starter' | 'flex' | 'bench'
}

const categoryConfig = {
  "Cloud and DevOps": {color: "#ff2a6d", icon: <Cloud className="h-5 w-5" /> },
  "Databases and Query": {color: "#00ceb8", icon: <Database className="h-5 w-5" /> },
  "Languages": {color: "#58a7ff", icon: <Code className="h-5 w-5" /> },
  "Frameworks and Tools": {color: "#ffae58", icon: <Component className="h-5 w-5" /> }, 
}

type Category = keyof typeof categoryConfig

const SkillRow = ({ 
  skill, 
  config, 
  categoryBackgroundStyle,
  isSelected,
  isHighlighted,
  isDimmed,
  isSwappable,
  onClick,
  onMouseEnter,
  onMouseLeave
}: { 
  skill: Skill;
  config: typeof categoryConfig[Category];
  categoryBackgroundStyle: React.CSSProperties;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  isSwappable: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div 
    key={skill.id} 
    className={`
      flex items-center py-2 transition-all duration-200
      ${isSelected ? 'bg-orange-200 dark:bg-orange-900 ring-2 ring-orange-500 transform scale-[1.02]' : ''}
      ${isHighlighted && !isSelected ? 'bg-blue-200 dark:bg-teal-900/60' : ''}
      ${isDimmed ? 'opacity-50' : 'opacity-100'}
      ${isSwappable ? 'cursor-pointer' : ''}
    `}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div 
      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-white font-bold`} 
      style={categoryBackgroundStyle}
    >
      {config.icon}
    </div>
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4 overflow-hidden" suppressHydrationWarning>
      {skill.logo}
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-foreground">{skill.name}</p>
    </div>
    <div className="text-right ml-4">
      <p className="font-medium text-foreground">{skill.proficiency}<span className="text-xs text-foreground">%</span></p>
    </div>
  </div>
);

export default function SkillsList() {
  const skills: Skill[] = [
    // QB
    { id: 1, name: "Vercel", category: "Cloud and DevOps", proficiency: 90, logo: <IoLogoVercel className="h-8 w-8 text-[#000000]" /> },
    { id: 2, name: "AWS", category: "Cloud and DevOps", proficiency: 90, logo: <FaAws className="h-8 w-8 text-[#FF9900]" /> },
    { id: 3, name: "Docker", category: "Cloud and DevOps", proficiency: 90, logo: <FaDocker className="h-8 w-8 text-[#0DB7ED]" /> },
    { id: 4, name: "Jenkins", category: "Cloud and DevOps", proficiency: 60, logo: <FaJenkins className="h-8 w-8 text-[#D6B588]" /> },

    //RB
    { id: 5, name: "PostgreSQL", category: "Databases and Query", proficiency: 90, logo: <SiPostgresql className="h-8 w-8 text-[#0064a5]" /> }, 
    { id: 6, name: "GraphQL", category: "Databases and Query", proficiency: 90, logo: <SiGraphql className="h-8 w-8 text-[#E10098]" /> },
    { id: 7, name: "MySQL", category: "Databases and Query", proficiency: 85, logo: <SiMysql className="h-8 w-8 text-[#F29111]" /> }, 
    { id: 8, name: "Prisma ORM", category: "Databases and Query", proficiency: 85, logo: <SiPrisma className="h-8 w-8 text-[#000000]" /> },
    { id: 9, name: "MongoDB", category: "Databases and Query", proficiency: 70, logo: <SiMongodb className="h-8 w-8 text-[#00684a]" /> },

    //WR
    { id: 10, name: "C", category: "Languages", proficiency: 95, logo: <Image src="/c.svg" alt="C Logo" width={32} height={32} /> },
    { id: 11, name: "TypeScript & JavaScript", category: "Languages", proficiency: 90, logo: <SiTypescript className="h-8 w-8 text-[#3178C6]" /> },
    { id: 12, name: "Python", category: "Languages", proficiency: 90, logo: <SiPython className="h-8 w-8 text-[#306998]" /> },
    { id: 13, name: "C++", category: "Languages", proficiency: 90, logo: <SiCplusplus className="h-8 w-8 text-[#044F88]" /> },
    { id: 14, name: "C#", category: "Languages", proficiency: 70, logo: <TbBrandCSharp className="h-8 w-8 text-[#9b4993]" /> },
    { id: 15, name: "R", category: "Languages", proficiency: 70, logo: <SiR className="h-8 w-8 text-[#276DC2]" /> },
    { id: 16, name: "Verilog", category: "Languages", proficiency: 60, logo: <VscCircuitBoard className="h-8 w-8 text-[#f89820]" /> },

    //TE
    { id: 17, name: "React", category: "Frameworks and Tools", proficiency: 90, logo: <FaReact className="h-8 w-8 text-[#61DAFB]" /> },
    { id: 18, name: "Next.js", category: "Frameworks and Tools", proficiency: 90, logo: <TbBrandNextjs className="h-8 w-8 test-[e91e63]" /> },
    { id: 19, name: "Vector Tools", category: "Frameworks and Tools", proficiency: 80, logo: <SiVectorlogozone className="h-8 w-8 text-[#68A063]" /> },
    { id: 20, name: "Flask", category: "Frameworks and Tools", proficiency: 75, logo: <SiFlask className="h-8 w-8 text-[#000000]" /> },
    { id: 21, name: "Cypress", category: "Frameworks and Tools", proficiency: 75, logo: <SiCypress className="h-8 w-8 text-[#5B7444]" /> },
    { id: 22, name: "Jira", category: "Frameworks and Tools", proficiency: 75, logo: <SiJira className="h-8 w-8 text-[#0052CC]" /> },
  ];

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category as Category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<Category, Skill[]>);

  for (const category in groupedSkills) {
    groupedSkills[category as Category].sort((a, b) => b.proficiency - a.proficiency);
  }

  const [topSkills, setTopSkills] = useState<Skill[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [flexibleSlotIds, setFlexibleSlotIds] = useState<Set<number>>(new Set());
  const [groupedBenchSkills, setGroupedBenchSkills] = useState<Record<Category, Skill[]>>({} as Record<Category, Skill[]>);
  
  const [defaultSelectedIds, setDefaultSelectedIds] = useState<Set<number>>(new Set());
  const [defaultFlexibleSlotIds, setDefaultFlexibleSlotIds] = useState<Set<number>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);
  const [saveToastVisible, setSaveToastVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [highlightedSkillIds, setHighlightedSkillIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem('skillsConfiguration');
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        const newSelectedIds = new Set<number>(config.selectedIds);
        const newFlexibleSlotIds = new Set<number>(config.flexibleSlotIds);
        
        const newTopSkills = generateSkillsFromIds(newSelectedIds, newFlexibleSlotIds);
        const newBenchSkills = generateBenchSkillsFromIds(newSelectedIds);
        
        setSelectedIds(newSelectedIds);
        setFlexibleSlotIds(newFlexibleSlotIds);
        setTopSkills(newTopSkills);
        setGroupedBenchSkills(newBenchSkills);
        
        setDefaultSelectedIds(new Set<number>(newSelectedIds));
        setDefaultFlexibleSlotIds(new Set<number>(newFlexibleSlotIds));
        
        setIsLoading(false);
        return;
      } catch (e) {
        console.error("Error loading saved configuration:", e);
      }
    }
    
    const newSelectedIds = new Set<number>();
    const newFlexibleSlotIds = new Set<number>();
    const newTopSkills: Skill[] = [];

    const addTopSkill = (skill: Skill | undefined, isFlexible = false) => {
      if (skill && !newSelectedIds.has(skill.id)) {
        newTopSkills.push(skill);
        newSelectedIds.add(skill.id);
        if (isFlexible) {
          newFlexibleSlotIds.add(skill.id);
        }
      }
    };

    addTopSkill(groupedSkills["Cloud and DevOps"]?.[0]);
    addTopSkill(groupedSkills["Cloud and DevOps"]?.[1]);
    addTopSkill(groupedSkills["Cloud and DevOps"]?.[2]);
    groupedSkills["Databases and Query"]?.slice(0, 3).forEach(skill => addTopSkill(skill));
    groupedSkills["Languages"]?.slice(0, 3).forEach(skill => addTopSkill(skill));
    addTopSkill(groupedSkills["Frameworks and Tools"]?.[0]);

    const flexibleSkillsCategories: Category[] = ["Databases and Query", "Languages", "Frameworks and Tools"];
    const flexibleSkills: Skill[] = flexibleSkillsCategories.flatMap(category => 
      groupedSkills[category]?.filter(skill => !newSelectedIds.has(skill.id)) ?? []
    );
    flexibleSkills.sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 3)
      .forEach(skill => addTopSkill(skill, true));

    const newBenchSkills = skills.reduce((acc, skill) => {
      if (!newSelectedIds.has(skill.id)) {
        const category = skill.category as Category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
      }
      return acc;
    }, {} as Record<Category, Skill[]>);

    setSelectedIds(newSelectedIds);
    setFlexibleSlotIds(newFlexibleSlotIds);
    setTopSkills(newTopSkills);
    setGroupedBenchSkills(newBenchSkills);
    
    setDefaultSelectedIds(new Set(newSelectedIds));
    setDefaultFlexibleSlotIds(new Set(newFlexibleSlotIds));
    
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (!isLoading && defaultSelectedIds.size > 0) {
      let changed = false;
      
      if (selectedIds.size !== defaultSelectedIds.size || 
          flexibleSlotIds.size !== defaultFlexibleSlotIds.size) {
        changed = true;
      } else {
        selectedIds.forEach(id => {
          if (!defaultSelectedIds.has(id)) {
            changed = true;
          }
        });
        
        flexibleSlotIds.forEach(id => {
          if (!defaultFlexibleSlotIds.has(id)) {
            changed = true;
          }
        });
      }
      
      setHasChanges(changed);
    }
  }, [selectedIds, flexibleSlotIds, isLoading, defaultSelectedIds, defaultFlexibleSlotIds]);
  
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (selectedSkill && skillsContainerRef.current && !skillsContainerRef.current.contains(e.target as Node)) {
        setSelectedSkill(null);
        setHighlightedSkillIds(new Set());
      }
    };
    
    document.addEventListener('mousedown', handleGlobalClick);
    
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [selectedSkill]);

  const benchCategoryOrder: Category[] = [
    "Cloud and DevOps",
    "Databases and Query",
    "Languages",
    "Frameworks and Tools",
  ];

  const flexGradientStyle: React.CSSProperties = {
    background: 
      `linear-gradient(to right, 
        #58a7ff 0% 33.33%, 
        #00ceb8 33.33% 66.66%, 
        #ffae58 66.66% 100% 
      )`
  };

  const canSwapSkills = (skill1: Skill, skill2: Skill) => {
    if (skill1.id === skill2.id) return false;

    const isSkill1Starter = selectedIds.has(skill1.id) && !flexibleSlotIds.has(skill1.id);
    const isSkill2Starter = selectedIds.has(skill2.id) && !flexibleSlotIds.has(skill2.id);
    const isSkill1Flex = flexibleSlotIds.has(skill1.id);
    const isSkill2Flex = flexibleSlotIds.has(skill2.id);
    const isSkill1Bench = !selectedIds.has(skill1.id);
    const isSkill2Bench = !selectedIds.has(skill2.id);
    
    const canBeInFlex = (category: string) => {
      return ["Databases and Query", "Languages", "Frameworks and Tools"].includes(category);
    };
    
    if (isSkill1Starter && isSkill2Flex) {
      return skill1.category === skill2.category;
    }
    
    if (isSkill1Flex && isSkill2Starter) {
      return skill1.category === skill2.category;
    }
    
    if ((isSkill1Starter && isSkill2Bench) || (isSkill1Bench && isSkill2Starter)) {
      return skill1.category === skill2.category;
    }
    
    if ((isSkill1Flex && isSkill2Bench) || (isSkill1Bench && isSkill2Flex)) {
      const benchSkill = isSkill1Bench ? skill1 : skill2;
      return canBeInFlex(benchSkill.category);
    }
    
    if (isSkill1Flex && isSkill2Flex) {
      return true;
    }
    
    return false;
  };
  
  const handleSkillClick = (skill: Skill) => {
    if (!selectedSkill) {
      setSelectedSkill(skill);
      
      const isFlexPosition = flexibleSlotIds.has(skill.id);
      
      if (isFlexPosition) {
        const highlightableIds = new Set<number>();
        skills.forEach(s => {
          if (flexibleSlotIds.has(s.id)) {
            highlightableIds.add(s.id);
          } 
          else if (!selectedIds.has(s.id) && 
                  ["Databases and Query", "Languages", "Frameworks and Tools"].includes(s.category)) {
            highlightableIds.add(s.id);
          }
        });
        setHighlightedSkillIds(highlightableIds);
      } else {
        const swappableIds = new Set<number>();
        skills.forEach(s => {
          if (canSwapSkills(skill, s)) {
            swappableIds.add(s.id);
          }
        });
        setHighlightedSkillIds(swappableIds);
      }
    } 
    else if (selectedSkill.id === skill.id) {
      setSelectedSkill(null);
      setHighlightedSkillIds(new Set());
    } 
    else if (highlightedSkillIds.has(skill.id)) {
      swapSkills(selectedSkill, skill);
      
      setSelectedSkill(null);
      setHighlightedSkillIds(new Set());
    } 
    else {
      setSelectedSkill(null);
      setHighlightedSkillIds(new Set());
    }
  };
  
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedSkill(null);
      setHighlightedSkillIds(new Set());
    }
  };
  
  const swapSkills = (skill1: Skill, skill2: Skill) => {
    const newSelectedIds = new Set(selectedIds);
    const newFlexibleSlotIds = new Set(flexibleSlotIds);
    
    const isSkill1InTop = selectedIds.has(skill1.id);
    const isSkill2InTop = selectedIds.has(skill2.id);
    const isSkill1Flex = flexibleSlotIds.has(skill1.id);
    const isSkill2Flex = flexibleSlotIds.has(skill2.id);
    
    if (isSkill1InTop) newSelectedIds.delete(skill1.id);
    if (isSkill1Flex) newFlexibleSlotIds.delete(skill1.id);
    if (isSkill2InTop) newSelectedIds.delete(skill2.id);
    if (isSkill2Flex) newFlexibleSlotIds.delete(skill2.id);
    
    if (isSkill1InTop) newSelectedIds.add(skill2.id);
    if (isSkill1Flex) newFlexibleSlotIds.add(skill2.id);
    if (isSkill2InTop) newSelectedIds.add(skill1.id);
    if (isSkill2Flex) newFlexibleSlotIds.add(skill1.id);
    
    setSelectedIds(newSelectedIds);
    setFlexibleSlotIds(newFlexibleSlotIds);
    
    generateOrderedSkills(newSelectedIds, newFlexibleSlotIds);
  };
  
  const generateOrderedSkills = (newSelectedIds = selectedIds, newFlexibleSlotIds = flexibleSlotIds) => {
    const newTopSkills: Skill[] = [];
    
    const addSkillToTop = (skill: Skill | undefined, isFlexible = false) => {
      if (skill && newSelectedIds.has(skill.id)) {
        newTopSkills.push(skill);
      }
    };
    
    const cloudSkill = skills.find(skill => 
      skill.category === "Cloud and DevOps" && 
      newSelectedIds.has(skill.id) && 
      !newFlexibleSlotIds.has(skill.id)
    );
    addSkillToTop(cloudSkill);
    
    const dbSkills = skills.filter(skill => 
      skill.category === "Databases and Query" && 
      newSelectedIds.has(skill.id) && 
      !newFlexibleSlotIds.has(skill.id)
    );
    dbSkills.sort((a, b) => b.proficiency - a.proficiency);
    dbSkills.forEach(skill => addSkillToTop(skill));
    
    const langSkills = skills.filter(skill => 
      skill.category === "Languages" && 
      newSelectedIds.has(skill.id) && 
      !newFlexibleSlotIds.has(skill.id)
    );
    langSkills.sort((a, b) => b.proficiency - a.proficiency);
    langSkills.forEach(skill => addSkillToTop(skill));
    
    const frameworkSkills = skills.filter(skill => 
      skill.category === "Frameworks and Tools" && 
      newSelectedIds.has(skill.id) && 
      !newFlexibleSlotIds.has(skill.id)
    );
    frameworkSkills.sort((a, b) => b.proficiency - a.proficiency);
    frameworkSkills.forEach(skill => addSkillToTop(skill));
    
    const flexSkills = skills.filter(skill => 
      newSelectedIds.has(skill.id) && 
      newFlexibleSlotIds.has(skill.id)
    );
    flexSkills.sort((a, b) => b.proficiency - a.proficiency);
    flexSkills.forEach(skill => addSkillToTop(skill, true));
    
    setTopSkills(newTopSkills);
    
    const newBenchSkills = skills.reduce((acc, skill) => {
      if (!newSelectedIds.has(skill.id)) {
        const category = skill.category as Category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
      }
      return acc;
    }, {} as Record<Category, Skill[]>);
    
    setGroupedBenchSkills(newBenchSkills);
  };
  
  const resetLineup = () => {
    if (!isLoading) {
      const newSelectedIds = new Set<number>();
      const newFlexibleSlotIds = new Set<number>();
      const newTopSkills: Skill[] = [];

      const addTopSkill = (skill: Skill | undefined, isFlexible = false) => {
        if (skill && !newSelectedIds.has(skill.id)) {
          newTopSkills.push(skill);
          newSelectedIds.add(skill.id);
          if (isFlexible) {
            newFlexibleSlotIds.add(skill.id);
          }
        }
      };

      addTopSkill(groupedSkills["Cloud and DevOps"]?.[0]);
      addTopSkill(groupedSkills["Cloud and DevOps"]?.[1]);
      addTopSkill(groupedSkills["Cloud and DevOps"]?.[2]);
      groupedSkills["Databases and Query"]?.slice(0, 3).forEach(skill => addTopSkill(skill));
      groupedSkills["Languages"]?.slice(0, 3).forEach(skill => addTopSkill(skill));
      addTopSkill(groupedSkills["Frameworks and Tools"]?.[0]);

      const flexibleSkillsCategories: Category[] = ["Databases and Query", "Languages", "Frameworks and Tools"];
      const flexibleSkills: Skill[] = flexibleSkillsCategories.flatMap(category => 
        groupedSkills[category]?.filter(skill => !newSelectedIds.has(skill.id)) ?? []
      );
      flexibleSkills.sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 3)
        .forEach(skill => addTopSkill(skill, true));

      const newBenchSkills = skills.reduce((acc, skill) => {
        if (!newSelectedIds.has(skill.id)) {
          const category = skill.category as Category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
        }
        return acc;
      }, {} as Record<Category, Skill[]>);
      
      setSelectedIds(newSelectedIds);
      setFlexibleSlotIds(newFlexibleSlotIds);
      setTopSkills(newTopSkills);
      setGroupedBenchSkills(newBenchSkills);
      
      setSelectedSkill(null);
      setHighlightedSkillIds(new Set());
      
      setIsReset(true);
      setSaveToastVisible(true);
      setTimeout(() => {
        setSaveToastVisible(false);
        setIsReset(false);
      }, 3000);
    }
  };
  
  const saveLineup = () => {
    if (!hasChanges || isLoading) return;
    
    const configuration = {
      selectedIds: Array.from(selectedIds),
      flexibleSlotIds: Array.from(flexibleSlotIds),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('skillsConfiguration', JSON.stringify(configuration));
    
    setDefaultSelectedIds(new Set(selectedIds));
    setDefaultFlexibleSlotIds(new Set(flexibleSlotIds));
    setHasChanges(false);
    
    setIsReset(false);
    setSaveToastVisible(true);
    setTimeout(() => setSaveToastVisible(false), 3000);
  };

  const generateSkillsFromIds = (selectedIds: Set<number>, flexibleSlotIds: Set<number>): Skill[] => {
    const result: Skill[] = [];
    
    const addedByCategory: Record<string, number> = {};
    
    skills.forEach(skill => {
      if (selectedIds.has(skill.id) && !flexibleSlotIds.has(skill.id)) {
        result.push(skill);
        
        if (!addedByCategory[skill.category]) {
          addedByCategory[skill.category] = 1;
        } else {
          addedByCategory[skill.category]++;
        }
      }
    });
    
    skills.forEach(skill => {
      if (selectedIds.has(skill.id) && flexibleSlotIds.has(skill.id)) {
        result.push(skill);
      }
    });
    
    return result;
  };

  const generateBenchSkillsFromIds = (selectedIds: Set<number>): Record<Category, Skill[]> => {
    return skills.reduce((acc, skill) => {
      if (!selectedIds.has(skill.id)) {
        const category = skill.category as Category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
      }
      return acc;
    }, {} as Record<Category, Skill[]>);
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-sans" suppressHydrationWarning ref={skillsContainerRef}>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-end items-center mb-4 gap-3">
            <button 
              onClick={resetLineup}
              className="bg-gray-400 text-white dark:bg-gray-600 dark:text-gray-200 rounded-full px-4 py-1 text-sm flex items-center shadow hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </button>
            {hasChanges ? (
              <button 
                onClick={saveLineup}
                className="bg-blue-500 text-white dark:bg-[#00E2C3] dark:text-black rounded-full px-4 py-1 text-sm flex items-center shadow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            ) : (
              <div className="bg-gray-100 dark:bg-[#242A3E] rounded-full px-4 py-1 text-sm flex items-center">
                <FaRegKeyboard className="h-4 w-4 mr-2 text-blue-600 dark:text-[#00E2C3]" />
                <span>Skills</span>
              </div>
            )}
          </div>
          
          {saveToastVisible && (
            <div className="fixed top-6 inset-x-0 flex justify-center z-50">
              <div className="bg-green-100 border border-green-200 dark:bg-green-900/30 dark:border-green-700/50 text-green-800 dark:text-green-200 px-4 py-2 rounded-full shadow-lg flex items-center">
                {isReset ? <RefreshCw className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                <span>{isReset ? "Skills reset to default" : "Skills configuration saved!"}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
            <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6 mb-6 md:mb-0 md:w-1/2 h-fit">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-lg font-bold text-foreground uppercase">
                  My Skills
                </h1>
                <h2 className="text-lg font-bold text-foreground uppercase">Mastery</h2>
              </div>
              
              <div className="space-y-1" onClick={handleContainerClick}>
                {topSkills.map((skill, index) => {
                  const config = categoryConfig[skill.category as Category];
                  if (!config) return null;
                  const backgroundStyle = flexibleSlotIds.has(skill.id)
                    ? flexGradientStyle
                    : { backgroundColor: config.color };
                  
                  const isSelected = selectedSkill?.id === skill.id;
                  const isHighlighted = highlightedSkillIds.has(skill.id);
                  const isDimmed = selectedSkill !== null && !isSelected && !isHighlighted;
                  const isSwappable = selectedSkill !== null && selectedSkill.id !== skill.id && highlightedSkillIds.has(skill.id);
                  
                  return (
                    <div 
                      key={skill.id} 
                      className={`border-b border-border ${index === topSkills.length - 1 ? 'pb-2' : 'pb-2 mb-1'} last:border-b-0 px-2 rounded transition-colors duration-150`}
                    >
                      <SkillRow 
                        skill={skill} 
                        config={config} 
                        categoryBackgroundStyle={backgroundStyle}
                        isSelected={isSelected}
                        isHighlighted={isHighlighted}
                        isDimmed={isDimmed}
                        isSwappable={isSwappable}
                        onClick={() => handleSkillClick(skill)}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {Object.keys(groupedBenchSkills).length > 0 && (
              <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6 md:w-1/2 h-fit">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-lg font-bold text-foreground uppercase">
                    Currently Learning
                  </h1>
                  <h2 className="text-lg font-bold text-foreground uppercase">Mastery</h2>
                </div>
                <div className="space-y-1" onClick={handleContainerClick}>
                  {benchCategoryOrder.map(category => {
                    const benchSkillsInCategory = groupedBenchSkills[category];
                    if (!benchSkillsInCategory) return null;

                    return benchSkillsInCategory.map((skill, index) => {
                      const config = categoryConfig[skill.category as Category];
                      if (!config) return null;
                      const backgroundStyle = { backgroundColor: config.color }; 
                      const itemKey = `${category}-${skill.id}`;
                      
                      const isSelected = selectedSkill?.id === skill.id;
                      const isHighlighted = highlightedSkillIds.has(skill.id);
                      const isDimmed = selectedSkill !== null && !isSelected && !isHighlighted;
                      const isSwappable = selectedSkill !== null && selectedSkill.id !== skill.id && highlightedSkillIds.has(skill.id);
                      
                      return (
                        <div 
                          key={itemKey} 
                          className={`border-b border-border ${index === benchSkillsInCategory.length - 1 ? 'pb-2' : 'pb-2 mb-1'} last:border-b-0 px-2 rounded transition-colors duration-150`}
                        >
                          <SkillRow 
                            skill={skill} 
                            config={config} 
                            categoryBackgroundStyle={backgroundStyle}
                            isSelected={isSelected}
                            isHighlighted={isHighlighted}
                            isDimmed={isDimmed}
                            isSwappable={isSwappable}
                            onClick={() => handleSkillClick(skill)}
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                          />
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
