import type React from "react"
import { Code, Database, Layout, Server, Cloud, Component } from "lucide-react"
import { FaAws, FaDocker, FaJenkins, FaReact } from "react-icons/fa"
import {IoLogoVercel} from "react-icons/io5"
import { SiPostgresql, SiGraphql, SiMysql, SiPrisma, SiMongodb, SiTypescript, SiPython, SiCplusplus, SiR, SiVectorlogozone, SiFlask, SiCypress, SiJira } from "react-icons/si"
import { TbBrandCSharp, TbBrandNextjs } from "react-icons/tb"
import { VscCircuitBoard } from "react-icons/vsc"
import Image from "next/image"

interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  logo: React.ReactNode
}

const categoryConfig = {
  "Cloud and DevOps": {color: "#ff2a6d", icon: <Cloud className="h-5 w-5" /> },
  "Databases and Query": {color: "#00ceb8", icon: <Database className="h-5 w-5" /> },
  "Languages": {color: "#58a7ff", icon: <Code className="h-5 w-5" /> },
  "Frameworks and Tools": {color: "#ffae58", icon: <Component className="h-5 w-5" /> }, 
}

type Category = keyof typeof categoryConfig

const SkillRow = ({ skill, config, categoryBackgroundStyle }: { 
  skill: Skill, 
  config: typeof categoryConfig[Category], 
  categoryBackgroundStyle: React.CSSProperties 
}) => (
  <div key={skill.id} className="flex items-center py-2">
    <div 
      title={skill.category} 
      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-white font-bold`} 
      style={categoryBackgroundStyle}
    >
      {config.icon}
    </div>
    <div title={skill.name} className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4 overflow-hidden">
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

  const topSkills: Skill[] = [];
  const selectedIds = new Set<number>();
  const flexibleSlotIds = new Set<number>();

  const addTopSkill = (skill: Skill | undefined, isFlexible = false) => {
    if (skill && !selectedIds.has(skill.id)) {
      topSkills.push(skill);
      selectedIds.add(skill.id);
      if (isFlexible) {
        flexibleSlotIds.add(skill.id);
      }
    }
  };

  addTopSkill(groupedSkills["Cloud and DevOps"]?.[0]);
  groupedSkills["Databases and Query"]?.slice(0, 2).forEach(skill => addTopSkill(skill));
  groupedSkills["Languages"]?.slice(0, 3).forEach(skill => addTopSkill(skill));
  addTopSkill(groupedSkills["Frameworks and Tools"]?.[0]);

  const flexibleSkillsCategories: Category[] = ["Databases and Query", "Languages", "Frameworks and Tools"];
  const flexibleSkills: Skill[] = flexibleSkillsCategories.flatMap(category => 
    groupedSkills[category]?.filter(skill => !selectedIds.has(skill.id)) ?? []
  );
  flexibleSkills.sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 3)
    .forEach(skill => addTopSkill(skill, true));

  const groupedBenchSkills = skills.reduce((acc, skill) => {
    if (!selectedIds.has(skill.id)) {
      const category = skill.category as Category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
    }
    return acc;
  }, {} as Record<Category, Skill[]>);

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

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 font-sans">
      <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-foreground uppercase">Top Skills</h2>
          <h2 className="text-lg font-bold text-foreground uppercase">Mastery</h2>
        </div>
        <div className="space-y-1">
          {topSkills.map((skill, index) => {
             const config = categoryConfig[skill.category as Category];
             if (!config) return null;
             const backgroundStyle = flexibleSlotIds.has(skill.id)
               ? flexGradientStyle
               : { backgroundColor: config.color };
             return (
                <div 
                  key={skill.id} 
                  className={`border-b border-border ${index === topSkills.length - 1 ? 'pb-2' : 'pb-2 mb-1'} last:border-b-0 hover:bg-sky-100 dark:hover:bg-muted px-2 rounded transition-colors duration-150`}
                >
                    <SkillRow skill={skill} config={config} categoryBackgroundStyle={backgroundStyle} />
                </div>
             )
          })}
        </div>
      </div>

      {Object.keys(groupedBenchSkills).length > 0 && (
          <div className="bg-card text-card-foreground rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-foreground uppercase">Currently Learning</h2>
              <h2 className="text-lg font-bold text-foreground uppercase">Mastery</h2>
            </div>
            <div className="space-y-1">
              {benchCategoryOrder.map(category => {
                const benchSkillsInCategory = groupedBenchSkills[category];
                if (!benchSkillsInCategory) return null;

                return benchSkillsInCategory.map((skill, index) => {
                    const config = categoryConfig[skill.category as Category];
                    if (!config) return null;
                    const backgroundStyle = { backgroundColor: config.color }; 
                    const itemKey = `${category}-${skill.id}`;
                    
                    return (
                        <div 
                          key={itemKey} 
                          className={`border-b border-border ${index === benchSkillsInCategory.length - 1 ? 'pb-2' : 'pb-2 mb-1'} last:border-b-0 hover:bg-sky-100 dark:hover:bg-muted px-2 rounded transition-colors duration-150`}
                        >
                            <SkillRow skill={skill} config={config} categoryBackgroundStyle={backgroundStyle} />
                        </div>
                    )
                });
              })}
            </div>
          </div>
       )}
    </div>
  );
}
