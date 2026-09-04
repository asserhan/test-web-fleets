import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDemoUserId } from "@/lib/users/demo-user";
import {
  createFleetBodySchema,
  listFleetsQuerySchema,
} from "@/lib/validations/fleet";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedQuery = listFleetsQuerySchema.safeParse({
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: parsedQuery.error.flatten() },
        { status: 400 },
      );
    }

    const { cursor, limit } = parsedQuery.data;
    const userId = await getDemoUserId();

    const fleets = await prisma.fleet.findMany({
      where: { userId },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    const hasMore = fleets.length > limit;
    const items = hasMore ? fleets.slice(0, limit) : fleets;
    const nextCursor = hasMore ? items[items.length - 1]?.id ?? null : null;

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    console.error("[GET /api/fleets]", error);
    return NextResponse.json(
      { error: "Failed to fetch fleets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = createFleetBodySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten() },
        { status: 400 },
      );
    }

    const userId = await getDemoUserId();

    const fleet = await prisma.fleet.create({
      data: {
        ...parsedBody.data,
        userId,
      },
    });

    return NextResponse.json(fleet, { status: 201 });
  } catch (error) {
    console.error("[POST /api/fleets]", error);
    return NextResponse.json(
      { error: "Failed to Create a fleet" },
      { status: 500 },
    );
  }
}
