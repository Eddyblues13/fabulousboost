import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Sign In", path: "/signin" },
  { name: "API", path: "/api" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll behavior
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowNavbar(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      className={`fixed top-0 left-0 w-full z-50 transform transition-transform duration-300 ${
        isHomePage 
          ? "bg-transparent backdrop-blur-sm" 
          : "bg-[#faf5ff]/90 backdrop-blur-md"
      } ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}

        {/* TODO: Add Logo */}

{/* <Link to="/" className="flex items-center">
  <img
    src="/logo.png"
    alt="Fabulousboost Logo"
    className="h-50 w-auto object-contain"
  />
</Link> */}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          {navLinks.map(({ name, path }) => {
            if (name === "Sign In") {
              return (
                <a
                  key={name}
                  href="#login-section"
                  onClick={handleSignInClick}
                  className={`text-lg font-medium transition-colors duration-200 cursor-pointer ${
                    isHomePage ? "text-white hover:text-purple-200" : "text-gray-700 hover:text-purple-900"
                  }`}
                >
                  {name}
                </a>
              );
            }
            return (
              <Link
                key={name}
                to={path}
                className={`text-lg font-medium transition-colors duration-200 ${
                  isHomePage ? "text-white hover:text-purple-200" : "text-gray-700 hover:text-purple-900"
                }`}
              >
                {name}
              </Link>
            );
          })}
          <Link
            to="/signup"
            className="ml-4 bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-950 transition duration-300 font-semibold text-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-3xl focus:outline-none ${
            isHomePage ? "text-white" : "text-gray-800"
          }`}
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
            className={`md:hidden px-6 py-6 space-y-4 shadow-lg ${
              isHomePage ? "bg-transparent backdrop-blur-sm" : "bg-[#faf5ff]"
            }`}
          >
            {[
              { name: "Sign In", path: "#login-section" },
              { name: "API", path: "/api" },
              { name: "Services", path: "/services" },
              { name: "Sign Up", path: "/signup" },
            ].map(({ name, path }) => {
              if (name === "Sign In") {
                return (
                  <a
                    key={name}
                    href={path}
                    onClick={handleSignInClick}
                    className={`block text-base font-medium transition-colors duration-200 ${
                      isHomePage ? "text-white hover:text-purple-200" : "text-gray-800 hover:text-purple-900"
                    }`}
                  >
                    {name}
                  </a>
                );
              }
              return (
                <Link
                  key={name}
                  to={path}
                  onClick={closeMenu}
                  className={`block text-base font-medium transition duration-200 ${
                    name === "Sign Up"
                      ? "bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-950"
                      : isHomePage 
                        ? "text-white hover:text-purple-200" 
                        : "text-gray-800 hover:text-purple-900"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
