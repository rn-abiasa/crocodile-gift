import { useEffect, useRef, useState } from "react";
import { BackButton, Star } from "../components/ui";

// SONGS: radio dengan layar kecil (YouTube) + piringan vinyl, judul/artist, dan tombol play.
// Ganti 3 nilai ini sesuai lagu kalian (ID = bagian setelah "v=" di URL YouTube).
const YOUTUBE_ID = "HEAn4FqXFY4";
const SONG_TITLE = "You!";
const SONG_ARTIST = "LANY";

export default function Songs() {
  const screen = useRef(null); // wadah layar radio (tempat iframe dibuat)
  const player = useRef(null); // objek YT.Player
  const [playing, setPlaying] = useState(false);

  // Pakai YouTube IFrame API (bukan postMessage) supaya tombol play kita langsung memutar video
  // dan state ikut sinkron saat user memakai kontrol bawaan YouTube.
  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const el = document.createElement("div"); // YT.Player mengganti elemen ini dengan <iframe>
      screen.current.append(el);
      player.current = new window.YT.Player(el, {
        videoId: YOUTUBE_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: { playsinline: 1, rel: 0 },
        events: { onStateChange: (e) => setPlaying(e.data === 1) }, // 1 = sedang play
      });
    };

    if (window.YT?.Player) init();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        init();
      };
      if (!document.getElementById("yt-api")) {
        const s = document.createElement("script");
        s.id = "yt-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.append(s);
      }
    }
    return () => {
      cancelled = true;
      player.current?.destroy?.();
      player.current = null;
      screen.current?.replaceChildren();
    };
  }, []);

  const toggle = () => {
    if (!player.current?.playVideo) return; // player belum siap
    playing ? player.current.pauseVideo() : player.current.playVideo();
  };

  return (
    <main className="page">
      <Star className="top-8 left-6" size={24} color="var(--color-peach)" />
      <h1 className="in font-script italic text-3xl mt-16 md:mt-32">
        a song for you
      </h1>

      {/* Badan radio */}
      <div
        className="in relative w-full bg-sage rounded-3xl border-[3px] border-ink p-4"
        style={{ "--d": "0.3s", boxShadow: "5px 6px 0 var(--color-ink)" }}
      >
        {/* Antena */}
        <span className="absolute -top-10 right-10 w-1 h-12 bg-ink rotate-[18deg] origin-bottom" />
        {/* Layar kecil: video YouTube */}
        <div className="bg-ink rounded-xl p-2">
          <div
            ref={screen}
            className="aspect-video rounded-md overflow-hidden bg-black [&_iframe]:w-full [&_iframe]:h-full"
          />
        </div>

        {/* Panel bawah: [vinyl] [judul + artist] [tombol play] */}
        <div className="flex items-center gap-3 mt-4">
          {/* Vinyl berputar hanya saat lagu diputar */}
          <div
            className="spin shrink-0 w-16 h-16 rounded-full bg-ink grid place-items-center"
            style={{
              boxShadow: "inset 0 0 0 5px #3a4c69",
              animationPlayState: playing ? "running" : "paused",
            }}
          >
            <span className="w-6 h-6 rounded-full bg-butter border-2 border-paper" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-xl font-bold">{SONG_TITLE}</p>
            <p className="truncate opacity-80">{SONG_ARTIST}</p>
          </div>
          <button
            className="btn !px-0 shrink-0 w-12 h-12 grid place-items-center !rounded-full"
            onClick={toggle}
            aria-label={playing ? "pause" : "play"}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {playing ? (
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              ) : (
                <path d="M8 5l11 7-11 7z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <p className="in text-xl text-center max-w-72" style={{ "--d": "0.7s" }}>
        every time this plays, I think of you. press play, baby ♡
      </p>
      <BackButton />
    </main>
  );
}
