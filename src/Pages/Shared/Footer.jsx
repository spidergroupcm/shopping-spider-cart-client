import { IoLocation, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div>
          <p className="text-3xl font-bold uppercase">
            Shopping<span className="text-customPurple">Spider</span>
          </p>
          <div className="mt-4 text-gray-400 text-sm space-y-2">
            <p className="flex items-center gap-2">
              <IoLocation className="text-customPurple" />
              Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-customPurple" />
              shoppingspider@gmail.com
            </p>
          </div>
          {/* Socials */}
          <div className="flex items-center space-x-4 mt-5 text-lg">
            <Link className="hover:text-customPurple transition-all duration-300"><i className="fab fa-facebook-f"></i></Link>
            <Link className="hover:text-customPurple transition-all duration-300"><i className="fab fa-twitter"></i></Link>
            <Link className="hover:text-customPurple transition-all duration-300"><i className="fab fa-linkedin-in"></i></Link>
            <Link className="hover:text-customPurple transition-all duration-300"><i className="fab fa-instagram"></i></Link>
            <Link className="hover:text-customPurple transition-all duration-300"><i className="fab fa-pinterest-p"></i></Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-customPurple mb-4 border-b border-customPurple pb-1 w-fit">
            Categories
          </h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Men</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Women</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-customPurple mb-4 border-b border-customPurple pb-1 w-fit">
            Quick Links
          </h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        {/* Special Offers */}
        <div>
          <h3 className="text-xl font-semibold text-customPurple mb-4 border-b border-customPurple pb-1 w-fit">
            Special Offers
          </h3>
          <div className="text-gray-400 text-sm space-y-2">
            <p className="font-semibold text-white">🎉 Buy 2, Get 1 Free!</p>
            <p>Limited time offer. Don’t miss out!</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} ShoppingSpider. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


