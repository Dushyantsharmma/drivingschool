import { useMemo, useState } from "react";

/* ---------- IMAGE SOURCE (AUTO + MANUAL SAFE MIX) ---------- */
const images = [
  // Cars
  ...Array.from({ length: 6 }, (_, i) => `/gallery/car-${String(i + 1).padStart(2, "0")}.webp`),
  "/gallery/Car-07.webp",
  "/gallery/Car-08.webp",
  "/gallery/Car-09.webp",

  // Classroom
  "/gallery/Classroom-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1-.webp",
  "/gallery/Classroom-Raj-Ann-Raj-Bhanthal-Karsog-Mandi2.webp",
  "/gallery/Classroom-Raj-Ann-Raj-Bhanthal-Karsog-Mandi3.webp",
  "/gallery/Classroom-Raj-Ann-Raj-Bhanthal-Karsog-Mandi4.webp",
  "/gallery/Classroom-Raj-Ann-Raj-Bhanthal-Karsog-Mandi5.webp",

  // Road Test
  "/gallery/Roadtest-Raj-Ann-Raj-Bhanthal-Karsog-Mandi1.webp",
  "/gallery/Roadtest-Raj-Ann-Raj-Bhanthal-Karsog-Mandi2.webp",

  // Training
  ...Array.from({ length: 24 }, (_, i) =>
    `/gallery/training-${String(i + 1).padStart(3, "0")}.webp`
  ),
];

/* ---------- CATEGORY + CAPTION LOGIC ---------- */
const metaFromName = (src) => {
  const name = src.toLowerCase();

  if (name.includes("car"))
    return { category: "Cars", caption: "Training Vehicles • Raj Ann Raj Driving School" };

  if (name.includes("classroom"))
    return { category: "Classroom", caption: "Modern Classroom • Karsog, Himachal Pradesh" };

  if (name.includes("roadtest"))
    return { category: "Road Test", caption: "On-Road Training • Himachal Hill Roads" };

  if (name.includes("training"))
    return { category: "Training", caption: "Practical Driving Training • HP Roads" };

  return { category: "Other", caption: "Driving School Gallery" };
};

/* ---------- COMPONENT ---------- */
const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const processed = useMemo(() => {
    return images.map((src) => ({
      src,
      ...metaFromName(src),
    }));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(processed.map((i) => i.category))],
    [processed]
  );

  const filtered =
    active === "All"
      ? processed
      : processed.filter((i) => i.category === active);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-3xl font-bold text-slate-800 text-center sm:text-left">
          Driving School <span className="block sm:inline text-amber-500 ml-0 sm:ml-2">Gallery</span>
        </h2>
        <p className="text-slate-500 mt-2">
          Professional Training • Himachal Roads • Modern Infrastructure
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                active === cat
                  ? "bg-green-700 text-white"
                  : "bg-slate-200 hover:bg-slate-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MASONRY GRID (PERFORMANCE SAFE) */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <div
            key={i}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setLightbox(img)}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={img.src}
                loading="lazy"
                alt={img.caption}
                className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>

            {/* CAPTION */}
            <p className="text-xs text-slate-600 mt-2 px-1">
              {img.caption}
            </p>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={lightbox.src}
              alt=""
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-center text-sm text-slate-300 mt-3">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
