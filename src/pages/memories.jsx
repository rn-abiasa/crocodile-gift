import { useRef, useState } from "react";
import { BackButton, Star } from "../components/ui";
import p1 from "../assets/1.webp";
import p2 from "../assets/2.webp";
import p3 from "../assets/3.webp";
import p4 from "../assets/4.webp";
import p5 from "../assets/5.webp";
import p6 from "../assets/6.webp";
import p7 from "../assets/7.webp";
import p8 from "../assets/8.webp";
import p9 from "../assets/9.webp";
import p10 from "../assets/10.webp";
import p11 from "../assets/11.webp";
import p12 from "../assets/12.webp";
import p13 from "../assets/13.webp";

// MEMORIES: polaroid membentuk hati. "X" = ada foto, "." = kosong.
// Ubah pola untuk bentuk lain; ganti isi `photos` dengan foto kalian (dipakai bergantian).
const heart = ["XX.XX", "XXXXX", ".XXX.", "..X.."];
const photos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13];
// Keterangan di dialog, urut dari kiri-atas ke bawah. Edit sesuai tiap foto.
const captions = [
  "hari pertama kita",
  "tawa yang bikin lupa waktu",
  "jalan-jalan tanpa tujuan",
  "makan enak bareng",
  "foto blur tapi favorit",
  "kamu lagi senyum",
  "hari hujan yang hangat",
  "kita, apa adanya",
  "pelukan paling nyaman",
  "momen kecil, bahagia besar",
  "bareng kamu, selalu seru",
  "tiap hari terasa spesial",
  "kamu, hadiah terbaik",
];

export default function Memories() {
  const dialog = useRef(null);
  const [open, setOpen] = useState(null); // index foto yang sedang dibuka
  let n = 0; // penghitung foto

  const show = (k) => {
    setOpen(k);
    dialog.current.showModal();
  };

  // Pindah foto di dialog (berputar: setelah foto terakhir kembali ke foto pertama)
  const total = heart.join("").replaceAll(".", "").length;
  const step = (d) => setOpen((o) => (o + d + total) % total);

  return (
    <main className="page">
      <Star className="top-6 left-5" size={22} color="var(--color-sage)" />
      <h1 className="in font-script italic text-3xl mt-16 md:mt-32">
        our little memories
      </h1>

      <div className="grid grid-cols-5 gap-1 w-full">
        {heart.flatMap((row, r) =>
          [...row].map((c, i) => {
            if (c !== "X") return <span key={`${r}-${i}`} />;
            const k = n++;
            return (
              // Foto dibungkus <button> supaya bisa diklik & diakses keyboard
              <button
                key={`${r}-${i}`}
                className="polaroid in idle tile border-0 cursor-pointer"
                aria-label={`buka kenangan ${k + 1}`}
                style={{
                  "--r": `${((k % 3) - 1) * 5}deg`,
                  "--d": `${0.2 + k * 0.12}s`,
                }}
                onClick={() => show(k)}
              >
                <img src={photos[k % photos.length]} alt="" />
              </button>
            );
          }),
        )}
      </div>

      {/* Kutipan romantis pendek */}
      <p
        className="in text-xl text-center max-w-64 -rotate-1"
        style={{ "--d": "1.8s" }}
      >
        "in every little moment, it's always you." ♡
      </p>
      <BackButton />

      {/* Dialog detail foto. Klik area gelap di luar kartu untuk menutup. */}
      <dialog
        ref={dialog}
        /* overflow-visible + p-5: kartu miring, tape, dan tombol tutup tidak memicu scrollbar */
        className="m-auto bg-transparent p-5 border-0 overflow-visible max-w-none max-h-none backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        onClose={() => setOpen(null)}
      >
        {open !== null && (
          /* key={open}: animasi "in" diulang setiap pindah foto */
          <div key={open} className="in polaroid relative w-[min(20rem,82vw)] !p-3 !pb-4 -rotate-2 text-ink">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3" />
            <img src={photos[open % photos.length]} alt={captions[open]} />
            <p className="text-center text-2xl mt-3 leading-tight min-h-[2.4em] grid place-items-center">
              {captions[open]}
            </p>

            {/* Navigasi foto: prev, nomor, next */}
            <div className="flex items-center justify-between mt-2">
              <button className="btn ghost !px-3 !py-1" aria-label="foto sebelumnya" onClick={() => step(-1)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              </button>
              <span className="text-xl">{open + 1} / {total}</span>
              <button className="btn ghost !px-3 !py-1" aria-label="foto berikutnya" onClick={() => step(1)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            <button
              className="btn ghost !px-3 !py-1 absolute -top-3 -right-3"
              aria-label="tutup"
              onClick={() => dialog.current.close()}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </main>
  );
}
