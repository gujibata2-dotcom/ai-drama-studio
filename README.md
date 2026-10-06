# AI Drama Studio

AI drama production MVP:

Story → Gemini Script → Character Bible → Scenes → Shots → Veo → Audio → Final Edit

## What works now

- Next.js UI for title, duration, language and visual style
- Server-side Gemini API integration
- Gemini returns structured Character Bible + Scenes + Shots
- Supabase schema for projects / characters / scenes / shots
- Veo 3.1 adapter and API route
- Gemini and Veo generation are OFF by default for safer deployments
- Supabase Row Level Security (RLS) is enabled by default

## Required credentials

### 1. Gemini API key

Create a key in Google AI Studio and add it only as a server-side environment variable:

```
GEMINI_API_KEY=...
GEMINI_TEXT_MODEL=gemini-2.5-flash
```

Never commit the real key to GitHub.

To enable script generation intentionally:

```
ENABLE_GEMINI_GENERATION=true
```

If this app is public, add authentication and production-grade rate limiting before enabling paid AI endpoints broadly.

### 2. Supabase

Set:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Run `supabase/schema.sql` in Supabase SQL Editor.

RLS is enabled with a deny-by-default posture. Add explicit policies only when user authentication and project ownership are implemented.

## Veo

Default model:

```
VEO_MODEL=veo-3.1-fast-generate-preview
ENABLE_VEO_GENERATION=false
```

Keep video generation disabled until billing/access and abuse protection are confirmed.

When you intentionally test Veo:

```
ENABLE_VEO_GENERATION=true
```

Start with ONE shot before generating a full drama.

## Vercel environment variables

Recommended Production / Preview settings:

```
GEMINI_API_KEY=...
GEMINI_TEXT_MODEL=gemini-2.5-flash
ENABLE_GEMINI_GENERATION=false

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

VEO_MODEL=veo-3.1-fast-generate-preview
ENABLE_VEO_GENERATION=false
```

Enable generation flags only for environments where you intentionally want API usage.

## Run

```bash
npm install
npm run build
npm run dev
```

Open http://localhost:3000

## Security notes

- All `.env*` files are ignored except `.env.example`.
- API request size and input lengths are bounded.
- Backend provider errors are logged server-side instead of returned directly to clients.
- AI generation endpoints are feature-flagged OFF by default.
- Supabase tables use RLS with no public policies yet.
- Add authentication and a durable rate limiter before public production usage.

## Next

1. Add Vercel environment variables
2. Test a Preview deployment with `ENABLE_GEMINI_GENERATION=true`
3. Add authentication
4. Add durable per-user/IP rate limiting
5. Add Supabase ownership policies
6. Persist generated plans to Supabase
7. Test one Veo shot
8. Add operation polling/download/storage
9. Add final assembly/export
