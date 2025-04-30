import Link from "next/link"

interface TabsProps {
  activeTab: "about" | "projects" | "skills"
}

export default function Tabs({ activeTab }: TabsProps) {
  const tabs = [
    { id: "about", label: "ABOUT ME", href: "/" },
    { id: "skills", label: "SKILLS", href: "/skills" },
    { id: "projects", label: "PROJECTS", href: "/projects" },
  ]

  return (
    <div className="border-b border-[#242A3E] mb-6">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
              ? "text-blue-600 dark:text-[#00E2C3] border-b-2 border-blue-500 dark:border-[#00E2C3]"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
