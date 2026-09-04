import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const DEMO_USER_EMAIL = process.env.DEMO_USER_EMAIL ?? "demo@histia.net";

// Kept in sync with src/lib/constants/fleet-colors.ts. Inlined so the seed
// script does not depend on the app's path aliases.
const FLEET_COLORS = [
  "#409BEC",
  "#7CD7F5",
  "#5DC677",
  "#FAC863",
  "#F28029",
  "#EB5555",
  "#E262DC",
  "#AE32E3",
] as const;

const SHORT_TITLE = "Incubateur HEC";
const LONG_TITLE = "Ceci est un titre long sur 2 lignes pour une flotte";
const SHORT_DESCRIPTION = "Toutes les startups de l'Incubateur HEC";
const LONG_DESCRIPTION =
  "Toutes les startups de l'Incubateur HEC qu'importe l'année de leur promotion et de leur secteur d'activité";

// Figma card variants (title × description). Repeated to fill several scroll pages.
const FIGMA_VARIANTS: Array<{ title: string; description: string }> = [
  { title: LONG_TITLE, description: SHORT_DESCRIPTION },
  { title: LONG_TITLE, description: LONG_DESCRIPTION },
  { title: SHORT_TITLE, description: LONG_DESCRIPTION },
  { title: LONG_TITLE, description: "" },
  { title: SHORT_TITLE, description: "" },
  { title: SHORT_TITLE, description: SHORT_DESCRIPTION },
  { title: SHORT_TITLE, description: "" },
  { title: SHORT_TITLE, description: "" },
  { title: SHORT_TITLE, description: SHORT_DESCRIPTION },
  { title: SHORT_TITLE, description: LONG_DESCRIPTION },
];

// 40 fleets ≈ 4 pages at limit=12 — enough to exercise infinite scroll.
const FLEET_COUNT = 40;

const FLEET_SEEDS = Array.from({ length: FLEET_COUNT }, (_, index) => {
  const variant = FIGMA_VARIANTS[index % FIGMA_VARIANTS.length];
  return {
    title: variant.title,
    description: variant.description,
    companyCount: 128,
    color: FLEET_COLORS[index % FLEET_COLORS.length],
  };
});

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
  console.log(`Using DATABASE_URL host: ${new URL(process.env.DATABASE_URL!).host}`);

  if (process.env.SEED_RESET === "true") {
    const { count } = await prisma.fleet.deleteMany({
      where: { userId: user.id },
    });
    console.log(`SEED_RESET: deleted ${count} existing fleet(s)`);
  }

  const existing = await prisma.fleet.count({ where: { userId: user.id } });

  if (existing > 0) {
    console.log(
      `Skipped fleet seed: user already has ${existing} fleet(s). Re-run with SEED_RESET=true to replace them.`,
    );
  } else {
    // Newest first in the UI: create in reverse so the Figma first row is on top.
    const newest = Date.now();

    await prisma.fleet.createMany({
      data: FLEET_SEEDS.map((seed, index) => ({
        title: seed.title,
        description: seed.description,
        companyCount: seed.companyCount,
        color: seed.color,
        userId: user.id,
        createdAt: new Date(newest - index * 60_000),
      })),
    });

    console.log(`Seeded ${FLEET_SEEDS.length} fleets (Figma demo data)`);
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
