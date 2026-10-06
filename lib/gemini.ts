import type { DramaPlan, DramaRequest } from "./drama-types";

const MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";

export async function generateDramaPlan(input: DramaRequest): Promise<DramaPlan> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const prompt = `
You are the story engine for an AI drama production application.
Create a production-ready drama plan.

TITLE/IDEA: ${input.title}
TARGET DURATION: ${input.durationMinutes} minutes
LANGUAGE: ${input.language}
VISUAL STYLE: ${input.visualStyle}

Return ONLY valid JSON matching this shape:
{
  "title": "string",
  "logline": "string",
  "characters": [
    {
      "name": "string",
      "role": "string",
      "description": "stable visual identity, age, face, hair, costume, personality",
      "voiceDirection": "string"
    }
  ],
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "string",
      "summary": "string",
      "shots": [
        {
          "shotNumber": 1,
          "durationSeconds": 8,
          "visualPrompt": "cinematic generation prompt that preserves character identity",
          "dialogue": "dialogue in requested language or empty string",
          "speaker": "character name or narrator"
        }
      ]
    }
  ]
}

Rules:
- Build a coherent beginning, escalation, climax and ending.
- Keep recurring character appearance descriptions consistent.
- Shots should normally be 4-8 seconds.
- Dialogue must be natural in the requested language.
- For a 1 minute MVP, create about 8-10 shots.
- For longer projects, create a useful scene/shot plan without padding.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no drama plan");

  return JSON.parse(text) as DramaPlan;
}
