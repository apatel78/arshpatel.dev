"use client"

import { useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { MessageSquare, FileText, ChevronLeft } from "lucide-react"
import ResumeModal from "@/components/resume-modal"
import { ThemeToggleMenu } from "@/components/theme-toggle-menu"

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume_ArshPatel.pdf";
    link.download = "Resume_ArshPatel.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-header-background border-t-0 border-x-0 border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <ChevronLeft className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
              <button className="relative">
                <MessageSquare className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>

            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full mr-2 overflow-hidden">
                <Image
                  src="/arshpateldev/arshpatel.jpg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-foreground">Arsh Patel</span>
            </div>

            <div className="flex items-center">
              <button 
                onClick={handleDownloadClick} 
                className="mr-4" 
                aria-label="Download Resume"
              >
                <FileText className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
              </button>
              <ThemeToggleMenu />
            </div>
          </div>
        </div>
      </header>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={triggerDownload}
        title="Download Resume?"
        description="Do you want to download Arsh Patel's resume (Resume_ArshPatel.pdf)?"
        confirmText="Download"
        cancelText="Cancel"
      />
    </>
  )
}
