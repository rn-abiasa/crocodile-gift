import { useState } from "react";
import { useGo, Star } from "../components/ui";

import head from "../assets/angga.webp";

// COVER: splash amplop -> judul -> umur (2 [kepala] 0) -> tombol. Edit teks langsung di sini.
export default function Cover() {
  const go = useGo();

  return (
    <>
      <main className="page justify-center text-center overflow-hidden">
        {/* Bintang dekorasi: ubah posisi/ukuran/warna sesuai selera */}
        <Star className="top-8 left-5" size={34} d={0} />
        <Star
          className="top-24 right-6"
          size={22}
          color="var(--color-peach)"
          d={0.6}
        />
        <Star
          className="bottom-40 left-8"
          size={20}
          color="var(--color-sage)"
          d={1.1}
        />
        <Star className="bottom-24 right-10" size={30} d={1.6} />

        <p className="in text-2xl -rotate-3" style={{ "--d": "0.1s" }}>
          sweet, baby!
        </p>
        <h1
          className="in font-script italic text-5xl leading-none"
          style={{ "--d": "0.3s" }}
        >
          Happy
          <br />
          Birthday
        </h1>

        {/* Umur: angka 2 + foto kepala + angka 0. Ganti angka di sini */}
        <div
          className="relative in flex items-end justify-center gap-18 -my-2"
          style={{ "--d": "0.6s" }}
          aria-label="20 tahun"
        >
          <span className="font-script text-[8rem] leading-[0.8]">2</span>
          <img
            src={head}
            alt=""
            className="absolute -bottom-14 idle w-80 -mx-1 mb-2"
            style={{ "--r": "-4deg" }}
          />
          <span className="font-script text-[8rem] leading-[0.8]">0</span>
        </div>

        <p className="in text-xl max-w-64" style={{ "--d": "0.9s" }}>
          there's a tiny surprise waiting for you ✨
        </p>
        <button
          className="btn in wiggle"
          style={{ "--d": "1.2s" }}
          onClick={() => go("/gifts")}
        >
          see your gift
        </button>
      </main>
    </>
  );
}
