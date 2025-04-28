import Image from "next/image"

export default function AboutMe() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-[#242A3E] rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#1A1E2E] flex-shrink-0">
            <Image
              src="/vercel.svg?height=128&width=128"
              alt="Arsh Patel"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Arsh Patel</h1>
            <p className="text-gray-400 mb-4">Title</p>
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

      <div className="bg-[#242A3E] rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium">Title</h3>
              <span className="text-[#00E2C3] text-sm">Time Frame</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">Compant Name</p>
            <p className="text-sm">
              Short Description
            </p>
          </div>

          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium">Title</h3>
              <span className="text-[#00E2C3] text-sm">Time Frame</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">Compant Name</p>
            <p className="text-sm">
              Short Description
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
