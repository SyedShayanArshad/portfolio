"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  accent?: string;
}

export default function ImageCarousel({ images, alt, accent = "#8b5cf6" }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-bg-secondary group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[activeIndex]}
                alt={`${alt} - Screenshot ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border-subtle hover:bg-bg-primary transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-text-primary" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border-subtle hover:bg-bg-primary transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-text-primary" />
              </button>
            </>
          )}

          {/* Zoom Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-bg-primary/80 backdrop-blur-sm border border-border-subtle hover:bg-bg-primary transition-all opacity-0 group-hover:opacity-100"
            aria-label="Open lightbox"
          >
            <ZoomIn size={16} className="text-text-primary" />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border-subtle">
              <span className="text-xs font-mono text-text-primary">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  "relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  index === activeIndex
                    ? "border-current scale-105 shadow-lg"
                    : "border-border-subtle hover:border-current/50 opacity-60 hover:opacity-100"
                )}
                style={{ color: accent }}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <Image
                  src={images[activeIndex]}
                  alt={`${alt} - Full view`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </div>
            </motion.div>

            {/* Navigation in Lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} className="text-white" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="text-sm font-mono text-white">
                    {activeIndex + 1} / {images.length}
                  </span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
