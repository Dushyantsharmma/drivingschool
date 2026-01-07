import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  { src: `${import.meta.env.BASE_URL}banners/Banner1.png`, alt: 'Driving Training Session' },
  { src: `${import.meta.env.BASE_URL}banners/Banner2.png`, alt: 'Expert Driving Instructors' },
  { src: `${import.meta.env.BASE_URL}banners/Banner3.png`, alt: 'Safe Driving Practice' },
];

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-slate-900">
      {/* Responsive Container with Proper Aspect Ratio */}
      <div className="w-full aspect-video md:aspect-[17/9] relative bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          >
            <img
              src={IMAGES[currentIndex].src}
              alt={IMAGES[currentIndex].alt}
              className="w-full h-full object-contain bg-slate-900"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
        
        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-amber-400 w-6' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlideshow;
