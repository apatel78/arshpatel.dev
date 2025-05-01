// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Match your initialProjects array structure (use the IDs 1-5)
const projectsToSeed = [
  { id: 1, name: "FlexspotFF" },
  { id: 2, name: "Schedule I XP Adjuster" },
  { id: 3, name: "Schedule I Larger Money Stacks" },
  { id: 4, name: "FF Season Stats" },
  { id: 5, name: "PassMan" },
  // Add other static project details here if you added them to the Project model
  // e.g., iconUrl: "/flexspotff.svg", description: "..."
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of projectsToSeed) {
    // Upsert Project
    const project = await prisma.project.upsert({
      where: { id: p.id },
      update: { name: p.name }, // Ensure name is updated if it changes
      create: { id: p.id, name: p.name },
    });
    console.log(`Upserted project with id: ${project.id}`);

    // Upsert Ranking Data (initialize if missing)
    await prisma.projectRanking.upsert({
        where: { projectId: p.id }, // Use the correct field name
        update: {}, // No updates needed on seed if it exists
        create: {
            projectId: p.id, // Link to the project
            totalVotes: 0,
            totalRankSum: 0,
        }
    });
    console.log(`Upserted ranking data for project id: ${project.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 