import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    "ELECTRONICS",
    "FURNITURE",
    "HOME APPLIANCES",
    "SPORTING GOODS",
    "OUTDOOR",
    "TOYS",
  ];

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    console.log(`Upserted category: ${categoryName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
