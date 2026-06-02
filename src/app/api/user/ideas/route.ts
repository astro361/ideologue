import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideas, users } from "@/db/schema";
import { auth } from "@/auth";
import { desc, eq } from "drizzle-orm";

// GET current user's ideas
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db
      .select({
        id: ideas.id,
        title: ideas.title,
        teaser: ideas.teaser,
        fullStrategy: ideas.fullStrategy,
        tags: ideas.tags,
        teamRoles: ideas.teamRoles,
        upvoteCount: ideas.upvoteCount,
        createdAt: ideas.createdAt,
        userId: ideas.userId,
        userName: users.name,
        userImage: users.image,
      })
      .from(ideas)
      .leftJoin(users, eq(ideas.userId, users.id))
      .where(eq(ideas.userId, session.user.id))
      .orderBy(desc(ideas.createdAt));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching user ideas:", error);
    return NextResponse.json(
      { error: "Failed to fetch user ideas" },
      { status: 500 }
    );
  }
}
