// Slider.jsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import banner1 from "../../../assets/Assets/Banner/1.png";
import banner2 from "../../../assets/Assets/Banner/2.png";
import banner3 from "../../../assets/Assets/Banner/3.png";

const banners = [banner1, banner2, banner3];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden mb-10">
      {/* Slide Image */}
      <img
        src={banners[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md">
        Step Into the Future of Fashion
        </h1>

    
        <p className="text-white mt-4 text-lg md:text-xl drop-shadow-sm">
          Elevate your look with the season's boldest trends.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full ${
              currentIndex === idx ? "bg-yellow-400" : "bg-white/50"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

