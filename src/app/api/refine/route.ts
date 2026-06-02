import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { text, field } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // This is a simple refinement that structures the text
    // In production, you would call an AI API like OpenAI
    let refinedText = text;

    if (field === "fullStrategy") {
      // Structure the full strategy
      const lines = text.split("\n").filter((line: string) => line.trim());
      refinedText = `**Problem Statement:**
${lines[0] || "Define the core problem your idea solves"}

**Solution Overview:**
${lines[1] || "Explain your unique approach"}

**Target Market:**
${lines[2] || "Identify your ideal customers"}

**Revenue Model:**
${lines[3] || "Describe how you'll make money"}

**Go-to-Market Strategy:**
${lines[4] || "Outline your launch and growth plan"}

**Key Metrics:**
${lines[5] || "Define success metrics and milestones"}`;
    } else if (field === "teaser") {
      // Create a compelling one-liner
      const words = text.trim().split(" ");
      if (words.length > 15) {
        refinedText = words.slice(0, 15).join(" ") + "...";
      } else {
        refinedText = text.trim();
      }
    } else if (field === "title") {
      // Capitalize and clean title
      refinedText = text
        .trim()
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }

    return NextResponse.json({ refinedText });
  } catch (error) {
    console.error("Error refining text:", error);
    return NextResponse.json(
      { error: "Failed to refine text" },
      { status: 500 }
    );
  }
}
