import { NextResponse } from "next/server";
import { generateDramaPlan } from "../../../lib/gemini";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;
const MAX_TITLE_LENGTH = 200;
const MAX_OPTION_LENGTH = 60;
const ALLOWED_DURATIONS = new Set([1, 5, 30]);

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export async function POST(request: Request) {
  try {
    if (process.env.ENABLE_GEMINI_GENERATION !== "true") {
      return json(
        { error: "Script generation is disabled by the server administrator." },
        403
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ error: "Request is too large." }, 413);
    }

    const body = await request.json();
    const title = String(body.title || "").trim();
    const durationMinutes = Number(body.durationMinutes || 1);
    const language = String(body.language || "ไทย").trim();
    const visualStyle = String(body.visualStyle || "3D Cinematic").trim();

    if (!title) {
      return json({ error: "กรุณาใส่ชื่อเรื่องหรือไอเดีย" }, 400);
    }
    if (title.length > MAX_TITLE_LENGTH) {
      return json({ error: "ชื่อเรื่องยาวเกินไป" }, 400);
    }
    if (!ALLOWED_DURATIONS.has(durationMinutes)) {
      return json({ error: "ระยะเวลาที่เลือกไม่ถูกต้อง" }, 400);
    }
    if (
      !language ||
      !visualStyle ||
      language.length > MAX_OPTION_LENGTH ||
      visualStyle.length > MAX_OPTION_LENGTH
    ) {
      return json({ error: "ค่าภาษา/สไตล์ไม่ถูกต้อง" }, 400);
    }

    const plan = await generateDramaPlan({
      title,
      durationMinutes,
      language,
      visualStyle
    });

    return json({ plan });
  } catch (error) {
    console.error("generate-script failed", error);
    return json({ error: "สร้างบทไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" }, 500);
  }
}
