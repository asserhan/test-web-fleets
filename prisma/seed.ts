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

// 18 fleets so the paginated list (12 per page) needs a second fetch.
// A few descriptions are intentionally empty to exercise the card placeholder.
const FLEET_SEEDS: Array<{
  title: string;
  description: string;
  companyCount: number;
}> = [
  {
    title: "Incubateur HEC",
    description: "Toutes les startups de l'incubateur HEC",
    companyCount: 128,
  },
  {
    title: "Ceci est un titre long sur 2 lignes pour une flotte",
    description:
      "Toutes les startups de l'incubateur HEC qu'importe l'année de leur promotion et de leur secteur d'activité",
    companyCount: 64,
  },
  {
    title: "Prospection France",
    description: "",
    companyCount: 212,
  },
  {
    title: "Station F — Founders Program",
    description: "Startups en phase d'amorçage suivies depuis Station F",
    companyCount: 87,
  },
  {
    title: "Deeptech & Industrie",
    description:
      "Sociétés industrielles et deeptech identifiées lors du dernier salon",
    companyCount: 41,
  },
  {
    title: "SaaS B2B — Série A",
    description: "Éditeurs SaaS ayant levé une Série A sur les 18 derniers mois",
    companyCount: 156,
  },
  {
    title: "Retail & E-commerce",
    description: "",
    companyCount: 93,
  },
  {
    title: "Fintech Europe",
    description:
      "Fintechs européennes réglementées, hors crypto-actifs et néobanques",
    companyCount: 74,
  },
  {
    title: "Grands comptes CAC 40",
    description: "Comptes stratégiques suivis par l'équipe entreprise",
    companyCount: 40,
  },
  {
    title: "Santé & Biotech",
    description: "Laboratoires et medtech en phase clinique",
    companyCount: 58,
  },
  {
    title: "Mobilité durable",
    description: "",
    companyCount: 31,
  },
  {
    title: "Agritech Occitanie",
    description: "Exploitations et coopératives partenaires en Occitanie",
    companyCount: 22,
  },
  {
    title: "Cybersécurité",
    description:
      "Éditeurs et cabinets de conseil spécialisés en sécurité offensive",
    companyCount: 67,
  },
  {
    title: "Greentech & Énergie",
    description: "Producteurs et intégrateurs d'énergies renouvelables",
    companyCount: 105,
  },
  {
    title: "Marketplace & Logistique",
    description: "",
    companyCount: 49,
  },
  {
    title: "Éducation & EdTech",
    description: "Organismes de formation et plateformes d'apprentissage",
    companyCount: 36,
  },
  {
    title: "Immobilier & Proptech",
    description: "Foncières, promoteurs et startups proptech",
    companyCount: 82,
  },
  {
    title: "Média & Divertissement",
    description:
      "Studios, éditeurs et plateformes de diffusion en Europe francophone",
    companyCount: 27,
  },
];

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
    // Spaced timestamps keep the (createdAt, id) cursor ordering deterministic.
    const oldest = Date.now() - FLEET_SEEDS.length * 60_000;

    await prisma.fleet.createMany({
      data: FLEET_SEEDS.map((seed, index) => ({
        ...seed,
        color: FLEET_COLORS[index % FLEET_COLORS.length],
        userId: user.id,
        createdAt: new Date(oldest + index * 60_000),
      })),
    });

    console.log(`Seeded ${FLEET_SEEDS.length} fleets`);
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
