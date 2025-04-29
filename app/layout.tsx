import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Arsh Patel | Portfolio",
  description: "Personal portfolio website of Arsh Patel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-[#1A1E2E]">
          <Header />
            <main className="flex-1 text-white">{children}</main>
            <footer className="border-t border-[#242A3E] py-4 text-center text-sm text-gray-400">
              <div className="container mx-auto">© {new Date().getFullYear()} Arsh Patel. All rights reserved.</div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
