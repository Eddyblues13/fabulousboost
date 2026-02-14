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
            <div>
              <span className="text-purple-900 font-bold text-lg block leading-tight">
                Fabulous<span className="text-purple-600">boost</span>
              </span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide uppercase leading-none">
                A product of Fabulous Services Limited
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/services" className="text-gray-500 hover:text-purple-600 transition-colors">Services</Link>
            <Link to="/api" className="text-gray-500 hover:text-purple-600 transition-colors">API</Link>
            <Link to="/signup" className="text-gray-500 hover:text-purple-600 transition-colors">Sign Up</Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-right">
            &copy; {currentYear} Fabulous Services Limited. All rights reserved.
          </p>
        </div>

        {/* Bottom divider & product statement */}
        <div className="mt-8 pt-6 border-t border-purple-50 text-center">
          <p className="text-xs text-gray-400">
            Fabulousboost is a product of <span className="font-semibold text-gray-500">Fabulous Services Limited</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
