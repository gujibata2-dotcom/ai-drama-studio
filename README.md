# AI Drama Studio

AI drama production MVP:

Story → Gemini Script → Character Bible → Scenes → Shots → Veo → Audio → Final Edit

## What works now

- Next.js UI for title, duration, language and visual style
- Server-side Gemini API integration
- Gemini returns structured Character Bible + Scenes + Shots
- Supabase schema for projects / characters / scenes / shots
- Veo 3.1 adapter and API route
- Veo has a safety switch and is OFF by default to prevent accidental paid generations

## Required credentials

### 1. Gemini API key
Create a key in Google AI Studio. Put it in your local/deployment environment as:

```
GEMINI_API_KEY=...
```

Never put the real key in source code or commit it to GitHub.

The same Gemini credential is used by the Veo adapter when the account/project has access.

### 2. Supabase
Set:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Run `supabase/schema.sql` in Supabase SQL Editor.

## Veo

Default model:

```
VEO_MODEL=veo-3.1-fast-generate-preview
ENABLE_VEO_GENERATION=false
```

Keep video generation disabled while testing script generation. When billing/access is confirmed, change the deployment secret to:

```
ENABLE_VEO_GENERATION=true
```

Start with ONE shot before generating a full drama.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Next

1. Add GEMINI_API_KEY and verify 1-minute script generation
2. Persist generated plan to Supabase
3. Generate character reference images
4. Test one Veo shot
5. Add operation polling/download/storage
6. Evaluate native Thai audio; add dedicated TTS only if needed
7. Add final assembly/export
