"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AutoCarouselProps {
  images: StaticImageData[];
}

export default function AutoCarousel({ images }: AutoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideInterval = 4000; // Change slide every 3 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {images.map((img, index) =>
          index === activeIndex ? (
            <motion.div
              key={index}
              initial={{ opacity: 50, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 50, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
