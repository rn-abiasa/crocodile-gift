import { useState } from "react";
import { BackButton } from "../components/ui";
import p1 from "../assets/12.webp";
import p2 from "../assets/13.webp";
import p3 from "../assets/14.webp";

// PHOTOBOOTH: nyalakan mesin -> tekan tombol -> proses -> strip foto keluar -> download.
// Foto strip diambil dari `shots` (ganti dengan foto kalian) dan digambar ke <canvas>.
const shots = [p1, p2, p3];
const FOOTER = "happy birthday ♡"; // teks di bawah strip

const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = src; });

// Gambar strip: bingkai navy, 3 foto, teks bawah. Hasil berupa data URL PNG.
async function makeStrip() {
  const W = 420, H = 1280, c = Object.assign(document.createElement("canvas"), { width: W, height: H });
  const g = c.getContext("2d");
  g.fillStyle = "#24344d"; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 3; i++) {
    const img = await load(shots[i]), y = 30 + i * 380, s = Math.min(img.width, img.height);
    g.fillStyle = "#fbfaf5"; g.fillRect(25, y - 5, 370, 370);
    g.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 35, y + 5, 350, 350);
  }
  g.fillStyle = "#fbfaf5"; g.textAlign = "center"; g.font = "italic 40px Georgia, serif";
  g.fillText(FOOTER, W / 2, 1210);
  return c.toDataURL("image/png");
}

export default function Photobooth() {
  const [step, setStep] = useState("off"); // off | on | shooting | done
  const [strip, setStrip] = useState(null);

  const shoot = async () => {
    setStep("shooting");
    const [url] = await Promise.all([makeStrip(), new Promise((r) => setTimeout(r, 2500))]); // min 2.5 dtk biar terasa "proses"
    setStrip(url); setStep("done");
  };

  return (
    <main className="page">
      <h1 className="in font-script italic text-3xl mt-4">photobooth</h1>

      {/* Mesin */}
      <div className="in relative w-64 bg-butter border-[3px] border-ink rounded-t-3xl p-4 pb-6" style={{ "--d": "0.3s", boxShadow: "5px 6px 0 var(--color-ink)" }}>
        <div className={`h-28 rounded-xl border-[3px] border-ink grid place-items-center text-center transition-colors ${step === "off" ? "bg-ink/80 text-paper/40" : "bg-paper"}`}>
          {step === "off" && "mesin mati"}
          {step === "on" && "siap! tekan tombol"}
          {step === "shooting" && <span className="wiggle">cekrek… cekrek… ✨</span>}
          {step === "done" && "yeay, sudah jadi!"}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className={`btn ${step === "off" ? "" : "ghost"}`} onClick={() => setStep(step === "off" ? "on" : "off")} disabled={step === "shooting"}>
            {step === "off" ? "on" : "off"}
          </button>
          <button className="btn" onClick={shoot} disabled={step !== "on" && step !== "done"} style={{ opacity: step === "on" || step === "done" ? 1 : 0.4 }}>
            {step === "done" ? "again" : "snap"}
          </button>
        </div>
        {/* Slot keluar strip */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-40 h-3 bg-ink rounded" />
      </div>

      {step === "done" && strip && (
        <div className="w-40 -mt-2 overflow-hidden text-center">
          <img src={strip} alt="foto photobooth" className="w-full" style={{ animation: "slide-down 1.2s ease-out both" }} />
          <a className="btn inline-block mt-3 no-underline text-base" href={strip} download="photobooth.png">download</a>
        </div>
      )}
      <BackButton />
    </main>
  );
}
