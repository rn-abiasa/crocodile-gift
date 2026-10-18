import { BackButton, Star } from "../components/ui";
import photo from "../assets/12.webp";

// MESSAGE: tumpukan kertas bergaris, pesan di kertas paling atas. Edit pesan di <p> di bawah.
const lines = "repeating-linear-gradient(transparent 0 1.9rem, rgb(36 52 77 / .22) 1.9rem calc(1.9rem + 1px))";

export default function Message() {
  return (
    <main className="page">
      <Star className="top-6 right-6" size={26} />
      <h1 className="in font-script italic text-3xl mt-4">for you, with love</h1>

      <div className="relative w-full mt-4">
        {/* Kertas bawah (hanya hiasan tumpukan) */}
        <div className="absolute inset-0 bg-paper rotate-3 shadow" style={{ backgroundImage: lines }} />
        <div className="absolute inset-0 bg-paper -rotate-2 shadow" style={{ backgroundImage: lines }} />
        {/* Kertas paling atas: isi pesan */}
        <div className="in relative bg-paper -rotate-1 p-6 pt-8 shadow-md" style={{ backgroundImage: lines, backgroundPositionY: "1.4rem", "--d": "0.3s" }}>
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
          <p className="leading-[1.9rem] text-xl">
            Dear you,
            <br />
            happy birthday! Tulis pesan spesialmu di sini. Terima kasih sudah jadi orang yang bikin hari-hariku lebih ringan.
            <br />
            <br />
            With love, me.
          </p>
        </div>
      </div>

      {/* Dekorasi foto polaroid + blanko vintage */}
      <div className="relative w-full h-52 mt-2">
        <div className="polaroid in idle absolute left-4 top-0 w-36" style={{ "--r": "-6deg", "--d": "0.7s" }}>
          <img src={photo} alt="" />
        </div>
        <div className="in absolute right-4 top-6 w-32 h-40 bg-butter/50 rotate-6 border border-dashed border-ink p-2 text-sm" style={{ "--d": "0.9s" }}>
          <b>No. 20</b>
          <br />
          kept safe for you ♡
        </div>
      </div>
      <BackButton />
    </main>
  );
}
