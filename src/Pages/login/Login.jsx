import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import lohinImg from '../../assets/Assets/LoginImage/login.jpg';
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { loginUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [mail, setMail] = useState('');

  const handleLoginUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(result => {
        setUser(result.user);
        navigate(location?.state ? location.state : "/");
        toast.success("Login successful!");
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleCustomer = () => {
    setPass(import.meta.env.VITE_DEFAULT_PASSWORD);
    setMail(import.meta.env.VITE_CUSTOMER_EMAIL);
  };

  const handleSeller = () => {
    setPass(import.meta.env.VITE_DEFAULT_PASSWORD);
    setMail(import.meta.env.VITE_SELLER_EMAIL);
  };

  const handleAdmin = () => {
    setPass(import.meta.env.VITE_DEFAULT_PASSWORD);
    setMail(import.meta.env.VITE_ADMIN_EMAIL);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-50 px-4 md:px-8">
        
      <Helmet>
      <title>Login | Shopping Spider</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl border border-customPurple bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Login form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-customPurple">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Login to Shopping Spider</p>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <button 
              onClick={handleCustomer}
              className="text-xs px-3 py-1 bg-customPurple/10 text-customPurple rounded hover:bg-customPurple/20 transition"
            >
              Customer
            </button>
            <button 
              onClick={handleSeller}
              className="text-xs px-3 py-1 bg-customPurple/10 text-customPurple rounded hover:bg-customPurple/20 transition"
            >
              Seller
            </button>
            <button 
              onClick={handleAdmin}
              className="text-xs px-3 py-1 bg-customPurple/10 text-customPurple rounded hover:bg-customPurple/20 transition"
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLoginUser} className="space-y-4">
            <input
              name="email"
              type="email"
              defaultValue={mail}
              placeholder="Email address"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />
            <input
              name="password"
              type="password"
              defaultValue={pass}
              placeholder="Password"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-customPurple hover:bg-customPurple/90 text-white text-sm font-semibold rounded transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-customPurple hover:underline">Register</Link>
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-xs text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <SocialLogin />
        </div>

        {/* Login Image (Only visible on lg+) */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img
            src={lohinImg}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;


