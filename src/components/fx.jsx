import { useMemo } from "react";
import "./fx.css";

const COLORS = ["#f3c94f", "#f2a98c", "#a9bfa8", "#f4a6b8", "#8fb3d9", "#24344d"];
const rnd = (a, b) => a + Math.random() * (b - a);

// CONFETTI POPPER: ledakan ringan dari dua sudut bawah layar saat halaman dibuka.
// `count` = jumlah keping per sisi (kiri & kanan). Kecilkan untuk lebih ringan.
export function Confetti({ count = 26 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count * 2 }, (_, i) => {
        const left = i % 2 === 0; // genap = popper kiri, ganjil = popper kanan
        const dir = left ? 1 : -1;
        return {
          id: i,
          heart: Math.random() < 0.25, // sebagian keping berbentuk hati
          outer: {
            "--ox": left ? "6%" : "94%",
            "--x": `${dir * rnd(40, 250)}px`,
            "--t": `${rnd(1.9, 2.8)}s`,
            "--dl": `${0.2 + rnd(0, 0.25)}s`,
          },
          inner: {
            "--c": COLORS[Math.floor(rnd(0, COLORS.length))],
            "--w": `${rnd(7, 12)}px`,
            "--h": `${rnd(10, 16)}px`,
            "--br": Math.random() < 0.3 ? "50%" : "2px",
            "--up": `${-rnd(320, 620)}px`,
            "--down": `${rnd(60, 200)}px`,
            "--rot": `${rnd(-720, 720)}deg`,
          },
        };
      }),
    [count],
  );

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <span key={p.id} className="cf" style={p.outer}>
          <i className={p.heart ? "cf-h" : ""} style={p.inner}>{p.heart ? "♥" : null}</i>
        </span>
      ))}
    </div>
  );
}

// HATI MELAYANG: latar lembut di semua halaman supaya vibes romantis. Dipasang sekali di main.jsx.
const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  "--l": `${(i * 83 + 7) % 100}%`,
  "--s": `${14 + ((i * 7) % 18)}px`,
  "--t": `${13 + ((i * 5) % 9)}s`,
  "--dl": `${-i * 1.7}s`, // negatif = sudah "di tengah jalan" saat halaman dibuka
  "--sw": `${(i % 2 ? 1 : -1) * (14 + (i % 4) * 8)}px`,
  "--c": ["#f4a6b8", "#f2a98c", "#f08aa6", "#f3c94f"][i % 4],
}));

export function FloatingHearts() {
  return (
    <div aria-hidden="true">
      {HEARTS.map((s, i) => (
        <span key={i} className="fh" style={s}>♥</span>
      ))}
    </div>
  );
}
