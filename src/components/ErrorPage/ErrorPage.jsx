import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = ({ status = 404 }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
        {/* Logo */}
        <Link to="/" className="mb-6 block">
          <img 
            src="/logo.png" 
            alt="Amar WearHive" 
            className="h-12 mx-auto"
          />
        </Link>

        <h1 className='text-customPurple font-bold text-center'>Shopping Spider</h1>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-customPurple/10 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-customPurple" />
          </div>
        </div>

        {/* Status Code */}
        <div className="text-6xl font-bold text-customPurple mb-2">{status}</div>

        {/* Error Message */}
        <p className="text-gray-600 text-base mb-6">
          {status === 404 
            ? "Oops! The page you're looking for doesn't exist." 
            : "Something went wrong. Please try again later."}
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-customPurple text-white font-medium rounded-lg hover:bg-customPurple/90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;


