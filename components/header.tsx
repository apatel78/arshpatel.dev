"use client"

import { useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { MessageSquare, FileText, ChevronLeft } from "lucide-react"
import ResumeModal from "@/components/resume-modal"
import { ThemeToggleMenu } from "@/components/theme-toggle-menu"
import ContactMeModal from "@/components/contact-me-modal"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function Header() {
  const [contactMeModalOpen, setContactMeModalOpen] = useState(false)
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume_ArshPatel.pdf";
    link.download = "Resume_ArshPatel.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadClick = () => {
    setResumeModalOpen(true);
  };

  const handleCloseModal = () => {
    setResumeModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-header-background border-t-0 border-x-0 border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full mr-2 overflow-hidden">
                <Image
                  src="/arshpatel.jpg?height=32&width=32"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-foreground">Arsh Patel</span>
            </div>

            <div className="flex items-center space-x-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button 
                    onClick={handleDownloadClick} 
                    aria-label="Download Resume"
                  >
                    <FileText className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto px-2 py-1 text-xs">
                  Download Resume
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button 
                    onClick={() => setContactMeModalOpen(true)} 
                    aria-label="Contact Me"
                  >
                    <MessageSquare className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto px-2 py-1 text-xs">
                  Contact Me
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div>
                    <ThemeToggleMenu />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto px-2 py-1 text-xs">
                  Settings
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </header>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={handleCloseModal}
        onConfirm={triggerDownload}
        title="Download Resume?"
        description="Do you want to download Arsh Patel's resume (Resume_ArshPatel.pdf)?"
        confirmText="Download"
        cancelText="Cancel"
      />
      {contactMeModalOpen && (
        <ContactMeModal
          onClose={() => setContactMeModalOpen(false)}
        />
      )}
    </>
  )
}
