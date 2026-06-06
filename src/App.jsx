import { useState, useEffect, useRef, useCallback } from "react";

/* ─── UNSPLASH IMAGE HELPER ─────────────────────────────────── */
// All images served via Unsplash CDN — publicly accessible, no auth needed.
// Using auto=format for WebP/AVIF delivery + fit=crop for consistent framing.
const img = (id, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/* ─── DATA ─────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Quantum Pro X",
    tag: "TIMEPIECE",
    price: 299,
    was: 449,
    rating: 4.9,
    sold: 2341,
    accent: "#C8FF00",
    img: img("photo-1523275335684-37898b6baf30", 600, 600),
    imgs: [
      img("photo-1523275335684-37898b6baf30"),
      img("photo-1614944848629-3e6d0e62d3e3"),
      img("photo-1548171915-f9a7e97e1e3a"),
      img("photo-1506794778202-cad84cf45f1d"),
    ],
    desc: "Precision-engineered for those who measure time in milliseconds. Sapphire crystal, 50m water resistance, 4-day battery. The watch that refuses to be ordinary.",
    specs: [
      ["Case", "42mm Titanium"],
      ["Crystal", "Sapphire Anti-Reflective"],
      ["Water Resistance", "50m / 5ATM"],
      ["Battery", "4 Days"],
      ["Connectivity", "Bluetooth 5.3"],
      ["Weight", "48g"],
    ],
    reviews: [
      { name: "J. Park", stars: 5, text: "Replaced my $800 watch. No contest." },
      { name: "M. Torres", stars: 5, text: "The titanium finish is immaculate." },
    ],
  },
  {
    id: 2,
    name: "Aurora WL-9",
    tag: "AUDIO",
    price: 189,
    was: 259,
    rating: 4.8,
    sold: 1876,
    accent: "#FF3CAC",
    img: img("photo-1505740420928-5e560c06d30e", 600, 600),
    imgs: [
      img("photo-1505740420928-5e560c06d30e"),
      img("photo-1484704849700-f032a568e944"),
      img("photo-1545127398-14699f92334b"),
      img("photo-1618366712010-f4ae9c647dcb"),
    ],
    desc: "Studio-grade sound in a form factor that moves with you. 40mm custom drivers, active noise cancellation, 32-hour battery. Designed by audio engineers, loved by everyone.",
    specs: [
      ["Drivers", "40mm Custom Dynamic"],
      ["Frequency", "10Hz – 40kHz"],
      ["ANC", "Hybrid 4-mic"],
      ["Battery", "32 Hours"],
      ["Charging", "USB-C Fast Charge"],
      ["Weight", "245g"],
    ],
    reviews: [
      { name: "S. Lin", stars: 5, text: "ANC is black-hole level. Absolute silence." },
      { name: "R. Ahmed", stars: 4, text: "Best headphones I've owned at any price." },
    ],
  },
  {
    id: 3,
    name: "Nebula Watch",
    tag: "WEARABLE",
    price: 549,
    was: 699,
    rating: 4.9,
    sold: 3102,
    accent: "#00FFF0",
    img: img("photo-1546868871-7041f2a55e12", 600, 600),
    imgs: [
      img("photo-1546868871-7041f2a55e12"),
      img("photo-1601593346740-925612772716"),
      img("photo-1508685096489-7aacd43bd3b1"),
      img("photo-1575311373937-040b8e1fd5b6"),
    ],
    desc: "Health, performance, and design unified. ECG, blood oxygen, advanced sleep tracking with AMOLED that reads in direct sunlight. The smartwatch that actually delivers.",
    specs: [
      ["Display", '1.4" AMOLED 454×454'],
      ["Health", "ECG, SpO2, HRV"],
      ["GPS", "Multi-band L1/L5"],
      ["Battery", "7 Days"],
      ["Water Resistance", "100m"],
      ["Weight", "32g (no band)"],
    ],
    reviews: [
      { name: "K. Nakamura", stars: 5, text: "ECG caught my irregular rhythm early. Worth every cent." },
      { name: "L. Chen", stars: 5, text: "Screen clarity in sunlight is unreal." },
    ],
  },
  {
    id: 4,
    name: "Prism Sphere",
    tag: "AUDIO",
    price: 129,
    was: 179,
    rating: 4.7,
    sold: 987,
    accent: "#FF6B35",
    img: img("photo-1608043152269-423dbba4e7e1", 600, 600),
    imgs: [
      img("photo-1608043152269-423dbba4e7e1"),
      img("photo-1545454675-3479a5ebf54f"),
      img("photo-1558618666-fcd25c85cd64"),
      img("photo-1507003211169-0a1dd7228f2d"),
    ],
    desc: "360° room-filling sound from a speaker that fits in your palm. Omnidirectional acoustic chamber, IPX7 waterproof, 18-hour battery. Throw it anywhere — it performs everywhere.",
    specs: [
      ["Output", "30W Omnidirectional"],
      ["Frequency", "50Hz – 20kHz"],
      ["Waterproof", "IPX7"],
      ["Battery", "18 Hours"],
      ["Connectivity", "Bluetooth 5.2 + AUX"],
      ["Weight", "540g"],
    ],
    reviews: [
      { name: "O. Santos", stars: 5, text: "Fills my entire apartment. Neighbors hate it." },
      { name: "T. Kim", stars: 4, text: "Survived a full pool party. Zero issues." },
    ],
  },
  {
    id: 5,
    name: "Stellar X1",
    tag: "COMPUTE",
    price: 1299,
    was: 1599,
    rating: 4.9,
    sold: 4521,
    accent: "#C8FF00",
    img: img("photo-1496181133206-80ce9b88a853", 600, 600),
    imgs: [
      img("photo-1496181133206-80ce9b88a853"),
      img("photo-1517430816045-df4b7de11d1d"),
      img("photo-1525547719571-a2d4ac8945e2"),
      img("photo-1593642632559-0c6d3fc62b89"),
    ],
    desc: "14-inch powerhouse that laughs at your workload. Neural processing engine, 18-hour battery, fanless design. The laptop for people who refuse to wait.",
    specs: [
      ["CPU", "NexCore N9 (12-core)"],
      ["RAM", "32GB LPDDR5X"],
      ["Storage", "1TB NVMe Gen5"],
      ["Display", '14" OLED 120Hz'],
      ["Battery", "18 Hours"],
      ["Weight", "1.2kg"],
    ],
    reviews: [
      { name: "A. Patel", stars: 5, text: "Replaced my desktop setup. Genuinely." },
      { name: "C. Wu", stars: 5, text: "18 hours of battery in real-world use. Not marketing." },
    ],
  },
  {
    id: 6,
    name: "Flux Pods",
    tag: "AUDIO",
    price: 79,
    was: 119,
    rating: 4.6,
    sold: 2210,
    accent: "#FF3CAC",
    img: img("photo-1590658268037-6bf12165a8df", 600, 600),
    imgs: [
      img("photo-1590658268037-6bf12165a8df"),
      img("photo-1572536147248-ac59a8abfa4b"),
      img("photo-1606220945770-b5b6c2c55bf1"),
      img("photo-1608156639585-b3a776adc945"),
    ],
    desc: "Audiophile performance at a price that shouldn't exist. 11mm custom-tuned drivers, 3-mic beamforming, IPX5 sweat resistance. Your ears deserve better. Here it is.",
    specs: [
      ["Drivers", "11mm Custom"],
      ["ANC", "Hybrid Active"],
      ["Battery", "8h + 32h case"],
      ["Water", "IPX5"],
      ["Latency", "<20ms Gaming Mode"],
      ["Weight", "5.4g per bud"],
    ],
    reviews: [
      { name: "E. Reyes", stars: 5, text: "Bass hits like a proper speaker. $79. Insane." },
      { name: "H. Johansson", stars: 4, text: "Fit is perfect. ANC handles the subway completely." },
    ],
  },
  {
    id: 7,
    name: "Apex MK-7",
    tag: "INPUT",
    price: 219,
    was: 299,
    rating: 4.8,
    sold: 1456,
    accent: "#00FFF0",
    img: img("photo-1561112078-7d24e04c3407", 600, 600),
    imgs: [
      img("photo-1561112078-7d24e04c3407"),
      img("photo-1587829741301-dc798b83add3"),
      img("photo-1618384887929-16ec33fab9ef"),
      img("photo-1595044426077-d36d9236d54a"),
    ],
    desc: "Hot-swap switches, gasket-mounted, wireless tri-mode. Built for people who type 8 hours a day and notice everything. The keyboard you'll never want to replace.",
    specs: [
      ["Switches", "Hot-swap (pre-lubed linear)"],
      ["Layout", "TKL / 80%"],
      ["Connection", "Bluetooth / 2.4GHz / USB-C"],
      ["Battery", "4000mAh"],
      ["Build", "Gasket-mounted aluminum"],
      ["Weight", "1.1kg"],
    ],
    reviews: [
      { name: "D. Okonkwo", stars: 5, text: "Gasket mount feel is addictive. Typed this whole review twice just for fun." },
      { name: "F. Moreau", stars: 5, text: "Hot-swap is a game changer. Changed to tactiles in 3 minutes." },
    ],
  },
  {
    id: 8,
    name: "Orbit Tab Pro",
    tag: "COMPUTE",
    price: 449,
    was: 599,
    rating: 4.7,
    sold: 3289,
    accent: "#FFE135",
    img: img("photo-1544244015-0df4b3ffc6b0", 600, 600),
    imgs: [
      img("photo-1544244015-0df4b3ffc6b0"),
      img("photo-1589739900243-4b52cd9b104e"),
      img("photo-1561154464-82e9adf32764"),
      img("photo-1632589558701-34bfb9ede191"),
    ],
    desc: "The tablet that thinks it's a laptop — and proves it. 12.4\" ProMotion display, stylus support, full desktop-class processor. Create, ship, and present from anywhere.",
    specs: [
      ["Display", '12.4" OLED 120Hz ProMotion'],
      ["CPU", "NexCore N7 (8-core)"],
      ["RAM", "12GB"],
      ["Storage", "256GB / 512GB"],
      ["Battery", "12 Hours"],
      ["Weight", "520g"],
    ],
    reviews: [
      { name: "I. Vasquez", stars: 5, text: "Replaced my iPad and my sketchbook." },
      { name: "P. Nguyen", stars: 4, text: "ProMotion scrolling is buttery. Display is stunning." },
    ],
  },
];

const TAGS = ["ALL", "AUDIO", "COMPUTE", "WEARABLE", "TIMEPIECE", "INPUT"];

const REVIEWS = [
  { name: "Yuki T.", loc: "Tokyo", stars: 5, text: "Arrived in 2 days. Build quality is insane — feels like holding the future.", product: "Nebula Watch" },
  { name: "Arjun M.", loc: "Mumbai", stars: 5, text: "The Stellar X1 replaced my entire workstation. Zero regrets.", product: "Stellar X1" },
  { name: "Sofia L.", loc: "Lisbon", stars: 5, text: "Aurora WL-9 sounds like a concert hall. Nothing comes close at this price.", product: "Aurora WL-9" },
];

/* ─── ENV ───────────────────────────────────────────────────── */
// Set VITE_ANTHROPIC_API_KEY in your .env file (local) or Vercel dashboard (production).
// IMPORTANT: This key is exposed to the browser. For production, proxy through a backend.
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? "";

/* ─── HELPERS ───────────────────────────────────────────────── */
function Stars({ n = 5, filled = 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <polygon
            points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5"
            fill={i < filled ? "#FFE135" : "none"}
            stroke="#FFE135"
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </span>
  );
}

/* ─── SCANLINE CANVAS ───────────────────────────────────────── */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let W, H, raf;
    const resize = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 28, ROWS = 18;
    const chars = "01NEXSTORE∑∂∇⊕◈▣▦".split("");
    const grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        ch: chars[Math.floor(Math.random() * chars.length)],
        alpha: Math.random(),
        speed: 0.003 + Math.random() * 0.008,
      }))
    );

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cw = W / COLS, ch = H / ROWS;
      grid.forEach((row) =>
        row.forEach((cell) => {
          cell.alpha += cell.speed;
          if (cell.alpha > 1) {
            cell.alpha = 0;
            cell.ch = chars[Math.floor(Math.random() * chars.length)];
          }
          const a = Math.sin(cell.alpha * Math.PI);
          ctx.fillStyle = `rgba(200,255,0,${a * 0.18})`;
          ctx.font = `${Math.min(cw, ch) * 0.55}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText(cell.ch, (grid[0].indexOf(cell) ?? 0) * cw + cw / 2, 0);
        })
      );
      grid.forEach((row, ri) =>
        row.forEach((cell, ci) => {
          const a = Math.sin(cell.alpha * Math.PI);
          ctx.fillStyle = `rgba(200,255,0,${a * 0.18})`;
          ctx.font = `${Math.min(cw, ch) * 0.55}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText(cell.ch, ci * cw + cw / 2, ri * ch + ch * 0.7);
        })
      );
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ─── TICKER ────────────────────────────────────────────────── */
function Ticker() {
  const items = ["FREE WORLDWIDE SHIPPING", "EST. 2024", "4.9★ RATED BY 50,000+", "30-DAY RETURNS", "AI-POWERED RECS", "256-BIT SECURE"];
  const [x, setX] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setX((p) => p - 1), 20);
    return () => clearInterval(id);
  }, []);
  const w = items.join(" · ").length * 9;
  const offset = ((x % w) + w) % w;
  return (
    <div style={{ background: "#C8FF00", color: "#0A0A0A", height: 36, overflow: "hidden", position: "relative", display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", left: -offset, whiteSpace: "nowrap", fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>
        {[...items, ...items, ...items, ...items].join("   ·   ")}
      </div>
    </div>
  );
}

/* ─── CART DRAWER ───────────────────────────────────────────── */
function Cart({ items, onClose, onQty }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex" }}>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,0.6)" }} />
      <div style={{ width: 400, background: "#0A0A0A", borderLeft: "1px solid #1F1F1F", display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #1F1F1F", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: 3 }}>CART ({items.length})</span>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #333", color: "#888", width: 32, height: 32, cursor: "pointer", fontSize: 16, borderRadius: 0 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80, color: "#444", fontSize: 13, letterSpacing: 2 }}>CART IS EMPTY</div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid #1A1A1A" }}>
                <img src={item.img} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ color: "#C8FF00", fontSize: 14, fontWeight: 800 }}>${item.price}</div>
                  <div style={{ display: "flex", gap: 0, marginTop: 8, alignItems: "center" }}>
                    <button onClick={() => onQty(item.id, -1)} style={{ background: "#1A1A1A", border: "none", color: "#fff", width: 28, height: 28, cursor: "pointer", fontSize: 16 }}>−</button>
                    <span style={{ color: "#fff", fontSize: 12, width: 32, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onQty(item.id, 1)} style={{ background: "#C8FF00", border: "none", color: "#0A0A0A", width: 28, height: 28, cursor: "pointer", fontSize: 16, fontWeight: 800 }}>+</button>
                  </div>
                </div>
                <button onClick={() => onQty(item.id, -item.qty)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 16, alignSelf: "flex-start" }}>✕</button>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: "20px 28px", borderTop: "1px solid #1F1F1F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "#666", fontSize: 11, letterSpacing: 2 }}>SUBTOTAL</span>
            <span style={{ color: "#fff", fontWeight: 800 }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ color: "#666", fontSize: 11, letterSpacing: 2 }}>SHIPPING</span>
            <span style={{ color: "#C8FF00", fontSize: 11, fontWeight: 800 }}>FREE</span>
          </div>
          <input
            placeholder="PROMO CODE"
            style={{ width: "100%", background: "#111", border: "1px solid #2A2A2A", color: "#fff", padding: "11px 14px", fontSize: 11, letterSpacing: 2, marginBottom: 10, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
          />
          <button style={{ width: "100%", background: "#C8FF00", color: "#0A0A0A", border: "none", padding: "16px", fontSize: 12, fontWeight: 800, letterSpacing: 3, cursor: "pointer" }}>
            CHECKOUT — ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── AI CHAT ────────────────────────────────────────────────── */
function AIChat({ onClose }) {
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "Hey — I'm your NexStore AI. Ask me anything about products, shipping, or recommendations." },
  ]);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const bottom = useRef(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!val.trim() || loading) return;
    const q = val.trim();
    setVal("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setLoading(true);

    if (!ANTHROPIC_API_KEY) {
      setMsgs((m) => [...m, { role: "bot", text: "AI chat requires a valid VITE_ANTHROPIC_API_KEY env variable. See README for setup." }]);
      setLoading(false);
      return;
    }

    try {
      const history = msgs
        .filter((_, i) => i > 0)
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-allow-browser": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system:
            "You are a sharp, helpful AI shopping assistant for NexStore — a premium electronics brand. Be concise, confident, occasionally witty. Products: Quantum Pro X watch $299, Aurora WL-9 headphones $189, Nebula Watch $549, Prism Sphere speaker $129, Stellar X1 laptop $1299, Flux Pods earbuds $79, Apex MK-7 keyboard $219, Orbit Tab Pro tablet $449. Free shipping, 30-day returns.",
          messages: [...history, { role: "user", content: q }],
        }),
      });
      const d = await r.json();
      setMsgs((m) => [...m, { role: "bot", text: d.content?.[0]?.text || "Something went wrong." }]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: "Connection error — try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 80, right: 24, width: 340, height: 460, zIndex: 900, background: "#0D0D0D", border: "1px solid #2A2A2A", display: "flex", flexDirection: "column", fontFamily: "inherit", boxShadow: "0 0 0 1px #C8FF0020, 8px 8px 0 #C8FF0015" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1E1E1E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#C8FF00", fontSize: 10, fontWeight: 800, letterSpacing: 3 }}>NEX AI</div>
          <div style={{ color: "#555", fontSize: 10, letterSpacing: 1 }}>● ONLINE</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", padding: "10px 14px", fontSize: 12, lineHeight: 1.6, background: m.role === "user" ? "#C8FF00" : "#161616", color: m.role === "user" ? "#0A0A0A" : "#ccc", fontWeight: m.role === "user" ? 700 : 400 }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ padding: "10px 14px", background: "#161616", color: "#555", fontSize: 11, letterSpacing: 2 }}>THINKING...</div>
        )}
        <div ref={bottom} />
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #1E1E1E" }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..."
          style={{ flex: 1, background: "none", border: "none", color: "#fff", padding: "12px 16px", fontSize: 12, outline: "none", fontFamily: "inherit" }}
        />
        <button onClick={send} style={{ background: "#C8FF00", border: "none", color: "#0A0A0A", width: 48, fontSize: 16, cursor: "pointer", fontWeight: 800 }}>↑</button>
      </div>
    </div>
  );
}

/* ─── PRODUCT MODAL ─────────────────────────────────────────── */
function ProductModal({ p, onClose, onAdd, onWish, wished }) {
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("DESC");
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [qty, setQty] = useState(1);
  const disc = Math.round((1 - p.price / p.was) * 100);

  const handleMouseMove = (e) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" }} />
      <div style={{ position: "relative", background: "#0D0D0D", border: "1px solid #222", width: "min(980px,96vw)", maxHeight: "92vh", overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "inherit", animation: "modalIn 0.25s cubic-bezier(.22,1,.36,1)" }}>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>

        {/* LEFT — gallery */}
        <div style={{ padding: 0, position: "relative", background: "#080808" }}>
          <div
            style={{ position: "relative", aspectRatio: "1", overflow: "hidden", cursor: zoom ? "zoom-out" : "zoom-in" }}
            onClick={() => setZoom((z) => !z)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => zoom && setZoom(false)}
          >
            <img
              src={p.imgs[activeImg]}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: zoom ? "scale(2.2)" : "scale(1)", transition: zoom ? "none" : "transform 0.3s ease", display: "block" }}
            />
            {!zoom && (
              <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#888", fontSize: 9, padding: "4px 9px", letterSpacing: 2, backdropFilter: "blur(4px)" }}>
                CLICK TO ZOOM
              </div>
            )}
            <div style={{ position: "absolute", top: 14, left: 14, background: p.accent, color: "#0A0A0A", padding: "3px 9px", fontSize: 9, fontWeight: 900, letterSpacing: 2, pointerEvents: "none" }}>{p.tag}</div>
            <div style={{ position: "absolute", top: 14, right: 14, background: "#1A1A1A", color: "#C8FF00", border: "1px solid rgba(200,255,0,0.3)", padding: "4px 9px", fontSize: 11, fontWeight: 900, pointerEvents: "none" }}>-{disc}%</div>
          </div>

          <div style={{ display: "flex", gap: 1, background: "#111", padding: 1 }}>
            {p.imgs.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActiveImg(i); setZoom(false); }}
                style={{ flex: 1, aspectRatio: "1", padding: 0, border: "none", outline: i === activeImg ? `2px solid ${p.accent}` : "none", outlineOffset: "-2px", cursor: "pointer", overflow: "hidden", background: "#0D0D0D", position: "relative" }}
              >
                <img src={src.replace("w=800&h=800", "w=200&h=200")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: i === activeImg ? 1 : 0.45, transition: "opacity 0.2s" }} />
              </button>
            ))}
          </div>

          <div style={{ padding: "10px 14px", display: "flex", gap: 6, alignItems: "center" }}>
            {p.imgs.map((_, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? 20 : 6, height: 2, background: i === activeImg ? p.accent : "#333", cursor: "pointer", transition: "all 0.2s" }} />
            ))}
            <span style={{ marginLeft: "auto", color: "#444", fontSize: 10 }}>{activeImg + 1}/{p.imgs.length}</span>
          </div>
        </div>

        {/* RIGHT — info */}
        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "1px solid #2A2A2A", color: "#666", width: 32, height: 32, cursor: "pointer", fontSize: 14, zIndex: 10 }}>✕</button>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#555", fontSize: 9, letterSpacing: 3, marginBottom: 6 }}>{p.tag} · {p.sold.toLocaleString()} SOLD</div>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: -1, lineHeight: 1, marginBottom: 12 }}>{p.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Stars filled={Math.round(p.rating)} />
              <span style={{ color: "#555", fontSize: 11 }}>{p.rating} ({p.sold.toLocaleString()})</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 0", borderTop: "1px solid #1A1A1A", borderBottom: "1px solid #1A1A1A", marginBottom: 20 }}>
            <span style={{ color: "#C8FF00", fontSize: 32, fontWeight: 900 }}>${p.price}</span>
            <span style={{ color: "#333", fontSize: 16, textDecoration: "line-through" }}>${p.was}</span>
            <span style={{ background: "rgba(200,255,0,0.08)", color: "#C8FF00", border: "1px solid rgba(200,255,0,0.2)", padding: "3px 10px", fontSize: 11, fontWeight: 900, marginLeft: "auto" }}>SAVE ${p.was - p.price}</span>
          </div>

          <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid #1A1A1A" }}>
            {["DESC", "SPECS", "REVIEWS"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "9px 16px", background: "none", border: "none", borderBottom: tab === t ? `2px solid ${p.accent}` : "2px solid transparent", color: tab === t ? "#fff" : "#555", fontSize: 9, fontWeight: 900, letterSpacing: 2, cursor: "pointer", fontFamily: "inherit", marginBottom: -1 }}>{t}</button>
            ))}
          </div>

          <div style={{ flex: 1, marginBottom: 20, minHeight: 120 }}>
            {tab === "DESC" && <p style={{ color: "#888", fontSize: 13, lineHeight: 1.8 }}>{p.desc}</p>}
            {tab === "SPECS" && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {p.specs.map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px solid #151515" }}>
                      <td style={{ color: "#555", fontSize: 10, letterSpacing: 1, padding: "8px 0", width: "40%" }}>{k}</td>
                      <td style={{ color: "#ccc", fontSize: 12, padding: "8px 0", fontWeight: 600 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "REVIEWS" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {p.reviews.map((r, i) => (
                  <div key={i} style={{ padding: "14px", background: "#111", border: "1px solid #1A1A1A" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{r.name}</span>
                      <Stars filled={r.stars} />
                    </div>
                    <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6, fontStyle: "italic" }}>"{r.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 10 }}>
              <span style={{ color: "#555", fontSize: 9, letterSpacing: 2, marginRight: 12 }}>QTY</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ background: "#1A1A1A", border: "none", color: "#fff", width: 36, height: 36, cursor: "pointer", fontSize: 18 }}>−</button>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, width: 44, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ background: "#C8FF00", border: "none", color: "#0A0A0A", width: 36, height: 36, cursor: "pointer", fontSize: 18, fontWeight: 900 }}>+</button>
              <span style={{ marginLeft: "auto", color: "#444", fontSize: 11 }}>IN STOCK</span>
            </div>
            <div style={{ display: "flex", gap: 1 }}>
              <button
                onClick={() => { for (let i = 0; i < qty; i++) onAdd(p); onClose(); }}
                style={{ flex: 1, background: "#C8FF00", color: "#0A0A0A", border: "none", padding: "15px", fontSize: 10, fontWeight: 900, letterSpacing: 3, cursor: "pointer" }}
              >ADD TO CART →</button>
              <button
                onClick={() => onWish(p.id)}
                style={{ width: 52, background: wished ? "rgba(255,60,172,0.15)" : "#1A1A1A", border: `1px solid ${wished ? "#FF3CAC" : "#2A2A2A"}`, color: wished ? "#FF3CAC" : "#555", cursor: "pointer", fontSize: 18 }}
              >{wished ? "♥" : "♡"}</button>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
              {["FREE SHIPPING", "30-DAY RETURNS", "2-YEAR WARRANTY"].map((t) => (
                <span key={t} style={{ color: "#444", fontSize: 9, letterSpacing: 1 }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ──────────────────────────────────────────── */
function PCard({ p, onOpen, onAdd, onWish, wished }) {
  const [hov, setHov] = useState(false);
  const disc = Math.round((1 - p.price / p.was) * 100);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(p)}
      style={{ background: "#0D0D0D", border: `1px solid ${hov ? "#333" : "#1A1A1A"}`, cursor: "pointer", transition: "border-color 0.2s", position: "relative" }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1" }}>
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(.25,.46,.45,.94)", transform: hov ? "scale(1.06)" : "scale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: p.accent, color: "#0A0A0A", padding: "3px 9px", fontSize: 9, fontWeight: 900, letterSpacing: 2 }}>{p.tag}</div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onWish(p.id); }}
            style={{ background: wished ? "rgba(255,60,172,0.9)" : "rgba(0,0,0,0.6)", border: "none", color: wished ? "#fff" : "#888", width: 34, height: 34, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
          >{wished ? "♥" : "♡"}</button>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px", opacity: hov ? 1 : 0, transform: `translateY(${hov ? 0 : 8}px)`, transition: "all 0.3s" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(p); }}
            style={{ width: "100%", background: "#C8FF00", color: "#0A0A0A", border: "none", padding: "11px", fontSize: 10, fontWeight: 900, letterSpacing: 3, cursor: "pointer" }}
          >ADD TO CART</button>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ color: "#444", fontSize: 9, letterSpacing: 2, marginBottom: 4 }}>{p.sold.toLocaleString()} SOLD</div>
        <div style={{ color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: -0.3, marginBottom: 6 }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ color: "#C8FF00", fontSize: 18, fontWeight: 900 }}>${p.price}</span>
            <span style={{ color: "#333", fontSize: 12, textDecoration: "line-through" }}>${p.was}</span>
          </div>
          <span style={{ background: "rgba(200,255,0,0.1)", color: "#C8FF00", border: "1px solid rgba(200,255,0,0.2)", padding: "2px 7px", fontSize: 10, fontWeight: 800 }}>-{disc}%</span>
        </div>
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
          <Stars filled={Math.round(p.rating)} />
          <span style={{ color: "#555", fontSize: 10 }}>{p.rating}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── COUNTDOWN ─────────────────────────────────────────────── */
function Countdown() {
  const [t, setT] = useState({ h: 5, m: 47, s: 33 });
  useEffect(() => {
    const id = setInterval(() => setT((p) => {
      let { h, m, s } = p;
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; m = 59; s = 59; }
      return { h, m, s };
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {[pad(t.h), pad(t.m), pad(t.s)].map((v, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ background: "#C8FF00", color: "#0A0A0A", padding: "8px 12px", fontSize: 22, fontWeight: 900, fontFamily: "monospace", letterSpacing: 1, minWidth: 56, textAlign: "center", display: "inline-block" }}>{v}</span>
          {i < 2 && <span style={{ color: "#C8FF00", fontSize: 20, fontWeight: 900 }}>:</span>}
        </span>
      ))}
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("ALL");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
    setConfetti(
      Array.from({ length: 24 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        c: ["#C8FF00", "#FF3CAC", "#00FFF0", "#FFE135", "#fff"][i % 5],
        delay: Math.random() * 0.4,
      }))
    );
    setTimeout(() => setConfetti([]), 2000);
  };

  const addCart = useCallback((p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      return ex ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { ...p, qty: 1 }];
    });
    notify(`${p.name} added`);
  }, []);

  const updateQty = useCallback((id, d) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  }, []);

  const toggleWish = useCallback((id) => {
    setWish((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const filtered = PRODUCTS.filter(
    (p) => (activeTag === "ALL" || p.tag === activeTag) && (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'Helvetica Neue', 'Arial Black', sans-serif", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#080808;}::-webkit-scrollbar-thumb{background:#C8FF00;}
        ::selection{background:#C8FF00;color:#0A0A0A;}
        @keyframes cfetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .mono{font-family:'Space Mono',monospace!important;}
        input::placeholder{color:#333;letter-spacing:1px;}
        button{font-family:inherit;}
      `}</style>

      {confetti.map((p) => (
        <div key={p.id} style={{ position: "fixed", top: 0, left: `${p.x}%`, width: 6, height: 6, background: p.c, zIndex: 9999, pointerEvents: "none", animation: `cfetti 2s ${p.delay}s ease forwards` }} />
      ))}

      {toast && (
        <div style={{ position: "fixed", top: 72, right: 20, zIndex: 950, background: "#C8FF00", color: "#0A0A0A", padding: "10px 20px", fontSize: 11, fontWeight: 900, letterSpacing: 2, animation: "slideUp 0.2s ease" }}>
          {toast.toUpperCase()}
        </div>
      )}

      <Ticker />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 800, height: 60, background: scrolled ? "rgba(8,8,8,0.98)" : "rgba(8,8,8,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1A1A1A", display: "flex", alignItems: "center", padding: "0 32px", gap: 24 }}>
        <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -1, whiteSpace: "nowrap" }}>
          NEX<span style={{ color: "#C8FF00" }}>_</span>STORE
        </div>
        <div style={{ flex: 1, maxWidth: 360, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 12 }}>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH PRODUCTS..."
            style={{ width: "100%", background: "#111", border: "1px solid #222", color: "#fff", padding: "8px 12px 8px 32px", fontSize: 10, letterSpacing: 2, outline: "none", fontFamily: "'Space Mono',monospace" }}
          />
        </div>
        <div style={{ flex: 1 }} />
        {["AUDIO", "COMPUTE", "WEARABLE"].map((t) => (
          <button key={t} onClick={() => { setActiveTag(t); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ background: "none", border: "none", color: activeTag === t ? "#C8FF00" : "#555", fontSize: 10, fontWeight: 700, letterSpacing: 2, cursor: "pointer", fontFamily: "'Space Mono',monospace", transition: "color 0.2s" }}>{t}</button>
        ))}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setWish([])} style={{ background: "none", border: "none", color: "#555", fontSize: 16, cursor: "pointer", position: "relative" }}>
            ♡
            {wish.length > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#FF3CAC", borderRadius: "50%", width: 14, height: 14, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>{wish.length}</span>}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: cartCount > 0 ? "#C8FF00" : "none", border: `1px solid ${cartCount > 0 ? "#C8FF00" : "#333"}`, color: cartCount > 0 ? "#0A0A0A" : "#888", padding: "7px 16px", fontSize: 10, fontWeight: 900, letterSpacing: 2, cursor: "pointer", transition: "all 0.2s" }}
          >CART {cartCount > 0 && `(${cartCount})`}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "92vh", minHeight: 560, display: "flex", alignItems: "center", overflow: "hidden", borderBottom: "1px solid #1A1A1A" }}>
        <HeroCanvas />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,8,8,0.92) 40%,rgba(8,8,8,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 48px", maxWidth: 960 }}>
          <div className="mono" style={{ fontSize: 10, color: "#C8FF00", letterSpacing: 4, marginBottom: 20, animation: "slideUp 0.5s ease" }}>◈ NEW COLLECTION 2026</div>
          <h1 style={{ fontSize: "clamp(52px,9vw,120px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-4px", marginBottom: 32, animation: "slideUp 0.5s 0.1s ease both" }}>
            <span style={{ display: "block", color: "#fff" }}>GEAR</span>
            <span style={{ display: "block", color: "#fff" }}>BUILT</span>
            <span style={{ display: "block", color: "#C8FF00" }}>DIFFERENT.</span>
          </h1>
          <p style={{ color: "#666", fontSize: 15, maxWidth: 440, lineHeight: 1.7, marginBottom: 40, animation: "slideUp 0.5s 0.2s ease both" }}>
            No compromises. No fluff. Just hardware that makes everything else feel obsolete.
          </p>
          <div style={{ display: "flex", gap: 12, animation: "slideUp 0.5s 0.3s ease both", flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#C8FF00", color: "#0A0A0A", border: "none", padding: "16px 40px", fontSize: 11, fontWeight: 900, letterSpacing: 3, cursor: "pointer" }}>
              SHOP NOW →
            </button>
            <button onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", color: "#fff", border: "1px solid #333", padding: "16px 40px", fontSize: 11, fontWeight: 900, letterSpacing: 3, cursor: "pointer" }}>
              COLLECTIONS
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={img("photo-1523275335684-37898b6baf30", 800, 900)} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, filter: "grayscale(30%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#080808 0%,transparent 40%)" }} />
        </div>
        <div style={{ position: "absolute", bottom: 60, left: 48, display: "flex", gap: 40, zIndex: 1 }}>
          {[["50K+", "CUSTOMERS"], ["4.9", "RATING"], ["2 DAY", "SHIPPING"]].map(([v, l]) => (
            <div key={l}>
              <div className="mono" style={{ color: "#C8FF00", fontSize: 20, fontWeight: 700 }}>{v}</div>
              <div className="mono" style={{ color: "#444", fontSize: 9, letterSpacing: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ borderBottom: "1px solid #1A1A1A", padding: "0 32px", display: "flex", overflowX: "auto" }}>
        {[["◎", "FREE SHIPPING", "On every order"], ["⊕", "EASY RETURNS", "30 days, no questions"], ["▣", "SECURE PAY", "256-bit encrypted"], ["◈", "AI CURATED", "Smart recommendations"], ["▦", "TOP RATED", "50,000+ reviews"]].map(([icon, title, sub]) => (
          <div key={title} style={{ flex: "0 0 auto", padding: "20px 28px", borderRight: "1px solid #1A1A1A", display: "flex", alignItems: "center", gap: 12, minWidth: 200 }}>
            <span className="mono" style={{ color: "#C8FF00", fontSize: 18 }}>{icon}</span>
            <div>
              <div className="mono" style={{ color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>{title}</div>
              <div style={{ color: "#444", fontSize: 11, marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FLASH SALE */}
      <section style={{ background: "#C8FF00", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div className="mono" style={{ color: "#0A0A0A", fontSize: 9, fontWeight: 700, letterSpacing: 4, marginBottom: 6 }}>⚡ FLASH SALE — ENDING IN</div>
          <Countdown />
        </div>
        <div>
          <div style={{ color: "#0A0A0A", fontSize: "clamp(24px,4vw,48px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>UP TO 40% OFF</div>
          <div style={{ color: "rgba(0,0,0,0.5)", fontSize: 13, marginTop: 4 }}>Selected items · No code needed</div>
        </div>
        <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "#0A0A0A", color: "#C8FF00", border: "none", padding: "16px 36px", fontSize: 10, fontWeight: 900, letterSpacing: 3, cursor: "pointer" }}>
          SHOP THE SALE →
        </button>
      </section>

      {/* PRODUCTS */}
      <section id="shop" style={{ padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="mono" style={{ color: "#C8FF00", fontSize: 9, letterSpacing: 4, marginBottom: 8 }}>◈ CATALOG</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>ALL PRODUCTS</h2>
          </div>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {TAGS.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)}
                style={{ padding: "9px 18px", background: activeTag === t ? "#C8FF00" : "none", border: "1px solid", borderColor: activeTag === t ? "#C8FF00" : "#222", color: activeTag === t ? "#0A0A0A" : "#555", fontSize: 9, fontWeight: 900, letterSpacing: 2, cursor: "pointer", fontFamily: "'Space Mono',monospace", transition: "all 0.15s", marginLeft: -1 }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 1, background: "#1A1A1A" }}>
          {filtered.map((p) => (
            <div key={p.id} style={{ background: "#080808" }}>
              <PCard p={p} onOpen={setModal} onAdd={addCart} onWish={toggleWish} wished={wish.includes(p.id)} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mono" style={{ textAlign: "center", padding: "80px", color: "#333", fontSize: 13, letterSpacing: 2 }}>
            NO RESULTS FOR "{search}"
          </div>
        )}
      </section>

      {/* FEATURED COLLECTIONS */}
      <section id="collections" style={{ padding: "80px 32px", background: "#050505", borderTop: "1px solid #1A1A1A" }}>
        <div className="mono" style={{ color: "#C8FF00", fontSize: 9, letterSpacing: 4, marginBottom: 8 }}>▣ COLLECTIONS</div>
        <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, letterSpacing: -2, marginBottom: 40 }}>FEATURED DROPS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 1, background: "#1A1A1A" }}>
          {[
            { title: "AUDIO SERIES", sub: "32 products", img: img("photo-1558618666-fcd25c85cd64", 700, 500), tag: "AUDIO", color: "#FF3CAC" },
            { title: "SMART WEAR", sub: "18 products", img: img("photo-1434493789847-2f02dc6ca35d", 700, 500), tag: "WEARABLE", color: "#00FFF0" },
            { title: "PRO COMPUTE", sub: "24 products", img: img("photo-1498049794561-7780e7231661", 700, 500), tag: "COMPUTE", color: "#C8FF00" },
          ].map((col) => (
            <div
              key={col.title}
              onClick={() => { setActiveTag(col.tag); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ position: "relative", aspectRatio: "4/3", cursor: "pointer", background: "#0D0D0D", overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".cta").style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".cta").style.opacity = "0"; }}
            >
              <img src={col.img} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)", transition: "transform 0.5s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                <div style={{ color: col.color, fontSize: 9, fontWeight: 900, letterSpacing: 3, marginBottom: 4, fontFamily: "'Space Mono',monospace" }}>{col.sub}</div>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, letterSpacing: -1, marginBottom: 12 }}>{col.title}</div>
                <div className="cta" style={{ color: col.color, fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0, transition: "opacity 0.2s", fontFamily: "'Space Mono',monospace" }}>EXPLORE →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 32px", borderTop: "1px solid #1A1A1A" }}>
        <div className="mono" style={{ color: "#C8FF00", fontSize: 9, letterSpacing: 4, marginBottom: 8 }}>▦ REVIEWS</div>
        <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, letterSpacing: -2, marginBottom: 40 }}>REAL PEOPLE.<br />REAL RESULTS.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 1, background: "#1A1A1A" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "#0D0D0D", padding: 32, transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0D0D0D")}>
              <Stars filled={r.stars} />
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: "16px 0 20px", fontStyle: "italic" }}>"{r.text}"</p>
              <div className="mono" style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{r.name}</div>
              <div className="mono" style={{ color: "#444", fontSize: 9, letterSpacing: 2, marginTop: 2 }}>{r.loc} · {r.product}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section style={{ borderTop: "1px solid #1A1A1A", padding: "40px 48px", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
        <span className="mono" style={{ color: "#333", fontSize: 9, letterSpacing: 3, whiteSpace: "nowrap" }}>TRUSTED BY</span>
        {["SONY", "APPLE", "SAMSUNG", "BOSE", "LG", "DELL"].map((b) => (
          <span key={b} className="mono" style={{ color: "#222", fontSize: 16, fontWeight: 700, letterSpacing: 3, transition: "color 0.2s", cursor: "default" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C8FF00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#222")}>{b}</span>
        ))}
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: "#111", borderTop: "1px solid #1A1A1A", borderBottom: "1px solid #1A1A1A", padding: "80px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div>
          <div className="mono" style={{ color: "#C8FF00", fontSize: 9, letterSpacing: 4, marginBottom: 12 }}>◎ NEWSLETTER</div>
          <h2 style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>STAY<br /><span style={{ color: "#C8FF00" }}>AHEAD.</span></h2>
          <p style={{ color: "#555", fontSize: 13, marginTop: 16, maxWidth: 300 }}>New drops. Exclusive deals. AI-curated recommendations. Your inbox, leveled up.</p>
        </div>
        <div style={{ display: "flex", gap: 0, maxWidth: 480, width: "100%" }}>
          <input type="email" placeholder="YOUR EMAIL ADDRESS" style={{ flex: 1, background: "#0A0A0A", border: "1px solid #2A2A2A", borderRight: "none", color: "#fff", padding: "16px 20px", fontSize: 10, letterSpacing: 2, outline: "none", fontFamily: "'Space Mono',monospace", minWidth: 0 }} />
          <button style={{ background: "#C8FF00", color: "#0A0A0A", border: "none", padding: "16px 28px", fontSize: 10, fontWeight: 900, letterSpacing: 2, cursor: "pointer", whiteSpace: "nowrap" }}>SUBSCRIBE →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "60px 48px 32px", borderTop: "1px solid #111" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: -1 }}>NEX<span style={{ color: "#C8FF00" }}>_</span>STORE</div>
            <p style={{ color: "#444", fontSize: 12, lineHeight: 1.8, maxWidth: 280 }}>Premium tech. No compromises. Built for people who know the difference between good and extraordinary.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["X", "IN", "IG", "YT"].map((s) => (
                <button key={s} className="mono" style={{ background: "none", border: "1px solid #222", color: "#444", width: 34, height: 34, cursor: "pointer", fontSize: 10, letterSpacing: 1, transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8FF00"; e.currentTarget.style.color = "#C8FF00"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#444"; }}>{s}</button>
              ))}
            </div>
          </div>
          {[
            { title: "SHOP", links: ["All Products", "Audio", "Wearables", "Compute", "Flash Sale"] },
            { title: "SUPPORT", links: ["Help Center", "Track Order", "Returns", "Contact"] },
            { title: "COMPANY", links: ["About", "Careers", "Press", "Legal"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="mono" style={{ color: "#C8FF00", fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>{col.title}</div>
              {col.links.map((l) => (
                <div key={l} style={{ color: "#444", fontSize: 12, marginBottom: 10, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #151515", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="mono" style={{ color: "#333", fontSize: 9, letterSpacing: 2 }}>© 2026 NEXSTORE. ALL RIGHTS RESERVED.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["PRIVACY", "TERMS", "COOKIES"].map((l) => (
              <span key={l} className="mono" style={{ color: "#333", fontSize: 8, letterSpacing: 2, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8FF00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* AI CHAT BUTTON */}
      <button
        onClick={() => setChatOpen((c) => !c)}
        style={{ position: "fixed", bottom: 20, right: 20, width: 52, height: 52, background: chatOpen ? "#333" : "#C8FF00", border: "none", color: chatOpen ? "#fff" : "#0A0A0A", fontSize: 20, cursor: "pointer", zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, transition: "background 0.2s, transform 0.15s", boxShadow: "4px 4px 0 rgba(200,255,0,0.2)" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >{chatOpen ? "✕" : "◈"}</button>

      {chatOpen && <AIChat onClose={() => setChatOpen(false)} />}
      {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onQty={updateQty} />}
      {modal && <ProductModal p={modal} onClose={() => setModal(null)} onAdd={addCart} onWish={toggleWish} wished={wish.includes(modal.id)} />}
    </div>
  );
}
