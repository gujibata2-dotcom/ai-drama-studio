import { NextResponse } from "next/server";
import { startVeoGeneration } from "../../../lib/veo";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;
const MAX_PROMPT_LENGTH = 4_000;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export async function POST(request: Request) {
  try {
    if (process.env.ENABLE_VEO_GENERATION !== "true") {
      return json(
        { error: "Veo generation is disabled by the server administrator." },
        403
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ error: "Request is too large." }, 413);
    }

    const body = await request.json();
    const prompt = String(body.prompt || "").trim();

    if (!prompt) {
      return json({ error: "Missing video prompt" }, 400);
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return json({ error: "Video prompt is too long." }, 400);
    }

    const operation = await startVeoGeneration(prompt);
    return json({ operation });
  } catch (error) {
    console.error("generate-video failed", error);
    return json({ error: "Video generation failed. Please try again." }, 500);
  }
}
