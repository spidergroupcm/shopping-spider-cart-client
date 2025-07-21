import women from "../../../assets/Assets/best-collection/women.jpg";
import men from "../../../assets/Assets/best-collection/men.jpg";
import kid from "../../../assets/Assets/best-collection/baby.jpg";
import { Link } from "react-router-dom";

const CollectionCard = () => {
  const collectionData = [
    {
      id: 1,
      title: "Elegant Styles",
      subtitle: "Exclusive Picks for Women",
      image: women,
      buttonText: "Explore Now",
    },
    {
      id: 2,
      title: "Timeless Trends",
      subtitle: "Modern Looks for Men",
      image: men,
      buttonText: "Shop Today",
    },
    {
      id: 3,
      title: "Adorable Fashion",
      subtitle: "Chic Fits for Kids",
      image: kid,
      buttonText: "Discover More",
    },
  ];

  return (
    <div className="w-11/12 mx-auto pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collectionData.map((item) => (
          <div
            key={item.id}
            className="relative rounded-3xl overflow-hidden shadow-xl group transform transition-all duration-500 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.subtitle}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent text-white flex flex-col justify-end p-6">
              <h2 className="text-3xl font-bold drop-shadow-lg">{item.title}</h2>
              <p className="text-lg mb-4 font-medium drop-shadow">{item.subtitle}</p>
              <Link to="/shop">
                <button className="relative z-10 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg transition-all duration-300 hover:from-pink-500 hover:to-purple-600 hover:shadow-2xl">
                  {item.buttonText}
                </button>
              </Link>
            </div>
            <div className="absolute inset-0 group-hover:bg-black/10 transition duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
