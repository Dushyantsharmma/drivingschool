import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}banners/Banner1.webp`,
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}banners/Banner2.webp`,
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}banners/Banner3.webp`,
  },
];

const ImageSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = SLIDES.length - 1;
      if (next >= SLIDES.length) next = 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1 // Slight zoom out on enter
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1, // Settles at normal scale
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 6, ease: "linear" } // Ken Burns effect duration
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[85vh] overflow-hidden bg-slate-900 group">
      
      {/* 1. SLIDESHOW CONTAINER */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <motion.img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover"
            loading="lazy"
            width="1200"
            height="600"
            animate={{ scale: [1, 1.1] }}
            transition={{ duration: 8, ease: "linear" }}
            style={{ minHeight: '100%', maxHeight: '100%' }}
          />
          
          {/* Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 2. TEXT CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 w-full">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            className="max-w-xs xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
          >
            {/* Title */}
            <motion.h1 
              variants={textVariants}
              transition={{ delay: 0.1 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-7xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-snug xs:leading-tight md:leading-tight drop-shadow-lg break-words"
            >
              {SLIDES[current].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={textVariants}
              transition={{ delay: 0.2 }}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 mb-3 xs:mb-4 sm:mb-6 md:mb-8 leading-normal xs:leading-relaxed max-w-xs xs:max-w-md sm:max-w-lg drop-shadow-md"
            >
              {SLIDES[current].subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 3. CONTROLS */}
      {/* Arrows (Hidden on mobile, visible on desktop hover) */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-between px-4 pointer-events-none">
        <button 
          onClick={() => paginate(-1)}
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-95 -translate-x-10 group-hover:translate-x-0"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={() => paginate(1)}
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-95 translate-x-10 group-hover:translate-x-0"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Bars (Bottom Center) */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="flex justify-center gap-3">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: index === current ? '40px' : '20px' }}
            >
              {/* Background track */}
              <div className="absolute inset-0 bg-white/30" />
              
              {/* Filling animation */}
              {index === current && (
                <motion.div
                  layoutId="activeSlide"
                  className="absolute inset-0 bg-amber-500"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ImageSlideshow;