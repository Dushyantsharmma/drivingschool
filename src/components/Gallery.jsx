import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpandArrowsAlt,
  FaHandPointer,
  FaTimes,
} from "react-icons/fa";
import SEO from "./SEO";

const CATEGORY_ORDER = ["Training", "Classroom", "Road Test", "Other"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);

  const detectCategoryFromFilename = (filename) => {
    const f = filename.toLowerCase();
    if (f.includes("classroom")) return "Classroom";
    if (f.includes("roadtest") || f.includes("road-test")) return "Road Test";
    if (f.includes("training-")) return "Training";
    return "Other";
  };

  const formatTitle = (filename, category) => {
    if (category === "Training") return "Training Session";
    if (category === "Classroom") return "Classroom";
    if (category === "Road Test") return "Road Test";

    const base = filename.replace(/\.[^.]+$/, "");
    const cleaned = base
      .replace(/raj[-_ ]?ann[-_ ]?raj|driving|training|school|mandi|karsog/gi, "")
      .replace(/[_-]+/g, " ")
      .trim();
    return cleaned ? cleaned.split(" ").slice(0, 3).join(" ") : "Gallery";
  };

  const allImages = useMemo(() => {
    const modules = import.meta.glob(
      "../../public/gallery/**/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    );

    return Object.entries(modules)
      .map(([path, url]) => {
        const filename = (path.split("/").pop() || "").trim();
        const category = detectCategoryFromFilename(filename);
        const title = formatTitle(filename, category);
        const alt = `Raj Ann Raj Driving School - ${category} - ${title}`;
        return { src: url, title, category, alt, filename };
      })
      .sort((a, b) => a.filename.localeCompare(b.filename));
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const img of allImages) {
      const key = img.category;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(img);
    }

    const keys = Array.from(map.keys()).sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return keys.map((key) => ({ key, images: map.get(key) }));
  }, [allImages]);

  useEffect(() => {
    // Keep background scroll locked while lightbox is open.
    document.body.style.overflow = selectedImage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const openLightbox = (categoryKey, image) => {
    const list = grouped.find((g) => g.key === categoryKey)?.images || [];
    const trueIndex = list.findIndex((img) => img.src === image.src);
    setSelectedCategoryKey(categoryKey);
    setSelectedImage(image);
    setSelectedIndex(trueIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedCategoryKey(null);
  };

  const navigateImage = (direction) => {
    const list = grouped.find((g) => g.key === selectedCategoryKey)?.images || [];
    if (list.length === 0) return;

    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % list.length
        : (selectedIndex - 1 + list.length) % list.length;

    setSelectedIndex(newIndex);
    setSelectedImage(list[newIndex]);
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
      <SEO
        title="Gallery | Raj Ann Raj Driving Training School Photos in Mandi"
        description="View photos of Raj Ann Raj Driving Training School: training vehicles, students in action, classroom facilities, and on-road training in Mandi & Karsog, Himachal Pradesh."
        keywords="driving school gallery, training vehicle photos, driving class images, student success stories, Mandi driving training"
        canonical="https://rajannrajdrivingschool.com/#gallery"
      />
      <p className="sr-only">
        Photo gallery of Raj Ann Raj Driving Training School showing training vehicles, students, and classes in Mandi and Karsog, Himachal Pradesh.
      </p>
      <div className="container-max px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-gold font-bold tracking-widest uppercase text-xs mb-2 block"
                >
                    Interactive Gallery
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-extrabold text-navy"
                >
                    Moments in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Motion</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg mt-3 font-medium"
                >
                    Pushp Raj has taught <span className="text-gold font-bold">5000+ students</span> how to drive safely
                </motion.p>
            </motion.div>

            {/* UX: Drag Hint */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-medium"
            >
                <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <FaHandPointer /> 
                </motion.div>
                <span>Drag to explore</span>
            </motion.div>
        </div>

        {/* --- CATEGORIZED HORIZONTAL ROWS --- */}
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.key} className="relative">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-navy">
                  {group.key}
                </h3>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-16 pointer-events-none bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-16 pointer-events-none bg-gradient-to-l from-white to-transparent z-10" />

                <div className="overflow-x-auto overflow-y-hidden -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="flex gap-6 pb-8 pt-2">
                    {group.images.map((image, idx) => (
                      <motion.div
                        key={image.src}
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, delay: idx * 0.01 }}
                        className="relative min-w-[260px] h-[360px] md:min-w-[360px] md:h-[460px] rounded-3xl overflow-hidden bg-white shadow-xl group select-none"
                        onClick={() => openLightbox(group.key, image)}
                        whileHover={{ y: -12, transition: { duration: 0.25 } }}
                      >
                        <motion.img
                          src={image.src}
                          alt={image.alt}
                          title={image.alt}
                          loading="lazy"
                          width="800"
                          height="600"
                          className="w-full h-full object-cover pointer-events-none"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/15 backdrop-blur-md border border-white/30 p-4 rounded-full text-white shadow-2xl">
                            <FaExpandArrowsAlt size={22} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* --- LIGHTBOX --- */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50">
                <FaTimes size={32} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }} className="absolute left-4 p-4 bg-white/10 hover:bg-gold text-white rounded-full transition-all z-50"><FaChevronLeft size={24} /></button>
              <button onClick={(e) => { e.stopPropagation(); navigateImage('next'); }} className="absolute right-4 p-4 bg-white/10 hover:bg-gold text-white rounded-full transition-all z-50"><FaChevronRight size={24} /></button>

              <div className="max-w-5xl w-full flex flex-col items-center">
                <motion.img 
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  loading="lazy"
                  width="1200"
                  height="800"
                  className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl" 
                  onClick={(e) => e.stopPropagation()} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Keyframes for Glint Animation need to be in global CSS or Tailwind config, 
            but for this snippet we assume standard Tailwind. 
            If 'animate-glint' isn't in your config, the white flash won't show but code won't break. 
        */}
      </div>
    </section>
  );
};

export default Gallery;