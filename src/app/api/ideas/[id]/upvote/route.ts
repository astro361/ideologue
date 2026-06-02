import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ideas, upvotes } from "@/db/schema";
import { auth } from "@/auth";
import { eq, and, sql } from "drizzle-orm";

// POST toggle upvote
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if user already upvoted
    const [existingUpvote] = await db
      .select()
      .from(upvotes)
      .where(and(eq(upvotes.ideaId, id), eq(upvotes.userId, session.user.id)));

    if (existingUpvote) {
      // Remove upvote
      await db
        .delete(upvotes)
        .where(
          and(eq(upvotes.ideaId, id), eq(upvotes.userId, session.user.id))
        );

      // Decrement count
      await db
        .update(ideas)
        .set({ upvoteCount: sql`${ideas.upvoteCount} - 1` })
        .where(eq(ideas.id, id));

      return NextResponse.json({ upvoted: false });
    } else {
      // Add upvote
      await db.insert(upvotes).values({
        ideaId: id,
        userId: session.user.id,
      });

      // Increment count
      await db
        .update(ideas)
        .set({ upvoteCount: sql`${ideas.upvoteCount} + 1` })
        .where(eq(ideas.id, id));

      return NextResponse.json({ upvoted: true });
    }
  } catch (error) {
    console.error("Error toggling upvote:", error);
    return NextResponse.json(
      { error: "Failed to toggle upvote" },
      { status: 500 }
    );
  }
}

// GET check if user has upvoted
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ upvoted: false });
  }

  try {
    const [existingUpvote] = await db
      .select()
      .from(upvotes)
      .where(and(eq(upvotes.ideaId, id), eq(upvotes.userId, session.user.id)));

    return NextResponse.json({ upvoted: !!existingUpvote });
  } catch (error) {
    console.error("Error checking upvote:", error);
    return NextResponse.json({ upvoted: false });
  }
}
