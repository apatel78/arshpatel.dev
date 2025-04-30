import SkillsList from "@/components/skills-list"
import Tabs from "@/components/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Tabs activeTab="skills" />
      <SkillsList />
    </div>
  )
}
