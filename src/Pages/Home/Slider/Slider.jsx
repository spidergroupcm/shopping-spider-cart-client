// Slider.jsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import banner1 from "../../../assets/Assets/Banner/1p.jpg";
import banner2 from "../../../assets/Assets/Banner/2p.jpg";
import banner3 from "../../../assets/Assets/Banner/3p.jpg";

const banners = [
  {
    img: banner1,
    title: "Fashion Meets Future",
    desc: "Bold trends, redefined style.",
  },
  {
    img: banner2,
    title: "Unleash Your Style",
    desc: "Exclusive collections for you.",
  },
  {
    img: banner3,
    title: "Redefine Your Wardrobe",
    desc: "Luxury, comfort, timeless elegance.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[480px] overflow-hidden mb-5 ">
      {/* Slide Image */}
      <img
        src={banners[currentIndex].img}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 text-left">
        <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg animate-fadeInUp">
          {banners[currentIndex].title}
        </h1>
        <p className="text-white mt-4 text-lg md:text-2xl drop-shadow-md animate-fadeInUp delay-200">
          {banners[currentIndex].desc}
        </p>
        <Link
          to="/shop"
          className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-3 rounded-full transition"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-3 rounded-full transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full ${
              currentIndex === idx ? "bg-yellow-400 scale-125" : "bg-white/50"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
