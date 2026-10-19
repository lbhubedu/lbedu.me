import { useEffect, useId, useRef } from "react";
import { Brand } from "./Brand";

export function Laptop3D({ size = 340 }: { size?: number }) {
  const w = size, h = size * 0.64;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: PointerEvent) => {
      if (el.closest('[data-motion="paused"]')) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className="scene" aria-hidden="true" style={{ width: w, height: h * 1.6 }}>
      <div ref={ref} style={{ transformStyle: "preserve-3d", transition: "transform .6s ease-out", width: "100%", height: "100%" }}>
        <div className="laptop relative" style={{ width: w, height: h * 1.6 }}>
          {/* base */}
          <div className="absolute left-0 rounded-md" style={{ width: w, height: h, bottom: 0, transform: `translateY(${h / 2}px) rotateX(90deg)`, background: "linear-gradient(135deg,#3a3a40,#1f1f23)", boxShadow: "0 0 80px rgba(190,242,100,.25)" }}>
            <div className="absolute inset-x-6 top-5 grid grid-cols-12 gap-1" style={{ height: h * 0.45 }}>
              {Array.from({ length: 48 }).map((_, i) => <div key={i} className="rounded-[2px] bg-black/50" />)}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 rounded bg-black/40" style={{ width: w * 0.3, height: h * 0.25 }} />
          </div>
          {/* lid */}
          <div className="lid absolute left-0" style={{ width: w, height: h, bottom: h / 2 }}>
            <div className="absolute inset-0 rounded-lg p-2" style={{ background: "#26262b", border: "1px solid #444" }}>
              <div className="relative h-full w-full overflow-hidden rounded bg-ink">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(190,242,100,.35),transparent_55%)]" />
                <div className="relative p-3 font-mono text-[9px] leading-relaxed text-lime">
                  <div className="text-cyan">● pronto para uso</div>
                  <div className="mt-1 text-paper/80">&gt; olá, mundo novo</div>
                  <div className="typing mt-2 h-1.5 rounded bg-lime/70" />
                  <div className="mt-1.5 h-1.5 w-2/3 rounded bg-paper/20" />
                  <div className="mt-1.5 h-1.5 w-1/2 rounded bg-cyan/40" />
                  <div className="mt-3" style={{ fontSize: w * 0.09 }}><Brand /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Orbit({ className = "" }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1"><stop offset="0" stopColor="#bef264" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
      </defs>
      {[0, 60, 120].map((r) => (
        <g key={r} style={{ transformOrigin: "200px 200px", transform: `rotate(${r}deg)` }}>
          <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke={`url(#${gradientId})`} strokeOpacity=".5" />
          <circle className="orbit-particle" r="5" fill="#bef264" style={{ animationDuration: `${8 + r / 20}s`, animationDelay: `${-r / 20}s` }} />
        </g>
      ))}
      <circle cx="200" cy="200" r="26" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
