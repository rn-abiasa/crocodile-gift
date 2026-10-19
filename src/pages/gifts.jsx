import { useGo, Star } from "../components/ui";

// Ilustrasi gift: SVG inline gaya stiker tangan (garis navy + warna lembut).
// Ukuran ditentukan di <svg className="w-20"> di bawah; ubah w-20 untuk besar/kecil.
const L = {
  stroke: "#24344d",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const art = {
  // Amplop + hati + kertas menyembul
  message: (
    <>
      <rect
        x="22"
        y="22"
        width="56"
        height="40"
        rx="3"
        fill="#fbfaf5"
        transform="rotate(-6 50 42)"
        {...L}
      />
      <path
        d="M32 34h30M32 43h22"
        transform="rotate(-6 50 42)"
        {...L}
        strokeWidth="2"
      />
      <rect x="14" y="40" width="72" height="44" rx="5" fill="#f3c94f" {...L} />
      <path d="M14 44l36 26 36-26" fill="none" {...L} />
      <path
        d="M50 62c-7-5-7-11-2.5-11 2.5 0 2.5 2.5 2.5 2.5s0-2.5 2.5-2.5c4.5 0 4.5 6-2.5 11z"
        fill="#f2a98c"
        {...L}
        strokeWidth="2"
      />
    </>
  ),
  // Radio dengan antena, speaker, dan not musik
  songs: (
    <>
      <path d="M62 34L80 12" {...L} />
      <circle cx="81" cy="11" r="3" fill="#f2a98c" {...L} strokeWidth="2" />
      <rect x="10" y="34" width="80" height="50" rx="9" fill="#a9bfa8" {...L} />
      <circle cx="34" cy="59" r="15" fill="#fbfaf5" {...L} />
      <circle cx="34" cy="59" r="5" fill="#24344d" />
      <path d="M58 48h22M58 58h22M58 68h14" {...L} strokeWidth="2.5" />
      <path d="M20 20v-9l9-2v9" fill="none" {...L} strokeWidth="2.5" />
      <circle cx="18" cy="21" r="3" fill="#24344d" />
      <circle cx="27" cy="19" r="3" fill="#24344d" />
    </>
  ),
  // Dua polaroid bertumpuk + hati
  memories: (
    <>
      <g transform="rotate(-9 38 52)">
        <rect x="14" y="20" width="48" height="58" fill="#fbfaf5" {...L} />
        <rect
          x="19"
          y="25"
          width="38"
          height="36"
          fill="#a9bfa8"
          {...L}
          strokeWidth="2"
        />
      </g>
      <g transform="rotate(8 62 50)">
        <rect x="38" y="18" width="48" height="58" fill="#fbfaf5" {...L} />
        <rect
          x="43"
          y="23"
          width="38"
          height="36"
          fill="#f3c94f"
          {...L}
          strokeWidth="2"
        />
        <path
          d="M62 50c-9-7-9-14-3.5-14 3 0 3.5 3 3.5 3s.5-3 3.5-3c5.5 0 5.5 7-3.5 14z"
          fill="#f2a98c"
          {...L}
          strokeWidth="2"
        />
      </g>
    </>
  ),
  // Mesin photobooth dengan tirai dan strip foto
  photobooth: (
    <>
      <rect x="20" y="8" width="52" height="80" rx="6" fill="#f3c94f" {...L} />
      <rect
        x="27"
        y="15"
        width="38"
        height="30"
        rx="2"
        fill="#fbfaf5"
        {...L}
        strokeWidth="2"
      />
      <path d="M27 45h38v38H27z" fill="#f2a98c" {...L} strokeWidth="2" />
      <path d="M46 45v38" {...L} strokeWidth="2" />
      <circle cx="46" cy="30" r="7" fill="none" {...L} strokeWidth="2.5" />
      <rect
        x="76"
        y="40"
        width="14"
        height="44"
        fill="#fbfaf5"
        {...L}
        strokeWidth="2.5"
      />
      <path d="M79 47h8M79 58h8M79 69h8" {...L} strokeWidth="2.5" />
    </>
  ),
};

// Daftar gift: ubah label / urutan / tujuan / warna blob di sini
const gifts = [
  { to: "/message", label: "message", rot: -3, blob: "var(--color-peach)" },
  { to: "/songs", label: "songs", rot: 2, blob: "var(--color-sage)" },
  { to: "/memories", label: "memories", rot: 3, blob: "var(--color-butter)" },
  {
    to: "/photobooth",
    label: "photobooth",
    rot: -2,
    blob: "var(--color-wash)",
  },
];

// Karakter gerak idle tiap gift (urut sesuai daftar gifts): miring, berdetak, berayun, melompat.
// Kelasnya ada di components/fx.css
const idles = ["idle-tilt", "idle-beat", "idle-sway", "idle-hop"];

export default function Gifts() {
  const go = useGo();
  return (
    <main className="page">
      <Star className="top-8 right-6" size={24} />
      <Star
        className="top-40 left-4"
        size={16}
        color="var(--color-peach)"
        d={0.8}
      />
      <Star
        className="bottom-16 right-8"
        size={20}
        color="var(--color-sage)"
        d={1.4}
      />

      <h1 className="in font-script italic text-4xl text-center mt-16 md:mt-32">
        Choose your gift
      </h1>
      <p className="in -mt-2 text-xl -rotate-2" style={{ "--d": "0.15s" }}>
        pick one, baby ♡
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-7 w-full max-w-72 mt-4">
        {gifts.map((g, i) => (
          <button
            key={g.to}
            className="tile swing-in text-center bg-transparent border-0 cursor-pointer text-ink"
            style={{ "--d": `${0.25 + i * 0.15}s`, "--s": i % 2 ? -1 : 1 }}
            onClick={() => go(g.to)}
          >
            <div
              className={`${idles[i % idles.length]} relative grid place-items-center size-28 mx-auto`}
              style={{ "--r": `${g.rot}deg`, "--d": `${i * 0.5}s` }}
            >
              {/* Hati kecil yang naik dari kartu */}
              <span className="mini-heart z-10" style={{ "--d": `${i * 0.8}s` }}>♥</span>
              <span className="mini-heart z-10 !right-auto !left-1 !text-sm" style={{ "--d": `${i * 0.8 + 1.5}s` }}>♥</span>
              {/* Blob warna di belakang ilustrasi */}
              <span
                className="blob-morph absolute inset-0 border-2 border-dashed border-ink"
                style={{
                  background: g.blob,
                  borderRadius: "58% 42% 55% 45% / 48% 56% 44% 52%",
                }}
              />
              <svg
                viewBox="0 0 100 100"
                className="relative w-20"
                aria-hidden="true"
              >
                {art[g.label]}
              </svg>
            </div>
            <span className="block mt-2 text-2xl font-bold">{g.label}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
