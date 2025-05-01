import AboutMe from "@/components/about-me"
import ClientDataLoader from "@/components/client-data-loader"
import Tabs from "@/components/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Tabs activeTab="about" />
      <AboutMe />
      <ClientDataLoader />
    </div>
  )
}
