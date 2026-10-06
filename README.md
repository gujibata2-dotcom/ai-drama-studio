# AI Drama Studio

MVP สำหรับสร้างละคร AI จากไอเดียเดียว โดยวาง pipeline:

Story → Script → Characters → Scenes → Shots → Video → Thai TTS → Lip Sync → Final Edit

## MVP

หน้าเว็บปัจจุบันรองรับ:
- ตั้งชื่อเรื่อง
- เลือกความยาว 1 / 5 / 30 นาที
- เลือกภาษา
- เลือก visual style
- ประเมินจำนวนช็อต
- แสดง production pipeline แบบ mock

## Run locally

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## Supabase

1. สร้าง Supabase project
2. เปิด SQL Editor
3. รันไฟล์ `supabase/schema.sql`
4. คัดลอก `.env.example` เป็น `.env.local`
5. ใส่ URL และ anon key ของ Supabase

## Roadmap

1. Persist projects to Supabase
2. Connect Script AI
3. Generate Character Bible + reference images
4. Generate scenes and 5–10 second shots
5. Connect video generation provider
6. Thai TTS + character voice IDs
7. Lip-sync
8. FFmpeg final assembly
9. Export MP4

> Do not commit real API keys to GitHub.
