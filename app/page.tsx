"use client";

import { useMemo, useState } from "react";
import type { DramaPlan } from "../lib/drama-types";

const steps = ["เขียนบท", "สร้างตัวละคร", "แบ่งฉาก", "วางแผนช็อต", "สร้างวิดีโอ", "พากย์ไทย", "Lip-sync", "ตัดต่อ"];

export default function Home() {
  const [title, setTitle] = useState("เทพกรีกแก้แค้น");
  const [duration, setDuration] = useState("1");
  const [language, setLanguage] = useState("ไทย");
  const [style, setStyle] = useState("3D Cinematic");
  const [progress, setProgress] = useState(0);
  const [plan, setPlan] = useState<DramaPlan | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shotEstimate = useMemo(() => Math.max(8, Math.round((Number(duration) * 60) / 8)), [duration]);

  async function generate() {
    setLoading(true);
    setError("");
    setPlan(null);
    setProgress(0);

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          durationMinutes: Number(duration),
          language,
          visualStyle: style
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "สร้างบทไม่สำเร็จ");
      setPlan(data.plan);
      setProgress(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">AI DRAMA STUDIO</p>
          <h1>สร้างละคร AI จากไอเดียเดียว</h1>
          <p className="sub">Gemini เขียนบท สร้าง Character Bible และแตกเรื่องเป็น Scene / Shot ก่อนส่งต่อให้ Veo สร้างวิดีโอ</p>
        </div>

        <div className="panel">
          <label>เรื่อง<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <div className="grid">
            <label>ความยาว
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="1">1 นาที</option><option value="5">5 นาที</option><option value="30">30 นาที</option>
              </select>
            </label>
            <label>ภาษา
              <select value={language} onChange={(e) => setLanguage(e.target.value)}><option>ไทย</option><option>English</option></select>
            </label>
            <label>สไตล์
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option>3D Cinematic</option><option>3D Cartoon</option><option>Dark Fantasy</option>
              </select>
            </label>
          </div>
          <div className="estimate">ประมาณ {shotEstimate} ช็อต • {language} • {style}</div>
          <button onClick={generate} disabled={loading}>{loading ? "Gemini กำลังเขียนบท..." : "สร้างละคร"}</button>
          {error && <p style={{ color: "#ff9d9d" }}>{error}</p>}
        </div>
      </section>

      <section className="pipeline">
        <div className="sectionTitle"><div><p className="eyebrow">PRODUCTION PIPELINE</p><h2>{title}</h2></div><span>{progress}/{steps.length} ขั้นตอน</span></div>
        <div className="steps">
          {steps.map((step, index) => {
            const done = index < progress;
            const active = loading && index === 0;
            return <div className={`step ${done ? "done" : active ? "active" : ""}`} key={step}>
              <span>{done ? "✓" : index + 1}</span><div><strong>{step}</strong><small>{done ? "พร้อมแล้ว" : active ? "กำลังประมวลผล" : "รอดำเนินการ"}</small></div>
            </div>;
          })}
        </div>
      </section>

      {plan && <section className="preview">
        <p className="eyebrow">AI STORY PLAN</p>
        <h2>{plan.title}</h2>
        <p>{plan.logline}</p>
        <h3>ตัวละคร ({plan.characters.length})</h3>
        {plan.characters.map((c) => <p key={c.name}><strong>{c.name}</strong> — {c.role}: {c.description}</p>)}
        <h3>ฉาก ({plan.scenes.length})</h3>
        {plan.scenes.map((s) => <div key={s.sceneNumber}>
          <p><strong>Scene {s.sceneNumber}: {s.title}</strong> — {s.summary}</p>
          <small>{s.shots.length} shots</small>
        </div>)}
      </section>}
    </main>
  );
}
