import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Sparkles, Rocket, TrendingUp, ArrowRight, Zap, LogIn } from 'lucide-react';
import LoginSection from "./LoginSection";
import StatsDashboard from '../sections/Statistics';
import Why from '../sections/why';
import HomeFeatures from '../sections/features';
import RiseSocial from '../sections/Ready';
import SmmServicesInsight from '../sections/ServicesInsight';
import PaymentSection from '../sections/PaymentSection';
import BoostSection from '../sections/BoostSection';
import HowItWorks from '../sections/how';
import FaqSection from '../sections/Faq';
import TestimonialsSection from '../sections/CustomerStories';
import GetStarted from '../sections/Getstarted';

const HomePage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded', container);
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 900
        }
      },
      color: {
        value: ["#7c3aed", "#a855f7", "#c084fc", "#d946ef", "#ec4899"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: { min: 0.15, max: 0.45 },
        random: true,
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.15,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 4 },
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 130,
        color: "#c4b5fd",
        opacity: 0.25,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: false
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8
          }
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    detectRetina: true,
    background: {
      color: {
        value: "transparent"
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.15, 0.25, 0.15],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scrollToLogin = () => {
    const loginSection = document.getElementById("login-section");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#faf5ff] to-white overflow-x-hidden">
    {/* ============ HERO SECTION ============ */}
    <section className="relative min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 overflow-hidden flex items-center justify-center py-12 bg-white">
      {/* Particles Background */}
      <div 
        id="particles-container"
        className="absolute inset-0 z-0"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 1
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>

      {/* Scattered Color Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Top-left purple blob */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
        />
        {/* Top-right pink blob */}
        <motion.div 
          className="absolute -top-10 right-0 w-[350px] h-[350px] bg-pink-300/25 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
        />
        {/* Center-left violet */}
        <motion.div 
          className="absolute top-1/3 -left-10 w-[300px] h-[300px] bg-violet-400/20 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 0.5, duration: 5 }}
        />
        {/* Center-right fuchsia */}
        <motion.div 
          className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-fuchsia-300/20 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1, duration: 6 }}
        />
        {/* Bottom-left pink */}
        <motion.div 
          className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-pink-200/30 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 0.8, duration: 5.5 }}
        />
        {/* Bottom-right purple */}
        <motion.div 
          className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-200/25 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 1.2, duration: 6 }}
        />
        {/* Small accent blobs */}
        <motion.div 
          className="absolute top-1/4 left-1/2 w-[150px] h-[150px] bg-indigo-300/20 rounded-full blur-2xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 0.3, duration: 4 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-[180px] h-[180px] bg-rose-300/15 rounded-full blur-2xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1.5, duration: 7 }}
        />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section: Text Content */}
        <motion.div 
          className="text-center lg:text-left relative z-10"
          variants={itemVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100 border border-purple-200 mb-8 shadow-sm"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="text-purple-600 w-5 h-5" />
            </motion.div>
            <span className="text-purple-700 font-semibold text-sm tracking-wide">Premium SMM Platform</span>
            <Sparkles className="text-pink-500 w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.div className="mb-6" variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl">
                Boost Your
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient mt-2">
                Social Media
              </span>
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
                Presence
              </span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 font-medium mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            variants={itemVariants}
          >
            Grow your social media fast with <span className="font-bold text-purple-900">premium quality services</span>. <span className="text-purple-600 font-semibold">Fabulousboost.com</span> offers top-tier solutions for YouTube, Instagram, TikTok, Facebook, Twitter, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.button 
              onClick={scrollToLogin}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/25 flex items-center justify-center overflow-hidden border border-purple-400/40"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 30px 60px rgba(168, 85, 247, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <LogIn className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Sign In Now</span>
              <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button 
              className="px-10 py-5 bg-white border-2 border-purple-200 text-purple-700 font-bold text-lg rounded-2xl shadow-lg flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Rocket className="w-6 h-6 mr-3" />
              Explore Services
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div 
            className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "1M+", label: "Orders Completed" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-3xl font-black text-purple-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Section: Login Form - prominent on desktop */}
        <motion.div 
          className="hidden lg:flex relative justify-center items-center"
          variants={imageVariants}
        >
          <LoginSection variant="hero" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 lg:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-500 text-xs font-medium tracking-wider uppercase">Sign In Below</span>
          <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-purple-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>

    {/* ============ MOBILE LOGIN SECTION ============ */}
    <div className="lg:hidden">
      <LoginSection variant="standalone" />
    </div>

    {/* ============ STATS ============ */}
    <StatsDashboard />

    {/* ============ CONTENT SECTIONS ============ */}
    <Why />
    <HomeFeatures/> 
    <RiseSocial/>
    <SmmServicesInsight/>
    <PaymentSection/>
    <BoostSection/>
    <HowItWorks/>
    <FaqSection/>
    <TestimonialsSection/>
    <GetStarted/>
    </div> 
  );
};

export default HomePage;
