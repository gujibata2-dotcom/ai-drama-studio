import { NextResponse } from "next/server";
import { startVeoGeneration } from "../../../lib/veo";

export async function POST(request: Request) {
  try {
    if (process.env.ENABLE_VEO_GENERATION !== "true") {
      return NextResponse.json(
        { error: "Veo generation is disabled. Set ENABLE_VEO_GENERATION=true after testing billing." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const prompt = String(body.prompt || "").trim();
    if (!prompt) {
      return NextResponse.json({ error: "Missing video prompt" }, { status: 400 });
    }

    const operation = await startVeoGeneration(prompt);
    return NextResponse.json({ operation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
