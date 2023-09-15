import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  const campaignSystems = [
    "D&D 5e",
    "Pathfinder 2e",
    "Pathfinder 1e",
    "Starfinder",
  ];

  const campaignSystemData = campaignSystems.map((name) => ({
    name,
  }));

  await prisma.campaignSystem.createMany({
    data: campaignSystemData,
    skipDuplicates: true,
  });

  console.log("Campaign Systems seeded");
};

await seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
