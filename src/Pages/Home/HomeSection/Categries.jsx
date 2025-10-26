import { Shirt, ShoppingBag, Baby, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Men", label: "Men’s Wear", icon: <Shirt className="w-5 h-5 mr-2" /> },
    { name: "Women", label: "Women’s Wear", icon: <User className="w-5 h-5 mr-2" /> },
    { name: "Kids", label: "Kids & Baby", icon: <Baby className="w-5 h-5 mr-2" /> },
    { name: "All", label: "All Collections", icon: <ShoppingBag className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="w-full py-10 bg-gradient-to-b from-purple-50 to-white mb-5">
      <div className="w-11/12 mx-auto text-center mb-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-3">
          Explore Fashion by Style
        </h2>
        {/* Description */}
        <p className="mx-auto text-xl">
          Trendy collections for Men, Women, Kids
        </p>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="group [perspective:1000px]"
            onClick={() => navigate(`/shop?category=${category.name}`)}
          >
            <div className="relative w-44 h-16 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
              {/* Front Side */}
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 text-white font-semibold rounded-2xl shadow-md [backface-visibility:hidden]">
                {category.icon}
                {category.label}
              </div>
              {/* Back Side */}
              <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 text-black font-semibold rounded-2xl shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
                Explore {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

