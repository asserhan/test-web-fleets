import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL =
  process.env.DEMO_USER_EMAIL ?? "demo@histia.net";

export async function getDemoUserId() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });

  if (!user) {
    throw new Error(
      `Demo user not found (${DEMO_USER_EMAIL}). Run: npm run db:seed`,
    );
  }

  return user.id;
}
