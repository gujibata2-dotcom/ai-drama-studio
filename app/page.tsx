"use client";

import { useMemo, useState } from "react";

const steps = [
  "เขียนบท",
  "สร้างตัวละคร",
  "แบ่งฉาก",
  "วางแผนช็อต",
  "สร้างวิดีโอ",
  "พากย์ไทย",
  "Lip-sync",
  "ตัดต่อ"
];

export default function Home() {
  const [title, setTitle] = useState("เทพกรีกแก้แค้น");
  const [duration, setDuration] = useState("1");
  const [language, setLanguage] = useState("ไทย");
  const [style, setStyle] = useState("3D Cinematic");
  const [progress, setProgress] = useState(0);

  const shotEstimate = useMemo(() => {
    const minutes = Number(duration);
    return Math.max(8, Math.round((minutes * 60) / 8));
  }, [duration]);

  function generate() {
    setProgress(1);
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= steps.length) {
          clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 450);
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">AI DRAMA STUDIO</p>
          <h1>สร้างละคร AI จากไอเดียเดียว</h1>
          <p className="sub">
            แตกเรื่องเป็นตัวละคร ฉาก ช็อต เสียงพากย์ และขั้นตอนผลิตวิดีโออัตโนมัติ
          </p>
        </div>

        <div className="panel">
          <label>
            เรื่อง
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <div className="grid">
            <label>
              ความยาว
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="1">1 นาที</option>
                <option value="5">5 นาที</option>
                <option value="30">30 นาที</option>
              </select>
            </label>

            <label>
              ภาษา
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>ไทย</option>
                <option>English</option>
              </select>
            </label>

            <label>
              สไตล์
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option>3D Cinematic</option>
                <option>3D Cartoon</option>
                <option>Dark Fantasy</option>
              </select>
            </label>
          </div>

          <div className="estimate">
            ประมาณ {shotEstimate} ช็อต • {language} • {style}
          </div>

          <button onClick={generate}>สร้างละคร</button>
        </div>
      </section>

      <section className="pipeline">
        <div className="sectionTitle">
          <div>
            <p className="eyebrow">PRODUCTION PIPELINE</p>
            <h2>{title}</h2>
          </div>
          <span>{progress}/{steps.length} ขั้นตอน</span>
        </div>

        <div className="steps">
          {steps.map((step, index) => {
            const done = index < progress;
            const active = index === progress;
            return (
              <div className={`step ${done ? "done" : active ? "active" : ""}`} key={step}>
                <span>{done ? "✓" : index + 1}</span>
                <div>
                  <strong>{step}</strong>
                  <small>{done ? "เสร็จแล้ว" : active ? "กำลังประมวลผล" : "รอดำเนินการ"}</small>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="preview">
        <p className="eyebrow">MVP TARGET</p>
        <h2>เริ่มจากละคร 1 นาที ก่อนขยายเป็น 30 นาที</h2>
        <p>
          เวอร์ชันนี้เป็นหน้า MVP สำหรับควบคุม pipeline ขั้นต่อไปคือเชื่อม Supabase,
          Script AI, Character Reference, Video API, Thai TTS และ FFmpeg
        </p>
      </section>
    </main>
  );
}
