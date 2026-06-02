import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideas, users } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

// GET a single idea by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const [idea] = await db
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
      .where(eq(ideas.id, id));

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(idea);
  } catch (error) {
    console.error("Error fetching idea:", error);
    return NextResponse.json(
      { error: "Failed to fetch idea" },
      { status: 500 }
    );
  }
}

// PATCH update an idea
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check ownership
    const [existingIdea] = await db
      .select()
      .from(ideas)
      .where(eq(ideas.id, id));

    if (!existingIdea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    if (existingIdea.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, teaser, fullStrategy, tags, teamRoles } = body;

    const [updatedIdea] = await db
      .update(ideas)
      .set({
        ...(title && { title }),
        ...(teaser && { teaser }),
        ...(fullStrategy && { fullStrategy }),
        ...(tags && { tags }),
        ...(teamRoles !== undefined && { teamRoles }),
        updatedAt: new Date(),
      })
      .where(eq(ideas.id, id))
      .returning();

    return NextResponse.json(updatedIdea);
  } catch (error) {
    console.error("Error updating idea:", error);
    return NextResponse.json(
      { error: "Failed to update idea" },
      { status: 500 }
    );
  }
}

// DELETE an idea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check ownership
    const [existingIdea] = await db
      .select()
      .from(ideas)
      .where(eq(ideas.id, id));

    if (!existingIdea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    if (existingIdea.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(ideas).where(eq(ideas.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting idea:", error);
    return NextResponse.json(
      { error: "Failed to delete idea" },
      { status: 500 }
    );
  }
}
