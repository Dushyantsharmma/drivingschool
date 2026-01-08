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
      [
        "/gallery/**/*.{jpg,jpeg,png,webp,svg}",
        "../../../public/gallery/**/*.{jpg,jpeg,png,webp,svg}"
      ],
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
    // Ensure we only show categories that actually exist in the images
    // If "Training" exists, it shows first due to CATEGORY_ORDER
    const ordered = CATEGORY_ORDER.filter(c => cats.has(c));
    // Add any remaining categories not in the predefined order
    cats.forEach(c => { if (!CATEGORY_ORDER.includes(c)) ordered.push(c); });
    
    return ordered;
  }, [allImages]);

  // Ensure active category is valid, fallback to first available if needed
  useMemo(() => {
      if (categories.length > 0 && !categories.includes(activeCategory)) {
          setActiveCategory(categories[0]);
      }
  }, [categories, activeCategory]);


  const filteredImages = useMemo(() => {
    return allImages.filter(img => img.category === activeCategory);
  }, [allImages, activeCategory]);

  // Prepare slides for lightbox (only current category)
  const slides = filteredImages.map(img => ({ src: img.src, alt: img.alt, title: img.title }));

  return (
    <section id="gallery" className="pt-24 pb-16 min-h-screen bg-slate-50">
      <SEO
        title="Gallery | Raj Ann Raj Driving Training School Photos"
        description="See our students mastering hill driving in Himachal Pradesh. Real training photos from Karsog and Mandi."
      />

      {/* 1. HEADER + FILTERS (Responsive) */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Driving School <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Gallery</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Professional Training • Himachal Roads • Modern Infrastructure
        </p>

        {/* Categories Scrollable Container for Mobile */}
        <div className="mt-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide flex justify-start md:justify-center">
            <div className="flex gap-2 min-w-max">
                {/* 'All' button logic would be slightly different, keeping strictly to categories for simplicity unless you implement 'All' view logic */}
                {/* <button 
                    onClick={() => setActiveCategory('All')} 
                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${activeCategory === 'All' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                    All
                </button> */}

                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap
                        ${activeCategory === cat 
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105 transform' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* 3. MASONRY GRID */}
      <div className="container mx-auto px-4 sm:px-6">
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
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-white cursor-pointer break-inside-avoid transform transition-all duration-300 hover:-translate-y-1"
              onClick={() => setIndex(i)}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-none">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
              </div>

              {/* Hover Overlay - Always visible title on mobile touch could be an option, but hover is standard */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-lg leading-tight mb-1">
                    {img.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wide">
                    <MapPin size={12} strokeWidth={3} />
                    {img.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-lg">No photos found in the <span className="font-bold text-slate-600">{activeCategory}</span> category yet.</p>
          </div>
        )}
      </div>

      {/* 4. FOOTER CONTEXT */}
      <div className="max-w-2xl mx-auto text-center mt-20 px-6">
          <p className="text-sm md:text-base text-slate-500 leading-relaxed bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-slate-100">
            📸 Training conducted on real hill roads across Karsog & Mandi.
          </p>
      </div>

      {/* 5. CTA */}
      <div className="text-center mt-8 mb-10 px-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          Ready to start your driving journey?
        </h3>

        <a
          href="https://wa.me/919882034930"
          className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5"
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