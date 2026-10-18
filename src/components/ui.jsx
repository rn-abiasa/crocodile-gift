import { useNavigate } from "react-router-dom";

// Pindah halaman dengan animasi OUT: tambah class "leaving" (CSS yang animasi), lalu navigate.
export function useGo() {
  const navigate = useNavigate();
  return (to) => {
    document.documentElement.classList.add("leaving");
    setTimeout(() => {
      navigate(to);
      document.documentElement.classList.remove("leaving");
      window.scrollTo(0, 0);
    }, 350);
  };
}

// Props ikon: garis tebal tangan, ikut warna teks
const ico = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

// Tombol navigasi bawah: [home -> cover] [panah kiri -> gifts]
export function BackButton() {
  const go = useGo();
  return (
    <div className="in flex gap-3" style={{ "--d": "0.9s" }}>
      <button className="btn ghost !px-3" aria-label="home" onClick={() => go("/")}>
        <svg {...ico}><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></svg>
      </button>
      <button className="btn ghost !px-3" aria-label="back" onClick={() => go("/gifts")}>
        <svg {...ico}><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></svg>
      </button>
    </div>
  );
}

// Bintang dekorasi. Atur posisi lewat className (mis. "top-6 left-4"), ukuran lewat size.
export function Star({ className = "", size = 28, color = "var(--color-butter)", d = 0 }) {
  return (
    <svg className={`star absolute ${className}`} style={{ "--d": `${d}s` }} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7z" fill={color} stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
