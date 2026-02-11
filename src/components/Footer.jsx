import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-100 bg-white text-gray-800 py-12 overflow-hidden">
      {/* Scattered color accents */}
      <div className="absolute top-0 left-10 w-[200px] h-[200px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[250px] h-[250px] bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-violet-200/15 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">F</span>
            </div>
            <span className="text-purple-900 font-bold text-lg">
              Fabulous<span className="text-purple-600">boost</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/services" className="text-gray-500 hover:text-purple-600 transition-colors">Services</Link>
            <Link to="/api" className="text-gray-500 hover:text-purple-600 transition-colors">API</Link>
            <Link to="/signup" className="text-gray-500 hover:text-purple-600 transition-colors">Sign Up</Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Fabulousboost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
