"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageSquare, FileText, ChevronLeft, Settings } from "lucide-react"

export default function Header() {

  const downloadResume = () => {
    // In a real implementation, this would download the actual resume file
    alert("Resume download started!")
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1A1E2E] border-t-0 border-x-0 border-b border-[#242A3E]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ChevronLeft className="h-6 w-6 text-gray-400" />
            </Link>
            <button className="relative">
              <MessageSquare className="h-6 w-6 text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </button>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#00E2C3] mr-2 overflow-hidden">
              <Image
                src="/vercel.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-white">Arsh Patel</span>
          </div>

          <div className="flex items-center">
            <button onClick={downloadResume} className="mr-4" aria-label="Download Resume">
              <FileText className="h-6 w-6 text-gray-400" />
            </button>
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

    </header>
  )
}
