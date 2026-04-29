import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import banner1 from "../assets/bannerr/newban2.png";
import banner2 from "../assets/bannerr/ban2.png";

const slides = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full aspect-[1900/750] min-h-[150px] max-h-[850px]">
        {slides.map((slide, idx) => (
          <Link
            to="/shop"
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt="Printer Banner"
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </Link>
        ))}
      </div>

      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-black" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;