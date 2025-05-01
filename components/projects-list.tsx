"use client"

import type React from "react"
import { Trophy, ExternalLink } from "lucide-react"
import { FaGithub, FaPython, FaReact, FaDocker, FaAws } from "react-icons/fa"
import { SiTypescript, SiPostgresql, SiGraphql, SiPrisma, SiCypress, SiMongodb } from "react-icons/si"
import { TbBrandCSharp } from "react-icons/tb"
import Image from 'next/image'
import { VscGraphScatter } from "react-icons/vsc"
import { RiLockPasswordLine } from "react-icons/ri";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragHandle } from "react-icons/md";

interface Project {
  id: number
  order: number
  name: string
  icon: React.ReactNode
  shortDescription: string
  githubUrl: string
  projectLink?: string
  techStack: string[]
  techStackIcons: React.ReactNode[]
  longDescription: string
}

export const initialProjects: Project[] = [
  {
    id: 1,
    order: 1,
    name: "FlexspotFF",
    icon: <Image src="/flexspotff.svg" alt="XP Adjuster Icon" width={30} height={30} />,
    shortDescription: "A full-stack fantasy football minigame and league statistics website.",
    githubUrl: "https://github.com/chrisparsons83/flexspotff",
    projectLink: "https://www.flexspotff.com/",
    techStack: ["React", "TypeScript", "PostgreSQL", "GraphQL", "Prisma ORM", "Cypress", "Docker", "AWS"],
    techStackIcons: [
      <FaReact className="h-8 w-8 text-[#61DAFB]" />,
      <SiTypescript className="h-8 w-8 text-[#3178C6]" />,
      <SiPostgresql className="h-8 w-8 text-[#0064a5]" />,
      <SiGraphql className="h-8 w-8 text-[#E10098]" />,
      <SiPrisma className="h-8 w-8 text-[#000000]" />,
      <SiCypress className="h-8 w-8 text-[#5B7444]" />,
      <FaDocker className="h-8 w-8 text-[#0DB7ED]" />,
      <FaAws className="h-8 w-8 text-[#FF9900]" />
    ],
    longDescription: "FlexspotFF is a full-stack fantasy football minigame and league statistics website. It allows users to create and join fantasy football leagues, manage their teams, and track their progress throughout the season."
  },
  {
    id: 2,
    order: 2,
    name: "Schedule I XP Adjuster",
    icon: <Image src="/xp-adjuster.png" alt="XP Adjuster Icon" width={30} height={30} />,
    shortDescription: "A mod for the game Schedule I that allows you to adjust the XP reward for each task.",
    githubUrl: "https://github.com/apatel78/ScheduleI_XPAdjuster",
    projectLink: "https://www.nexusmods.com/schedule1/mods/568",
    techStack: ["C#"],
    techStackIcons: [
      <TbBrandCSharp className="h-8 w-8 text-[#9b4993]" />
    ],
    longDescription: "The Schedule I XP Adjuster is a mod for the game Schedule I that allows you to adjust the XP reward for each task. It is a simple mod that allows you to adjust the XP reward for each task by a certain percentage."
  },
  {
    id: 3,
    order: 3,
    name: "Schedule I Larger Money Stacks",
    icon: <Image src="/larger-money-stacks.png" alt="Money Stacks Icon" width={30} height={30} />,
    shortDescription: "A mod for the game Schedule I that raises the maximum amount of money per stack to 999,999.",
    githubUrl: "https://github.com/apatel78/ScheduleI_LargerMoneyStacks",
    projectLink: "https://www.nexusmods.com/schedule1/mods/605",
    techStack: ["C#"],
    techStackIcons: [
      <TbBrandCSharp className="h-8 w-8 text-[#9b4993]" />
    ],        
    longDescription: "The Schedule I Larger Money Stacks is a mod for the game Schedule I that raises the maximum amount of money per stack to 999,999. It is a simple mod that allows you to adjust the maximum amount of money per stack to 999,999."
  },
  {
    id: 4,
    order: 4,
    name: "FF Season Stats",
    icon: <VscGraphScatter className="h-5 w-5" />,
    shortDescription: "A Python script for visually representing user activity in their fantasy football league on Sleeper.",
    githubUrl: "https://github.com/apatel78/FF-Season-Stats",
    techStack: ["Python"],
    techStackIcons: [
      <FaPython className="h-8 w-8 text-[#306998]" />,
    ],
    longDescription: "The FF Season Stats is a Python script for visually representing user activity in their fantasy football league on Sleeper."
  },
  {
    id: 5,
    order: 5,
    name: "PassMan",
    icon: <RiLockPasswordLine className="h-5 w-5" />,
    shortDescription: "A private Discord bot designed to make password sharing easier.",
    githubUrl: "https://github.com/apatel78/PassMan",
    techStack: ["Python", "MongoDB", "Docker", "AWS"],
    techStackIcons: [
      <FaPython className="h-8 w-8 text-[#306998]" />,
      <SiMongodb className="h-8 w-8 text-[#00684a]" />,
      <FaDocker className="h-8 w-8 text-[#0DB7ED]" />,
      <FaAws className="h-8 w-8 text-[#FF9900]" />
    ],
    longDescription: "PassMan is a private Discord bot designed to make password sharing easier."
  },
].sort((a, b) => b.id - a.id);

let cachedProjects: Project[] | null = null;
let isDataFetching = false;

export async function fetchProjectsData(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects;
  
  if (isDataFetching) {
    return new Promise((resolve) => {
      const checkCache = () => {
        if (cachedProjects) {
          resolve(cachedProjects);
        } else {
          setTimeout(checkCache, 50);
        }
      };
      checkCache();
    });
  }
  
  isDataFetching = true;
  
  try {
    const response = await fetch('/api/projects/order');
    if (!response.ok) {
      console.error(`API Error fetching order: ${response.status}`);
      cachedProjects = initialProjects;
      return initialProjects;
    }
    
    const savedOrderIds: number[] = await response.json();
    if (savedOrderIds && savedOrderIds.length > 0) {
      const orderedProjects = savedOrderIds
        .map(id => initialProjects.find(p => p.id === id))
        .filter(Boolean) as Project[];
      const currentIds = new Set(orderedProjects.map(p => p.id));
      const missingProjects = initialProjects.filter(p => !currentIds.has(p.id));
      cachedProjects = [...orderedProjects, ...missingProjects];
    } else {
      cachedProjects = initialProjects;
    }
    return cachedProjects;
  } catch (error) {
    console.error("Fetch Error fetching project order:", error);
    cachedProjects = initialProjects;
    return initialProjects;
  } finally {
    isDataFetching = false;
  }
}


export default function ProjectsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function loadProjects() {
      try {
        const data = await fetchProjectsData();
        if (isMounted) {
          setProjects(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        if (isMounted) {
          setProjects(initialProjects);
          setIsLoading(false);
        }
      }
    }
    
    loadProjects();
    return () => { isMounted = false };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        return newArray;
      });
      setIsDirty(true);
    }
  }

  async function handleSaveChanges() {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const idsToSave = projects.map(p => p.id);
      const response = await fetch('/api/projects/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: idsToSave }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error saving order:", response.status, errorData);
        throw new Error('Failed to save order via API');
      }

      console.log("Order saved successfully via API.");
      setIsDirty(false);

    } catch (error) {
      console.error("Error during save process:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function SortableProjectRow({ id, project, index }: { id: number, project: Project, index: number }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1, 
      zIndex: isDragging ? 10 : 'auto',
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="grid grid-cols-12 md:grid-cols-12 items-center py-4 px-4 border-b border-border hover:bg-sky-100 dark:hover:bg-muted cursor-grab touch-none">
        <div className="col-span-2 md:col-span-1 flex items-center font-medium text-gray-400 p-2 gap-1 md:gap-4">
            <MdDragHandle className="h-4 w-4" />
            <span>{index + 1}</span>
        </div>
        <div className="col-span-10 md:col-span-5 mb-2 md:mb-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1A1E2E] flex items-center justify-center mr-3 text-lg">
              {project.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{project.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 md:line-clamp-1">{project.shortDescription}</div>
            </div>
          </div>
        </div>
        <div className="col-span-8 md:col-span-3 text-center">
          <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
            {project.techStackIcons?.slice(0, 6).map((icon, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <span 
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-[#2A3046] text-black dark:text-white cursor-pointer"
                  >
                    {icon}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto px-2 py-1 text-xs">
                  {project.techStack?.[index]}
                </HoverCardContent>
              </HoverCard>
            ))}
            {project.techStackIcons.length > 6 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">+{project.techStackIcons.length - 6}</span>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 text-center">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1A1E2E] hover:bg-blue-600 dark:hover:bg-[#00E2C3] text-gray-700 dark:text-white hover:text-white dark:hover:text-black transition-colors"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </div>
        <div className="col-span-2 md:col-span-2 text-center">
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1A1E2E] hover:bg-blue-600 dark:hover:bg-[#00E2C3] text-gray-700 dark:text-white hover:text-white dark:hover:text-black transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {!project.projectLink && <div className="w-8 h-8"></div>}
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full max-w-8xl mx-auto space-y-6 font-sans">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold text-foreground uppercase">
            {isDirty ? "User Standings" : "Global Standings"}
          </h1>
          {isDirty ? (
            <button onClick={handleSaveChanges} disabled={isSaving} className="bg-blue-500 text-white dark:bg-[#00E2C3] dark:text-black rounded-full px-4 py-1 text-sm flex items-center shadow hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <div className="bg-gray-100 dark:bg-[#242A3E] rounded-full px-4 py-1 text-sm flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-blue-600 dark:text-[#00E2C3]" />
              <span>Projects</span>
            </div>
          )}
        </div>

        <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md dark:shadow-none border border-border">
          <div className="hidden md:grid md:grid-cols-12 text-xs text-gray-500 dark:text-gray-400 py-3 px-4 border-b border-border">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">PROJECT</div>
            <div className="col-span-3 text-center">TECH</div>
            <div className="col-span-1 text-center">GITHUB</div>
            <div className="col-span-2 text-center">LIVE</div>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading project order...</div>
          ) : (
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              {projects.map((project, index) => (
                <SortableProjectRow key={project.id} id={project.id} project={project} index={index} />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </DndContext>
  )
}
