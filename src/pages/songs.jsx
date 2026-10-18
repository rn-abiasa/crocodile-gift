import { BackButton, Star } from "../components/ui";

// SONGS: radio dengan layar kecil (YouTube) + piringan vinyl berputar.
// Ganti ID video YouTube di sini (bagian setelah "v=" di URL).
const YOUTUBE_ID = "dQw4w9WgXcQ";

export default function Songs() {
  return (
    <main className="page">
      <Star className="top-8 left-6" size={24} color="var(--color-peach)" />
      <h1 className="in font-script italic text-3xl mt-4">a song for you</h1>

      {/* Badan radio */}
      <div className="in relative w-full bg-sage rounded-3xl border-[3px] border-ink p-4" style={{ "--d": "0.3s", boxShadow: "5px 6px 0 var(--color-ink)" }}>
        {/* Antena */}
        <span className="absolute -top-10 right-10 w-1 h-12 bg-ink rotate-[18deg] origin-bottom" />
        {/* Layar kecil: video YouTube */}
        <div className="bg-ink rounded-xl p-2">
          <div className="aspect-video rounded-md overflow-hidden bg-black">
            <iframe className="w-full h-full" src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`} title="our song" allow="encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        </div>
        {/* Panel bawah: vinyl + tombol hiasan */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="spin w-20 h-20 rounded-full bg-ink grid place-items-center" style={{ boxShadow: "inset 0 0 0 6px #3a4c69" }}>
            <span className="w-7 h-7 rounded-full bg-butter border-2 border-paper" />
          </div>
          <div className="flex gap-3">
            <span className="w-9 h-9 rounded-full bg-paper border-2 border-ink" />
            <span className="w-9 h-9 rounded-full bg-peach border-2 border-ink" />
          </div>
        </div>
      </div>

      <p className="in text-xl text-center max-w-72" style={{ "--d": "0.7s" }}>
        every time this plays, I think of you. press play, baby ♡
      </p>
      <BackButton />
    </main>
  );
}
