import { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SEO from "../SEO";

const CATEGORY_ORDER = ["Training", "Classroom", "Road Test", "Other"];

const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("Training");

  const detectCategoryFromFilename = (filename) => {
    const f = filename.toLowerCase();
    if (f.includes("classroom")) return "Classroom";
    if (f.includes("roadtest") || f.includes("road-test")) return "Road Test";
    if (f.includes("training-")) return "Training";
    return "Other";
  };

  const formatTitle = (filename, category) => {
    if (category === "Training") return "Practical Hill Driving";
    if (category === "Classroom") return "Traffic Rules Session";
    if (category === "Road Test") return "RTO Test Practice";

    const base = filename.replace(/\.[^.]+$/, "");
    const cleaned = base
      .replace(/raj[-_ ]?ann[-_ ]?raj|driving|training|school|mandi|karsog/gi, "")
      .replace(/[_-]+/g, " ")
      .trim();
    return cleaned ? cleaned.split(" ").slice(0, 3).join(" ") : "Gallery Moment";
  };

  const getLocation = (category) => {
    if (category === "Training") return "Karsog, Himachal Pradesh";
    if (category === "Classroom") return "Training Center";
    if (category === "Road Test") return "Mandi RTO Track";
    return "Himachal Pradesh";
  };

  const allImages = useMemo(() => {
    const modules = import.meta.glob(
      "/gallery/**/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, query: '?url', import: 'default' }
    );

    return Object.entries(modules)
      .map(([path, url]) => {
        const filename = (path.split("/").pop() || "").trim();
        const category = detectCategoryFromFilename(filename);
        const title = formatTitle(filename, category);
        const location = getLocation(category);
        const alt = `Raj Ann Raj Driving School - ${category} - ${title}`;

        // Handle images relative to base path
        const safeUrl = (typeof url === 'string' && url.startsWith('/') && !url.startsWith(import.meta.env.BASE_URL))
           ? `${import.meta.env.BASE_URL}${url.substring(1)}`
           : url;

        return { src: safeUrl, title, category, location, alt, filename };
      })
      .sort((a, b) => a.filename.localeCompare(b.filename));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allImages.map(img => img.category));
    return CATEGORY_ORDER.filter(c => cats.has(c));
  }, [allImages]);

  const filteredImages = useMemo(() => {
    return allImages.filter(img => img.category === activeCategory);
  }, [allImages, activeCategory]);

  // Prepare slides for lightbox (only current category)
  const slides = filteredImages.map(img => ({ src: img.src, alt: img.alt, title: img.title }));

  return (
    <section id="gallery" className="bg-slate-50 pt-28 pb-16 min-h-screen">
      <SEO
        title="Gallery | Raj Ann Raj Driving Training School Photos"
        description="See our students mastering hill driving in Himachal Pradesh. Real training photos from Karsog and Mandi."
      />

      {/* 1. HEADER */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
          Gallery
        </span>

        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
          Moments in Motion
        </h1>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Real students. Real training. Real hill roads of Himachal Pradesh.
        </p>
      </div>

      {/* 2. STICKY TABS */}
      <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 mb-10">
        <div className="max-w-6xl mx-auto px-6 flex gap-4 py-4 overflow-x-auto no-scrollbar justify-start md:justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeCategory === cat 
                  ? "bg-amber-500 text-black shadow-md scale-105" 
                  : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MASONRY GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredImages.map((img, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={img.src}
              className="relative group overflow-hidden rounded-2xl shadow-sm bg-white cursor-pointer break-inside-avoid"
              onClick={() => setIndex(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-lg leading-tight mb-1">
                    {img.title}
                  </p>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-medium uppercase tracking-wide">
                    <MapPin size={12} />
                    {img.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No images found in this category.
          </div>
        )}
      </div>

      {/* 4. FOOTER CONTEXT */}
      <p className="text-center text-sm text-slate-500 mt-20 px-6">
        Training conducted on real hill roads across Karsog & Mandi.
      </p>

      {/* 5. CTA */}
      <div className="text-center mt-10 mb-10 px-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Ready to start your driving journey?
        </h3>

        <a
          href="https://wa.me/919882034930"
          className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-black rounded-lg font-bold hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
        >
          Enquire on WhatsApp
        </a>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
};

export default Gallery;
