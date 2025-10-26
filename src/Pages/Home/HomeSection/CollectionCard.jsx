import women from "../../../assets/Assets/best-collection/women.jpg";
import men from "../../../assets/Assets/best-collection/men.jpg";
import kid from "../../../assets/Assets/best-collection/baby.jpg";
import sari from "../../../assets/Assets/best-collection/sari.jpg";

import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Star, Sparkles } from "lucide-react";

const CollectionCard = () => {
  const collectionData = [
    {
      id: 1,
      title: "Elegant Styles",
      image: women,
      buttonText: "Explore Now",
     
    },
    {
      id: 2,
      title: "Timeless Trends",
      image: men,
      buttonText: "Shop Today",
      
    },
    {
      id: 3,
      title: "Adorable Fashion",
      image: kid,
      buttonText: "Discover More",
     
    },
    {
      id: 4,
      title: "Traditional Grace",
      image: sari,
      buttonText: "View Collection",
      
    },
  ];

  return (
    <div className="w-11/12 mx-auto pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {collectionData.map((item) => (
          <div
            key={item.id}
            className="relative rounded-3xl overflow-hidden shadow-xl group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700 ease-in-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
              <div className="flex items-center gap-2 mb-4">
                
                <h2 className="text-2xl font-bold tracking-wide drop-shadow-lg">
                  {item.title}
                </h2>
              </div>
              <Link to="/shop">
                <button className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transition-all duration-300 hover:from-pink-500 hover:to-purple-600 hover:shadow-2xl">
                  {item.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Hover Glow Layer */}
            <div className="absolute inset-0 group-hover:bg-white/10 transition duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
