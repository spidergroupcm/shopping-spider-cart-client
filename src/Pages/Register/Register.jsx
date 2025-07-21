import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import { photoUpload, userSave } from "../../utilities/utils";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import registerImg from '../../assets/Assets/registerImage/register.jpg';
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const photo = await photoUpload(image);

    try {
      const result = await createUser(email, password);
      setUser(result.user);
      await updateUserProfile({ displayName: name, photoURL: photo });
      await userSave({ ...result?.user, displayName: name, photoURL: photo });
      navigate(location?.state ? location.state : "/");
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 md:px-8">
        <Helmet>
            <title>Register | Shopping Spider</title>
            </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden border border-customPurple">

        {/* Left side image */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img
            src={registerImg}
            alt="Register Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Register form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-customPurple">Join Shopping Spider</h2>
            <p className="text-sm text-gray-500 mt-1">Create your account in seconds</p>
          </div>

          <form onSubmit={handleRegisterUser} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customPurple"
              required
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-customPurple/10 file:text-customPurple rounded hover:file:bg-customPurple/20"
              required
            />

            {/* Password field with eye toggle */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customPurple pr-10"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-customPurple hover:bg-customPurple/90 text-white text-sm font-semibold rounded transition"
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-customPurple hover:underline">Login</Link>
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-xs text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <SocialLogin />

         
        </div>
      </div>
    </div>
  );
};

export default Register;

