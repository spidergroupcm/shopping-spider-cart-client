import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/Assets/AboutUs/about-us.jpg";

const HeroSection = () => {
  return (
    <div className="relative w-11/12 mx-auto rounded-xl overflow-hidden mt-5 shadow-xl">
      <div className="grid lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src={heroImage}
            alt="Fashion Cover"
            className="w-full h-full object-cover rounded-l-xl"
          />
          {/* Optional gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent rounded-l-xl"></div>
        </div>

        {/* Right Side - Content */}
        <div className="bg-white p-10 flex flex-col justify-center rounded-r-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-customPurple">
            Your Style, Our Passion
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Explore the latest trends in fashion, tailored for comfort, quality, and confidence—delivered right to your door.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            {[
              "Stylish & Comfortable",
              "Top Quality Fabrics",
              "Fast & Secure Delivery",
              "Exclusive Member Deals",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="text-customPurple size-5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link to="/" className="mt-8">
            <button className="bg-customPurple hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

