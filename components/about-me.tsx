import Image from "next/image"

export default function AboutMe() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-card text-card-foreground rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-secondary flex-shrink-0">
            <Image
              src="/arshpatel.jpg?height=160&width=160"
              alt="Arsh Patel"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2 text-primary dark:text-[#00E2C3]">Arsh Patel</h1>
            <p className="text-muted-foreground mb-4">Software Engineer</p>
            <div className="space-y-4">
              <p>
                Welcome to my personal portfolio! I'm Arsh, a software engineer at ZF and an alum of the University of Michigan. 
              </p>
              <p>
              I enjoy creating all kinds of things from websites and video game mods to interactive football statistic graphs. 
              As a big fantasy football fan, I designed this portfolio to resemble the look and feel of Sleeper.app.
              </p>
              <p>
              In the Skills section, you'll find a lineup interface that mimics a fantasy football roster. You can drag and drop your skills into different positions, building your ideal "starting lineup" of strengths.
              On the Projects page, the format resembles a fantasy football standings table. You're invited to rank each project, 
              and your rankings contribute to a global leaderboard that reflects the community's collective preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-xl p-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-foreground">Software Engineer</h3>
              <span className="text-primary text-sm">Jan 2023 - Present</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">ZF</p>
            <p className="text-sm">
            At ZF, I developed the communication module for Ford's braking software and improved efficiency by building an internal web tool that combined multiple apps. 
            I automated regression testing using Python to eliminate manual script creation and integrated AUTOSAR standards into embedded C code for future vehicle models. 
            </p>
          </div>

          <div>
            <div className="mb-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-foreground">Software Engineer Co-Op</h3>
                <span className="text-primary text-sm">Jan 2022 - Sep 2022</span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-muted-foreground">ZF</p>
                <span className="text-primary text-sm">May 2021 - Sep 2021</span>
              </div>
            </div>
            <p className="text-sm">
             I developed and rolled out a Jenkins-based CI/CD pipeline running night-time integration tests on a virtualized ECU environment, which helped detect issues earlier and improved test coverage. 
             Additionally, I designed and implemented a Python GUI that interfaces with tools like Windchill and Git to automate the release and code review process.          
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
