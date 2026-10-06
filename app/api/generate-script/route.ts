import { NextResponse } from "next/server";
import { generateDramaPlan } from "../../../lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const durationMinutes = Number(body.durationMinutes || 1);
    const language = String(body.language || "ไทย");
    const visualStyle = String(body.visualStyle || "3D Cinematic");

    if (!title) {
      return NextResponse.json({ error: "กรุณาใส่ชื่อเรื่องหรือไอเดีย" }, { status: 400 });
    }

    const plan = await generateDramaPlan({
      title,
      durationMinutes,
      language,
      visualStyle
    });

    return NextResponse.json({ plan });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
