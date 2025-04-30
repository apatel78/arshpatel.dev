import Tabs from "@/components/tabs"
import ProjectsList from "@/components/projects-list"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Tabs activeTab="projects" />
      <ProjectsList />
    </div>
  )
}
