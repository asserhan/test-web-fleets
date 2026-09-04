import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const DEMO_USER_EMAIL =
  process.env.DEMO_USER_EMAIL ?? "demo@histia.net";

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {},
    create: { email: DEMO_USER_EMAIL },
  });

  console.log(`Seeded demo user: ${user.email} (${user.id})`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
