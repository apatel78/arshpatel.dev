import Image from "next/image"

export default function AboutMe() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-card text-card-foreground rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-secondary flex-shrink-0">
            <Image
              src="/arshpateldev/arshpatel.jpg"
              alt="Arsh Patel"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">Arsh Patel</h1>
            <p className="text-muted-foreground mb-4">Title</p>
            <div className="space-y-4">
              <p>
                Bio
              </p>
              <p>
                Bio cont.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">Experience</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-foreground">Title</h3>
              <span className="text-primary text-sm">Time Frame</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Company Name</p>
            <p className="text-sm">
              Short Description
            </p>
          </div>

          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-foreground">Title</h3>
              <span className="text-primary text-sm">Time Frame</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Company Name</p>
            <p className="text-sm">
              Short Description
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
