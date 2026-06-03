import { NextRequest, NextResponse } from "next/server";
// FIXED: Switched from path aliases to relative paths to resolve Vercel compilation errors
import { db } from "../../db";
import { ideas, users, upvotes } from "../../db/schema";
import { auth } from "@/auth";
import { desc, eq, sql, ilike, or } from "drizzle-orm";

// GET all ideas with optional search and tag filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");

  try {
    let query = db
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
      .orderBy(desc(ideas.createdAt));

    const result = await query;

    // Filter on the result set for simplicity
    let filteredResults = result;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredResults = filteredResults.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchLower) ||
          idea.teaser.toLowerCase().includes(searchLower)
      );
    }

    if (tag) {
      filteredResults = filteredResults.filter((idea) =>
        (idea.tags as string[])?.includes(tag)
      );
    }

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}

// POST a new idea
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, teaser, fullStrategy, tags, teamRoles } = body;

    if (!title || !teaser || !fullStrategy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [newIdea] = await db
      .insert(ideas)
      .values({
        userId: session.user.id,
        title,
        teaser,
        fullStrategy,
        tags: tags || [],
        teamRoles,
        upvoteCount: 0,
      })
      .returning();

    return NextResponse.json(newIdea, { status: 201 });
  } catch (error) {
    console.error("Error creating idea:", error);
    return NextResponse.json(
      { error: "Failed to create idea" },
      { status: 500 }
    );
  }
}
