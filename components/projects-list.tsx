"use client"

import type React from "react"
import { Trophy, ExternalLink, ShoppingCart, ListChecks, CloudSun, BarChart3, Lock } from "lucide-react"
import { FaGithub, FaFootballBall } from "react-icons/fa"
import Image from 'next/image'
import { VscGraphScatter } from "react-icons/vsc"
import { RiLockPasswordLine } from "react-icons/ri";

interface Project {
  id: number
  order: number
  name: string
  icon: React.ReactNode
  shortDescription: string
  githubUrl: string
  projectLink?: string
}

export default function ProjectsList() {

  const projects: Project[] = [
    {
      id: 1,
      order: 1,
      name: "FlexspotFF",
      icon: <Image src="/flexspotff.svg" alt="XP Adjuster Icon" width={30} height={30} />,
      shortDescription: "A full-stack fantasy football minigame and league statistics website.",
      githubUrl: "https://github.com/chrisparsons83/flexspotff",
      projectLink: "https://www.flexspotff.com/",
    },
    {
      id: 2,
      order: 2,
      name: "Schedule I XP Adjuster",
      icon: <Image src="/xp-adjuster.png" alt="XP Adjuster Icon" width={30} height={30} />,
      shortDescription: "A mod for the game Schedule I that allows you to adjust the XP reward for each task.",
      githubUrl: "https://github.com/apatel78/ScheduleI_XPAdjuster",
      projectLink: "https://www.nexusmods.com/schedule1/mods/568",
    },
    {
      id: 3,
      order: 3,
      name: "Schedule I Larger Money Stacks",
      icon: <Image src="/larger-money-stacks.png" alt="Money Stacks Icon" width={30} height={30} />,
      shortDescription: "A mod for the game Schedule I that raises the maximum amount of money per stack to 999,999.",
      githubUrl: "https://github.com/apatel78/ScheduleI_LargerMoneyStacks",
      projectLink: "https://www.nexusmods.com/schedule1/mods/605",
    },
    {
      id: 4,
      order: 4,
      name: "FF Season Stats",
      icon: <VscGraphScatter className="h-5 w-5" />,
      shortDescription: "A Python script for visually representing user activity in their fantasy football league on Sleeper.",
      githubUrl: "https://github.com/apatel78/FF-Season-Stats",
    },
    {
      id: 5,
      order: 5,
      name: "PassMan",
      icon: <RiLockPasswordLine className="h-5 w-5" />,
      shortDescription: "A private Discord bot designed to make password sharing easier.",
      githubUrl: "https://github.com/apatel78/PassMan",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto text-black dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Rankings</h1>
        <div className="bg-gray-100 dark:bg-[#242A3E] rounded-full px-4 py-1 text-sm flex items-center">
          <Trophy className="h-4 w-4 mr-2 text-blue-600 dark:text-[#00E2C3]" />
          <span>Projects</span>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-[#242A3E] rounded-xl overflow-hidden shadow-md dark:shadow-none border border-gray-200 dark:border-[#1A1E2E]">
        <div className="grid grid-cols-12 text-xs text-gray-500 dark:text-gray-400 py-2 px-4 border-b border-gray-200 dark:border-[#1A1E2E]">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-7">PROJECT</div>
          <div className="col-span-2 text-center">GITHUB</div>
          <div className="col-span-2 text-center">LIVE</div>
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-12 items-center py-3 px-4 border-b border-gray-200 dark:border-[#1A1E2E] hover:bg-gray-50 dark:hover:bg-[#2A3046] cursor-pointer"
          >
            <div className="col-span-1 text-center font-medium">{project.order}</div>
            <div className="col-span-7">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1A1E2E] flex items-center justify-center mr-3 text-lg">
                  {project.icon}
                </div>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{project.shortDescription}</div>
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center">
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
            {project.projectLink && (
              <div className="col-span-2 text-center">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1A1E2E] hover:bg-blue-600 dark:hover:bg-[#00E2C3] text-gray-700 dark:text-white hover:text-white dark:hover:text-black transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
            {!project.projectLink && <div className="col-span-2 text-center"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
