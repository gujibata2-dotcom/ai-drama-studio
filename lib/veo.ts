const VEO_MODEL = process.env.VEO_MODEL || "veo-3.1-fast-generate-preview";

export async function startVeoGeneration(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${VEO_MODEL}:predictLongRunning`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          numberOfVideos: 1,
          aspectRatio: "16:9",
          resolution: "720p"
        }
      })
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Veo request failed: ${response.status} ${detail}`);
  }

  return response.json() as Promise<{ name: string }>;
}
