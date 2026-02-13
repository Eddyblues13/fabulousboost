import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "API", path: "/api" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Track scroll for background style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to login section
  const scrollToLogin = () => {
    const loginSection = document.getElementById("login-section");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Sign In click
  const handleSignInClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === "/") {
      scrollToLogin();
    } else {
      navigate("/", { replace: false });
      setTimeout(() => scrollToLogin(), 400);
    }
  };

  const isHomePage = location.pathname === "/";
  
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-sm" 
          : isHomePage 
            ? "bg-transparent" 
            : "bg-white/95 backdrop-blur-md border-b border-purple-50"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-black text-lg">F</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-xl text-gray-800 block leading-tight">
              Fabulous<span className="text-purple-600">boost</span>
            </span>
            <span className="text-[9px] text-gray-400 font-medium tracking-wide uppercase leading-none">
              Fabulous Services Limited
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 ml-auto">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 hover:text-purple-700 hover:bg-purple-50`}
            >
              {name}
            </Link>
          ))}
          
          {/* Sign In - Prominent */}
          <a
            href="#login-section"
            onClick={handleSignInClick}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ml-2 text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100`}
          >
            Sign In
          </a>

          {/* Sign Up - Most Prominent */}
          <Link
            to="/signup"
            className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            Sign Up Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-3xl focus:outline-none text-gray-800`}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 py-6 space-y-2 bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-lg"
          >
            {/* Sign In - Top of mobile menu, prominent */}
            <a
              href="#login-section"
              onClick={handleSignInClick}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/20 mb-2"
            >
              Sign In to Dashboard
            </a>

            {[
              { name: "API", path: "/api" },
              { name: "Services", path: "/services" },
            ].map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={closeMenu}
                className="block text-gray-700 hover:text-purple-700 py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 hover:bg-purple-50"
              >
                {name}
              </Link>
            ))}

            <Link
              to="/signup"
              onClick={closeMenu}
              className="block text-center text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 font-semibold py-3 px-4 rounded-xl transition-all duration-200 mt-2"
            >
              Create Account
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
